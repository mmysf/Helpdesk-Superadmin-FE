"use client";

import { ShoppingBag, UserRound, Ticket, UserRoundCog } from "lucide-react";
import StatsItem from "../molecules/StatsItem";
import { useDashboardStats } from "../../services/remote/repository/dashboard/index.service";

export default function Stats() {
  const { data, isFetching } = useDashboardStats();
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
      {!isFetching && (
        <>
          <StatsItem
            title="Total Client"
            value={`${data?.data.totalClient} Clients`}
            icon={<ShoppingBag className="w-5 h-5 text-gray-600" />}
          />
          <StatsItem
            title="Total Customer"
            value={`${data?.data.totalCustomer} Customers`}
            icon={<UserRound className="w-5 h-5 text-gray-600" />}
          />
          <StatsItem
            title="New Ticket Submitted"
            value={`${data?.data.totalNewTicket} Tickets`}
            icon={<Ticket className="w-5 h-5 text-gray-600" />}
          />
          <StatsItem
            title="Total Agent"
            value={`${data?.data.totalAgent} Agents`}
            icon={<UserRoundCog className="w-5 h-5 text-gray-600" />}
          />
          {/* <StatsItem
            title="Total Order"
            value={`${data?.data.totalOrder} Orders`}
            icon={<ShoppingCart className="w-5 h-5 text-gray-600" />}
          /> */}
        </>
      )}
    </div>
  );
}
