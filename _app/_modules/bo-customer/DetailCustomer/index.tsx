/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */

"use client";

import PaginationWithoutLinks from "@/root/_app/components/organisms/PaginationWithoutLinks";
import { Button } from "@/root/_app/components/ui/button";
import {
  CustomerListParams,
  useCustomerCompanyList,
  useCustomerDetail,
} from "@/root/_app/services/remote/repository/customer/index.service";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/ui/table";
import { ArrowLeftCircle, Loader } from "lucide-react";
import { useMemo, useEffect, useState } from "react";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/root/_app/components/ui/card";

interface Props {
  params?: { [key: string]: string };
  // searchParams?: { [key: string]: string };
}
export default function DetailCustomer({ params }: Props) {
  const router = useRouter();
  const agentId = useMemo(() => params?.id, [params]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const { data } = useCustomerDetail(agentId || "", {
    query: { queryKey: ["agent-detail", agentId] },
  });
  const [paramsCustomer, setParamsCustomer] = useState<CustomerListParams>({
    page: 1,
    limit: 10,
    sort: "createdAt",
    dir: "desc",
    companyProductID: agentId,
  });

  const { data: dataCustomer, isPending } = useCustomerCompanyList({
    axios: { params: paramsCustomer },
    query: { queryKey: ["customer-list", paramsCustomer] },
  });

  const tableData = useMemo(() => dataCustomer?.data.list, [dataCustomer]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setParamsCustomer({
        page: currentPage,
        limit: currentLimit,
        sort: "createdAt",
        dir: "desc",
        companyProductID: agentId,
      });
    }, 3e2);

    return () => clearTimeout(timeout);
  }, [currentPage, currentLimit, agentId]);

  return (
    <div className="p-6">
      <div className="flex items-center">
        <Button onClick={() => router.back()} variant="ghost">
          <ArrowLeftCircle size={20} />
        </Button>
        <h1>Detail Customer</h1>
      </div>

      <Card className="w-fit">
        <div className="flex justify-between items-center p-4">
          <span className="text-xs font-medium">Customer B2B Detail</span>
        </div>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              {!isPending && data?.data.logo.url && (
                <Image
                  className="flex-none w-10 h-10 rounded-full object-cover"
                  src={data?.data.logo.url || ""}
                  width={40}
                  height={40}
                  alt="avatar"
                />
              )}
              <div className="ml-4">
                <p className="text-sm font-medium leading-none">
                  {data?.data.name}
                </p>
                <p className="text-xs text-slate-400">
                  {data?.data.company.name}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="overflow-x-auto rounded-md border mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Last Activity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <>
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

              {!isPending && (tableData || []).length === 0 && (
                <TableRow>
                  <TableCell className="text-center" colSpan={6}>
                    No data found
                  </TableCell>
                </TableRow>
              )}

              {!isPending &&
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
                      <p className="whitespace-nowrap text-start">
                        {item.lastActivityAt !== null
                          ? format(
                              new Date(item.lastActivityAt),
                              "dd MMM yyyy, HH:mm",
                            )
                          : "-"}
                      </p>
                    </TableCell>
                    {/* <TableCell
                    // onClick={() => {
                    //   setSelectedId(item.id);
                    //   setDetailOpen(true);
                    // }}
                    >
                      <div className="cursor-pointer">
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
                    </TableCell> */}
                    {/* <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-6 w-6 p-0">
                            <EllipsisVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" sideOffset={4}>
                          <DropdownMenuItem
                            className="text-default hover:text-white hover:bg-gray-500"
                            onClick={() => {
                              setSelectedId(item.id);
                              setDetailOpen(true);
                            }}
                          >
                            Detail
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
                    </TableCell> */}
                  </TableRow>
                ))}
            </>
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center items-center mt-2">
        {!isPending && (tableData || []).length > 0 && (
          <PaginationWithoutLinks
            totalData={dataCustomer?.data.total || 1}
            currentPage={currentPage}
            perPage={currentLimit}
            setCurrentPage={setCurrentPage}
            setCurrentLimit={setCurrentLimit}
          />
        )}
      </div>
    </div>
  );
}
