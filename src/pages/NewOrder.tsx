import { useOrderStore } from "@/stores/useOrderStore"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { useState } from "react"
import {OrderCustomerForm} from "@/components/orders/OrderCustomerForm"
import { OrdersSelectionForm } from "@/components/orders/OrdersSelectionForm"
import { useEffect } from "react"

export function NewOrder() {
  const {currentOrder, initializeOrder} = useOrderStore()
  
  useEffect(() => {
    if (!currentOrder) {initializeOrder()}
  }, [currentOrder, initializeOrder])
  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Nuevo Pedido</h1>
      {/* <OrderCustomerForm /> */}
      <OrdersSelectionForm />
    </div>

  )
}
