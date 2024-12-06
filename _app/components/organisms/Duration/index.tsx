import React, { useState } from "react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Plus, Search } from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "../../ui/table";
import PaginationWithoutLinks from "../PaginationWithoutLinks";

const DURATIONS = Array.from({ length: 90 }, (_, i) => ({
  no: i + 1,
  createdAt: "11/09/2024",
  duration: `${(i % 12) + 1} Month`,
  productActive: `${Math.floor(Math.random() * 10)} Product`,
  productNonActive: "4 Product",
  status: i % 2 === 0 ? "Active" : "Non-Active",
}));

export default function DurationTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  const filteredData = DURATIONS.filter((data) =>
    data.duration.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="p-6 bg-white min-h-screen shadow-lg rounded-md">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Duration</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search by Subject"
              className="rounded-md pr-2 bordered-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="bg-primary text-white flex items-center gap-2 px-4 py-2 rounded-md">
            Create New Duration <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableColumn>No</TableColumn>
                <TableColumn>Created on</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn>Duration</TableColumn>
                <TableColumn>Product Active</TableColumn>
                <TableColumn>Product Non Active</TableColumn>
                <TableColumn>Action</TableColumn>
              </TableHeader>
              <TableBody>
                {currentData.map((product) => (
                  <TableRow key={product.no}>
                    <TableCell>{product.no}</TableCell>
                    <TableCell>{product.createdAt}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-white ${
                          product.status === "Open"
                            ? "bg-blue-500"
                            : product.status === "In Progress"
                              ? "bg-orange-500"
                              : product.status === "Resolve"
                                ? "bg-green-500"
                                : "bg-gray-500"
                        }`}
                      >
                        {product.status}
                      </span>
                    </TableCell>
                    <TableCell>{product.duration}</TableCell>
                    <TableCell>{product.productActive}</TableCell>
                    <TableCell>{product.productNonActive}</TableCell>
                    <TableCell>
                      <Button variant="ghost" className="text-primary">
                        view
                      </Button>
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
  );
}
