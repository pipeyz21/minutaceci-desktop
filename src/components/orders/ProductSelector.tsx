import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import type { MenuItem } from "@/stores/useOrderStore"
import { useState } from "react"

interface ProductSelectorProps {
  item: MenuItem,
  isIndividual: boolean,
  onSelect: (item: MenuItem, quantity: number) => void,
  isSelected?: boolean
}

export default function ProductSelector({ item, isIndividual, onSelect, isSelected = false }: ProductSelectorProps) {
  const [quantity, setQuantity] = useState(0)

  const handleIncrement = () => setQuantity((prev) => prev + 1)
  const handleDecrement = () => setQuantity((prev) => Math.max(0, prev - 1))

  const handleSelect = () => {
    if (quantity === 0) return alert("No se pueden agregar valores nulos")

    onSelect(item, quantity)
    if (isIndividual) {
      setQuantity(0)
    }
  }

  return (
    <div>
      <Card key={item.id} className={`${isSelected ? "border-primary border-cyan-700" : ""}`}>
        <CardHeader>
          <CardTitle>{item.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-xl font-bol'>${item.price}</p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline" onClick={handleDecrement}>-</Button>
              <span>{quantity}</span>
              <Button size="sm" variant="outline" onClick={handleIncrement}>+</Button>
            </div>
          </div>
          <Button onClick={handleSelect} className="mt-2">
            {isIndividual ? "Agregar" : isSelected ? "Actualizar" : "Seleccionar"} 
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
