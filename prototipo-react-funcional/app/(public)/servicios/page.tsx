'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Clock } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { ANTICIPO_PORCENTAJE, formatCOP } from '@/lib/data'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'

export default function ServiciosPage() {
  const router = useRouter()
  const { services, addAppointment } = useStore()
  const activos = services.filter((s) => s.activo)

  const [seleccion, setSeleccion] = useState<string[]>([])
  const [personas, setPersonas] = useState(1)
  const [fecha, setFecha] = useState('')
  const [hora, setHora] = useState('')
  const [direccion, setDireccion] = useState('')
  const [cliente, setCliente] = useState('Ana Torres')

  const { valor, duracion, anticipo } = useMemo(() => {
    const elegidos = activos.filter((s) => seleccion.includes(s.id))
    const base = elegidos.reduce((s, x) => s + x.precio, 0) * personas
    const dur = elegidos.reduce((s, x) => s + x.duracionMin, 0) * personas
    return { valor: base, duracion: dur, anticipo: Math.round(base * ANTICIPO_PORCENTAJE) }
  }, [activos, seleccion, personas])

  const toggle = (id: string) =>
    setSeleccion((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const solicitar = () => {
    if (seleccion.length === 0) return toast.error('Selecciona al menos un servicio.')
    if (!fecha || !hora) return toast.error('Selecciona fecha y hora.')
    if (!direccion.trim()) return toast.error('Ingresa la direccion del servicio.')
    addAppointment({ cliente, fecha, hora, servicios: seleccion, personas, direccion })
    toast.success('Cita solicitada. Queda en estado Pendiente.')
    router.push('/cuenta/citas')
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Servicios de maquillaje a domicilio</h1>
        <p className="text-muted-foreground">
          Selecciona uno o varios servicios, indica cuantas personas y agenda tu cita. Se requiere un
          anticipo del 45%.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-4 sm:grid-cols-2">
          {activos.map((s) => {
            const activa = seleccion.includes(s.id)
            return (
              <Card
                key={s.id}
                role="button"
                tabIndex={0}
                onClick={() => toggle(s.id)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggle(s.id)}
                className={cn(
                  'cursor-pointer transition-colors',
                  activa && 'border-primary ring-2 ring-primary/40',
                )}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{s.nombre}</CardTitle>
                    {activa && (
                      <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="size-4" />
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <span className="text-lg font-semibold">{formatCOP(s.precio)}</span>
                  <Badge variant="secondary" className="gap-1">
                    <Clock className="size-3" /> {s.duracionMin} min
                  </Badge>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Agendar cita</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="cliente-cita">Cliente</FieldLabel>
                <Input id="cliente-cita" value={cliente} onChange={(e) => setCliente(e.target.value)} />
              </Field>
              <Field>
                <FieldLabel htmlFor="personas">Numero de personas</FieldLabel>
                <Input
                  id="personas"
                  type="number"
                  min={1}
                  value={personas}
                  onChange={(e) => setPersonas(Math.max(1, Number(e.target.value)))}
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field>
                  <FieldLabel htmlFor="fecha">Fecha</FieldLabel>
                  <Input id="fecha" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="hora">Hora</FieldLabel>
                  <Input id="hora" type="time" value={hora} onChange={(e) => setHora(e.target.value)} />
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="dir-cita">Direccion del servicio</FieldLabel>
                <Input id="dir-cita" placeholder="Cra 00 #00-00" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
              </Field>
            </FieldGroup>

            <Separator />
            <dl className="flex flex-col gap-1 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Duracion estimada</dt><dd>{duracion} min</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Valor total</dt><dd>{formatCOP(valor)}</dd></div>
              <div className="flex justify-between font-semibold"><dt>Anticipo (45%)</dt><dd>{formatCOP(anticipo)}</dd></div>
            </dl>
            <Button size="lg" onClick={solicitar}>Solicitar cita</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
