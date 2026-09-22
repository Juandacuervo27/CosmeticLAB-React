// Tipos y datos semilla del prototipo CosmeticLAB.
// El prototipo no usa backend: los datos se guardan en localStorage a traves del store.

export type ID = string

export interface Category {
  id: ID
  nombre: string
  activa: boolean
}

export interface Brand {
  id: ID
  nombre: string
  activa: boolean
}

export interface Product {
  id: ID
  nombre: string
  descripcion: string
  precio: number
  stock: number
  categoriaId: ID
  marcaId: ID
  imagen: string
  destacado: boolean
  activo: boolean
}

export interface MakeupService {
  id: ID
  nombre: string
  precio: number
  duracionMin: number
  activo: boolean
}

export type OrderStatus =
  | 'Pendiente'
  | 'Confirmado'
  | 'Enviado'
  | 'Entregado'
  | 'Rechazado'

export interface OrderItem {
  productoId: ID
  nombre: string
  precio: number
  cantidad: number
}

export interface Order {
  id: ID
  cliente: string
  fecha: string
  items: OrderItem[]
  total: number
  estado: OrderStatus
  entrega: 'Domicilio' | 'Recogida'
  direccion: string
}

export type AppointmentStatus = 'Pendiente' | 'Aprobada' | 'Rechazada' | 'Cancelada'

export interface Appointment {
  id: ID
  cliente: string
  fecha: string
  hora: string
  servicios: string[]
  personas: number
  duracionMin: number
  valor: number
  anticipo: number
  direccion: string
  estado: AppointmentStatus
}

export type PqrType = 'Peticion' | 'Queja' | 'Reclamo'
export type PqrStatus = 'Registrado' | 'En proceso' | 'Respondido' | 'Cerrado'

export interface Pqr {
  id: ID
  cliente: string
  tipo: PqrType
  asunto: string
  mensaje: string
  respuesta?: string
  estado: PqrStatus
  fecha: string
}

export interface CartItem {
  productoId: ID
  cantidad: number
}

export interface AppNotification {
  id: ID
  mensaje: string
  fecha: string
  leida: boolean
}

export interface Database {
  categories: Category[]
  brands: Brand[]
  products: Product[]
  services: MakeupService[]
  orders: Order[]
  appointments: Appointment[]
  pqrs: Pqr[]
  cart: CartItem[]
  notifications: AppNotification[]
}

export const ANTICIPO_PORCENTAJE = 0.45

export const ORDER_STATUSES: OrderStatus[] = [
  'Pendiente',
  'Confirmado',
  'Enviado',
  'Entregado',
  'Rechazado',
]

export const PQR_STATUSES: PqrStatus[] = [
  'Registrado',
  'En proceso',
  'Respondido',
  'Cerrado',
]

const hoy = () => new Date().toISOString().slice(0, 10)

export function seedDatabase(): Database {
  const categories: Category[] = [
    { id: 'cat-1', nombre: 'Cuidado facial', activa: true },
    { id: 'cat-2', nombre: 'Maquillaje', activa: true },
    { id: 'cat-3', nombre: 'Cuidado corporal', activa: true },
  ]

  const brands: Brand[] = [
    { id: 'mar-1', nombre: 'LabGlow', activa: true },
    { id: 'mar-2', nombre: 'PureSkin', activa: true },
    { id: 'mar-3', nombre: 'Bloom', activa: true },
  ]

  const products: Product[] = [
    {
      id: 'prod-1',
      nombre: 'Serum Vitamina C',
      descripcion: 'Serum facial iluminador con vitamina C para una piel radiante.',
      precio: 45000,
      stock: 24,
      categoriaId: 'cat-1',
      marcaId: 'mar-1',
      imagen: '/products/serum.png',
      destacado: true,
      activo: true,
    },
    {
      id: 'prod-2',
      nombre: 'Crema Hidratante',
      descripcion: 'Crema humectante de uso diario para todo tipo de piel.',
      precio: 38000,
      stock: 30,
      categoriaId: 'cat-1',
      marcaId: 'mar-2',
      imagen: '/products/cream.png',
      destacado: true,
      activo: true,
    },
    {
      id: 'prod-3',
      nombre: 'Labial Mate',
      descripcion: 'Labial de larga duracion con acabado mate y textura ligera.',
      precio: 22000,
      stock: 0,
      categoriaId: 'cat-2',
      marcaId: 'mar-3',
      imagen: '/products/lipstick.png',
      destacado: false,
      activo: true,
    },
    {
      id: 'prod-4',
      nombre: 'Paleta de Sombras',
      descripcion: 'Paleta de sombras en tonos neutros de alta pigmentacion.',
      precio: 65000,
      stock: 12,
      categoriaId: 'cat-2',
      marcaId: 'mar-3',
      imagen: '/products/palette.png',
      destacado: true,
      activo: true,
    },
    {
      id: 'prod-5',
      nombre: 'Limpiador Facial',
      descripcion: 'Gel limpiador suave que remueve impurezas sin resecar.',
      precio: 28000,
      stock: 18,
      categoriaId: 'cat-1',
      marcaId: 'mar-2',
      imagen: '/products/cleanser.png',
      destacado: false,
      activo: true,
    },
  ]

  const services: MakeupService[] = [
    { id: 'srv-1', nombre: 'Maquillaje social', precio: 80000, duracionMin: 60, activo: true },
    { id: 'srv-2', nombre: 'Maquillaje de novia', precio: 180000, duracionMin: 120, activo: true },
    { id: 'srv-3', nombre: 'Maquillaje artistico', precio: 120000, duracionMin: 90, activo: true },
  ]

  const orders: Order[] = [
    {
      id: 'ped-1001',
      cliente: 'Ana Torres',
      fecha: hoy(),
      items: [
        { productoId: 'prod-1', nombre: 'Serum Vitamina C', precio: 45000, cantidad: 1 },
        { productoId: 'prod-2', nombre: 'Crema Hidratante', precio: 38000, cantidad: 2 },
      ],
      total: 121000,
      estado: 'Pendiente',
      entrega: 'Domicilio',
      direccion: 'Cra 12 #34-56, Bogota',
    },
  ]

  const appointments: Appointment[] = [
    {
      id: 'cit-2001',
      cliente: 'Laura Gomez',
      fecha: hoy(),
      hora: '10:00',
      servicios: ['Maquillaje social'],
      personas: 2,
      duracionMin: 120,
      valor: 160000,
      anticipo: 72000,
      direccion: 'Calle 5 #10-20, Bogota',
      estado: 'Pendiente',
    },
  ]

  const pqrs: Pqr[] = [
    {
      id: 'pqr-3001',
      cliente: 'Ana Torres',
      tipo: 'Peticion',
      asunto: 'Disponibilidad de producto',
      mensaje: 'Quisiera saber cuando estara disponible el labial mate nuevamente.',
      estado: 'Registrado',
      fecha: hoy(),
    },
  ]

  const notifications: AppNotification[] = [
    { id: 'not-1', mensaje: 'Tu pedido #ped-1001 fue registrado.', fecha: hoy(), leida: false },
    { id: 'not-2', mensaje: 'Tu cita #cit-2001 esta pendiente de aprobacion.', fecha: hoy(), leida: false },
  ]

  return {
    categories,
    brands,
    products,
    services,
    orders,
    appointments,
    pqrs,
    cart: [],
    notifications,
  }
}

export function formatCOP(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value)
}

export function uid(prefix = 'id'): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`
}
