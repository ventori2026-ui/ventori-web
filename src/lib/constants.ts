/**
 * Fuente única de verdad para identidad, rutas y datos de contacto.
 * Ningún valor de negocio debe escribirse directamente en un componente.
 */

export const SITE = {
  /** Nombre de marca tal como aparece en el logotipo oficial. */
  name: 'Grupo Ventori',
  legalName: 'Grupo Ventori',
  tagline: 'Ingeniería, consultoría e interventoría',
  description:
    'Empresa colombiana especializada en ingeniería, consultoría e interventoría, enfocada en soluciones técnicas integrales para proyectos de infraestructura pública y privada.',
  locale: 'es_CO',
  lang: 'es',
  country: 'CO',
  /**
   * Base para canonical, Open Graph, sitemap y robots.
   *
   * Se define explícitamente con `NEXT_PUBLIC_SITE_URL` cuando haya dominio
   * propio. Si no está, Vercel expone la URL de producción del proyecto, así
   * que el despliegue queda correcto sin configuración manual.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000'),
} as const

export const ROUTES = {
  home: '/',
  about: '/nosotros',
  services: '/servicios',
  sectors: '/sectores',
  projects: '/proyectos',
  contact: '/contacto',
} as const

export type Route = (typeof ROUTES)[keyof typeof ROUTES]

/** Navegación principal. El orden aquí es el orden en header, menú móvil y footer. */
export const NAV_LINKS = [
  { label: 'Nosotros', href: ROUTES.about },
  { label: 'Servicios', href: ROUTES.services },
  { label: 'Sectores', href: ROUTES.sectors },
  { label: 'Proyectos', href: ROUTES.projects },
  { label: 'Contacto', href: ROUTES.contact },
] as const

/**
 * Datos de contacto.
 *
 * PENDIENTE DEL CLIENTE: correo, teléfono, dirección y ciudad llegaron en blanco
 * en el brief. Mientras estén vacíos, la UI omite la fila correspondiente en vez
 * de mostrar un campo vacío — ver `getContactChannels()`.
 */
export const CONTACT = {
  email: '',
  phone: '',
  whatsapp: '',
  address: '',
  city: '',
  schedule: {
    days: 'Lunes a viernes',
    hours: '7:30 a.m. – 5:30 p.m.',
  },
} as const

export const SOCIAL = {
  linkedin: '',
} as const

/** Devuelve solo los canales de contacto que ya tienen dato cargado. */
export function getContactChannels() {
  return [
    {
      id: 'email',
      label: 'Correo electrónico',
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
    },
    {
      id: 'phone',
      label: 'Teléfono',
      value: CONTACT.phone,
      href: `tel:${CONTACT.phone.replace(/\s/g, '')}`,
    },
    { id: 'address', label: 'Dirección', value: CONTACT.address, href: null },
    { id: 'city', label: 'Ciudad', value: CONTACT.city, href: null },
  ].filter((channel) => channel.value.length > 0)
}

/** Límites del formulario de contacto, compartidos entre cliente y servidor. */
export const CONTACT_FORM = {
  minNameLength: 2,
  maxNameLength: 80,
  maxEmailLength: 120,
  minPhoneLength: 7,
  maxPhoneLength: 20,
  maxOrganizationLength: 120,
  minMessageLength: 20,
  maxMessageLength: 2000,
} as const

/** Asuntos disponibles en el formulario. El `value` es lo que viaja al servidor. */
export const CONTACT_SUBJECTS = [
  { value: 'interventoria', label: 'Interventoría' },
  { value: 'consultoria', label: 'Consultoría en ingeniería' },
  { value: 'gerencia', label: 'Gerencia de proyectos' },
  { value: 'estudios', label: 'Estudios y diseños' },
  { value: 'otro', label: 'Otro' },
] as const

export const CONTACT_SUBJECT_VALUES = CONTACT_SUBJECTS.map((subject) => subject.value)

/** Estados del envío del formulario. */
export const FORM_STATUS = {
  idle: 'idle',
  submitting: 'submitting',
  success: 'success',
  error: 'error',
} as const

export type FormStatus = (typeof FORM_STATUS)[keyof typeof FORM_STATUS]

export const FORM_MESSAGES = {
  success: 'Gracias por escribirnos. Un miembro del equipo se pondrá en contacto contigo.',
  error: 'No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos directamente por correo.',
  rateLimited:
    'Recibimos varios envíos desde esta conexión. Espera un momento antes de volver a intentar.',
} as const

/**
 * Ajustes del aro de metal líquido de los CTA primarios.
 *
 * `colorTint` es la terracota de marca y `colorBack` el navy, de modo que el
 * efecto se mantiene dentro de la identidad en vez del gris del componente
 * original. Los valores van en RGBA normalizado (0–1), que es lo que espera el
 * shader.
 */
export const LIQUID_METAL = {
  speed: {
    idle: 0.5,
    hover: 1.2,
  },
  uniforms: {
    // #d88b64
    u_colorTint: [0.847, 0.545, 0.392, 1] as [number, number, number, number],
    // #010133
    u_colorBack: [0.004, 0.004, 0.2, 1] as [number, number, number, number],
    /*
     * Pocas repeticiones y transiciones muy suaves: sobre un aro de 4 px, más
     * bandas producen astillas de luz duras que se leen como un fallo de
     * render en vez de como metal.
     */
    u_repetition: 2,
    u_softness: 0.85,
    u_shiftRed: 0.3,
    u_shiftBlue: 0.3,
    u_distortion: 0.25,
    u_contour: 0,
    u_angle: 45,
    u_scale: 6,
    u_shape: 1,
    u_offsetX: 0.1,
    u_offsetY: -0.1,
    u_isImage: false,
  },
} as const

/** Parámetros de la animación de entrada. Las primitivas de motion los consumen. */
export const MOTION = {
  distance: 24,
  duration: 0.7,
  stagger: 0.08,
  ease: [0.22, 1, 0.36, 1],
  /** Dispara el reveal un poco antes de que el elemento toque el borde inferior. */
  viewportMargin: '0px 0px -12% 0px',
  counterDuration: 1800,
} as const
