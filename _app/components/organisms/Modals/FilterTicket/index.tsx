"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";

interface FilterTicketProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterTicket({ isOpen, onClose }: FilterTicketProps) {
  const [filters, setFilters] = useState({
    sortBy: "",
    ticketId: "",
    company: "",
  });

  const handleFilter = () => {
    onClose(); // Close modal
  };

  const handleReset = () => {
    setFilters({
      sortBy: "",
      ticketId: "",
      company: "",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-sm rounded-lg p-6">
        <DialogHeader className="text-center pb-4">
          <h2 className="text-lg font-semibold">Filter</h2>
        </DialogHeader>

        <form className="space-y-4">
          <div>
            <Select
              value={filters.sortBy}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, sortBy: value }))
              }
            >
              <SelectTrigger className="w-full bg-gray-200 border border-gray-300 rounded-md h-10 px-3 text-gray-700">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-created">Date Created</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Input
              placeholder="Search by Ticket ID"
              className="w-full bg-gray-200 h-10 px-3 border border-gray-300 rounded-md text-gray-700"
              value={filters.ticketId}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  ticketId: e.target.value,
                }))
              }
            />
          </div>

          <div>
            <Select
              value={filters.company}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, company: value }))
              }
            >
              <SelectTrigger className="w-full bg-gray-200 border border-gray-300 rounded-md h-10 px-3 text-gray-700">
                <SelectValue placeholder="Select Agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="agent-a">Agent A</SelectItem>
                <SelectItem value="agent-b">Agent B</SelectItem>
                <SelectItem value="agent-c">Agent C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="flex justify-between pt-6">
            <Button
              variant="outline"
              className="px-4 py-2 rounded-lg border-gray-400 text-gray-600"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-800"
              onClick={handleFilter}
            >
              Filter
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
