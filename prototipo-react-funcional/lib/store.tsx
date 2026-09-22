'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  ANTICIPO_PORCENTAJE,
  type AppNotification,
  type Appointment,
  type AppointmentStatus,
  type Brand,
  type CartItem,
  type Category,
  type Database,
  type MakeupService,
  type Order,
  type OrderStatus,
  type Pqr,
  type PqrStatus,
  type PqrType,
  type Product,
  seedDatabase,
  uid,
} from './data'

const STORAGE_KEY = 'cosmeticlab-db-v2'

interface StoreValue extends Database {
  ready: boolean
  // Productos
  addProduct: (p: Omit<Product, 'id'>) => void
  updateProduct: (id: string, p: Partial<Product>) => void
  deleteProduct: (id: string) => void
  // Categorias
  addCategory: (nombre: string) => void
  updateCategory: (id: string, c: Partial<Category>) => void
  deleteCategory: (id: string) => void
  // Marcas
  addBrand: (nombre: string) => void
  updateBrand: (id: string, b: Partial<Brand>) => void
  deleteBrand: (id: string) => void
  // Servicios
  addService: (s: Omit<MakeupService, 'id'>) => void
  updateService: (id: string, s: Partial<MakeupService>) => void
  deleteService: (id: string) => void
  // Carrito
  addToCart: (productoId: string, cantidad?: number) => void
  updateCartQty: (productoId: string, cantidad: number) => void
  removeFromCart: (productoId: string) => void
  clearCart: () => void
  checkout: (data: { entrega: Order['entrega']; direccion: string; cliente: string }) => Order | null
  // Pedidos
  setOrderStatus: (id: string, estado: OrderStatus) => void
  // Citas
  addAppointment: (data: {
    cliente: string
    fecha: string
    hora: string
    servicios: string[]
    personas: number
    direccion: string
  }) => void
  setAppointmentStatus: (id: string, estado: AppointmentStatus) => void
  // PQR
  addPqr: (data: { cliente: string; tipo: PqrType; asunto: string; mensaje: string }) => void
  respondPqr: (id: string, respuesta: string, estado?: PqrStatus) => void
  setPqrStatus: (id: string, estado: PqrStatus) => void
  // Notificaciones
  addNotification: (mensaje: string) => void
  markNotificationRead: (id: string) => void
  markAllNotificationsRead: () => void
  // Utilidades
  resetDemo: () => void
}

const StoreContext = createContext<StoreValue | null>(null)

