/* eslint-disable react/jsx-boolean-value */
import React, { useState } from "react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

import { EllipsisVertical, Plus, Search } from "lucide-react";
import useToastSuccess from "@/root/_app/hooks/useToastSuccess";
import useToastError from "@/root/_app/hooks/useToastError";
import {
  ProductDuration,
  ProductDurationListParams,
  useProductDurationDelete,
  useProductDurationList,
  useProductDurationUpdateStatus,
} from "@/services_remote/repository/product-duration/index.service";
import { Card, CardContent } from "../../ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "../../ui/table";
import PaginationWithoutLinks from "../PaginationWithoutLinks";
import ConfirmDeleteModal from "../Modals/ModalDelete";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import ModalToggleDuration from "../Modals/ModalToggleDuration";
import ModalDuration from "../Modals/ModalDuration";

export default function DurationTable() {
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [openToggle, setOpenToggle] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [item, setItem] = useState<ProductDuration>();
  const [params, setParams] = useState<ProductDurationListParams>({
    page: currentPage,
    limit: currentLimit,
  });

  const { isFetching, data, refetch } = useProductDurationList({
    query: { queryKey: ["duration-list", params] },
    axios: { params },
  });

  const { mutateAsync: hanldeUpdateStatusProduct } =
    useProductDurationUpdateStatus(item?.id || "");
  const { mutateAsync: handleDeleteProduct } = useProductDurationDelete(
    item?.id || "",
  );

  const tableData = useMemo(() => data?.data.list, [data]);

  const handleCreate = () => {
    setOpenAdd(true);
  };

  const handleEdit = (productDuration: ProductDuration) => {
    setItem(productDuration);
    setOpenAdd(true);
  };

  const handleUpdateStatus = (productDuration: ProductDuration) => {
    setOpenToggle(true);
    setItem(productDuration);
  };

  const handleDelete = (productDuration: ProductDuration) => {
    setItem(productDuration);
    setOpenDelete(true);
  };

  const handleOnCallback = () => {
    setItem(undefined);
    setOpenToggle(false);
    setOpenDelete(false);
    setOpenAdd(false);
    refetch();
  };

  const handleConfirmUpdateStatus = async () => {
    await hanldeUpdateStatusProduct({
      status: item?.status !== "active" ? "active" : "inactive",
    }).catch((err) => {
      toastError(err.data?.message || err.message);
      throw err;
    });
    toastSuccess("Data berhasil diubah");
    handleOnCallback();
  };

  const handleConfirmDelete = async () => {
    await handleDeleteProduct({}).catch((err) => {
      toastError(err.data?.message || err.message);
    });
    toastSuccess("Data berhasil dihapus");
    handleOnCallback();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setParams((v) => ({
        ...v,
        q: searchTerm,
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
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-bold">Duration</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  placeholder="Search by Subject"
                  className="rounded-md bordered-input"
                  value={searchTerm}
                  startContent={<Search className="ml-2 text-gray-500" />}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                onClick={() => handleCreate()}
                className="bg-primary text-white flex items-center gap-2 px-4 py-2 rounded-md"
              >
                Create New Duration <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Created on</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Product Active</TableHead>
                  <TableHead>Product Non Active</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isFetching ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      Memuat...
                    </TableCell>
                  </TableRow>
                ) : (
                  // eslint-disable-next-line no-shadow
                  (tableData || []).map((item, i) => (
                    <TableRow key={item.id}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{item.createdAt}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-white whitespace-nowrap capitalize ${
                            item.status === ""
                              ? "bg-blue-500"
                              : item.status === "In Progress"
                                ? "bg-orange-500"
                                : item.status === "active"
                                  ? "bg-green-500"
                                  : "bg-gray-500"
                          }`}
                        >
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell>{item.durationInDays} days</TableCell>
                      <TableCell>{item.activeCount}</TableCell>
                      <TableCell>{item.inactiveCount}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <EllipsisVertical className="w-5 h-5 mt-4 cursor-pointer" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56">
                            <DropdownMenuGroup>
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => handleEdit(item)}
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
          <ConfirmDeleteModal
            isOpen={openDelete}
            title="Attention"
            subtitle="Are you sure you want to delete this duration?"
            onConfirm={() => handleConfirmDelete()}
            setIsOpen={() => setOpenDelete(false)}
          />
          <ModalToggleDuration
            isOpen={openToggle}
            isActive={item?.status === "active"}
            isDuration={true}
            onConfirm={handleConfirmUpdateStatus}
            setIsOpen={() => setOpenToggle(false)}
          />
          <ModalDuration
            isOpen={openAdd}
            productDurationId={item?.id}
            defaultDuration={Math.round(
              (item?.durationInDays || 0) / 30,
            ).toString()}
            setIsOpen={() => setOpenAdd(false)}
            onCallback={handleOnCallback}
          />
        </div>
      </CardContent>
    </Card>
  );
}
