import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/ui/table";
import { Card, CardContent } from "@/ui/card";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Filter, Search } from "lucide-react";
import PaginationWithoutLinks from "../PaginationWithoutLinks";
import FilterOrder from "../Modals/FilterOrder";

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
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
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
    <Card>
      <CardContent className="p-0 shadow-lg">
        <div className="p-6 bg-white rounded-md">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">
                History of All Orders from Customer
              </h2>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setIsFilterModalOpen(true)}
                  className="bg-slate-500 text-white"
                >
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
            <div className="overflow-x-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount Paid</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
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
          <FilterOrder isOpen={isFilterModalOpen} onClose={() => {}} />
        </div>
      </CardContent>
    </Card>
  );
}
