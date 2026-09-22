'use client'

import { useState } from 'react'
import { Mail, MessageCircle, Phone } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'

export default function ContactoPage() {
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [mensaje, setMensaje] = useState('')

  const enviar = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nombre || !correo || !mensaje) return toast.error('Completa todos los campos.')
    toast.success('Mensaje enviado. Te responderemos pronto.')
    setNombre('')
    setCorreo('')
    setMensaje('')
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold">Contacto</h1>
        <p className="text-muted-foreground">Escríbenos y con gusto te ayudamos.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-[1fr_280px]">
        <Card>
          <CardHeader>
            <CardTitle>Formulario de contacto</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={enviar}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="nombre">Nombre</FieldLabel>
                  <Input id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="correo">Correo electronico</FieldLabel>
                  <Input id="correo" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="mensaje">Mensaje</FieldLabel>
                  <Textarea id="mensaje" rows={5} value={mensaje} onChange={(e) => setMensaje(e.target.value)} />
                </Field>
                <Button type="submit" className="w-fit">Enviar mensaje</Button>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Canales oficiales</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 text-sm">
            <span className="flex items-center gap-3">
              <MessageCircle className="size-4 text-primary" /> WhatsApp: 300 000 0000
            </span>
            <span className="flex items-center gap-3">
              <Phone className="size-4 text-primary" /> Tel: (601) 000 0000
            </span>
            <span className="flex items-center gap-3">
              <Mail className="size-4 text-primary" /> hola@cosmeticlab.co
            </span>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
