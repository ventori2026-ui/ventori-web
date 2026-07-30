/**
 * Fuente única de verdad para identidad, rutas y datos de contacto.
 * Ningún valor de negocio debe escribirse directamente en un componente.
 */

export const SITE = {
  name: 'Ventori',
  legalName: 'Ventori',
  tagline: 'Ingeniería, consultoría e interventoría',
  description:
    'Empresa colombiana especializada en ingeniería, consultoría e interventoría, enfocada en soluciones técnicas integrales para proyectos de infraestructura pública y privada.',
  locale: 'es_CO',
  lang: 'es',
  country: 'CO',
  /** Se sobrescribe en Vercel con la URL de producción. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
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
    { id: 'email', label: 'Correo electrónico', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { id: 'phone', label: 'Teléfono', value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, '')}` },
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
  rateLimited: 'Recibimos varios envíos desde esta conexión. Espera un momento antes de volver a intentar.',
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
