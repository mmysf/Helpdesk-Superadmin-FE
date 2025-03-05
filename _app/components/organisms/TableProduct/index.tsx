"use client";

import useToastError from "@/root/_app/hooks/useToastError";
import useToastSuccess from "@/root/_app/hooks/useToastSuccess";
import {
  useProductHourDelete,
  useProductHourUpdateStatus,
  useProductList,
  useProductServerDelete,
  useProductServerUpdateStatus,
  useServerList,
} from "@/root/_app/services/remote/repository/product/index.service";
import type {
  List,
  ProductListParams,
} from "@/root/_app/services/remote/repository/product/type";
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
import { EllipsisVertical, Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GoDotFill } from "react-icons/go";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import DeleteModal from "../Modals/ModalDelete";
import ProductModal from "../Modals/ModalProduct";
import ConfirmStatusModal from "../Modals/ModalStatus";
import PaginationWithoutLinks from "../PaginationWithoutLinks";

interface TableProductProps {
  isHour?: boolean;
  title: string;
}

export default function ProductsTable(props: TableProductProps) {
  const { isHour, title } = props;
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();

  const [selectedProduct, setSelectedProduct] = useState<List | null>(null);
  // change status
  const { mutateAsync: handleUpdateStatus } = useProductHourUpdateStatus(
    selectedProduct?.id as string,
  );
  const { mutateAsync: handleUpdateServerStatus } =
    useProductServerUpdateStatus(selectedProduct?.id as string);

  // delete
  const { mutateAsync: handleDeleteHour } = useProductHourDelete(
    selectedProduct?.id as string,
  );
  const { mutateAsync: handleDeleteServer } = useProductServerDelete(
    selectedProduct?.id as string,
  );
  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [params, setParams] = useState<ProductListParams>({
    page: currentPage,
    limit: currentLimit,
    q: searchTerm,
  });

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      page: currentPage,
      limit: currentLimit,
      q: searchTerm,
    }));
  }, [currentPage, currentLimit, searchTerm]);

  const { data: products, refetch: productRefetch } = useProductList({
    query: { queryKey: ["product-list", params] },
    axios: { params },
  });

  const { data: servers, refetch: serverRefetch } = useServerList({
    query: { queryKey: ["server-list", params] },
    axios: { params },
  });

  const tableData = useMemo(() => {
    if (isHour) {
      return products?.data?.list ?? [];
    }
    return servers?.data?.list ?? [];
  }, [isHour, products, servers]);

  const renderStatus = useCallback((status: string) => {
    let color = "";

    if (status === "active") {
      color = "bg-primary";
    } else {
      color = "bg-[#6C757D]";
    }
    return (
      <div
        aria-label="status"
        className={`capitalize ${color} text-white px-2 py-1 rounded-3xl`}
        role="button"
      >
        {status.replace("_", " ")}
      </div>
    );
  }, []);

  const handleCreateProduct = () => {
    setSelectedProduct(null);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: List) => {
    setSelectedProduct(product);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleStatusChange = (product: List) => {
    setSelectedProduct(product);
    setIsStatusModalOpen(true);
  };

  const handleDelete = (product: List) => {
    setSelectedProduct(product);
    setIsStatusModalOpen(true);
  };

  const handleConfirmStatus = async () => {
    if (!selectedProduct) return;

    try {
      const newStatus =
        selectedProduct.status === "active" ? "inactive" : "active";

      if (isHour) {
        await handleUpdateStatus({ status: newStatus });
      } else {
        await handleUpdateServerStatus({ status: newStatus });
      }
      toastSuccess(
        `Product ${newStatus === "active" ? "activated" : "deactivated"} successfully`,
      );
      setIsStatusModalOpen(false);
      if (isHour) {
        productRefetch();
      } else {
        serverRefetch();
      }
    } catch (err: unknown) {
      toastError(err as string);
    }
  };
  const handleConfirmDelete = async () => {
    if (!selectedProduct?.id) return;

    try {
      if (isHour) {
        await handleDeleteHour(selectedProduct.id);
      } else {
        await handleDeleteServer(selectedProduct.id);
      }
      toastSuccess("Product deleted successfully");
      setIsStatusModalOpen(false);
      if (isHour) {
        productRefetch();
      } else {
        serverRefetch();
      }
    } catch (err: unknown) {
      toastError(err as string);
    }
  };

  const handleModalClose = () => {
    if (isHour) {
      productRefetch();
    } else {
      serverRefetch();
    }
  };
  return (
    <Card>
      <CardContent className="p-0 shadow-lg">
        <div className="p-6 bg-white rounded-md">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">{title}</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2 text-gray-500" />
                  <Input
                    placeholder="Search Product"
                    className="rounded-md pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button
                  className="bg-primary text-white"
                  onClick={handleCreateProduct}
                >
                  Create New Product +
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>{isHour ? "Credit Hour" : "Price"}</TableHead>
                    <TableHead>{isHour ? "Price" : "Validity"}</TableHead>
                    <TableHead>Benefit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>
                        {isHour
                          ? `${product.duration?.hours} hour`
                          : `$ ${product.price}`}
                      </TableCell>
                      <TableCell>
                        {isHour
                          ? `$ ${product.price}`
                          : `${product.validity} days`}
                      </TableCell>
                      <TableCell>
                        {product.benefit?.map((item) => (
                          <div className="flex items-center gap-1" key={item}>
                            <GoDotFill />
                            <p className="text-sm font-semibold">{item}</p>
                          </div>
                        ))}
                      </TableCell>
                      <TableCell>{renderStatus(product.status)}</TableCell>
                      <TableCell className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <EllipsisVertical className="w-5 h-5 mt-4 cursor-pointer" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-[138px]">
                            <DropdownMenuGroup>
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => handleEditProduct(product)}
                              >
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => handleStatusChange(product)}
                              >
                                {product.status === "active"
                                  ? "Deactivate"
                                  : "Activate"}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => handleDelete(product)}
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
              <PaginationWithoutLinks
                totalData={products?.data.total}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                perPage={10}
                setCurrentLimit={setCurrentLimit}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <ProductModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onClose={handleModalClose}
        id={selectedProduct?.id || ""}
        isHour={isHour}
        modeCreate={!isEditMode}
        initialData={selectedProduct}
      />
      <ConfirmStatusModal
        isOpen={isStatusModalOpen}
        setIsOpen={setIsStatusModalOpen}
        title="Attention"
        subtitle={`Are you sure you want to ${selectedProduct?.status === "active" ? "deactivate" : "activate"} "${selectedProduct?.name}"?`}
        onConfirm={handleConfirmStatus}
      />
      <DeleteModal
        isOpen={isStatusModalOpen}
        setIsOpen={setIsStatusModalOpen}
        title="Attention"
        subtitle={`Are you sure you want to delete"${selectedProduct?.name}"?`}
        onConfirm={handleConfirmDelete}
      />
    </Card>
  );
}
