import { useOrderStore } from "@/stores/useOrderStore"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"

export default function OrderSummary() {
  const currentOrder = useOrderStore((state) => state.currentOrder)
  const removeItemFromOrder = useOrderStore((state) => state.removeItemFromOrder)
  const updateItemQuantity = useOrderStore((state) => state.updateItemQuantity)
  const finalizeOrder = useOrderStore((state) => state.finalizeOrder)

  if (!currentOrder) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Resumen del Pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No hay items en el pedido actual.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumen del Pedido</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {currentOrder.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{item.type === "almuerzo" ? "Almuerzo" : item.name}</p>
                <p className="text-sm text-gray-500">
                  {item.type === "almuerzo" && 
                    item.name
                      .split("-")
                      .filter((p) => p !== "null")
                      .join(", ")}
                </p>
                <p className="text-sm items-center space-x-2">${item.price} x {item.quantity}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                >
                  -
                </Button>
                <span>{item.quantity}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                >
                  +
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-red-700"
                  onClick={() => removeItemFromOrder(item.id)}
                >
                  x
                </Button>
              </div>
            </div>
          ))}
          <div className="mt-4 text-right">
            <p className="text-lg font-bold">Total: ${currentOrder.total}</p>
          </div>
          <Button onClick={finalizeOrder} className="w-full mt-4">
            Finalizar Pedido
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
