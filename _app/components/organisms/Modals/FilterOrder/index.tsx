"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";

interface FilterOrderProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterOrder({ isOpen, onClose }: FilterOrderProps) {
  const [filters, setFilters] = useState({
    sortBy: "",
    plan: "",
    status: "",
  });

  const handleFilter = () => {
    onClose(); // Close modal
  };

  const handleReset = () => {
    setFilters({
      sortBy: "",
      plan: "",
      status: "",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="rounded-lg p-6">
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
                <SelectItem value="date-created">Last Modified</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select
              value={filters.plan}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, plan: value }))
              }
            >
              <SelectTrigger className="w-full bg-gray-200 border border-gray-300 rounded-md h-10 px-3 text-gray-700">
                <SelectValue placeholder="Select Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-around pt-4">
            {[
              {
                label: "Paid",
                value: "paid",
                color: "bg-primary text-white",
              },
              {
                label: "Pending",
                value: "pending",
                color: "bg-gray-400 text-white",
              },
              {
                label: "Unpaid",
                value: "unpaid",
                color: "bg-red-500 text-white",
              },
            ].map((status) => (
              <button
                key={status.value}
                type="button"
                className={`px-2 py-1 rounded-full font-medium ${
                  filters.status === status.value ? status.color : "bg-gray-200"
                }`}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, status: status.value }))
                }
              >
                {status.label}
              </button>
            ))}
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
              className="px-4 py-2 rounded-lg text-white hover:bg-gray-800"
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
