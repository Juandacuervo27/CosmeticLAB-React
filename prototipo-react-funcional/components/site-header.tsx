'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, ShoppingCart, UserCircle } from 'lucide-react'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/', label: 'Inicio' },
  { href: '/catalogo', label: 'Catalogo' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const { cart } = useStore()
  const cartCount = cart.reduce((s, i) => s + i.cantidad, 0)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" aria-label="Ir al inicio">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              size="sm"
              className={cn(isActive(item.href) && 'bg-secondary text-secondary-foreground')}
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon" className="relative" aria-label="Carrito">
            <Link href="/carrito">
              <ShoppingCart />
              {cartCount > 0 && (
                <Badge className="absolute -right-1 -top-1 size-5 justify-center rounded-full p-0 text-[10px]">
                  {cartCount}
                </Badge>
              )}
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" className="hidden sm:flex" aria-label="Mi cuenta">
            <Link href="/cuenta">
              <UserCircle />
            </Link>
          </Button>
          <Button asChild size="sm" className="hidden sm:flex">
            <Link href="/admin">Admin</Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {NAV.map((item) => (
                  <Button
                    key={item.href}
                    asChild
                    variant="ghost"
                    className={cn('justify-start', isActive(item.href) && 'bg-secondary')}
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                ))}
                <Button asChild variant="ghost" className="justify-start">
                  <Link href="/cuenta">Mi cuenta</Link>
                </Button>
                <Button asChild className="mt-2 justify-start">
                  <Link href="/admin">Panel administrativo</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
