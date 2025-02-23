import { OrderList } from "@/components/orders/OrderList";
import { OrdersAnalytics } from "@/components/orders/OrdersAnalytics";

export function Orders() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Inicio</h1>
      <div className="mt-4 space-y-6">
        <OrdersAnalytics />
        <OrderList />
      </div>
    </div>
  )
}