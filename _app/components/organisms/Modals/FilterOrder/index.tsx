"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

interface SubmitData {
  key: string;
  value: string;
}

interface FilterOrderProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStatus?: string;
  selectedSort?: string;
  selectedPlan?: string;
  // eslint-disable-next-line no-unused-vars
  submit: (data: SubmitData[]) => void;
  reset: () => void;
}

export default function FilterOrder({
  isOpen,
  onClose,
  selectedStatus = "",
  selectedSort = "",
  selectedPlan = "",
  submit,
  reset,
}: FilterOrderProps) {
  const [filters, setFilters] = useState({
    sortBy: selectedSort,
    plan: selectedPlan,
    status: selectedStatus,
  });

  useEffect(() => {
    setFilters({
      sortBy: selectedSort,
      plan: selectedPlan,
      status: selectedStatus,
    });
  }, [selectedSort, selectedPlan, selectedStatus]);

  const handleFilter = () => {
    const updatedFilters = { ...filters };

    const data: SubmitData[] = Object.entries(updatedFilters)
      .filter(([, value]) => value !== "")
      .map(([key, value]) => ({ key, value }));

    if (data.length > 0) {
      submit(data);
    } else {
      onClose();
    }
  };

  const handleReset = () => {
    setFilters({
      sortBy: "",
      plan: "",
      status: "",
    });
    reset();
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="rounded-lg p-6 transition-transform duration-300 ease-out">
        <DialogHeader className="text-center pb-4">
          <h2 className="text-lg font-semibold">Filter</h2>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleFilter();
          }}
        >
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
                <SelectItem value="last-modified">Last Modified</SelectItem>
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
                <SelectItem value="basic">Basic Plan</SelectItem>
                <SelectItem value="premium">Pro Plan</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap justify-around gap-2 pt-4">
            {[
              {
                label: "Paid",
                value: "paid",
                color: "bg-[#28A745] text-white",
              },
              {
                label: "Pending",
                value: "pending",
                color: "bg-[#F7B801] text-white",
              },
              {
                label: "Waiting Approval",
                value: "waiting_approval",
                color: "bg-[#007BFF] text-white",
              },
              {
                label: "Rejected",
                value: "rejected",
                color: "bg-[#DC3545] text-white",
              },
              {
                label: "Expired",
                value: "expired",
                color: "bg-[#6C757D] text-white",
              },
            ].map((status) => (
              <button
                key={status.value}
                type="button"
                className={`px-3 py-1.5 rounded-full font-medium transition-colors duration-200 ${
                  filters.status === status.value
                    ? `${status.color} shadow-md`
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    status: prev.status === status.value ? "" : status.value,
                  }))
                }
              >
                {status.label}
              </button>
            ))}
          </div>

          <DialogFooter className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              className="px-4 py-2 rounded-lg border-gray-400 text-gray-600 hover:bg-gray-100"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              type="submit"
              className="px-4 py-2 rounded-lg text-white bg-gray-800 hover:bg-gray-900"
              onClick={() => {
                handleFilter();
              }}
            >
              Filter
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
