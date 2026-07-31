/**
 * Inventario de medios del sitio.
 *
 * Cada entrada define QUÉ imagen se necesita y DÓNDE se usa, no una URL. El
 * script de descarga resuelve la consulta contra Pexels y fija el resultado en
 * `media.lock.json`, de modo que ejecuciones sucesivas no barajen las fotos.
 *
 * Para sustituir una foto de stock por una real de Ventori: deja el archivo en
 * `public/media/<key>.jpg` y borra su entrada del lockfile.
 *
 * IMPORTANTE: son imágenes de ambientación. Ninguna puede rotularse como un
 * proyecto ejecutado por Ventori — eso solo aplica a `content/projects.ts`,
 * que se alimenta con material propio del cliente.
 */

/** Fotografías. `orientation` y `minWidth` filtran los resultados de la API. */
export const PHOTOS = [
  {
    key: 'sectorVial',
    query: 'aerial highway road infrastructure',
    alt: 'Vista aérea de una carretera de doble calzada atravesando el territorio',
  },
  {
    key: 'sectorObrasCiviles',
    query: 'construction workers concrete structure rebar',
    alt: 'Trabajos de estructura en concreto y acero de refuerzo',
  },
  {
    key: 'sectorEquipamientos',
    query: 'modern public building architecture facade',
    alt: 'Fachada de una edificación institucional contemporánea',
  },
  {
    /*
     * A ras de calle esta consulta devolvía blanco y negro, escenas de abandono
     * o rotulación en idiomas ajenos. La vista aérea comunica mejor el
     * urbanismo y elimina el riesgo de que aparezcan letreros legibles.
     */
    key: 'sectorUrbanismo',
    query: 'aerial top view city blocks streets urban planning',
    alt: 'Vista cenital de la trama urbana de una ciudad',
  },
  {
    key: 'sectorTerritorial',
    query: 'aerial view city development landscape',
    alt: 'Vista aérea del crecimiento urbano sobre el territorio',
  },
  {
    /*
     * Evita deliberadamente "government": devolvía edificios federales de EE. UU.
     * con rótulos en inglés, impropios para una empresa colombiana.
     */
    key: 'sectorEntidades',
    query: 'modern office building glass facade city',
    alt: 'Edificación institucional contemporánea de fachada acristalada',
  },
  {
    key: 'sectorPrivadas',
    query: 'construction crane building site',
    alt: 'Grúa torre sobre una obra de edificación en curso',
  },
  {
    key: 'aboutSplit',
    query: 'engineers blueprint construction site helmet',
    alt: 'Equipo de ingeniería revisando planos en obra',
  },
  {
    key: 'pillarEstructuracion',
    query: 'architect blueprint planning drawings desk',
    alt: 'Planos técnicos y documentos sobre una mesa de trabajo',
  },
  {
    key: 'pillarEjecucion',
    query: 'heavy machinery excavator road works',
    alt: 'Maquinaria pesada trabajando en la construcción de una vía',
  },
  {
    key: 'pillarCierre',
    query: 'completed modern bridge infrastructure',
    alt: 'Puente terminado y en servicio',
  },
  {
    key: 'servicesSupport',
    query: 'surveyor total station land survey',
    alt: 'Topógrafo tomando mediciones con estación total en campo',
  },
  {
    key: 'whyUs',
    query: 'engineering team meeting site discussion',
    alt: 'Profesionales de ingeniería coordinando trabajos en terreno',
  },
  {
    key: 'ctaBand',
    query: 'aerial highway sunset infrastructure landscape',
    alt: 'Corredor vial al atardecer visto desde el aire',
  },
]

/**
 * Clips del hero. Se descarga el archivo de vídeo y su imagen de vista previa,
 * que se usa como `poster` para que la primera pintura no dependa del vídeo.
 */
export const HERO_VIDEOS = [
  { key: 'hero1', query: 'aerial drone highway road', alt: 'Sobrevuelo de un corredor vial' },
  {
    /* "construction site" devolvía ruinas y demoliciones: mensaje opuesto al del hero. */
    key: 'hero2',
    query: 'aerial drone city highway traffic overpass',
    alt: 'Sobrevuelo de un intercambiador vial urbano',
  },
  {
    key: 'hero3',
    query: 'aerial bridge river infrastructure',
    alt: 'Sobrevuelo de un puente sobre un río',
  },
]

/** Ancho máximo al que se guardan las fotos. Suficiente para paneles a sangre. */
export const PHOTO_MAX_WIDTH = 2400

/** Presupuesto por clip. Por encima de esto el hero penaliza el LCP en móvil. */
export const VIDEO_MAX_BYTES = 2_500_000
