'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'

export default function LoginPage() {
  const router = useRouter()
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Sesion iniciada (demo).')
    router.push('/cuenta')
  }
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16">
      <Logo className="mb-6" />
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Iniciar sesion</CardTitle>
          <CardDescription>Accede a tu cuenta para gestionar pedidos, citas y PQR.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Correo electronico</FieldLabel>
                <Input id="email" type="email" defaultValue="ana@cliente.co" />
              </Field>
              <Field>
                <FieldLabel htmlFor="pass">Contraseña</FieldLabel>
                <Input id="pass" type="password" defaultValue="demo1234" />
              </Field>
              <Button type="submit">Entrar</Button>
            </FieldGroup>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            No tienes cuenta?{' '}
            <Link href="/registro" className="font-medium text-primary-foreground/90 underline">
              Registrate
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
