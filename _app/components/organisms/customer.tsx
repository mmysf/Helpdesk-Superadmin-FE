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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/ui/pagination";
import { Plus, Search, ChevronLeft, ChevronRight } from "lucide-react";

const CUSTOMERS = Array.from({ length: 50 }, (_, i) => ({
  name: `Customer Name`,
  email: `customer${i + 1}@example.com`,
  subscription: "Basic Plan",
  lastActivity: "Sept, 25 2024",
  timeRemaining: "10d 7h 3m",
}));

export default function CustomerTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  const filteredData = CUSTOMERS.filter((customer) =>
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="p-6 bg-white min-h-screen shadow-lg rounded-md">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Customer Information Table</h2>
            <p className="text-gray-600">
              Manage, Track, and Grow your Customer
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search by Name"
                className="rounded-md pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="bg-primary text-white flex items-center gap-2 px-4 py-2 rounded-md">
              Add New Customer <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <Card>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableColumn>Name</TableColumn>
                  <TableColumn>Subscription</TableColumn>
                  <TableColumn>Last Activity</TableColumn>
                  <TableColumn>Time Remaining</TableColumn>
                  <TableColumn>Action</TableColumn>
                </TableHeader>
                <TableBody>
                  {currentData.map((customer) => (
                    <TableRow key={customer.email}>
                      {" "}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span className="bg-green-100 text-green-600 p-2 rounded-full">
                            S
                          </span>
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-sm text-gray-600">
                              {customer.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{customer.subscription}</TableCell>
                      <TableCell>{customer.lastActivity}</TableCell>
                      <TableCell>{customer.timeRemaining}</TableCell>
                      <TableCell>
                        <Button className="text-gray-600 bg-transparent hover:bg-transparent focus:bg-transparent border-none shadow-none">
                          ...
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-between items-center mt-4">
          <Button
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            <ChevronLeft />
          </Button>
          <Pagination>
            <PaginationContent>
              {Array.from(
                { length: Math.ceil(filteredData.length / itemsPerPage) },
                (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={currentPage === i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}
            </PaginationContent>
          </Pagination>
          <Button
            size="sm"
            disabled={
              currentPage === Math.ceil(filteredData.length / itemsPerPage)
            }
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(
                  prev + 1,
                  Math.ceil(filteredData.length / itemsPerPage),
                ),
              )
            }
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
