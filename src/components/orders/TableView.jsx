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
            {}
          </tbody> */}
        </table>

        <div></div>
      </>
    )
}

export default TableView