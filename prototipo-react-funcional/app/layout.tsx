import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import { StoreProvider } from '@/lib/store'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'CosmeticLAB — Cosmética y cuidado personal',
  description:
    'Prototipo del aplicativo web CosmeticLAB: catálogo de productos, gestión de pedidos, citas de maquillaje a domicilio y panel administrativo.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#6dc6fe',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={poppins.variable}>
      <body className="font-sans antialiased">
        <StoreProvider>{children}</StoreProvider>
        <Toaster position="top-center" richColors />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
