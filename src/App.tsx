import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Layout } from "./components/Layout";
import { Analytics } from "./pages/Analytics";
import { Orders } from "./pages/Orders";
import './App.css'
import { NewOrder } from "./pages/NewOrder";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Orders />} />
          <Route path="/new" element={<NewOrder />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
