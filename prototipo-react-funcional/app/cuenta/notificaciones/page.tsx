'use client'

import { Bell, CheckCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty'
import { cn } from '@/lib/utils'
import { useStore } from '@/lib/store'

export default function NotificacionesPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useStore()

  if (notifications.length === 0) {
    return (
      <Empty className="rounded-xl border">
        <EmptyHeader>
          <EmptyTitle>Sin notificaciones</EmptyTitle>
          <EmptyDescription>Aqui veras avisos de pedidos, citas y PQR.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={markAllNotificationsRead}>
          <CheckCheck data-icon="inline-start" />
          Marcar todas como leidas
        </Button>
      </div>
      {notifications.map((n) => (
        <Card
          key={n.id}
          className={cn('cursor-pointer', !n.leida && 'border-primary/50 bg-secondary/40')}
          onClick={() => markNotificationRead(n.id)}
        >
          <CardContent className="flex items-start gap-3">
            <span className="mt-0.5 flex size-8 items-center justify-center rounded-full bg-secondary text-primary-foreground/80">
              <Bell className="size-4" />
            </span>
            <div className="flex-1">
              <p className={cn('text-sm', !n.leida && 'font-medium')}>{n.mensaje}</p>
              <p className="text-xs text-muted-foreground">{n.fecha}</p>
            </div>
            {!n.leida && <span className="mt-1 size-2 rounded-full bg-primary" />}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
