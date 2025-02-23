import { Table, TableBody, TableHead, TableCell, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
// import { useState } from "react";

const orders = [
  {
    id: 1,
    date: "2025-02-12",
    customerName: "Felipe",
    customerPhone: "+569 6878 4612",
    delivered: "Sí",
    total: 6500,
    paymentMethod: "Efectivo",
    paymentStatus: "Pagado",
  },
  {
    id: 2,
    date: "2025-02-13",
    customerName: "Felipe",
    customerPhone: "+569 6878 4612",
    delivered: "Sí",
    total: 5500,
    paymentMethod: "Crédito",
    paymentStatus: "Pagado",
  },
]

export function OrderList() {
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Pedidos</h2>
        <Link to='/new'>
          <Button>Nuevo Pedido</Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID Pedido</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Telefono</TableHead>
            <TableHead>Entregado</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Medio de Pago</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{order.customerPhone}</TableCell>
              <TableCell>{order.delivered}</TableCell>
              <TableCell>${order.total}</TableCell>
              <TableCell>{order.paymentMethod}</TableCell>
              <TableCell>{order.paymentStatus}</TableCell>
              <TableCell className="space-x-2">
                <Button variant="outline" size="sm">Ver</Button>
                <Button variant="outline" size="sm" className="bg-red-600 text-white hover:bg-gray-800 hover:text-white"
                >
                  Borrar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}