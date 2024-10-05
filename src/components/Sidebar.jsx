import { Link } from "react-router-dom";
import '../styles/Sidebar.css'

function Sidebar() {
    
    return (
      <aside className="sidebar-container">
          <div className="title">
              <img src="src\assets\restaurant.svg" alt="logo" />
              <h2>Minuta Ceci</h2>
          </div>
          <ul className="list-container">
              <li>
                <Link to="orders">Pedidos</Link>
              </li>
              {/* <li>
                <Link to="purchases">Compras</Link>
              </li>
              <li>Inventario</li>
              <li>Productos</li>
              <li>Clientes</li>
              <li>Analítica</li> */}
          </ul>
      </aside>
    )
  }
  
  export default Sidebar;