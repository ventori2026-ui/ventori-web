# Ventori — sitio web corporativo

Sitio de Ventori, empresa colombiana de **ingeniería, consultoría e interventoría** para proyectos de infraestructura pública y privada.

Next.js 16 · React 19 · TypeScript · Tailwind v4 · Framer Motion

## Arrancar

```bash
npm install
cp .env.example .env.local   # completar las variables
npm run dev
```

`npm run build` compila y verifica tipos. `npm run lint` corre ESLint.

## Estructura

```
src/
├── app/          rutas (home + 5 internas), template de transición y route handler
├── components/
│   ├── layout/   Header, Footer, Logo
│   ├── motion/   entrance, Reveal, Headline, Rule, Stagger, Counter,
│   │             Parallax, PinnedSequence, Marquee, ScrollProgress
│   ├── sections/ secciones compuestas por las páginas
│   └── ui/       primitivas de diseño
├── content/      TODO el copy y los datos, tipados
├── lib/          constants, env, seo, utils, validación
├── styles/       tokens de marca
└── types/
```

## Dirección de arte

Se llama **Estructura** y sale del isotipo: vigas biseladas a 45°, cero esquinas redondeadas. De ahí salen el bisel de marca en todo marco y botón, la retícula técnica de fondo y la numeración en monoespaciada que recorre el sitio.

Paleta: navy `#010133`, terracota `#d88b64`, blanco. Tipografía: Archivo (titulares, anchura variable), Inter (texto), JetBrains Mono (etiquetas).

El scroll tiene tres momentos propios: el revelado de titulares línea a línea, la secuencia de fases con la fotografía fijada al viewport, y la banda de términos que reacciona a la velocidad del scroll.

## Reglas del proyecto

Están en [AGENTS.md](AGENTS.md). Las que más pesan:

1. **Nada hardcodeado.** El copy vive en `src/content/`, todo lo demás en `src/lib/constants.ts`, los secretos en env con getter que falla si falta.
2. **La terracota nunca es texto sobre blanco** (2.7:1, no pasa AA). Va como fondo de bloque con texto navy, o como acento sobre navy.
3. **Toda animación pasa por `src/components/motion/`.** Respetan `prefers-reduced-motion` vía `MotionProvider`, y el `<noscript>` del layout mantiene el contenido visible sin JavaScript.
4. **Nunca observar el viewport sobre un elemento que arranca recortado o a escala 0** — se queda invisible para siempre. El detalle y los otros dos escollos del sistema de motion están en AGENTS.md.
5. **Todo tamaño de tipografía nuevo hay que registrarlo en `extendTailwindMerge`** (`src/lib/utils.ts`), o `cn()` lo descarta al fusionarlo con un color.

## Verificado

Build y ESLint limpios. Auditado a 375 / 768 / 1024 / 1440 px: sin scroll horizontal, todas las áreas táctiles ≥ 44 px, un solo `h1` por página, jerarquía de encabezados sin saltos, ningún enlace o imagen sin nombre accesible.

Con `prefers-reduced-motion` no queda contenido invisible en ninguna ruta, no se descarga ningún vídeo y se retiran la barra de progreso y la marquesina. El menú móvil retiene el foco, cierra con Escape y lo devuelve al botón; el formulario anuncia errores con `role="alert"` y lleva el foco al primer campo inválido.

## Pendiente del cliente

Estos archivos están listos y vacíos a propósito — al cargarlos, la UI se adapta sola:

| Qué falta | Dónde va |
|---|---|
| Correo, teléfono, dirección, ciudad, LinkedIn | `src/lib/constants.ts` → `CONTACT`, `SOCIAL` |
| Cifras de la barra de indicadores | `src/content/stats.ts` |
| Proyectos de referencia con foto | `src/content/projects.ts` |

Mientras `STATS` y `PROJECTS` estén vacíos, la barra de cifras no se renderiza y `/proyectos` muestra un estado explícito. Los canales de contacto sin dato se omiten en lugar de aparecer en blanco.
