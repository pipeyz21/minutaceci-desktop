import { useState } from "react"
// import { useOrderStore, type Customer } from "@/stores/useOrderStore"
import { Input } from "@/components/ui/input"
import { Label } from "../ui/label"
import { Checkbox } from "../ui/checkbox"

export function OrderCustomerForm() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [isNew, setIsNew] = useState(false)
  // const setCustomer = useOrderStore((state) => state.setCustomer)

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   const customer: Customer = { name, phone, isNew }
  //   setCustomer(customer)
  //   // si el cliente no es nuevo -> confirmar que existe en la bd
  // }

  return (
    <div className="container w-max">
      <h2 className="text-xl font-bold mb-4">Datos del Cliente</h2>
      <form  className="space-y-4">
        <div>
          <Label htmlFor="name">Nombre del Cliente</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="phone">Telefono</Label>
          <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="isNew" checked={isNew} onCheckedChange={(checked) => setIsNew(checked as boolean)} />
          <Label htmlFor="isNew">Cliente nuevo (guardar datos para futuros pedidos)</Label>
        </div>
      </form>
    </div>
  )
}

