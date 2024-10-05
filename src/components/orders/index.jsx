import React, { useState } from 'react'
import "../../styles/Orders.css"

function Orders() {
  const [kanban, useKanban] = useState()
  const [table, useTable] = useState()
  
  const onClickKanban = () => {
    


  }
  return (
    <>
      <h1>Pedidos</h1>
      <div className='order-header'>
        <div className='header-searcher'>
          <input type="text" placeholder='Buscar pedido o cliente'/>
          <button>Q</button>
        </div>
        <p>Filtro fecha</p>
        <p>Filtro estado</p>
        <div className='header-buttons-container'>
          <button className='header-buttons' id='table'>
            Tabla
          </button>
          <button className='header-buttons' id='kanban'>
            Kanban
          </button>
        </div>
      </div>

      <div className='order-container'>
        <TableView />
        <KanbanView />
      </div>
      
      <div>
        <button className='add-order'>
          +
        </button>
      </div>
    </>
  )
}

export default Orders

function TableView() {
    return (
      <>
        <table className='order-table'>
          <thead>
            <tr>
              <th scope='col'>Pedido</th>
              <th scope='col'>Fecha</th>
              <th scope='col'>Cliente</th>
              <th scope='col'>Estado</th>
              <th scope='col'>Pago</th>
              <th scope='col'>Total</th>
              <th scope='col'>Acciones</th>
            </tr>
          </thead>
          {/* <tbody>
            1{}
          </tbody> */}
        </table>

        <div></div>
      </>
    )
}

function KanbanView() {
  return(
    <>
      <div>Kanban</div>
    </>
  )
}