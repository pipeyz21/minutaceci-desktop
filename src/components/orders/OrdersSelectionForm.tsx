import { useOrderStore } from "@/stores/useOrderStore"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { IndividualSelector } from "./IndividualSelector"
import ComboSelector from "./ComboSelector"
import OrderSummary from "./OrderSummary"


export function OrdersSelectionForm() {
  const menuItems = useOrderStore((state) => state.menuItems)
  // const addItemToOrder = useOrderStore((state) => state.addItemToOrder)

  const individualItems = menuItems.filter((item) => item.category === "individual")
  // const mains = menuItems.filter((item) => item.category === "main")
  // const sides = menuItems.filter((item) => item.category === "side")
  // const extras = menuItems.filter((item) => item.category === "extra")
  console.log(individualItems)

  return (
    <div className="container mt-4">
      <h2 className="text-xl font-bold mb-4">Selección de Productos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Tabs defaultValue="combo">
            <TabsList>
              <TabsTrigger value="combo">Combos</TabsTrigger>
              <TabsTrigger value="individual">Individuales</TabsTrigger>
            </TabsList>
            <TabsContent value="combo">
              <ComboSelector />
            </TabsContent>
            <TabsContent value="individual">
              <IndividualSelector />
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}
