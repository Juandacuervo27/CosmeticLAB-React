'use client'

import { Package, Sparkles, MessageSquareWarning } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/status-badge'
import { formatCOP } from '@/lib/data'
import { useStore } from '@/lib/store'

export default function HistorialPage() {
  const { orders, appointments, pqrs } = useStore()

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Package className="size-4 text-primary" /> Pedidos
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {orders.map((o) => (
            <div key={o.id} className="flex items-center justify-between border-b pb-2 text-sm last:border-0">
              <div>
                <p className="font-medium">#{o.id}</p>
                <p className="text-muted-foreground">{o.fecha} · {formatCOP(o.total)}</p>
              </div>
              <StatusBadge status={o.estado} />
            </div>
          ))}
          {orders.length === 0 && <p className="text-sm text-muted-foreground">Sin registros.</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="size-4 text-primary" /> Citas
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {appointments.map((c) => (
            <div key={c.id} className="flex items-center justify-between border-b pb-2 text-sm last:border-0">
              <div>
                <p className="font-medium">#{c.id}</p>
                <p className="text-muted-foreground">{c.fecha} · {c.hora}</p>
              </div>
              <StatusBadge status={c.estado} />
            </div>
          ))}
          {appointments.length === 0 && <p className="text-sm text-muted-foreground">Sin registros.</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <MessageSquareWarning className="size-4 text-primary" /> PQR
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {pqrs.map((p) => (
            <div key={p.id} className="flex items-center justify-between border-b pb-2 text-sm last:border-0">
              <div>
                <p className="font-medium">{p.asunto}</p>
                <p className="text-muted-foreground">{p.tipo} · {p.fecha}</p>
              </div>
              <StatusBadge status={p.estado} />
            </div>
          ))}
          {pqrs.length === 0 && <p className="text-sm text-muted-foreground">Sin registros.</p>}
        </CardContent>
      </Card>
    </div>
  )
}
