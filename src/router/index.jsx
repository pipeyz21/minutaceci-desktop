import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Orders from "../components/orders";

export const router = createBrowserRouter([
   {
      path: "/",
      element: < App />,
      children: [
         {
            path: "orders",
            element: < Orders />
         }

      ]
   }
])