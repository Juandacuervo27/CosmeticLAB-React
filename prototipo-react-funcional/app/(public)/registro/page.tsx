'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'

export default function RegistroPage() {
  const router = useRouter()
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Cuenta creada (demo).')
    router.push('/cuenta')
  }
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16">
      <Logo className="mb-6" />
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Crear cuenta</CardTitle>
          <CardDescription>Registrate para comprar y agendar servicios.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="nombre">Nombre completo</FieldLabel>
                <Input id="nombre" />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Correo electronico</FieldLabel>
                <Input id="email" type="email" />
              </Field>
              <Field>
                <FieldLabel htmlFor="pass">Contraseña</FieldLabel>
                <Input id="pass" type="password" />
              </Field>
              <Button type="submit">Registrarme</Button>
            </FieldGroup>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Ya tienes cuenta?{' '}
            <Link href="/login" className="font-medium text-primary-foreground/90 underline">
              Inicia sesion
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
