import { create } from 'zustand'

export type ProductType = "almuerzo" | "individual"

export interface Customer {
  id?: string
  name: string
  phone: string
  isNew: boolean
}

export interface MenuItem {
  id: string
  name: string
  price: number
  category: "main" | "side" | "extra" | "individual"
}

export interface OrderItem {
  id: string
  type: ProductType
  quantity: number
  name: string
  price: number
}

export interface Order {
  id: string
  customer: string
  items: OrderItem[]
  total: number
  createdAt: Date
}

interface OrderState {
  currentOrder: Order | null
  menuItems: MenuItem[]
  orders: Order[]
  initializeOrder: () => void
  setCurrenOrder: (order: Order | null) => void
  addItemToOrder: (item: OrderItem) => void
  removeItemFromOrder: (itemId: string) => void
  updateItemQuantity: (itemId: string, quantity: number) => void
  // setCustomer: (customer: Customer) => void
  clearOrder: () => void
  finalizeOrder: () => void
  addOrder: (order: Order) => void
}

export const useOrderStore = create<OrderState>((set) => ({
  // Creamos las interfaces en su estado básico
  currentOrder: null,
  orders: [],
  menuItems: [
    { id: "1", name: "Pollo a la plancha", price: 8.99, category: "main" },
    { id: "2", name: "Carne mechada", price: 9.99, category: "main" },
    { id: "3", name: "Lasaña", price: 10.99, category: "main" },
    { id: "4", name: "Pastel de choclo", price: 9.99, category: "main" },
    { id: "5", name: "Fideos blancos", price: 2.99, category: "side" },
    { id: "6", name: "Arroz", price: 2.99, category: "side" },
    { id: "7", name: "Puré", price: 3.99, category: "side" },
    { id: "8", name: "Ensalada", price: 1.99, category: "extra" },
    { id: "9", name: "Consomé", price: 1.99, category: "extra" },
    { id: "10", name: "Empanada", price: 2.99, category: "individual" },
    { id: "11", name: "Humita", price: 3.99, category: "individual" },
  ],
  // Función para iniciar la orden
  initializeOrder: () => set({
    currentOrder: {
      id: Date.now().toString(),
      customer: "",
      items: [],
      total: 0,
      createdAt: new Date()
    }
  }),
  // Función para seleccionar la orden actual
  setCurrenOrder: (order) => set({ currentOrder: order }),
  // Función para añadir ítem a la orden
  addItemToOrder: (item) => 
    set((state) => ({
      currentOrder: state.currentOrder
        ? {
          ...state.currentOrder,
          items: [...state.currentOrder.items, item],
          total: state.currentOrder.total + item.price * item.quantity,
        }
      : null,
    })),
  removeItemFromOrder: (itemId) => 
    set((state) => {
      // Revisamos si hay alguna orden seleccionada
      if (!state.currentOrder) return { currentOrder: null }
      // Revisamos si existe algun item seleccionado
      const item = state.currentOrder.items.find((i) => i.id === itemId)
      if (!item) return { currentOrder: state.currentOrder }
      return {
        currentOrder: {
          ...state.currentOrder,
          items: state.currentOrder.items.filter((i) => i.id !== itemId),
          total: state.currentOrder.total - item.price * item.quantity,
        },
      }
    }),
  updateItemQuantity: (itemId, quantity) => 
    set((state) => {
      if (!state.currentOrder) return { currentOrder: null }
      const updateItems = state.currentOrder.items.map((item) => (item.id === itemId ? {...item, quantity} : item))
      return {
        currentOrder: {
          ...state.currentOrder,
          items: updateItems,
          total: updateItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        },
      }
    }),
  clearOrder: () => set({ currentOrder: null }),
  addOrder: (order) => 
    set((state) => ({
      orders: [...state.orders, order],
      currentOrder: null,
    })),
  finalizeOrder: () => {
    set({ currentOrder: null })
    // Lógica de agregar pedido -> conexión backend
    // console.log(currentOrder)
  }
}))