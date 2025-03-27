"use client";

import { useOrderList } from "@/root/_app/services/remote/repository/order/index.service";
import type {
  List,
  OrderListParams,
} from "@/root/_app/services/remote/repository/order/type";
import { Button } from "@/ui/button";
import { Card, CardContent } from "@/ui/card";
import { Input } from "@/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { EllipsisVertical, Filter, Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import FilterOrder from "../Modals/FilterOrder";
import OrderDetailModal from "../Modals/ModalDetailOrder";
import PaginationWithoutLinks from "../PaginationWithoutLinks";

export default function OrdersTable() {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState<List | null>();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [params, setParams] = useState<OrderListParams>({
    page: currentPage,
    limit: currentLimit,
    q: searchTerm,
    types: "SERVER",
  });
  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      page: currentPage,
      limit: currentLimit,
      q: searchTerm,
      types: "SERVER",
      status: selectedStatus,
      sortBy: selectedSort,
      plan: selectedPlan,
    }));
  }, [
    currentPage,
    currentLimit,
    searchTerm,
    selectedStatus,
    selectedSort,
    selectedPlan,
  ]);
  const { data: servers, refetch } = useOrderList({
    query: { queryKey: ["order-list", params] },
    axios: { params },
  });
  // const filteredData = ORDERS.filter((order) =>
  //   order.orderId.toLowerCase().includes(searchTerm.toLowerCase()),
  // );
  const tableData = useMemo(() => servers?.data.list, [servers]);

  // const currentData = filteredData.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage,
  // );

  const renderStatus = useCallback((status: string) => {
    let color = "";
    switch (status) {
      case "pending":
        color = "bg-[#F7B801]";
        break;
      case "waiting_approval":
        color = "bg-[#007BFF]";
        break;
      case "paid":
        color = "bg-[#28A745]";
        break;
      case "reject":
        color = "bg-[#DC3545]";
        break;
      default:
        color = "bg-[#6C757D]";
    }
    return (
      <div
        aria-label="status"
        className={`uppercase ${color} flex items-center justify-center text-white px-2 py-1 rounded-3xl`}
        role="button"
      >
        {status.replace("_", " ")}
      </div>
    );
  }, []);
  type SubmitData = {
    key: string;
    value: string;
  };
  const handleSubmitFilter = (data: SubmitData[]) => {
    const statusValue = data.find((item) => item.key === "status")?.value || "";
    const sortByValue = data.find((item) => item.key === "sortBy")?.value || "";
    const planValue = data.find((item) => item.key === "plan")?.value || "";

    setSelectedStatus(statusValue);
    setSelectedSort(sortByValue);
    setSelectedPlan(planValue);

    setParams((prev) => ({
      ...prev,
      page: 1,
      types: "SERVER",
      q: searchTerm,
      sortBy: sortByValue,
      plan: planValue,
      status: statusValue,
    }));

    setIsFilterModalOpen(false);
  };

  const handleResetFilter = () => {
    setSelectedStatus("");
    setSelectedSort("");
    setSelectedPlan("");
  };

  return (
    <Card>
      <CardContent className="p-0 shadow-lg">
        <div className="p-6 bg-white rounded-md">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">
                Order History of Server Product
              </h2>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setIsFilterModalOpen(true)}
                  className="bg-slate-500 text-white"
                >
                  <Filter /> Filter
                </Button>
                <div className="relative">
                  <Search className="absolute left-2 top-2 text-gray-500" />
                  <Input
                    placeholder="Search by OrderID"
                    className="rounded-md pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />{" "}
                </div>
              </div>
            </div>
            <div className="overflow-x-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Validity</TableHead>
                    <TableHead>Amount Paid</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead> </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData?.map((server) => (
                    <TableRow key={server.id}>
                      {" "}
                      <TableCell>{server.orderNumber}</TableCell>
                      <TableCell>{server.customer.name}</TableCell>
                      <TableCell>{server.customer.email}</TableCell>
                      <TableCell>
                        {new Date(server.createdAt).toLocaleString("en-US", {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        })}
                      </TableCell>
                      <TableCell>{server.serverPackage?.name}</TableCell>
                      <TableCell>{server.serverPackage?.validity}</TableCell>
                      <TableCell>{server.grandTotal}</TableCell>
                      <TableCell>{renderStatus(server.status)}</TableCell>
                      <TableCell className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <EllipsisVertical className="w-5 h-5 mt-4 cursor-pointer" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-[138px]">
                            <DropdownMenuGroup>
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => {
                                  setSelectedServer(server);
                                  setIsActionOpen(true);
                                }}
                              >
                                Detail
                              </DropdownMenuItem>
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-center items-center mt-2">
              <PaginationWithoutLinks
                totalData={servers?.data.total}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                perPage={10}
                setCurrentLimit={setCurrentLimit}
              />
            </div>
          </div>
          <FilterOrder
            isOpen={isFilterModalOpen}
            onClose={() => setIsFilterModalOpen(false)}
            selectedStatus={selectedStatus}
            selectedSort={selectedSort}
            selectedPlan={selectedPlan}
            submit={handleSubmitFilter}
            reset={handleResetFilter}
          />
        </div>
      </CardContent>
      {isActionOpen && (
        <OrderDetailModal
          isOpen={isActionOpen}
          onClose={(isRefresh) => {
            setIsActionOpen(false);
            if (isRefresh) refetch();
          }}
          id={selectedServer?.id as string}
          title="Server Product Order Detail"
          setIsOpen={setIsActionOpen}
          onSuccessSubmit={() => {
            setIsActionOpen(false);
            setSelectedServer(null);
            refetch();
          }}
          isServer
        />
      )}
    </Card>
  );
}
