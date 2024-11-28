import {useState} from "react"
import ComboBox from "./ComboBox"

function AddOrderTable({data, setData}) {
  
    const items = ["Item1", "Item2", "Item3", "Item4", "Item5"]
  
    const [suggestions, setSuggestions] = useState([])
    const [activeRow, setActiveRow] = useState(null)
    const [activeColumn, setActiveColumn] = useState(null)
  
    const handleDataUpdate = (e, rowIndex, column) => {
      const newData = [...data]
      newData[rowIndex][column] = e.target.value
      setData(newData)
    }
  
    const handleRemoveOrder = (id) => {
      if (data.length === 1) {
        console.log("No se puede borrar")
      } else {
        const newData = data.filter(row => row.id != id)
        setData(newData)
      }
    }
  
    return (
      <table>
        <thead>
          <tr>
            <th>Principal</th>
            <th>Acompañamiento</th>
            <th>Extra</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
            {data.map((row, rowIndex) => (
              <tr key={row.id}>
                <td>
                  {/* <ComboBox column="" items={items} data={data} setData={setData} rowIndex={rowIndex}/> */}
                  <ComboBox
                    items={items} // Las opciones para el ComboBox
                    rowIndex={rowIndex} // El índice de la fila
                    column="product" // La columna que está siendo editada
                    onUpdate={handleDataUpdate} // La función que maneja la selección
                  />
                </td>
                <td>
                  <ComboBox
                    items={items} // Las opciones para el ComboBox
                    rowIndex={rowIndex} // El índice de la fila
                    column="garnish" // La columna que está siendo editada
                    onUpdate={handleDataUpdate} // La función que maneja la selección
                  />
                </td>
                <td>
                  <ComboBox
                    items={items} // Las opciones para el ComboBox
                    rowIndex={rowIndex} // El índice de la fila
                    column="extra" // La columna que está siendo editada
                    onUpdate={handleDataUpdate} // La función que maneja la selección
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={row.price}
                    onChange={(e) => handleDataUpdate(e, rowIndex, "price")}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={row.qty}
                    onChange={(e) => handleDataUpdate(e, rowIndex, "qty")}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={row.qty * row.price}
                    onChange={(e) => handleDataUpdate(e, rowIndex, "total")}
                  />
                </td>
                <td>
                  <button onClick={() => handleRemoveOrder(row.id)}>x</button>
                </td>
              </tr>
            ))}
          </tbody>
  
      </table>
    )
  }
  
  
export default AddOrderTable  