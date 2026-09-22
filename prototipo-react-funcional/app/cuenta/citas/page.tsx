'use client'

import Link from 'next/link'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty'
import { StatusBadge } from '@/components/status-badge'
import { formatCOP } from '@/lib/data'
import { useStore } from '@/lib/store'

export default function ClienteCitasPage() {
  const { appointments, setAppointmentStatus } = useStore()

  if (appointments.length === 0) {
    return (
      <Empty className="rounded-xl border">
        <EmptyHeader>
          <EmptyTitle>No tienes citas</EmptyTitle>
          <EmptyDescription>Agenda un servicio de maquillaje a domicilio.</EmptyDescription>
        </EmptyHeader>
        <Button asChild className="mt-4">
          <Link href="/servicios">Agendar cita</Link>
        </Button>
      </Empty>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {appointments.map((c) => (
        <Card key={c.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Cita #{c.id}</CardTitle>
              <StatusBadge status={c.estado} />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-sm">
            <div className="flex flex-wrap gap-2">
              {c.servicios.map((s) => (
                <Badge key={s} variant="secondary">{s}</Badge>
              ))}
            </div>
            <dl className="grid grid-cols-2 gap-y-1 text-muted-foreground">
              <dt>Fecha</dt><dd className="text-right text-foreground">{c.fecha} · {c.hora}</dd>
              <dt>Personas</dt><dd className="text-right text-foreground">{c.personas}</dd>
              <dt>Duracion</dt><dd className="text-right text-foreground">{c.duracionMin} min</dd>
              <dt>Valor</dt><dd className="text-right text-foreground">{formatCOP(c.valor)}</dd>
              <dt>Anticipo (45%)</dt><dd className="text-right text-foreground">{formatCOP(c.anticipo)}</dd>
              <dt>Direccion</dt><dd className="text-right text-foreground">{c.direccion}</dd>
            </dl>
            {(c.estado === 'Pendiente' || c.estado === 'Aprobada') && (
              <Button
                variant="outline"
                size="sm"
                className="w-fit"
                onClick={() => {
                  setAppointmentStatus(c.id, 'Cancelada')
                  toast.success('Cita cancelada.')
                }}
              >
                Cancelar cita
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
