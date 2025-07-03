import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/ui/table";
import Image from "next/image";
import {
  CompanyListParams,
  useCompanyDelete,
  useCompanyList,
} from "@/services_remote/repository/company/index.service";
import { Card, CardContent } from "@/ui/card";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Loader, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import PaginationWithoutLinks from "../PaginationWithoutLinks";
import ConfirmDeleteModal from "../Modals/ModalDelete";

export default function CustomerTable() {
  const router = useRouter();

  const [selectedId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [params, setParams] = useState<CompanyListParams>();

  const { data, isPending, refetch } = useCompanyList({
    axios: { params: { ...params, sort: "createdAt", dir: "desc" } },
    query: { queryKey: ["company-list", params] },
  });

  const { mutate } = useCompanyDelete(selectedId);

  const tableData = useMemo(() => data?.data.list, [data]);

  const handleDelete = () => {
    mutate(
      {},
      {
        onSuccess: () => {
          toast.success("Customer deleted successfully");
          setIsOpen(false);
          refetch();
        },
        onError: (err) => {
          toast.error(err.data.message);
        },
      },
    );
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setParams((val) => ({
        ...val,
        search: searchTerm,
        page: currentPage,
        limit: currentLimit,
      }));
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
                    <TableHead>Total Customer</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isPending && (
                    <TableRow>
                      <TableCell className="text-center" colSpan={6}>
                        <div className="flex items-center justify-center">
                          <Loader className="mr-2 h-4 w-4 animate-spin" />
                          <p>Loading...</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}

                  {tableData?.length === 0 && (
                    <TableRow>
                      <TableCell className="text-center" colSpan={6}>
                        No data found
                      </TableCell>
                    </TableRow>
                  )}

                  {(tableData || []).map((item) => (
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
                      <TableCell>{item.customerTotal} Customer</TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          onClick={() => {
                            router.push(`/bo/customer/${item.id}`);
                          }}
                          variant="ghost"
                          className="text-primary"
                        >
                          View Customer
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-center items-center mt-2">
              {!isPending && (tableData?.length || 0) > 0 && (
                <PaginationWithoutLinks
                  totalData={data?.data.total || 1}
                  currentPage={currentPage}
                  perPage={currentLimit}
                  setCurrentPage={setCurrentPage}
                  setCurrentLimit={setCurrentLimit}
                />
              )}
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
