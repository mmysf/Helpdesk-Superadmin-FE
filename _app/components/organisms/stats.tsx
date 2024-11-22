"use client";

import { CardContent } from "@/ui/card";
import { ClipboardCheck, TimerReset, Check, ListOrdered } from "lucide-react";

export default function Stats() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
      <div className="bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center p-4">
          <span className="text-xs font-medium">Total Active Products</span>
          <ListOrdered className="w-5 h-5 text-gray-600" />
        </div>
        <CardContent>
          <div className="text-lg font-semibold">
            <div>12 Products</div>
          </div>
        </CardContent>
      </div>
      <div className="bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center p-4">
          <span className="flex-grow text-xs">Total Orders</span>
          <TimerReset className="w-5 h-5 text-gray-600" />
        </div>
        <CardContent>
          <div className="text-lg font-semibold">
            <div>10 Order</div>
          </div>
        </CardContent>
      </div>
      <div className="bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center p-4">
          <span className="flex-grow text-xs">Total Customers</span>
          <ClipboardCheck className="w-5 h-5" />
        </div>
        <CardContent>
          <div className="text-lg font-semibold">
            <div>7 Customer</div>
          </div>
        </CardContent>
      </div>
      <div className="bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center p-4">
          <span className="flex-grow text-xs">New Ticket Submitted</span>
          <Check className="w-5 h-5" />
        </div>
        <CardContent>
          <div className="text-lg font-semibold">
            <div>9 Ticket</div>
          </div>
        </CardContent>
      </div>
      <div className="bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center p-4">
          <span className="flex-grow items-start text-xs">Total Agents</span>
          <Check className="w-5 h-5 items-end" />
        </div>
        <CardContent>
          <div className="text-lg font-semibold">
            <div>5 Agents</div>
          </div>
        </CardContent>
      </div>
    </div>
  );
}
