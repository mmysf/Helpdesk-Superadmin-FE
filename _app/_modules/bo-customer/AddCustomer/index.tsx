"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";

export default function AddCustomer() {
  return (
    <div className="p-6">
      <CardContent>
        <div className="flex items-center space-x-3 mb-6">
          <HiOutlineArrowCircleLeft className="text-2xl cursor-pointer" />
          <h2 className="text-lg font-semibold">Add New Customer</h2>
        </div>

        <form className="space-y-6">
          <div>
            <Label>Customer Name</Label>
            <Input
              id="customerName"
              placeholder="Customer Name"
              className="text-gray-500"
            />
          </div>

          <div>
            <Label>Subscription Type</Label>
            <Select>
              <SelectTrigger className="w-full text-gray-500">
                <SelectValue placeholder="Select Subscription Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Company</Label>
            <Select>
              <SelectTrigger className="w-full text-gray-500">
                <SelectValue placeholder="Select Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="companyA">Company A</SelectItem>
                <SelectItem value="companyB">Company B</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Brand Logo</Label>
            <Input id="brandLogo" type="file" className="text-gray-500" />
          </div>

          <div className="flex space-x-4">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </div>
        </form>
      </CardContent>
    </div>
  );
}
