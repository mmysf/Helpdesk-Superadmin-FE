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
import { CustomerListParams, useCustomerDelete, useCustomerList } from "@/services_remote/repository/customer/index.service";
import useToastSuccess from "@/hooks/useToastSuccess";
import useToastError from "@/hooks/useToastError";
import { Card, CardContent } from "@/ui/card";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { EllipsisVertical, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import PaginationWithoutLinks from "../PaginationWithoutLinks";
import ConfirmDeleteModal from "../Modals/ModalDelete";

export default function CustomerTable() {
  const router = useRouter();
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();

  const [selectedId, setSelectedId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [params, setParams] = useState<CustomerListParams>();

  const { data, isPending, refetch } = useCustomerList({
    axios: { params },
    query: { queryKey: ["agent-list", params] },
  });

  const { mutate } = useCustomerDelete(selectedId);

  const tableData = useMemo(() => data?.data.list, [data]);

  const handleDelete = () => {
    mutate(
      {},
      {
        onSuccess: () => {
          toastSuccess("Data customer berhasil dihapus");
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
                  Customer Information Table
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
                <Button
                  onClick={() => {
                    router.push("/bo/customer/add-customer");
                  }}
                  className="bg-primary text-white flex items-center gap-2 px-4 py-2 rounded-md"
                >
                  Add New Customer <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Subscription</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead>Time Remaining</TableHead>
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
                            {item.logo.url !== "" ? (
                              <Image
                                className="flex-none w-10 h-10 rounded-full object-cover"
                                src={item.logo.url}
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
                              <p className="text-sm text-gray-600">
                                {/* {item.email} */}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <span className="flex-none flex justify-center items-center bg-blue-100 text-blue-600 w-10 h-10 rounded-full text-xl font-bold">
                              {item.company.name[0]}
                            </span>
                            <p className="font-medium">{item.company.name}</p>
                          </div>
                        </TableCell>
                        <TableCell>{"-"}</TableCell>
                        <TableCell>{item.lastActivityAt}</TableCell>
                        <TableCell>{"-"}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-6 w-6 p-0">
                                <EllipsisVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" sideOffset={4}>
                              <DropdownMenuItem
                                onClick={() => {
                                  router.push(
                                    `/bo/customer/update-customer/${item.id}`,
                                  );
                                }}
                              >
                                Edit
                              </DropdownMenuItem>
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
