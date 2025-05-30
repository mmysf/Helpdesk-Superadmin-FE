import React, { useState } from "react";
import {
  ProductSubscription,
  ProductSubscriptionListParams,
  useProductSubscriptionDelete,
  useProductSubscriptionList,
  useProductSubscriptionUpdateStatus,
} from "@/services_remote/repository/product-subscription/index.service";
import { useProductDurationList } from "@/services_remote/repository/product-duration/index.service";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { EllipsisVertical, Loader, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/ui/table";
import { SelectItem, SelectTrigger, SelectContent, Select } from "@/ui/select";
import { Card, CardContent } from "@/ui/card";
import { toast } from "sonner";
import ConfirmDeleteModal from "../Modals/ModalDelete";
import ModalToggleDuration from "../Modals/ModalToggleDuration";
import PaginationWithoutLinks from "../PaginationWithoutLinks";

export default function Subscription() {
  const router = useRouter();
  const { data: dataDuration } = useProductDurationList({
    axios: { params: { limit: 1e3 } },
  });
  const optsDuration = useMemo(
    () => dataDuration?.data.list || [],
    [dataDuration],
  );

  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  const [openDelete, setOpenDelete] = useState(false);
  const [openToggle, setOpenToggle] = useState(false);
  const [selected, setSelected] = useState<ProductSubscription>();
  const [params, setParams] = useState<ProductSubscriptionListParams>({
    page: currentPage,
    limit: currentLimit,
    q: searchTerm,
  });

  const { isFetching, data, refetch } = useProductSubscriptionList({
    query: { queryKey: ["subscription-list", params] },
    axios: { params },
  });

  const { mutateAsync: handleUpdateStatusProduct } =
    useProductSubscriptionUpdateStatus(selected?.id || "");

  const { mutateAsync: handleDeleteProduct } = useProductSubscriptionDelete(
    selected?.id || "",
  );

  const tableData = useMemo(() => data?.data.list, [data]);

  const reset = () => {
    setSelected(undefined);
    setOpenDelete(false);
    setOpenToggle(false);
    refetch();
  };

  const handleUpdateStatus = (item: ProductSubscription) => {
    setSelected(item);
    setOpenToggle(true);
  };

  const handleDelete = (item: ProductSubscription) => {
    setSelected(item);
    setOpenDelete(true);
  };

  const handleConfirmUpdateStatus = async () => {
    await handleUpdateStatusProduct({
      status: selected?.status !== "active" ? "active" : "inactive",
    }).catch((err) => {
      toast.error(err.data?.message || err.message);
      throw err;
    });
    toast.success("Status updated successfully");
    reset();
  };

  const handleConfirmDelete = async () => {
    await handleDeleteProduct({}).catch((err) => {
      toast.error(err.data?.message || err.message);
      throw err;
    });
    toast.success("Data deleted successfully");
    reset();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setParams((v) => ({
        ...v,
        page: currentPage,
        limit: currentLimit,
        q: searchTerm,
        categoryId: searchCategory,
      }));
    }, 3e2);

    return () => clearTimeout(timeout);
  }, [currentPage, currentLimit, searchTerm, searchCategory]);

  return (
    <Card>
      <CardContent className="p-0 shadow-lg">
        <div className="p-6 bg-white rounded-md">
          <div className="flex justify-evenly items-center mb-4">
            <div className="flex items-center gap-4 w-full">
              <h2 className="text-xl font-bold">Duration Category</h2>
              <div className="max-w-lg ">
                <Select
                  value={searchCategory}
                  onValueChange={(v) => setSearchCategory(v)}
                >
                  <SelectTrigger className="bg-primary text-white">
                    Select Category
                  </SelectTrigger>
                  <SelectContent>
                    {optsDuration.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
                onClick={() => router.push("/bo/subscription/create")}
                className="bg-primary text-white flex items-center gap-2 px-4 py-2 rounded-md"
              >
                Create New Product <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Benefit</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isFetching && (
                  <TableRow>
                    <TableCell className="text-center" colSpan={6}>
                      <div className="flex items-center justify-center">
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        <p>Loading...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
                {!isFetching && tableData?.length === 0 && (
                  <TableRow>
                    <TableCell className="text-center" colSpan={6}>
                      Data tidak ditemukan
                    </TableCell>
                  </TableRow>
                )}
                {!isFetching &&
                  tableData?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.category.durationInDays} days</TableCell>
                      <TableCell>
                        <ul className="default">
                          {item.benefit.map((v) => (
                            <li key={v}>{v}</li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-white ${
                            item.status === "active"
                              ? "bg-green-500"
                              : "bg-gray-500"
                          }`}
                        >
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <EllipsisVertical className="w-5 h-5 mt-4 cursor-pointer" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56">
                            <DropdownMenuGroup>
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => {
                                  router.push(
                                    `/bo/subscription/update/${item.id}`,
                                  );
                                }}
                              >
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => handleUpdateStatus(item)}
                              >
                                {item.status === "active" ? (
                                  <span className="text-red-500">
                                    Deactivate
                                  </span>
                                ) : (
                                  <span className="text-primary">Activate</span>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => handleDelete(item)}
                              >
                                Delete
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
            {!isFetching && (tableData?.length || 0) > 0 && (
              <PaginationWithoutLinks
                totalData={data?.data.total}
                currentPage={currentPage}
                perPage={currentLimit}
                setCurrentPage={setCurrentPage}
                setCurrentLimit={setCurrentLimit}
              />
            )}
          </div>
          <ConfirmDeleteModal
            isOpen={openDelete}
            title="Attention"
            subtitle="Are you sure you want to delete this Subscription?"
            onConfirm={handleConfirmDelete}
            setIsOpen={() => setOpenDelete(false)}
          />
          <ModalToggleDuration
            isOpen={openToggle}
            isActive={selected?.status === "active"}
            onConfirm={handleConfirmUpdateStatus}
            setIsOpen={() => setOpenToggle(false)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
