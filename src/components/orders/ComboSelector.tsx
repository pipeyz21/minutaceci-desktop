import { MenuItem, useOrderStore, OrderItem } from '@/stores/useOrderStore'
import { useState } from 'react'
import { Label } from '../ui/label'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import ProductSelector from './ProductSelector'
import { Button } from '../ui/button'

export default function ComboSelector() {
  const menuItems = useOrderStore((state) => state.menuItems)
  const addItemToOrder = useOrderStore((state) => state.addItemToOrder)

  const [selectedMain, setSelectedMain] = useState<MenuItem | null>(null)
  const [selectedSide, setSelectedSide] = useState<MenuItem | null>(null)
  const [selectedExtra, setSelectedExtra] = useState<MenuItem | null>(null)

  const mains = menuItems.filter((item) => item.category === "main")
  const sides = menuItems.filter((item) => item.category === "side")
  const extras = menuItems.filter((item) => item.category === "extra")
  
  const handleSelectMain = (item: MenuItem) => {
    setSelectedMain(item)
  }

  const handleSelectSide = (item: MenuItem) => {
    setSelectedSide(item)
  }

  const handleSelectExtra = (item: MenuItem) => {
    setSelectedExtra(item)
  }

  const handleAddCombo = () => {
    if (!selectedMain) return

    const products = [selectedMain.name, selectedSide?.name || "null", selectedExtra?.name || "null"].join("-")
    const price = [selectedMain, selectedSide, selectedExtra]
      .filter(Boolean)  
      .reduce((sum, item) => sum + item.price, 0)

    const newItem: OrderItem = {
      id: Date.now().toString(),
      type: "almuerzo",
      name: products,
      quantity: 1,
      price: price      
    }

    addItemToOrder(newItem)

    // Resetear selecciones
    setSelectedMain(null)
    setSelectedSide(null)
    setSelectedExtra(null)
  }

  return (
    <div className='space-y-4'>
      <div>
        <Label>Plato Principal</Label>
        <ScrollArea>
          <div className='flex w-max space-x-4 p-4'>
            {mains.map((item) => (
              <ProductSelector 
              key={item.id} 
              item={item} 
              isIndividual={false} 
              onSelect={() => handleSelectMain(item)} 
              isSelected={selectedMain?.id === item.id}
              />
            ))}
          </div>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </div>
      
      {/* Mejorar condicional */}
      {selectedMain && selectedMain.name !== "Pastel de choclo" && selectedMain.name !== "Lasaña" && (
        <div>
          <Label>Acompañamiento</Label>
          <ScrollArea>
            <div className='flex w-max space-x-4 p-4'>
              {sides.map((item) => (
                <ProductSelector
                  key={item.id}
                  item={item}
                  isIndividual={false}
                  onSelect={() => handleSelectSide(item)}
                  isSelected={selectedSide?.id == item.id}
                />
              ))}
            </div>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </div>
      )}

      <div>
      <Label>Extra</Label>
        <ScrollArea>
          <div className='flex w-max space-x-4 p-4'>
            {extras.map((item) => (
              <ProductSelector 
              key={item.id} 
              item={item} 
              isIndividual={false} 
              onSelect={() => handleSelectExtra(item)} 
              isSelected={selectedExtra?.id === item.id}
              />
            ))}
          </div>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </div>
      
      <Button onClick={handleAddCombo} disabled={!selectedMain}>
        Agregar almuerzo al pedido
      </Button>
    </div>
  )
}
