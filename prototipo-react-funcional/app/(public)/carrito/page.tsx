'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatCOP } from '@/lib/data'
import { useStore } from '@/lib/store'

export default function CarritoPage() {
  const router = useRouter()
  const { cart, products, updateCartQty, removeFromCart, checkout } = useStore()
  const [entrega, setEntrega] = useState<'Domicilio' | 'Recogida'>('Domicilio')
  const [direccion, setDireccion] = useState('')
  const [cliente, setCliente] = useState('Ana Torres')

  const lineas = cart.map((ci) => {
    const producto = products.find((p) => p.id === ci.productoId)
    return { ...ci, producto }
  })
  const total = lineas.reduce((s, l) => s + (l.producto?.precio ?? 0) * l.cantidad, 0)

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <Empty className="rounded-xl border">
          <EmptyHeader>
            <EmptyTitle>Tu carrito esta vacio</EmptyTitle>
            <EmptyDescription>Agrega productos desde el catalogo para continuar.</EmptyDescription>
          </EmptyHeader>
          <Button asChild className="mt-4">
            <Link href="/catalogo">Ir al catalogo</Link>
          </Button>
        </Empty>
      </div>
    )
  }

  const confirmar = () => {
    if (entrega === 'Domicilio' && !direccion.trim()) {
      toast.error('Ingresa una direccion de entrega.')
      return
    }
    const order = checkout({ entrega, direccion: entrega === 'Domicilio' ? direccion : 'Recogida en tienda', cliente })
    if (order) {
      toast.success(`Pedido ${order.id} confirmado`)
      router.push('/cuenta/pedidos')
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-semibold">Carrito de compras</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-4">
          {lineas.map((l) => (
            <Card key={l.productoId}>
              <CardContent className="flex items-center gap-4">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-lg border bg-muted">
                  <Image
                    src={l.producto?.imagen || '/placeholder.svg'}
                    alt={l.producto?.nombre ?? ''}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{l.producto?.nombre}</p>
                  <p className="text-sm text-muted-foreground">{formatCOP(l.producto?.precio ?? 0)}</p>
                </div>
                <div className="flex items-center rounded-lg border">
                  <Button variant="ghost" size="icon" onClick={() => updateCartQty(l.productoId, l.cantidad - 1)} aria-label="Disminuir">
                    <Minus />
                  </Button>
                  <span className="w-8 text-center tabular-nums">{l.cantidad}</span>
                  <Button variant="ghost" size="icon" onClick={() => updateCartQty(l.productoId, l.cantidad + 1)} aria-label="Aumentar">
                    <Plus />
                  </Button>
                </div>
                <span className="w-24 text-right font-medium">
                  {formatCOP((l.producto?.precio ?? 0) * l.cantidad)}
                </span>
                <Button variant="ghost" size="icon" onClick={() => removeFromCart(l.productoId)} aria-label="Eliminar">
                  <Trash2 />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Resumen del pedido</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="cliente">Cliente</FieldLabel>
                <Input id="cliente" value={cliente} onChange={(e) => setCliente(e.target.value)} />
              </Field>
              <Field>
                <FieldLabel htmlFor="entrega">Modalidad de entrega</FieldLabel>
                <Select value={entrega} onValueChange={(v) => setEntrega(v as 'Domicilio' | 'Recogida')}>
                  <SelectTrigger id="entrega">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Domicilio">Entrega a domicilio</SelectItem>
                      <SelectItem value="Recogida">Recogida personal</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              {entrega === 'Domicilio' && (
                <Field>
                  <FieldLabel htmlFor="direccion">Direccion de entrega</FieldLabel>
                  <Input
                    id="direccion"
                    placeholder="Cra 00 #00-00"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                  />
                </Field>
              )}
            </FieldGroup>

            <Separator />
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{formatCOP(total)}</span>
            </div>
            <Button size="lg" onClick={confirmar}>
              Confirmar pedido
            </Button>
            <p className="text-xs text-muted-foreground">
              El pago se realiza adjuntando el comprobante (no hay pasarela automatizada).
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
