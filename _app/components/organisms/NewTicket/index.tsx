/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import clsx from "clsx";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/ui/table";
import {
  TicketListParams,
  useTicketList,
} from "@/root/_app/services/remote/repository/ticket/index.service";
import { Card, CardContent } from "@/ui/card";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Search, Filter, Dot } from "lucide-react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Agent } from "@/root/_app/services/remote/repository/agent/types";
import PaginationWithoutLinks from "../PaginationWithoutLinks";
import FilterDashboard from "../Modals/FilterDashboard";

interface Props {
  companyID?: string;
  isCompany?: boolean;
}

export default function NewTicket({
  companyID = "",
  isCompany = false,
}: Props) {
  const router = useRouter();
  const [params, setParams] = useState<TicketListParams>({
    companyID: companyID || "",
    page: 1,
    limit: 10,
    subject: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const { data, isFetching } = useTicketList({
    axios: { params: { ...params, dir: "desc" } },
    query: { queryKey: ["ticket-list", params] },
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500); // Adjust delay as needed

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    setParams({
      ...(companyID !== undefined ? { companyID } : {}),
      page: currentPage,
      limit: currentLimit,
      subject: debouncedSearch,
    });
  }, [currentPage, currentLimit, debouncedSearch, companyID]);

  const handleApplyFilters = (filters: any) => {
    setParams({
      ...(companyID !== undefined ? { companyID } : {}),
      page: 1,
      limit: 10,
      ...(isCompany ? { code: filters.code, sort: filters.sort } : filters),
    });
    setCurrentPage(1);
    setCurrentLimit(10);
    setIsFilterModalOpen(false);
  };

  const renderTableRow = (item: any) => (
    <TableRow key={item.id}>
      <TableCell className="whitespace-nowrap">{item.code}</TableCell>
      <TableCell>{item.customer?.name}</TableCell>
      <TableCell>{item.company.name}</TableCell>
      <TableCell>{item.subject}</TableCell>
      <TableCell>
        {format(new Date(item.createdAt), "dd MMM yyyy HH:mm")}
      </TableCell>
      <TableCell>
        <span
          className={clsx(
            "px-2 py-1 rounded-full text-white whitespace-nowrap",
            item.status === "open"
              ? "bg-blue-500"
              : item.status === "in_progress"
                ? "bg-amber-500"
                : item.status === "resolve"
                  ? "bg-green-500"
                  : item.status === "closed"
                    ? "bg-red-500"
                    : "bg-gray-500",
          )}
        >
          {item.status}
        </span>
      </TableCell>
      <TableCell>{item.priority}</TableCell>
      <TableCell>
        <div>
          {item.agents?.map((agent: Agent) => (
            <div key={agent.id} className="flex items-center">
              <Dot />
              <span className="px-2 py-1 whitespace-nowrap">{agent.name}</span>
            </div>
          ))}
        </div>
      </TableCell>
      <TableCell>
        <Button
          onClick={() => {
            router.push(`/bo/ticket/${item.id}`);
          }}
          variant="ghost"
          className="text-primary"
        >
          view
        </Button>
      </TableCell>
    </TableRow>
  );

  return (
    <Card>
      <CardContent className="p-0 shadow-lg ">
        <div className="p-6 bg-white rounded-md">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-bold">All Tickets from Customer</h2>
              <p className="text-gray-600">Manage and Track All Tickets</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search by Subject"
                  className="rounded-md pl-10 bordered-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                onClick={() => setIsFilterModalOpen(true)}
                className="bg-slate-500 text-white flex items-center gap-2 px-4 py-2 rounded-md"
              >
                <Filter className="w-4 h-4" /> Filter
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Created on</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Agent</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isFetching ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center">
                      {" "}
                      Memuat...
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {(data?.data.list || []).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center">
                          {" "}
                          No data found
                        </TableCell>
                      </TableRow>
                    ) : (
                      data?.data.list.map(renderTableRow)
                    )}
                  </>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-center items-center mt-2">
            {!isFetching && (
              <PaginationWithoutLinks
                totalData={data?.data.total || 0}
                currentPage={currentPage}
                perPage={currentLimit}
                setCurrentPage={setCurrentPage}
                setCurrentLimit={setCurrentLimit}
              />
            )}
          </div>
          {isFilterModalOpen !== undefined && (
            <FilterDashboard
              isOpen={isFilterModalOpen}
              onClose={() => setIsFilterModalOpen(false)}
              onApplyFilters={handleApplyFilters}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
