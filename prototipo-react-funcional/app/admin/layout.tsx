'use client'

import {
  Boxes,
  CalendarClock,
  ClipboardList,
  LayoutDashboard,
  MessageSquareWarning,
  Package,
  Sparkles,
  Tag,
  Tags,
  Truck,
  Warehouse,
} from 'lucide-react'
import { DashboardShell, type NavItem } from '@/components/dashboard-shell'

const ITEMS: NavItem[] = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/productos', label: 'Productos', icon: Package },
  { href: '/admin/categorias', label: 'Categorias', icon: Tags },
  { href: '/admin/marcas', label: 'Marcas', icon: Tag },
  { href: '/admin/inventario', label: 'Inventario', icon: Warehouse },
  { href: '/admin/pedidos', label: 'Pedidos', icon: ClipboardList },
  { href: '/admin/entregas', label: 'Entregas', icon: Truck },
  { href: '/admin/citas', label: 'Citas', icon: Sparkles },
  { href: '/admin/servicios', label: 'Servicios', icon: Boxes },
  { href: '/admin/pqr', label: 'PQR', icon: MessageSquareWarning },
  { href: '/admin/horario', label: 'Horario', icon: CalendarClock },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell groupLabel="Administracion" items={ITEMS}>
      {children}
    </DashboardShell>
  )
}
