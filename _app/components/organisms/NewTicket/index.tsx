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
import { Search, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import PaginationWithoutLinks from "../PaginationWithoutLinks";
import FilterDashboard from "../Modals/FilterDashboard";

const TICKETS = Array.from({ length: 50 }, (_, i) => ({
  ticketId: `ID-123456${i}`,
  customer: `Bakat`,
  company: "Yec",
  subject: "Update New Feature",
  createdOn: "07/09/2024",
  status: ["Open", "In Progress", "Resolve", "Closed"][i % 4],
  priority: "Critical",
  agent: i % 3 === 0 ? "Agent123, Agent2" : "Agent123",
}));

export default function NewTicket() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const itemsPerPage = 10;

  const filteredData = TICKETS.filter((ticket) =>
    ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <Card>
      <CardContent className="p-0 shadow-lg ">
        <div className="p-6 bg-white rounded-md">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-bold">All Tickets from Customer</h2>
              <p className="text-gray-600">Manage and Track All Tickets</p>
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
              <Button
                onClick={() => setIsFilterModalOpen(true)}
                className="bg-slate-500 text-white flex items-center gap-2 px-4 py-2 rounded-md"
              >
                <Filter className="w-4 h-4" /> Filter
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Created on</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Agent</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.map((ticket) => (
                  <TableRow key={ticket.ticketId}>
                    <TableCell>{ticket.ticketId}</TableCell>
                    <TableCell>{ticket.customer}</TableCell>
                    <TableCell>{ticket.company}</TableCell>
                    <TableCell>{ticket.subject}</TableCell>
                    <TableCell>{ticket.createdOn}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-white ${
                          ticket.status === "Open"
                            ? "bg-blue-500"
                            : ticket.status === "In Progress"
                              ? "bg-orange-500"
                              : ticket.status === "Resolve"
                                ? "bg-green-500"
                                : "bg-gray-500"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </TableCell>
                    <TableCell>{ticket.priority}</TableCell>
                    <TableCell>{ticket.agent}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          router.push(`/bo/ticket/${ticket.ticketId}`);
                        }}
                        variant="ghost"
                        className="text-primary"
                      >
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
          <FilterDashboard
            isOpen={isFilterModalOpen}
            onClose={() => setIsFilterModalOpen(false)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
