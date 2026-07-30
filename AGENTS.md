<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Ventori — reglas del proyecto

## Nada hardcodeado

Ningún literal de negocio vive en JSX. Antes de escribir un string o número que no sea sintaxis:

- **Copy, listas, cifras** → `src/content/*.ts`
- **Rutas, navegación, datos de empresa, contacto, límites de formulario** → `src/lib/constants.ts`
- **Secretos** → env var leída con un getter en `src/lib/env.ts` que lanza error si falta

Si el valor no existe todavía, agrégalo primero al módulo que le corresponde y luego impórtalo.

## Color

Tres colores de marca: `navy` (`#010133`), `terracota` (`#d88b64`), blanco. Escalas derivadas en `src/styles/tokens.css`.

**Restricción de contraste, no negociable:** terracota sobre blanco da 2.7:1 y no pasa WCAG AA. La terracota nunca es color de texto sobre fondo claro. Va como fondo de bloque con texto navy encima, como acento sobre navy, o en elementos decorativos sin carga textual.

Ratios válidos: blanco/navy 19.9:1 · terracota/navy 7.4:1 · navy/terracota 7.4:1.

## Motion

Toda animación pasa por las primitivas de `src/components/motion/`. No se usa `framer-motion` directamente en secciones ni páginas.

Las primitivas respetan `prefers-reduced-motion`: con la preferencia activa el contenido se renderiza visible y estático. El contenido nunca depende de JS para ser legible.

## Componentes

Las páginas son Server Components. Solo las primitivas de motion, el header y el formulario llevan `"use client"`, y se mantienen delgadas.
