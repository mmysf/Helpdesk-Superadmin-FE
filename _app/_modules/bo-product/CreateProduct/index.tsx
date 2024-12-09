"use client";

import { useState } from "react";
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
import { FaTrash } from "react-icons/fa";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";

export default function CreateProduct() {
  const [benefits, setBenefits] = useState([
    { id: Date.now() + 1, value: "Standard support response time" },
    { id: Date.now() + 2, value: "Access to knowledge base" },
    { id: Date.now() + 3, value: "Basic reporting and analytics" },
    {
      id: Date.now() + 4,
      value: "Integration with email for ticket submissions",
    },
  ]);

  const handleAddBenefit = () => {
    setBenefits([...benefits, { id: Date.now(), value: "" }]);
  };

  const handleRemoveBenefit = (id: number) => {
    const updatedBenefits = benefits.filter((benefit) => benefit.id !== id);
    setBenefits(updatedBenefits);
  };

  const handleBenefitChange = (id: number, value: string) => {
    const updatedBenefits = benefits.map((benefit) =>
      benefit.id === id ? { ...benefit, value } : benefit,
    );
    setBenefits(updatedBenefits);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="p-6">
      <CardContent>
        <div className="flex items-center space-x-3 mb-6">
          <HiOutlineArrowCircleLeft className="text-2xl cursor-pointer" />
          <h2 className="text-lg font-semibold">Create New Product</h2>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Duration Category */}
          <div>
            <Label>Duration Category</Label>
            <Select>
              <SelectTrigger className="w-full text-gray-500">
                <SelectValue placeholder="3 Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-month">1 Month</SelectItem>
                <SelectItem value="3-month">3 Month</SelectItem>
                <SelectItem value="6-month">6 Month</SelectItem>
                <SelectItem value="12-month">12 Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Product Name */}
          <div>
            <Label>Product Name</Label>
            <Input
              id="productName"
              placeholder="Product Name"
              className="text-gray-500"
            />
          </div>

          {/* Price */}
          <div>
            <Label>Price</Label>
            <Input
              id="price"
              type="number"
              placeholder="0"
              className="text-gray-500"
            />
          </div>

          {/* Duration to Resolve Issue */}
          <div>
            <Label>Duration to Resolve Issue</Label>
            <Input
              id="durationToResolve"
              type="number"
              placeholder="0"
              className="text-gray-500"
            />
          </div>

          {/* Benefits */}
          <div>
            <Label>Benefit</Label>
            <div className="space-y-2">
              {benefits.map((benefit) => (
                <div key={benefit.id} className="flex items-center space-x-2">
                  <Input
                    value={benefit.value}
                    onChange={(e) =>
                      handleBenefitChange(benefit.id, e.target.value)
                    }
                    placeholder="Benefit"
                    className="text-gray-500"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleRemoveBenefit(benefit.id)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button type="button" variant="outline" onClick={handleAddBenefit}>
              + Add
            </Button>
          </div>

          <div className="flex space-x-4 pt-6">
            <Button variant="outline" type="button" className="w-32">
              Cancel
            </Button>
            <Button type="submit" className="w-32 bg-primary text-white">
              Create
            </Button>
          </div>
        </form>
      </CardContent>
    </div>
  );
}
