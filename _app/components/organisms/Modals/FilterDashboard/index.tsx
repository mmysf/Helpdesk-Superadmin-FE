import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";

interface FilterDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterModal({ isOpen, onClose }: FilterDashboardProps) {
  const [filters, setFilters] = useState({
    sortBy: "",
    ticketId: "",
    company: "",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    onClose();
  };

  const handleReset = () => {
    setFilters({
      sortBy: "",
      ticketId: "",
      company: "",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" rounded-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Filter
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <Select
            onValueChange={(value) => handleFilterChange("sortBy", value)}
            value={filters.sortBy}
          >
            <SelectTrigger className="w-full bg-gray-200">
              Sort by
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dateCreated">Date Created</SelectItem>
              <SelectItem value="priority">Last Modified</SelectItem>
              <SelectItem value="status">Priority</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="text"
            placeholder="Search by Ticket ID"
            className="w-full bg-gray-200"
            onChange={(e) => handleFilterChange("ticketId", e.target.value)}
            value={filters.ticketId}
          />

          <Select
            onValueChange={(value) => handleFilterChange("company", value)}
            value={filters.company}
          >
            <SelectTrigger className="w-full bg-gray-200">
              Select Company
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="companyA">Company A</SelectItem>
              <SelectItem value="companyB">Company B</SelectItem>
              <SelectItem value="companyC">Company C</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter className="flex justify-between mt-6 ">
          <Button
            variant="outline"
            className="px-4 py-2 rounded-lg items-center"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            className="px-4 py-2 rounded-lg items-center"
            onClick={applyFilters}
          >
            Filter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
