'use client'

import { Bell, History, MapPin, MessageSquareWarning, Package, Sparkles, User } from 'lucide-react'
import { DashboardShell, type NavItem } from '@/components/dashboard-shell'

const ITEMS: NavItem[] = [
  { href: '/cuenta', label: 'Perfil', icon: User },
  { href: '/cuenta/direccion', label: 'Direccion', icon: MapPin },
  { href: '/cuenta/pedidos', label: 'Pedidos', icon: Package },
  { href: '/cuenta/citas', label: 'Citas', icon: Sparkles },
  { href: '/cuenta/pqr', label: 'PQR', icon: MessageSquareWarning },
  { href: '/cuenta/notificaciones', label: 'Notificaciones', icon: Bell },
  { href: '/cuenta/historial', label: 'Historial', icon: History },
]

export default function CuentaLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell groupLabel="Mi cuenta" items={ITEMS}>
      {children}
    </DashboardShell>
  )
}
