import "./styles/App.css";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

function App() {

  return (
    <div className="container">    
      <div className="container-items item1">
        <Sidebar />
      </div>

      <div className="container-items item2">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
