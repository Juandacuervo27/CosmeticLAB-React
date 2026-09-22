'use client'

import Link from 'next/link'
import { AlertTriangle, ClipboardList, MessageSquareWarning, Package, RotateCcw, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from '@/components/status-badge'
import { formatCOP } from '@/lib/data'
import { useStore } from '@/lib/store'

export default function AdminDashboard() {
  const { products, orders, appointments, pqrs, resetDemo } = useStore()

  const pedidosPendientes = orders.filter((o) => o.estado === 'Pendiente').length
  const citasPendientes = appointments.filter((a) => a.estado === 'Pendiente').length
  const pqrAbiertos = pqrs.filter((p) => p.estado !== 'Cerrado').length
  const agotados = products.filter((p) => p.stock <= 0)

  const stats = [
    { label: 'Productos', value: products.length, icon: Package, href: '/admin/productos' },
    { label: 'Pedidos pendientes', value: pedidosPendientes, icon: ClipboardList, href: '/admin/pedidos' },
    { label: 'Citas pendientes', value: citasPendientes, icon: Sparkles, href: '/admin/citas' },
    { label: 'PQR abiertos', value: pqrAbiertos, icon: MessageSquareWarning, href: '/admin/pqr' },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">Resumen general de CosmeticLAB.</p>
        <Button variant="outline" size="sm" onClick={resetDemo}>
          <RotateCcw data-icon="inline-start" />
          Restablecer datos demo
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} asChild>
            <Link href={s.href}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
                  <s.icon className="size-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <span className="text-3xl font-semibold">{s.value}</span>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Ultimos pedidos</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {orders.slice(0, 5).map((o) => (
              <div key={o.id} className="flex items-center justify-between border-b pb-2 text-sm last:border-0">
                <div>
                  <p className="font-medium">#{o.id} — {o.cliente}</p>
                  <p className="text-muted-foreground">{formatCOP(o.total)}</p>
                </div>
                <StatusBadge status={o.estado} />
              </div>
            ))}
            {orders.length === 0 && <p className="text-sm text-muted-foreground">Sin pedidos.</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="size-4 text-destructive" /> Inventario bajo
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {agotados.length === 0 && <p className="text-sm text-muted-foreground">Todo con stock disponible.</p>}
            {agotados.map((p) => (
              <div key={p.id} className="flex items-center justify-between border-b pb-2 text-sm last:border-0">
                <span>{p.nombre}</span>
                <Badge variant="destructive">Agotado</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
