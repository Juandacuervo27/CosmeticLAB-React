'use client'

import Link from 'next/link'
import { Paperclip } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { StatusBadge } from '@/components/status-badge'
import { formatCOP } from '@/lib/data'
import { useStore } from '@/lib/store'

export default function ClientePedidosPage() {
  const { orders } = useStore()

  if (orders.length === 0) {
    return (
      <Empty className="rounded-xl border">
        <EmptyHeader>
          <EmptyTitle>Aun no tienes pedidos</EmptyTitle>
          <EmptyDescription>Confirma un carrito para generar tu primer pedido.</EmptyDescription>
        </EmptyHeader>
        <Button asChild className="mt-4">
          <Link href="/catalogo">Ir al catalogo</Link>
        </Button>
      </Empty>
    )
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pedido</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Entrega</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Accion</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((o) => (
              <TableRow key={o.id}>
                <TableCell className="font-medium">#{o.id}</TableCell>
                <TableCell>{o.fecha}</TableCell>
                <TableCell>{o.entrega}</TableCell>
                <TableCell className="text-right">{formatCOP(o.total)}</TableCell>
                <TableCell><StatusBadge status={o.estado} /></TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast.success('Comprobante adjuntado (demo).')}
                  >
                    <Paperclip data-icon="inline-start" />
                    Comprobante
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
