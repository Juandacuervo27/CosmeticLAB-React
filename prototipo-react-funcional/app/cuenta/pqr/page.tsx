'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { StatusBadge } from '@/components/status-badge'
import type { PqrType } from '@/lib/data'
import { useStore } from '@/lib/store'

const CLIENTE = 'Ana Torres'

export default function ClientePqrPage() {
  const { pqrs, addPqr } = useStore()
  const [tipo, setTipo] = useState<PqrType>('Peticion')
  const [asunto, setAsunto] = useState('')
  const [mensaje, setMensaje] = useState('')

  const misPqr = pqrs.filter((p) => p.cliente === CLIENTE)

  const registrar = (e: React.FormEvent) => {
    e.preventDefault()
    if (!asunto.trim() || !mensaje.trim()) return toast.error('Completa asunto y mensaje.')
    addPqr({ cliente: CLIENTE, tipo, asunto, mensaje })
    toast.success('PQR registrada.')
    setAsunto('')
    setMensaje('')
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Registrar PQR</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={registrar}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="tipo">Tipo</FieldLabel>
                <Select value={tipo} onValueChange={(v) => setTipo(v as PqrType)}>
                  <SelectTrigger id="tipo">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Peticion">Peticion</SelectItem>
                      <SelectItem value="Queja">Queja</SelectItem>
                      <SelectItem value="Reclamo">Reclamo</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="asunto">Asunto</FieldLabel>
                <Input id="asunto" value={asunto} onChange={(e) => setAsunto(e.target.value)} />
              </Field>
              <Field>
                <FieldLabel htmlFor="mensaje">Mensaje</FieldLabel>
                <Textarea id="mensaje" rows={4} value={mensaje} onChange={(e) => setMensaje(e.target.value)} />
              </Field>
              <Button type="submit">Enviar PQR</Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4">
        <h2 className="font-medium">Mis PQR ({misPqr.length})</h2>
        {misPqr.map((p) => (
          <Card key={p.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{p.asunto}</CardTitle>
                <StatusBadge status={p.estado} />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm">
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">{p.tipo}</span> · {p.fecha} · #{p.id}
              </p>
              <p>{p.mensaje}</p>
              {p.respuesta && (
                <Alert>
                  <AlertTitle>Respuesta de CosmeticLAB</AlertTitle>
                  <AlertDescription>{p.respuesta}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
