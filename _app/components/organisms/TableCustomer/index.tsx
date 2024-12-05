import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/ui/card";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Plus, Search } from "lucide-react";
import PaginationWithoutLinks from "../PaginationWithoutLinks";

const CUSTOMERS = Array.from({ length: 50 }, (_, i) => ({
  name: `Customer ${i + 1}`,
  email: `customer${i + 1}@example.com`,
  company: i % 2 === 0 ? "Company A" : "Company B",
  subscription: "Basic Plan",
  lastActivity: "Sept, 25 2024",
  timeRemaining: "10d 7h 3m",
}));

export default function CustomerTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  const filteredData = CUSTOMERS.filter(
    (customer) =>
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase()),
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
                  <TableColumn>Company</TableColumn>
                  <TableColumn>Subscription</TableColumn>
                  <TableColumn>Last Activity</TableColumn>
                  <TableColumn>Time Remaining</TableColumn>
                  <TableColumn>Action</TableColumn>
                </TableHeader>
                <TableBody>
                  {currentData.map((customer) => (
                    <TableRow key={customer.email}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span className="bg-green-100 text-primary p-2 rounded-full">
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
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span className="bg-blue-100 text-blue-600 p-2 rounded-full">
                            {customer.company[0]}
                          </span>
                          <p className="font-medium">{customer.company}</p>
                        </div>
                      </TableCell>
                      <TableCell>{customer.subscription}</TableCell>
                      <TableCell>{customer.lastActivity}</TableCell>
                      <TableCell>{customer.timeRemaining}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-6 w-6 p-0">
                              ...
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" sideOffset={4}>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
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
