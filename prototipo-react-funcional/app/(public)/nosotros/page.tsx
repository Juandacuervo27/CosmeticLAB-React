import { Target, Eye, Heart } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const VALORES = ['Confianza', 'Cercania', 'Accesibilidad', 'Innovacion', 'Calidad']

export default function NosotrosPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-semibold">Sobre CosmeticLAB</h1>
        <p className="mt-2 text-muted-foreground">
          Marca dedicada a la comercializacion de productos cosmeticos y de cuidado personal, con una
          propuesta accesible, innovadora y confiable.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary-foreground/80">
              <Target className="size-5" />
            </span>
            <CardTitle className="mt-2">Mision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Brindar productos cosmeticos y de cuidado personal accesibles y de calidad, acercando
              alternativas innovadoras mediante una experiencia de compra confiable, sencilla y cercana.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary-foreground/80">
              <Eye className="size-5" />
            </span>
            <CardTitle className="mt-2">Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Consolidarnos como una marca reconocida dentro de las comunidades donde tengamos presencia,
              fortaleciendo la confianza de nuestros clientes con un catalogo digital en crecimiento.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary-foreground/80">
            <Heart className="size-5" />
          </span>
          <CardTitle className="mt-2">Nuestros valores</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {VALORES.map((v) => (
            <span key={v} className="rounded-full bg-secondary px-4 py-1.5 text-sm font-medium">
              {v}
            </span>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
