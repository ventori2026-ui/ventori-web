import { SITE } from '@/lib/constants'

/**
 * Copy del encabezado y metadata de cada página interna.
 * Una sola entrada por ruta: la usan tanto `<PageHero />` como `buildMetadata()`.
 */
export const PAGES = {
  home: {
    title: `${SITE.name} · ${SITE.tagline}`,
    metaTitle: `${SITE.name} | ${SITE.tagline} en Colombia`,
    description: SITE.description,
  },
  about: {
    eyebrow: 'Nosotros',
    title: 'Ingeniería con responsabilidad sobre el resultado',
    lead: 'Somos una empresa colombiana de ingeniería, consultoría e interventoría. Acompañamos proyectos de infraestructura pública y privada en todas sus etapas.',
    metaTitle: `Nosotros | ${SITE.name}`,
    description:
      'Conoce a Ventori: misión, visión y compromiso de una empresa colombiana de ingeniería, consultoría e interventoría para proyectos de infraestructura.',
  },
  services: {
    eyebrow: 'Servicios',
    title: 'Nueve frentes de trabajo, un solo responsable',
    lead: 'Cubrimos el ciclo completo del proyecto: estructuración, diseño, ejecución, control y cierre. Cada servicio puede contratarse por separado o como parte de un alcance integral.',
    metaTitle: `Servicios | ${SITE.name}`,
    description:
      'Gerencia de proyectos, interventoría integral, consultoría en ingeniería, estudios y diseños, supervisión de obras, gestión ambiental y social, y asesoría técnica.',
  },
  sectors: {
    eyebrow: 'Sectores',
    title: 'Dónde trabajamos',
    lead: 'Atendemos proyectos de infraestructura y equipamiento en el sector público y privado, con el rigor documental y técnico que exige cada uno.',
    metaTitle: `Sectores | ${SITE.name}`,
    description:
      'Infraestructura vial, obras civiles, equipamientos públicos, urbanismo y desarrollo territorial para entidades públicas y empresas privadas.',
  },
  projects: {
    eyebrow: 'Proyectos',
    title: 'Proyectos de referencia',
    lead: 'Una selección de los proyectos en los que hemos participado, con su alcance, ubicación y año de ejecución.',
    metaTitle: `Proyectos | ${SITE.name}`,
    description:
      'Proyectos de infraestructura vial, obras civiles y equipamientos públicos en los que Ventori ha participado como consultor o interventor.',
    /** Estado cuando `PROJECTS` todavía está vacío. */
    empty: {
      title: 'Estamos preparando esta sección',
      text: 'Muy pronto publicaremos aquí los proyectos de referencia. Mientras tanto, escríbenos y con gusto compartimos nuestra experiencia aplicable a tu proyecto.',
    },
  },
  contact: {
    eyebrow: 'Contacto',
    title: 'Cuéntanos qué necesitas resolver',
    lead: 'Escríbenos con el contexto del proyecto y la etapa en la que se encuentra. Te respondemos con una propuesta de alcance concreta.',
    metaTitle: `Contacto | ${SITE.name}`,
    description:
      'Contacta al equipo de Ventori para proyectos de ingeniería, consultoría e interventoría en Colombia. Atención de lunes a viernes.',
  },
} as const
