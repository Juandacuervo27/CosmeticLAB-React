'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Brush, PackageCheck, ShieldCheck, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductCard } from '@/components/product-card'
import { useStore } from '@/lib/store'

const VALUES = [
  { icon: ShieldCheck, title: 'Confianza', text: 'Productos cuidadosamente seleccionados.' },
  { icon: Sparkles, title: 'Frescura', text: 'Cosmetica limpia y moderna.' },
  { icon: Brush, title: 'Maquillaje a domicilio', text: 'Servicios profesionales donde estes.' },
  { icon: PackageCheck, title: 'Cercania', text: 'Atencion sencilla y confiable.' },
]

export default function HomePage() {
  const { products } = useStore()
  const destacados = products.filter((p) => p.destacado && p.activo).slice(0, 4)

  return (
    <div className="flex flex-col">
      <section className="border-b bg-gradient-to-b from-secondary/60 to-background">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 md:grid-cols-2">
          <div className="flex flex-col gap-5">
            <span className="w-fit rounded-full bg-primary/15 px-3 py-1 text-sm font-medium text-primary-foreground/80">
              Cosmetica y cuidado personal
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl">
              Belleza accesible, fresca y confiable con CosmeticLAB
            </h1>
            <p className="max-w-prose text-muted-foreground">
              Descubre nuestro catalogo de productos cosmeticos y agenda servicios de maquillaje a
              domicilio. Una experiencia de compra sencilla y cercana.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/catalogo">Ver catalogo</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/servicios">Agendar cita</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl border shadow-sm">
            <Image
              src="/products/hero.png"
              alt="Productos de cosmetica CosmeticLAB"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {VALUES.map((v) => (
          <Card key={v.title}>
            <CardHeader>
              <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary-foreground/80">
                <v.icon className="size-5" />
              </span>
              <CardTitle className="mt-2">{v.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{v.text}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Productos destacados</h2>
          <Button asChild variant="ghost">
            <Link href="/catalogo">Ver todos</Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {destacados.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
