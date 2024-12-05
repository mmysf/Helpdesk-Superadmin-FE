"use client";

import {
  ShoppingBag,
  UserRound,
  Ticket,
  UserRoundCog,
  ShoppingCart,
} from "lucide-react";
import StatsItem from "../molecules/StatsItem";

export default function Stats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
      <StatsItem
        title="Total Client"
        value="12 Clients"
        icon={<ShoppingBag className="w-5 h-5 text-gray-600" />}
      />
      <StatsItem
        title="Total Customer"
        value="12 Customers"
        icon={<UserRound className="w-5 h-5 text-gray-600" />}
      />
      <StatsItem
        title="New Ticket Submitted"
        value="12 Tickets"
        icon={<Ticket className="w-5 h-5 text-gray-600" />}
      />
      <StatsItem
        title="Total Agent"
        value="12 Agents"
        icon={<UserRoundCog className="w-5 h-5 text-gray-600" />}
      />
      <StatsItem
        title="Total Order"
        value="12 Orders"
        icon={<ShoppingCart className="w-5 h-5 text-gray-600" />}
      />
    </div>
  );
}
