import React, { useState } from 'react'
import "../../styles/Orders.css"
import KanbanView from './KanbanView'
import TableView from './TableView'
import AddOrder from '../add_order'

function Orders() {
  const [kanban, setKanban] = useState(false)
  const [table, setTable] = useState(true)
  const [popUp, setPopUp] = useState(false)
  
  const handleClickKanban = () => {
    setTable(false)
    setKanban(true)
  }

  const handleClickTable = () => {
    setTable(true)
    setKanban(false)
  }

  const handleClickAddOrder = () => {
    setPopUp(true)
  }

  return (
    <>
      <h1>Pedidos</h1>
      {popUp && <AddOrder />}
      <div className='order-header'>
        <div className='header-searcher'>
          <input type="text" placeholder='Buscar pedido o cliente'/>
          <button>Q</button>
        </div>
        <p>Filtro fecha</p>
        <p>Filtro estado</p>
        <div className='header-buttons-container' >
          <button className='header-buttons' id='table' onClick={handleClickTable}>
            Tabla
          </button>
          <button className='header-buttons' id='kanban' onClick={handleClickKanban}>
            Kanban
          </button>
        </div>
      </div>

      <div className='order-container'>
        {table && <TableView />}
        
        {kanban && <KanbanView />}

      </div>
      
      <div>
        <button className='add-order' onClick={handleClickAddOrder}>
          +
        </button>
      </div>
    </>
  )
}

export default Orders

