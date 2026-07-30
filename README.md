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
├── app/          rutas (home + 5 internas) y el route handler del formulario
├── components/
│   ├── layout/   Header, Footer, Logo
│   ├── motion/   Reveal, Stagger, Counter, ScrollProgress, MotionProvider
│   ├── sections/ secciones compuestas por las páginas
│   └── ui/       primitivas de diseño
├── content/      TODO el copy y los datos, tipados
├── lib/          constants, env, seo, utils, validación
├── styles/       tokens de marca
└── types/
```

## Reglas del proyecto

Están en [AGENTS.md](AGENTS.md). Las tres que más pesan:

1. **Nada hardcodeado.** El copy vive en `src/content/`, todo lo demás en `src/lib/constants.ts`, los secretos en env con getter que falla si falta.
2. **La terracota nunca es texto sobre blanco** (2.7:1, no pasa AA). Va como fondo de bloque con texto navy, o como acento sobre navy.
3. **Toda animación pasa por `src/components/motion/`.** Respetan `prefers-reduced-motion` vía `MotionProvider`, y el `<noscript>` del layout mantiene el contenido visible sin JavaScript.

## Pendiente del cliente

Estos archivos están listos y vacíos a propósito — al cargarlos, la UI se adapta sola:

| Qué falta | Dónde va |
|---|---|
| Correo, teléfono, dirección, ciudad, LinkedIn | `src/lib/constants.ts` → `CONTACT`, `SOCIAL` |
| Cifras de la barra de indicadores | `src/content/stats.ts` |
| Proyectos de referencia con foto | `src/content/projects.ts` |

Mientras `STATS` y `PROJECTS` estén vacíos, la barra de cifras no se renderiza y `/proyectos` muestra un estado explícito. Los canales de contacto sin dato se omiten en lugar de aparecer en blanco.
