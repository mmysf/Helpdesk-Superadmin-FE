import React, { useState } from "react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Plus, Search } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "../../ui/table";
import PaginationWithoutLinks from "../PaginationWithoutLinks";
import {
  SelectItem,
  SelectTrigger,
  SelectContent,
  Select,
} from "../../ui/select";

const DURATIONS = Array.from({ length: 90 }, (_, i) => ({
  no: i + 1,
  productName: "Basic Plan",
  duration: `70 hours`,
  price: `55$`,
  benefit: "Up to 7 tickets per month",
  status: i % 2 === 0 ? "Active" : "Non-Active",
}));

export default function Subscription() {
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
    <div className="p-6 bg-white shadow-lg rounded-md">
      <div className="flex justify-evenly items-center mb-4">
        <div className="flex items-center gap-4 w-full">
          <h2 className="text-xl font-bold">Duration Category</h2>
          <div className="max-w-lg ">
            <Select>
              <SelectTrigger className="bg-primary text-white">
                <p>3 Month</p>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 Month</SelectItem>
                <SelectItem value="6">6 Month</SelectItem>
                <SelectItem value="12">12 Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search by Subject"
              className="rounded-md pl-10 bordered-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="bg-primary text-white flex items-center gap-2 px-4 py-2 rounded-md">
            Create New Product <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Benefit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((product) => (
              <TableRow key={product.no}>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.duration}</TableCell>
                <TableCell>{product.benefit}</TableCell>
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
