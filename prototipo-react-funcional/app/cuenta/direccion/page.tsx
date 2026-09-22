'use client'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'

export default function DireccionPage() {
  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Direccion de entrega</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              toast.success('Direccion guardada (demo).')
            }}
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="dir">Direccion</FieldLabel>
                <Input id="dir" defaultValue="Cra 12 #34-56" />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="ciudad">Ciudad</FieldLabel>
                  <Input id="ciudad" defaultValue="Bogota" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="barrio">Barrio / Referencia</FieldLabel>
                  <Input id="barrio" defaultValue="Chapinero" />
                </Field>
              </div>
              <Button type="submit" className="w-fit">Guardar direccion</Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