const today = () => new Date().toISOString().slice(0, 10)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [db, setDb] = useState<Database>(() => seedDatabase())
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setDb(JSON.parse(raw) as Database)
    } catch {
      // ignore parse errors, keep seed
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db))
    } catch {
      // storage may be unavailable
    }
  }, [db, ready])

  const value = useMemo<StoreValue>(() => {
    const patch = (partial: Partial<Database>) => setDb((prev) => ({ ...prev, ...partial }))

    return {
      ...db,
      ready,

      addProduct: (p) =>
        setDb((prev) => ({ ...prev, products: [...prev.products, { ...p, id: uid('prod') }] })),
      updateProduct: (id, p) =>
        setDb((prev) => ({
          ...prev,
          products: prev.products.map((x) => (x.id === id ? { ...x, ...p } : x)),
        })),
      deleteProduct: (id) =>
        setDb((prev) => ({ ...prev, products: prev.products.filter((x) => x.id !== id) })),

      addCategory: (nombre) =>
        setDb((prev) => ({
          ...prev,
          categories: [...prev.categories, { id: uid('cat'), nombre, activa: true }],
        })),
      updateCategory: (id, c) =>
        setDb((prev) => ({
          ...prev,
          categories: prev.categories.map((x) => (x.id === id ? { ...x, ...c } : x)),
        })),
      deleteCategory: (id) =>
        setDb((prev) => ({ ...prev, categories: prev.categories.filter((x) => x.id !== id) })),

      addBrand: (nombre) =>
        setDb((prev) => ({
          ...prev,
          brands: [...prev.brands, { id: uid('mar'), nombre, activa: true }],
        })),
      updateBrand: (id, b) =>
        setDb((prev) => ({
          ...prev,
          brands: prev.brands.map((x) => (x.id === id ? { ...x, ...b } : x)),
        })),
      deleteBrand: (id) =>
        setDb((prev) => ({ ...prev, brands: prev.brands.filter((x) => x.id !== id) })),

      addService: (s) =>
        setDb((prev) => ({ ...prev, services: [...prev.services, { ...s, id: uid('srv') }] })),
      updateService: (id, s) =>
        setDb((prev) => ({
          ...prev,
          services: prev.services.map((x) => (x.id === id ? { ...x, ...s } : x)),
        })),
      deleteService: (id) =>
        setDb((prev) => ({ ...prev, services: prev.services.filter((x) => x.id !== id) })),

      addToCart: (productoId, cantidad = 1) =>
        setDb((prev) => {
          const existing = prev.cart.find((i) => i.productoId === productoId)
          const cart = existing
            ? prev.cart.map((i) =>
                i.productoId === productoId ? { ...i, cantidad: i.cantidad + cantidad } : i,
              )
            : [...prev.cart, { productoId, cantidad }]
          return { ...prev, cart }
        }),
      updateCartQty: (productoId, cantidad) =>
        setDb((prev) => ({
          ...prev,
          cart: prev.cart
            .map((i) => (i.productoId === productoId ? { ...i, cantidad } : i))
            .filter((i) => i.cantidad > 0),
        })),
      removeFromCart: (productoId) =>
        setDb((prev) => ({ ...prev, cart: prev.cart.filter((i) => i.productoId !== productoId) })),
      clearCart: () => patch({ cart: [] }),

      checkout: ({ entrega, direccion, cliente }) => {
        let created: Order | null = null
        setDb((prev) => {
          if (prev.cart.length === 0) return prev
          const items = prev.cart.map((ci) => {
            const prod = prev.products.find((p) => p.id === ci.productoId)!
            return {
              productoId: ci.productoId,
              nombre: prod.nombre,
              precio: prod.precio,
              cantidad: ci.cantidad,
            }
          })
          const total = items.reduce((s, i) => s + i.precio * i.cantidad, 0)
          const order: Order = {
            id: uid('ped'),
            cliente,
            fecha: today(),
            items,
            total,
            estado: 'Pendiente',
            entrega,
            direccion,
          }
          created = order
          // descontar inventario
          const products = prev.products.map((p) => {
            const inCart = prev.cart.find((c) => c.productoId === p.id)
            return inCart ? { ...p, stock: Math.max(0, p.stock - inCart.cantidad) } : p
          })
          const notif: AppNotification = {
            id: uid('not'),
            mensaje: `Tu pedido #${order.id} fue registrado y esta Pendiente.`,
            fecha: today(),
            leida: false,
          }
          return {
            ...prev,
            products,
            orders: [order, ...prev.orders],
            cart: [],
            notifications: [notif, ...prev.notifications],
          }
        })
        return created
      },

      setOrderStatus: (id, estado) =>
        setDb((prev) => {
          const order = prev.orders.find((o) => o.id === id)
          const notif: AppNotification | null = order
            ? {
                id: uid('not'),
                mensaje: `Tu pedido #${id} cambio a estado ${estado}.`,
                fecha: today(),
                leida: false,
              }
            : null
          return {
            ...prev,
            orders: prev.orders.map((o) => (o.id === id ? { ...o, estado } : o)),
            notifications: notif ? [notif, ...prev.notifications] : prev.notifications,
          }
        }),

      addAppointment: ({ cliente, fecha, hora, servicios, personas, direccion }) =>
        setDb((prev) => {
          const seleccionados = prev.services.filter((s) => servicios.includes(s.id))
          const base = seleccionados.reduce((s, x) => s + x.precio, 0) * personas
          const duracionMin = seleccionados.reduce((s, x) => s + x.duracionMin, 0) * personas
          const anticipo = Math.round(base * ANTICIPO_PORCENTAJE)
          const cita: Appointment = {
            id: uid('cit'),
            cliente,
            fecha,
            hora,
            servicios: seleccionados.map((s) => s.nombre),
            personas,
            duracionMin,
            valor: base,
            anticipo,
            direccion,
            estado: 'Pendiente',
          }
          const notif: AppNotification = {
            id: uid('not'),
            mensaje: `Tu cita #${cita.id} fue solicitada y esta Pendiente.`,
            fecha: today(),
            leida: false,
          }
          return {
            ...prev,
            appointments: [cita, ...prev.appointments],
            notifications: [notif, ...prev.notifications],
          }
        }),

      setAppointmentStatus: (id, estado) =>
        setDb((prev) => {
          const notif: AppNotification = {
            id: uid('not'),
            mensaje: `Tu cita #${id} fue ${estado}.`,
            fecha: today(),
            leida: false,
          }
          return {
            ...prev,
            appointments: prev.appointments.map((a) => (a.id === id ? { ...a, estado } : a)),
            notifications: [notif, ...prev.notifications],
          }
        }),

      addPqr: ({ cliente, tipo, asunto, mensaje }) =>
        setDb((prev) => {
          const pqr: Pqr = {
            id: uid('pqr'),
            cliente,
            tipo,
            asunto,
            mensaje,
            estado: 'Registrado',
            fecha: today(),
          }
          return { ...prev, pqrs: [pqr, ...prev.pqrs] }
        }),

      respondPqr: (id, respuesta, estado = 'Respondido') =>
        setDb((prev) => {
          const notif: AppNotification = {
            id: uid('not'),
            mensaje: `Tu PQR #${id} recibio una respuesta.`,
            fecha: today(),
            leida: false,
          }
          return {
            ...prev,
            pqrs: prev.pqrs.map((p) => (p.id === id ? { ...p, respuesta, estado } : p)),
            notifications: [notif, ...prev.notifications],
          }
        }),

      setPqrStatus: (id, estado) =>
        setDb((prev) => ({
          ...prev,
          pqrs: prev.pqrs.map((p) => (p.id === id ? { ...p, estado } : p)),
        })),

      addNotification: (mensaje) =>
        setDb((prev) => ({
          ...prev,
          notifications: [
            { id: uid('not'), mensaje, fecha: today(), leida: false },
            ...prev.notifications,
          ],
        })),
      markNotificationRead: (id) =>
        setDb((prev) => ({
          ...prev,
          notifications: prev.notifications.map((n) => (n.id === id ? { ...n, leida: true } : n)),
        })),
      markAllNotificationsRead: () =>
        setDb((prev) => ({
          ...prev,
          notifications: prev.notifications.map((n) => ({ ...n, leida: true })),
        })),

      resetDemo: () => setDb(seedDatabase()),
    }
  }, [db, ready])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore debe usarse dentro de StoreProvider')
  return ctx
}
