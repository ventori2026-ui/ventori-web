/**
 * Acceso a variables de entorno. Nunca se leen `process.env.*` directamente
 * desde un route handler o un componente: siempre a través de estos getters,
 * que fallan de forma explícita si la variable no está configurada.
 */

const ENV_KEYS = {
  resendApiKey: 'RESEND_API_KEY',
  contactFrom: 'CONTACT_FROM_EMAIL',
  contactTo: 'CONTACT_TO_EMAIL',
} as const

function requireEnv(key: string): string {
  const value = process.env[key]
  if (!value) {
    throw new Error(
      `Falta la variable de entorno ${key}. Agrégala en .env.local para desarrollo y en el proyecto de Vercel para producción.`,
    )
  }
  return value
}

export const getResendApiKey = () => requireEnv(ENV_KEYS.resendApiKey)
export const getContactFromEmail = () => requireEnv(ENV_KEYS.contactFrom)
export const getContactToEmail = () => requireEnv(ENV_KEYS.contactTo)

/**
 * Permite que el formulario responda con un error controlado, en vez de romper
 * el despliegue, mientras el cliente no haya entregado el correo de destino.
 */
export function isContactMailConfigured() {
  return Object.values(ENV_KEYS).every((key) => Boolean(process.env[key]))
}
