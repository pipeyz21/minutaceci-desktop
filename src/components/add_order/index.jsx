import { useState } from "react"
import AddOrderTable from "./AddOrderTable"
import Form from "./Form"
import { invoke } from "@tauri-apps/api"

async function CreateSale(dataSale) {
  try {
    const saleResponse = await invoke("create_sale_command", {
      date: dataSale.date,
      clientId: parseInt(dataSale.client),
      status: dataSale.status,
      payment: dataSale.payment,
    })
    console.log("Venta creada:", saleResponse)

    
  } catch (error) {
    console.error("Error al crear la venta", error)
  }
}

async function CreateOrder(e) {
  try {
    const orderResponse = invoke('create_order_command', {
      saleId: 4,
      product: parseInt(e.product),
      garnish: parseInt(e.garnish),
      extra: parseInt(e.extra),
      price: parseInt(e.price),
      qty: parseInt(e.qty),
    })
    console.log(orderResponse)
  } catch (e) {
    console.error("Error al guardar las órdenes", e)
  }
}

function AddOrder() {

  const [dataSale, setDataSale] = useState([
    // {
    //   id: 1, // Debe ser el último + 1
    //   date: '',
    //   client: '',
    //   status: '',
    //   payment: ''
    // }
  ])
  const [dataOrder, setDataOrder] = useState([
    {
      id: 1,
      product: "", 
      garnish: "", 
      extra: "", 
      price: 0, 
      qty: 0, 
      total: 0,
    }
  ])

  const handleAnotherOrderClick = () => {
    // Crear una nueva fila con el ID actualizado
    const newRow = {
      id: dataOrder[dataOrder.length - 1].id + 1,
      product: "", 
      garnish: "", 
      extra: "", 
      price: 0, 
      qty: 0, 
      total: 0,
    }
  
    // Crear un nuevo array con la fila añadida
    const newData = [...dataOrder, newRow]; 

    // Actualizar el estado con la nueva lista
    setDataOrder(newData);
  }

  const handleSendOrders = () => {
    // Primero crear la venta
    CreateSale(dataSale)
    


    // console.log(dataSale.date, dataSale.client, dataSale.status, dataSale.payment)

    dataOrder.forEach((e) => {
      if ((e.product === e.garnish) || (e.product === e.extra)) {
        console.log("Los productos no pueden ser los mismos.")
        return
      }
      if ((e.product === "") || (e.price === 0) || (e.qty === 0)) {
        console.log("Ningún campo debe quedar vacío.")
        return
      }     
      // Método para enviar datos a Tauri
      CreateOrder(e)
      // Si el método no funciona -> alerta error en los productos ingresados
      // Si el método si funciona -> alerta que se desvanece, redirigir a ordenes y actualizar ordenes
    });
  }

  return (
    <>
      
      < Form data={dataSale} setData={setDataSale} />
      < AddOrderTable data={dataOrder} setData={setDataOrder} />

      <button onClick={handleAnotherOrderClick}>+</button>
      <button onClick={handleSendOrders}>Enviar</button>
    </>
  )
}

export default AddOrder


