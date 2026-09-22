import { Badge } from '@/components/ui/badge'

const VARIANT_MAP: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  // Pedidos
  Pendiente: 'outline',
  Confirmado: 'secondary',
  Enviado: 'secondary',
  Entregado: 'default',
  Rechazado: 'destructive',
  // Citas
  Aprobada: 'default',
  Cancelada: 'destructive',
  // PQR
  Registrado: 'outline',
  'En proceso': 'secondary',
  Respondido: 'default',
  Cerrado: 'secondary',
}

export function StatusBadge({ status }: { status: string }) {
  return <Badge variant={VARIANT_MAP[status] ?? 'outline'}>{status}</Badge>
}
