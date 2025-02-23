import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { DollarSign, ShoppingBag, Users, Utensils } from "lucide-react"

interface AnalyticsCardProps {
  title: string,
  value: string,
  description: string,
  icon: React.ReactNode
}

// Revisar si se puede aplicar para otras páginas
function AnalyticCard({ title, value, description, icon }: AnalyticsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-xl font-bold">{value}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </CardContent>
    </Card>
  )
}

const cards = [
  {
    title: "Ingresos Totales",
    value: "$12000",
    description: "12000 más que el mes pasado",
    icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Ordenes Totales",
    value: "2",
    description: "2 más que el mes pasado",
    icon: <ShoppingBag className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Clientes Activos",
    value: "1",
    description: "1 más que el mes pasado",
    icon: <Users className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Platos populares",
    value: "2",
    description: "Almuerzos más vendidos",
    icon: <Utensils className="h-4 w-4 text-muted-foreground" />,
  },
]

export function OrdersAnalytics() {
  return (
    <>
      <div>
        <h2 className="text-2xl font-bold">Datos</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <AnalyticCard key={index} {...card} />
        ))}
      </div>
    </>
  )
}

