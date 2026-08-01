/**
 * Descarga los medios del sitio desde Pexels y genera el mapa tipado que
 * consumen los componentes.
 *
 * Uso:  npm run media          — descarga lo que falte
 *       npm run media -- --force  — vuelve a resolver y descargar todo
 *
 * La API key solo se usa aquí, en tiempo de construcción de activos: nunca
 * llega al bundle ni al runtime, por eso no pasa por `src/lib/env.ts`.
 *
 * Las elecciones se fijan en `media.lock.json` para que dos ejecuciones no
 * devuelvan fotos distintas y el diseño no cambie solo.
 */

import { execFile } from 'node:child_process'
import { createWriteStream } from 'node:fs'
import { mkdir, readFile, rename, rm, writeFile, stat } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { pipeline } from 'node:stream/promises'
import { promisify } from 'node:util'
import { fileURLToPath } from 'node:url'
import { Readable } from 'node:stream'

const run = promisify(execFile)

import { HERO_VIDEOS, PHOTOS, PHOTO_MAX_WIDTH, VIDEO_MAX_BYTES } from './media-plan.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const MEDIA_DIR = join(ROOT, 'public', 'media')
const LOCK_PATH = join(ROOT, 'media.lock.json')
const OUTPUT_TS = join(ROOT, 'src', 'content', 'media.ts')
const CREDITS_PATH = join(MEDIA_DIR, 'CREDITS.md')

const API = 'https://api.pexels.com'
const force = process.argv.includes('--force')

/**
 * Sustituto para las claves que no se resuelvan. Garantiza que `media.ts`
 * siempre exponga todas las claves del plan, de modo que el proyecto compile
 * aunque una consulta se quede sin resultados.
 */
const PLACEHOLDER = {
  src: '/media/placeholder.svg',
  width: 1600,
  height: 1000,
  photographer: '—',
  sourceUrl: '—',
  bytes: 0,
}

// --- API key -----------------------------------------------------------------

async function readApiKey() {
  if (process.env.PEXELS_API_KEY) return process.env.PEXELS_API_KEY

  try {
    const env = await readFile(join(ROOT, '.env.local'), 'utf8')
    const match = env.match(/^\s*PEXELS_API_KEY\s*=\s*(.+)$/m)
    if (match) return match[1].trim().replace(/^["']|["']$/g, '')
  } catch {
    // .env.local puede no existir todavía; se informa abajo.
  }

  throw new Error(
    'Falta PEXELS_API_KEY.\n' +
      '  1. Consíguela gratis en https://www.pexels.com/api/\n' +
      '  2. Añádela a ventori-web/.env.local:  PEXELS_API_KEY=tu_key\n',
  )
}

async function pexels(path, key) {
  const response = await fetch(`${API}${path}`, { headers: { Authorization: key } })

  if (response.status === 401)
    throw new Error('Pexels rechazó la key (401). Revisa que esté completa.')
  if (response.status === 429)
    throw new Error('Pexels devolvió 429: cuota agotada. Espera una hora.')
  if (!response.ok) throw new Error(`Pexels respondió ${response.status} en ${path}`)

  return response.json()
}

// --- descarga ----------------------------------------------------------------

async function download(url, destination) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`No se pudo descargar ${url} (${response.status})`)

  await mkdir(dirname(destination), { recursive: true })
  await pipeline(Readable.fromWeb(response.body), createWriteStream(destination))

  return (await stat(destination)).size
}

async function exists(path) {
  try {
    await stat(path)
    return true
  } catch {
    return false
  }
}

/**
 * Recomprime la foto en el sitio. Pexels sirve el original con muy poca
 * compresión —una sola llegó a 6 MB—, peso que no tiene sentido versionar ni
 * subir al despliegue.
 */
async function optimizePhoto(path) {
  const temporary = `${path}.tmp.jpg`
  await run('ffmpeg', ['-y', '-loglevel', 'error', '-i', path, '-q:v', '4', temporary])
  await rename(temporary, path)
  return (await stat(path)).size
}

/**
 * Reencoda el clip para que quepa en el presupuesto: 1280 de ancho, sin pista de
 * audio —el hero va silenciado— y con el índice al principio para que empiece a
 * reproducirse sin descargar el archivo entero.
 */
