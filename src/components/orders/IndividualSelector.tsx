import { MenuItem, OrderItem, useOrderStore } from '@/stores/useOrderStore'
import ProductSelector from './ProductSelector'

export function IndividualSelector() {
  const menuItems = useOrderStore((state) => state.menuItems)
  const addItemToOrder = useOrderStore((state) => state.addItemToOrder)
  const individualItems = menuItems.filter((item) => item.category === "individual")

  const handleAddItem = (item: MenuItem) => {
    const newItem: OrderItem = {
      id: item.id,
      type: "individual",
      name: item.name,
      price: item.price,
      // quantity: quantity,
      quantity: 1
    }
    addItemToOrder(newItem)
  }

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {individualItems.map((item) => (
        <ProductSelector 
          item={item} 
          isIndividual={true} 
          key={item.id} 
          onSelect={() => handleAddItem(item)} 
        />
      ))}
    </div>
  )
}
