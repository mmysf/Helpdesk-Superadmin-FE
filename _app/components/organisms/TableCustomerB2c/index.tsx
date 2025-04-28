import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import {
  CustomerListParams,
  useCustomerB2cDelete,
  useCustomerB2cList,
} from "@/services_remote/repository/customer/index.service";
import useToastSuccess from "@/hooks/useToastSuccess";
import useToastError from "@/hooks/useToastError";
import { Card, CardContent } from "@/ui/card";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { EllipsisVertical, Search } from "lucide-react";
import { format } from "date-fns";
import PaginationWithoutLinks from "../PaginationWithoutLinks";
import ConfirmDeleteModal from "../Modals/ModalDelete";

export default function CustomerTable() {
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();

  const [selectedId, setSelectedId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [params, setParams] = useState<CustomerListParams>();

  const { data, isPending, refetch } = useCustomerB2cList({
    axios: { params },
    query: { queryKey: ["customer-list", params] },
  });

  const { mutate } = useCustomerB2cDelete(selectedId);

  const tableData = useMemo(() => data?.data.list, [data]);

  const handleDelete = () => {
    mutate(
      {},
      {
        onSuccess: () => {
          toastSuccess("Customer deleted successfully");
          setIsOpen(false);
          refetch();
        },
        onError: (err) => {
          toastError(err.data.message);
        },
      },
    );
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setParams({
        page: currentPage,
        limit: currentLimit,
        q: searchTerm,
        sort: "createdAt",
        dir: "desc",
      });
    }, 3e2);

    return () => clearTimeout(timeout);
  }, [currentPage, currentLimit, searchTerm]);

  return (
    <Card>
      <CardContent className="p-0 shadow-lg">
        <div className="p-6 bg-white rounded-md">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">
                  Customer B2C Information Table
                </h2>
                <p className="text-gray-600">
                  Manage, Track, and Grow your Customer
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Input
                    placeholder="Search by Name"
                    className="rounded-md pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Subscription</TableHead>
                    <TableHead>Market Type</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isPending ? (
                    <TableRow>
                      <TableCell className="text-center" colSpan={6}>
                        Memuat...
                      </TableCell>
                    </TableRow>
                  ) : (
                    (tableData || []).map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {item.profilePicture.url !== "" ? (
                              <Image
                                className="flex-none w-10 h-10 rounded-full object-cover"
                                src={item.profilePicture.url}
                                alt="company logo"
                                width={50}
                                height={50}
                              />
                            ) : (
                              <span className="flex flex-none justify-center items-center bg-green-100 text-primary w-10 h-10 rounded-full text-xl font-bold">
                                {item.name[0]}
                              </span>
                            )}

                            <div>
                              <p className="font-medium">{item.name}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>
                          <div>
                            {item.subscription != null ? (
                              <>
                                {item.subscription.status === "active" ? (
                                  <span className="px-2 py-1 rounded-full uppercase text-xs text-white whitespace-nowrap bg-green-500">
                                    {item.subscription.status}
                                  </span>
                                ) : (
                                  <span className="px-2 py-1 rounded-full uppercase text-xs text-white whitespace-nowrap bg-red-500">
                                    {item.subscription.status}
                                  </span>
                                )}
                              </>
                            ) : (
                              <span className="px-2 py-1 rounded-full uppercase text-xs text-white whitespace-nowrap bg-gray-500">
                                -
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{item.marketType}</TableCell>
                        <TableCell>
                          {item.lastActivityAt !== null
                            ? format(
                                new Date(item.lastActivityAt),
                                "dd MMM yyyy, HH:mm",
                              )
                            : "-"}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-6 w-6 p-0">
                                <EllipsisVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" sideOffset={4}>
                              <DropdownMenuItem
                                className="text-red-500 hover:text-red-500 hover:bg-red-100"
                                onClick={() => {
                                  setSelectedId(item.id);
                                  setIsOpen(true);
                                }}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-center items-center mt-2">
              <PaginationWithoutLinks
                totalData={data?.data.total || 1}
                currentPage={currentPage}
                perPage={currentLimit}
                setCurrentPage={setCurrentPage}
                setCurrentLimit={setCurrentLimit}
              />
            </div>
          </div>
          <ConfirmDeleteModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Attention"
            subtitle="Are you sure want to delete this Customer"
            onConfirm={handleDelete}
          />
        </div>
      </CardContent>
    </Card>
  );
}