async function transcodeVideo(source, destination, seconds = 8) {
  await run('ffmpeg', [
    '-y',
    '-loglevel',
    'error',
    '-i',
    source,
    '-t',
    String(seconds),
    '-vf',
    "scale='min(1280,iw)':-2",
    '-an',
    '-c:v',
    'libx264',
    '-preset',
    'slow',
    '-crf',
    '30',
    '-pix_fmt',
    'yuv420p',
    '-movflags',
    '+faststart',
    destination,
  ])
  return (await stat(destination)).size
}

// --- selección ---------------------------------------------------------------

/** Prefiere apaisadas y de buena resolución; descarta verticales. */
function pickPhoto(results) {
  const landscape = results.filter((photo) => photo.width > photo.height * 1.2)
  const pool = landscape.length > 0 ? landscape : results
  return pool.sort((a, b) => b.width - a.width)[0]
}

/**
 * Elige la variante apaisada más pequeña que siga siendo suficientemente nítida.
 * Da igual que el archivo original pese mucho: se reencoda después, así que
 * conviene partir del menor que llegue a 1280 de ancho.
 */
function pickVideoFile(video) {
  const candidates = video.video_files
    .filter((file) => file.file_type === 'video/mp4' && file.width > file.height)
    .sort((a, b) => a.width - b.width)

  return candidates.find((file) => file.width >= 1280) ?? candidates.at(-1)
}

// --- ejecución ---------------------------------------------------------------

async function main() {
  const key = await readApiKey()

  const lock = force ? {} : JSON.parse(await readFile(LOCK_PATH, 'utf8').catch(() => '{}'))
  const credits = []
  const entries = []

  for (const photo of PHOTOS) {
    const file = join(MEDIA_DIR, `${photo.key}.jpg`)
    let record = lock[photo.key]

    if (!record || !(await exists(file))) {
      const data = await pexels(
        `/v1/search?query=${encodeURIComponent(photo.query)}&per_page=20&orientation=landscape&size=large`,
        key,
      )

      const chosen = pickPhoto(data.photos ?? [])
      if (!chosen) {
        console.warn(`  · sin resultados para "${photo.query}" (${photo.key}); queda el marcador`)
        entries.push({ ...photo, ...PLACEHOLDER, kind: 'photo' })
        continue
      }

      const width = Math.min(chosen.width, PHOTO_MAX_WIDTH)
      const height = Math.round((chosen.height / chosen.width) * width)
      const url = `${chosen.src.original}?auto=compress&cs=tinysrgb&w=${width}`

      const raw = await download(url, file)
      const bytes = await optimizePhoto(file)
      record = {
        id: chosen.id,
        width,
        height,
        photographer: chosen.photographer,
        sourceUrl: chosen.url,
        bytes,
      }
      lock[photo.key] = record
      console.log(
        `  ✓ ${photo.key}  ${width}×${height}  ${(raw / 1024).toFixed(0)} → ${(bytes / 1024).toFixed(0)} KB`,
      )
    } else {
      console.log(`  = ${photo.key}  (ya descargada)`)
    }

    entries.push({ ...photo, ...record, src: `/media/${photo.key}.jpg`, kind: 'photo' })
    credits.push(`| ${photo.key} | foto | ${record.photographer} | ${record.sourceUrl} |`)
  }

  for (const video of HERO_VIDEOS) {
    const videoFile = join(MEDIA_DIR, `${video.key}.mp4`)
    const posterFile = join(MEDIA_DIR, `${video.key}-poster.jpg`)
    let record = lock[video.key]

    if (!record || !(await exists(videoFile)) || !(await exists(posterFile))) {
      const data = await pexels(
        `/videos/search?query=${encodeURIComponent(video.query)}&per_page=15&orientation=landscape&size=medium`,
        key,
      )

      let chosen = null
      let chosenFile = null
      let bytes = 0

      /*
       * Se descarga el original a un archivo aparte y se reencoda al presupuesto.
       * Antes se descartaba el clip por su peso de origen y se quedaba en disco:
       * dos hero de 23 y 26 MB llegaron a colarse así.
       */
      const rawFile = `${videoFile}.raw.mp4`

      for (const candidate of data.videos ?? []) {
        const file = pickVideoFile(candidate)
        if (!file) continue

        const raw = await download(file.link, rawFile)
        bytes = await transcodeVideo(rawFile, videoFile)
        await rm(rawFile, { force: true })

        if (bytes <= VIDEO_MAX_BYTES) {
          chosen = candidate
          chosenFile = file
          console.log(
            `  ✓ ${video.key}  ${(raw / 1e6).toFixed(1)} MB → ${(bytes / 1e6).toFixed(2)} MB`,
          )
          break
        }

        console.log(
          `  · ${video.key}: aun reencodado pesa ${(bytes / 1e6).toFixed(1)} MB, se prueba otro`,
        )
        await rm(videoFile, { force: true })
      }

      if (!chosen) {
        console.warn(`  · sin clip válido para "${video.query}" (${video.key}), se omite`)
        continue
      }

      await download(chosen.image, posterFile)
      await optimizePhoto(posterFile)

      record = {
        id: chosen.id,
        width: chosenFile.width,
        height: chosenFile.height,
        photographer: chosen.user?.name ?? 'Pexels',
        sourceUrl: chosen.url,
        bytes,
      }
      lock[video.key] = record
    } else {
      console.log(`  = ${video.key}  (ya descargado)`)
    }

    entries.push({
      ...video,
      ...record,
      src: `/media/${video.key}.mp4`,
      poster: `/media/${video.key}-poster.jpg`,
      kind: 'video',
    })
    credits.push(`| ${video.key} | vídeo | ${record.photographer} | ${record.sourceUrl} |`)
  }

  await writeFile(LOCK_PATH, `${JSON.stringify(lock, null, 2)}\n`)
  await writeFile(OUTPUT_TS, renderModule(entries))
  await writeFile(CREDITS_PATH, renderCredits(credits))

  console.log(`\nListo: ${entries.length} activos en public/media/`)
  console.log('Mapa tipado en src/content/media.ts · créditos en public/media/CREDITS.md')
}

