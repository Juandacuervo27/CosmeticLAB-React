'use client'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'

export default function PerfilPage() {
  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Datos del perfil</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              toast.success('Perfil actualizado (demo).')
            }}
          >
            <FieldGroup>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="nombre">Nombre</FieldLabel>
                  <Input id="nombre" defaultValue="Ana Torres" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="tel">Telefono</FieldLabel>
                  <Input id="tel" defaultValue="300 111 2222" />
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Correo electronico</FieldLabel>
                <Input id="email" type="email" defaultValue="ana@cliente.co" />
              </Field>
              <Button type="submit" className="w-fit">Guardar cambios</Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
