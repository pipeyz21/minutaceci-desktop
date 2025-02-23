import { Link, useLocation } from "react-router-dom"
import { 
  ClipboardList, 
  // Home, 
  // ShoppingCart, 
  // BarChart,  
  // Users, 
  // Truck,
} from "lucide-react"

const navItems = [
  { title: "Pedidos", icon: ClipboardList, href: "/"},
  // { title: "Analítica", icon: BarChart, href: "/analytics"},
  // { title: "Pedidos", icon: BarChart, href: "/orders"},
  // { title: "Compras", icon: ShoppingCart, href: "/purchases"},
  // { title: "Clientes", icon: Users, href: "/customers"},
  // { title: "Proveedores", icon: Truck, href: "/suppliers"},
  // { title: "Menú", icon: Truck, href: "/menu"},
  // más items de navegación
]

export function Sidebar() {
  const location = useLocation()

  return (
    <aside className="w-64 bg-background border-r">
      <div className="p-6">
        <h2 className="text-xl font-bold">Minuta Ceci App</h2>
      </div>
      <nav className="space-y-2 mx-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`flex items-center gap-3 px-3 py-2 ${location.pathname === item.href ? "bg-secondary rounded-xl" : ""}`}
          >
            <item.icon className="h-5 w-5" />
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  )
}