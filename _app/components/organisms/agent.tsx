import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@/ui/table";
import { Card, CardContent } from "@/ui/card";
import { Button } from "@/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/ui/pagination";
import { Plus, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import {
  AgentListParams,
  useAgentList,
} from "@/services_remote/repository/agent/index.service";

export default function AgentTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(1);
  const [params, setParams] = useState<AgentListParams>({
    page: currentPage,
    limit: currentLimit,
  });

  const { isFetching, data } = useAgentList({
    query: { queryKey: ["agent-list", params] },
    axios: { params },
  });

  const tableData = useMemo(() => data?.data.list || [], [data]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setParams((v) => ({ ...v, page: currentPage, limit: currentLimit }));
    }, 3e2);

    return () => clearTimeout(timeout);
  }, [currentPage, currentLimit]);

  return (
    <div className="p-6 bg-white min-h-screen shadow-lg rounded-md">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Agent Information Table</h2>
            <p className="text-gray-600">Manage, Track, and Grow your Agent</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Button className="bg-slate-500 text-white">
                <Filter /> Filter
              </Button>
            </div>
            <Button className="bg-primary text-white flex items-center gap-2 px-4 py-2 rounded-md">
              Add New Agent <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <Card>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableColumn>Name</TableColumn>
                  <TableColumn>Total Ticket</TableColumn>
                  <TableColumn>Resolve Ticket</TableColumn>
                  <TableColumn>Average Time/Ticket</TableColumn>
                  <TableColumn>Action</TableColumn>
                </TableHeader>
                <TableBody>
                  {isFetching ? (
                    <TableRow>
                      <TableCell className="text-center" colSpan={5}>
                        Memuat...
                      </TableCell>
                    </TableRow>
                  ) : (
                    tableData.map((agent) => (
                      <TableRow key={agent.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <span className="bg-green-100 text-green-600 p-2 rounded-full">
                              {agent.name[0]}
                            </span>
                            <div>
                              <p className="font-medium">{agent.name}</p>
                              <p className="text-sm text-gray-600">
                                {agent.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>- Ticket</TableCell>
                        <TableCell>- Ticket</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>
                          <Button className="text-gray-600 bg-transparent hover:bg-transparent focus:bg-transparent border-none shadow-none">
                            ...
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-between items-center mt-4">
          <Button
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            <ChevronLeft />
          </Button>
          <Pagination>
            <PaginationContent>
              {Array.from(
                { length: Math.ceil((data?.data.total || 0) / currentLimit) },
                (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={currentPage === i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}
            </PaginationContent>
          </Pagination>
          <Button
            size="sm"
            disabled={
              currentPage === Math.ceil((data?.data.total || 0) / currentLimit)
            }
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(
                  prev + 1,
                  Math.ceil((data?.data.total || 0) / currentLimit),
                ),
              )
            }
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
