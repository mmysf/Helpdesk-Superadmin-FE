import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@/ui/table";
import { Card, CardContent } from "@/ui/card";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Filter, Search } from "lucide-react";
import PaginationWithoutLinks from "../PaginationWithoutLinks";

const ORDERS = Array.from({ length: 90 }, (_, i) => ({
  orderId: `OrderID${i + 1}`,
  customer: `customer${i + 1}@email.com`,
  product: i % 2 === 0 ? "Basic Plan" : "Pro Plan",
  date: `11/${i + 1}/2024`,
  amountPaid: `$${99 + i}`,
  status: i % 3 === 0 ? "Paid" : i % 3 === 1 ? "Pending" : "Unpaid",
}));

export default function OrdersTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  const filteredData = ORDERS.filter((order) =>
    order.orderId.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const renderStatus = (status: "Paid" | "Pending" | "Unpaid") => {
    const statusColors = {
      Paid: "bg-primary text-white",
      Pending: "bg-gray-500 text-white",
      Unpaid: "bg-red-500 text-white",
    };

    return (
      <span
        className={`px-2 py-1 text-xs rounded ${statusColors[status as keyof typeof statusColors] ?? ""}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="p-6 bg-white min-h-screen shadow-lg rounded-sm">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">
            History of All Orders from Customer
          </h2>
          <div className="flex items-center gap-2">
            <Button className="bg-slate-500 text-white">
              <Filter /> Filter
            </Button>
            <div className="relative">
              <Search className="absolute left-2 top-2 text-gray-500" />
              <Input
                placeholder="Search by OrderID"
                className="rounded-md pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />{" "}
            </div>
          </div>
        </div>
        <Card>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableColumn>Order ID</TableColumn>
                  <TableColumn>Customer</TableColumn>
                  <TableColumn>Product</TableColumn>
                  <TableColumn>Date</TableColumn>
                  <TableColumn>Amount Paid</TableColumn>
                  <TableColumn>Status</TableColumn>
                </TableHeader>
                <TableBody>
                  {currentData.map((order) => (
                    <TableRow key={order.orderId}>
                      {" "}
                      <TableCell>{order.orderId}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.product}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.amountPaid}</TableCell>
                      <TableCell>
                        {renderStatus(
                          order.status as "Paid" | "Pending" | "Unpaid",
                        )}
                      </TableCell>{" "}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-center items-center mt-2">
          <PaginationWithoutLinks
            totalData={filteredData.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPage={10}
            setCurrentLimit={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
