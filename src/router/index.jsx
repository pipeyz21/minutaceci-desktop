import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Orders from "../components/orders";
import AddOrder from "../components/add_order";

export const router = createBrowserRouter([
   {
      path: "/",
      element: < App />,
      children: [
         {
            path: "orders",
            element: < Orders />
         },
         {
            path: "add-order",
            element: < AddOrder />
         }
      ]
   }
])