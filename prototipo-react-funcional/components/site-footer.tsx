import Link from 'next/link'
import { Logo } from '@/components/logo'

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-4">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="text-sm text-muted-foreground">
            Cosmetica y cuidado personal. Alternativas accesibles, innovadoras y confiables.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <span className="font-medium">Tienda</span>
          <Link href="/catalogo" className="text-muted-foreground hover:text-foreground">Catalogo</Link>
          <Link href="/servicios" className="text-muted-foreground hover:text-foreground">Servicios</Link>
          <Link href="/carrito" className="text-muted-foreground hover:text-foreground">Carrito</Link>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <span className="font-medium">Cuenta</span>
          <Link href="/cuenta" className="text-muted-foreground hover:text-foreground">Mi cuenta</Link>
          <Link href="/cuenta/pedidos" className="text-muted-foreground hover:text-foreground">Mis pedidos</Link>
          <Link href="/cuenta/pqr" className="text-muted-foreground hover:text-foreground">PQR</Link>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <span className="font-medium">Contacto</span>
          <span className="text-muted-foreground">WhatsApp: 300 000 0000</span>
          <span className="text-muted-foreground">hola@cosmeticlab.co</span>
          <Link href="/contacto" className="text-muted-foreground hover:text-foreground">Escríbenos</Link>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        Prototipo academico — CosmeticLAB 4.0 · SENA ADSO
      </div>
    </footer>
  )
}
