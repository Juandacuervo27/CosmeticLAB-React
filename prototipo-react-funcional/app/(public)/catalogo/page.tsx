'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useStore } from '@/lib/store'

type Orden = 'relevancia' | 'precio-asc' | 'precio-desc'

export default function CatalogoPage() {
  const { products, categories, brands } = useStore()
  const [q, setQ] = useState('')
  const [categoria, setCategoria] = useState('todas')
  const [marca, setMarca] = useState('todas')
  const [disponibilidad, setDisponibilidad] = useState('todas')
  const [orden, setOrden] = useState<Orden>('relevancia')

  const resultados = useMemo(() => {
    let list = products.filter((p) => p.activo)
    if (q.trim()) {
      const term = q.toLowerCase()
      list = list.filter(
        (p) =>
          p.nombre.toLowerCase().includes(term) ||
          p.descripcion.toLowerCase().includes(term),
      )
    }
    if (categoria !== 'todas') list = list.filter((p) => p.categoriaId === categoria)
    if (marca !== 'todas') list = list.filter((p) => p.marcaId === marca)
    if (disponibilidad === 'disponibles') list = list.filter((p) => p.stock > 0)
    if (disponibilidad === 'agotados') list = list.filter((p) => p.stock <= 0)
    if (orden === 'precio-asc') list = [...list].sort((a, b) => a.precio - b.precio)
    if (orden === 'precio-desc') list = [...list].sort((a, b) => b.precio - a.precio)
    return list
  }, [products, q, categoria, marca, disponibilidad, orden])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Catalogo</h1>
        <p className="text-muted-foreground">Explora nuestros productos y filtra por tus preferencias.</p>
      </header>

      <div className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-[1fr_auto_auto_auto_auto]">
        <InputGroup>
          <InputGroupInput
            placeholder="Buscar por nombre..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>

        <FilterSelect label="Categoria" value={categoria} onChange={setCategoria}
          options={[{ value: 'todas', label: 'Todas' }, ...categories.map((c) => ({ value: c.id, label: c.nombre }))]} />
        <FilterSelect label="Marca" value={marca} onChange={setMarca}
          options={[{ value: 'todas', label: 'Todas' }, ...brands.map((b) => ({ value: b.id, label: b.nombre }))]} />
        <FilterSelect label="Disponibilidad" value={disponibilidad} onChange={setDisponibilidad}
          options={[
            { value: 'todas', label: 'Todas' },
            { value: 'disponibles', label: 'Disponibles' },
            { value: 'agotados', label: 'Agotados' },
          ]} />
        <FilterSelect label="Ordenar" value={orden} onChange={(v) => setOrden(v as Orden)}
          options={[
            { value: 'relevancia', label: 'Relevancia' },
            { value: 'precio-asc', label: 'Precio: menor' },
            { value: 'precio-desc', label: 'Precio: mayor' },
          ]} />
      </div>

      <p className="mt-4 text-sm text-muted-foreground">{resultados.length} producto(s)</p>

      {resultados.length === 0 ? (
        <Empty className="mt-6 rounded-xl border">
          <EmptyHeader>
            <EmptyTitle>Sin resultados</EmptyTitle>
            <EmptyDescription>Ajusta la busqueda o los filtros para ver mas productos.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {resultados.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="min-w-36">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
