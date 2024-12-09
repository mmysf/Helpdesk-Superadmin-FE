/* eslint-disable react/jsx-boolean-value */
import React, { useState } from "react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

import { EllipsisVertical, Plus, Search } from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "../../ui/table";
import PaginationWithoutLinks from "../PaginationWithoutLinks";
import ConfirmDeleteModal from "../Modals/ModalDelete";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import ModalToggleDuration from "../Modals/ModalToggleDuration";
import ModalDuration from "../Modals/ModalDuration";

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
  const [openDelete, setOpenDelete] = useState(false);
  const [openToggle, setOpenToggle] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const itemsPerPage = 5;

  const filteredData = DURATIONS.filter((data) =>
    data.duration.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <Card>
      <CardContent className="p-0 shadow-lg">
        <div className="p-6 bg-white rounded-md">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-bold">Duration</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  placeholder="Search by Subject"
                  className="rounded-md bordered-input"
                  value={searchTerm}
                  startContent={<Search className="ml-2 text-gray-500" />}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                onClick={() => {
                  setIsNew(true);
                  setOpenAdd(true);
                }}
                className="bg-primary text-white flex items-center gap-2 px-4 py-2 rounded-md"
              >
                Create New Duration <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Created on</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Product Active</TableHead>
                  <TableHead>Product Non Active</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <EllipsisVertical className="w-5 h-5 mt-4 cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuGroup>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => {
                                setIsNew(false);
                                setOpenAdd(true);
                              }}
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => {
                                setOpenToggle(true);
                                setIsActive(product.status === "Active");
                              }}
                            >
                              {product.status === "Active" ? (
                                <span className="text-red-500">Deactivate</span>
                              ) : (
                                <span className="text-primary">Activate</span>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => {
                                setOpenDelete(true);
                              }}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
          <ConfirmDeleteModal
            isOpen={openDelete}
            setIsOpen={() => setOpenDelete(false)}
            title="Attention"
            subtitle="Are you sure you want to delete this duration?"
          />
          <ModalToggleDuration
            isOpen={openToggle}
            setIsOpen={() => setOpenToggle(false)}
            isActive={isActive}
            isDuration={true}
          />
          <ModalDuration
            isOpen={openAdd}
            setIsOpen={() => setOpenAdd(false)}
            isNew={isNew}
          />
        </div>
      </CardContent>
    </Card>
  );
}
