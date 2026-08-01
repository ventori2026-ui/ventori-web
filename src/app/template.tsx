import { PageTransition } from '@/components/motion/PageTransition'

/**
 * Next remonta el template en cada navegación, que es justo lo que necesita la
 * transición de entrada: en `layout.tsx` el árbol persiste entre rutas y la
 * animación solo correría en la primera carga.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>
}
