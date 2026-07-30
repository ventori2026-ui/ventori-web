import {
  Award,
  Briefcase,
  Building2,
  ClipboardCheck,
  Compass,
  Eye,
  FileText,
  Globe2,
  Handshake,
  HardHat,
  Landmark,
  Layers,
  LayoutGrid,
  Leaf,
  Lightbulb,
  Network,
  Route,
  Ruler,
  Scale,
  SearchCheck,
  ShieldCheck,
  Target,
  TrendingUp,
  Truck,
  Users,
} from 'lucide-react'
import type { IconName } from '@/types/content'

/** Registro de iconos: permite que el contenido guarde solo el nombre como string. */
const REGISTRY = {
  Award,
  Briefcase,
  Building2,
  ClipboardCheck,
  Compass,
  Eye,
  FileText,
  Globe2,
  Handshake,
  HardHat,
  Landmark,
  Layers,
  LayoutGrid,
  Leaf,
  Lightbulb,
  Network,
  Route,
  Ruler,
  Scale,
  SearchCheck,
  ShieldCheck,
  Target,
  TrendingUp,
  Truck,
  Users,
} as const satisfies Record<IconName, unknown>

interface IconProps {
  name: IconName
  className?: string
}

/** Los iconos son decorativos: el significado siempre está en el texto adyacente. */
export function Icon({ name, className }: IconProps) {
  const Component = REGISTRY[name]
  return <Component className={className} strokeWidth={1.5} aria-hidden="true" />
}
