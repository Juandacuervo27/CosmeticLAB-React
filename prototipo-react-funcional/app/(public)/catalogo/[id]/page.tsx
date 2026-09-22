'use client'

import { use, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Minus, Plus, ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { formatCOP } from '@/lib/data'
import { useStore } from '@/lib/store'

export default function ProductoDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { products, categories, brands, addToCart } = useStore()
  const [cantidad, setCantidad] = useState(1)

  const product = products.find((p) => p.id === id)
  if (!product) return notFound()

  const categoria = categories.find((c) => c.id === product.categoriaId)?.nombre ?? '—'
  const marca = brands.find((b) => b.id === product.marcaId)?.nombre ?? '—'
  const agotado = product.stock <= 0
  const maxCantidad = Math.max(1, product.stock)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/catalogo">Catalogo</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.nombre}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl border bg-muted">
          <Image
            src={product.imagen || '/placeholder.svg'}
            alt={product.nombre}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{categoria}</Badge>
            <Badge variant="outline">{marca}</Badge>
            {product.destacado && <Badge>Destacado</Badge>}
          </div>
          <h1 className="text-3xl font-semibold">{product.nombre}</h1>
          <span className="text-2xl font-semibold text-primary-foreground/90">
            {formatCOP(product.precio)}
          </span>
          <p className="text-muted-foreground">{product.descripcion}</p>

          <p className="text-sm">
            {agotado ? (
              <span className="font-medium text-destructive">Producto agotado</span>
            ) : (
              <span className="text-muted-foreground">{product.stock} unidades disponibles</span>
            )}
          </p>

          <Separator />

          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-lg border">
              <Button
                variant="ghost"
                size="icon"
                disabled={agotado || cantidad <= 1}
                onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                aria-label="Disminuir"
              >
                <Minus />
              </Button>
              <span className="w-10 text-center tabular-nums">{cantidad}</span>
              <Button
                variant="ghost"
                size="icon"
                disabled={agotado || cantidad >= maxCantidad}
                onClick={() => setCantidad((c) => Math.min(maxCantidad, c + 1))}
                aria-label="Aumentar"
              >
                <Plus />
              </Button>
            </div>

            <Button
              className="flex-1"
              disabled={agotado}
              onClick={() => {
                addToCart(product.id, cantidad)
                toast.success(`${cantidad} x ${product.nombre} agregado al carrito`)
              }}
            >
              <ShoppingCart data-icon="inline-start" />
              Agregar al carrito
            </Button>
          </div>

          <Button asChild variant="ghost" className="w-fit">
            <Link href="/catalogo">
              <ArrowLeft data-icon="inline-start" />
              Seguir comprando
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
