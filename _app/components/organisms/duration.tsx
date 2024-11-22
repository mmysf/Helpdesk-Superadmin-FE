import React, { useState } from "react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";

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
    <div className="p-6 bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Duration</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10"
              placeholder="Search by Duration"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2">
            Create New Duration <Plus />
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">No</th>
              <th className="border p-2 text-left">Created At</th>
              <th className="border p-2 text-left">Duration</th>
              <th className="border p-2 text-left">Product Active</th>
              <th className="border p-2 text-left">Product Non Active</th>
              <th className="border p-2 text-left">Status</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.no} className="text-sm">
                <td className="border p-2">{item.no}</td>
                <td className="border p-2">{item.createdAt}</td>
                <td className="border p-2">{item.duration}</td>
                <td className="border p-2">{item.productActive}</td>
                <td className="border p-2">{item.productNonActive}</td>
                <td
                  className={`border p-2 ${
                    item.status === "Active"
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {item.status}
                </td>
                <td className="border p-2 text-center">...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button
          size="sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          <ChevronLeft />
        </Button>
        <div className="flex gap-1">
          {Array.from(
            { length: Math.ceil(filteredData.length / itemsPerPage) },
            (_, i) => (
              <Button
                key={i}
                className={`px-3 py-1 rounded-md ${
                  currentPage === i + 1
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ),
          )}
        </div>
        <Button
          size="sm"
          disabled={
            currentPage === Math.ceil(filteredData.length / itemsPerPage)
          }
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(filteredData.length / itemsPerPage)),
            )
          }
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