function renderModule(entries) {
  const photos = entries.filter((entry) => entry.kind === 'photo')

  const photoBody = photos
    .map(
      (photo) => `  ${photo.key}: {
    src: '${photo.src}',
    width: ${photo.width},
    height: ${photo.height},
    alt: ${JSON.stringify(photo.alt)},
  },`,
    )
    .join('\n')

  /*
   * El generador ya no escribe `HERO_CLIPS`: el vídeo del hero es material
   * propio del cliente y se declara a mano en `src/content/hero-video.ts`, para
   * que ninguna ejecución de este script pueda sobrescribirlo.
   */

  return `/**
 * GENERADO POR \`npm run media\` — no editar a mano.
 *
 * Fotografía y vídeo de ambientación descargados de Pexels. Los componentes
 * referencian estas claves, nunca rutas, para que sustituir un activo por
 * material propio de Ventori sea un cambio en un solo sitio.
 *
 * Créditos y licencias en public/media/CREDITS.md
 *
 * El vídeo del hero NO está aquí: es material propio de la empresa y vive en
 * \`content/hero-video.ts\`, fuera del alcance del generador.
 */

export interface MediaImage {
  src: string
  width: number
  height: number
  alt: string
}

export interface MediaVideo {
  src: string
  poster: string
  alt: string
}

export const MEDIA = {
${photoBody}
} as const satisfies Record<string, MediaImage>

export type MediaKey = keyof typeof MEDIA
`
}

function renderCredits(rows) {
  return `# Créditos de los medios

Fotografía y vídeo de **Pexels**, bajo su licencia: uso comercial permitido y
atribución no obligatoria. Se registran aquí de todos modos, para tener
trazabilidad de la procedencia de cada activo.

Todo este material es **ambientación**. Ninguna de estas imágenes representa un
proyecto ejecutado por Grupo Ventori ni puede rotularse como tal.

El **vídeo del hero es la excepción**: lo entregó el cliente, no procede de
Pexels y no lo gestiona este script. Vive en \`public/media/hero.mp4\` y se
declara en \`src/content/hero-video.ts\`.

| Clave | Tipo | Autor | Origen |
|---|---|---|---|
${rows.join('\n')}

Regenerar con \`npm run media\`. Las elecciones están fijadas en \`media.lock.json\`.
`
}

main().catch((error) => {
  console.error(`\n${error.message}`)
  process.exit(1)
})
