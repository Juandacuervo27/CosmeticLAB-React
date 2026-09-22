'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { formatCOP, type Product } from '@/lib/data'
import { useStore } from '@/lib/store'

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useStore()
  const agotado = product.stock <= 0

  return (
    <Card className="overflow-hidden pt-0">
      <Link href={`/catalogo/${product.id}`} className="block">
        <div className="relative aspect-square bg-muted">
          <Image
            src={product.imagen || '/placeholder.svg'}
            alt={product.nombre}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
          />
          {product.destacado && (
            <Badge className="absolute left-2 top-2">Destacado</Badge>
          )}
          {agotado && (
            <Badge variant="destructive" className="absolute right-2 top-2">
              Agotado
            </Badge>
          )}
        </div>
      </Link>
      <CardContent className="flex flex-col gap-1">
        <Link href={`/catalogo/${product.id}`}>
          <h3 className="line-clamp-1 font-medium hover:text-primary">{product.nombre}</h3>
        </Link>
        <p className="line-clamp-2 text-sm text-muted-foreground">{product.descripcion}</p>
        <span className="mt-1 text-lg font-semibold">{formatCOP(product.precio)}</span>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          disabled={agotado}
          onClick={() => {
            addToCart(product.id)
            toast.success(`${product.nombre} agregado al carrito`)
          }}
        >
          <ShoppingCart data-icon="inline-start" />
          {agotado ? 'Sin stock' : 'Agregar'}
        </Button>
      </CardFooter>
    </Card>
  )
}
