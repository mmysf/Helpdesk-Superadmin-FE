/* eslint-disable react/jsx-curly-brace-presence */
import {
  CompanyListParams,
  useCompanyList,
} from "@/services_remote/repository/company/index.service";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/ui/input";
import { EllipsisVertical, Plus, Search } from "lucide-react";
import YecLogo from "@/assets/logo/yec-logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PaginationWithoutLinks from "../PaginationWithoutLinks";
import { CardContent, Card } from "../../ui/card";
import ConfirmDeleteModal from "../Modals/ModalDelete";

const CompanyTable = () => {
  const [params, setParams] = useState<Partial<CompanyListParams>>({});

  const { data, isFetching } = useCompanyList({
    axios: { params },
    query: { queryKey: ["company-list", params] },
  });

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [isOpenDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    const setParamsTimeout = setTimeout(() => {
      setParams((val) => ({
        ...val,
        search: searchTerm,
        page: currentPage,
        limit: currentLimit,
      }));
    }, 3e2);

    return () => {
      clearTimeout(setParamsTimeout);
    };
  }, [searchTerm, currentPage, currentLimit]);

  return (
    <Card>
      <CardContent className="p-0 shadow-lg">
        <div className="p-6 bg-white rounded-nd">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-semibold">Our Company Partner</h1>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Input
                    placeholder="Search by Name"
                    className="rounded-md pl-10"
                    value={searchTerm}
                    onChange={({ target }) => setSearchTerm(target.value)}
                  />
                </div>
                <Button
                  onClick={() => {
                    router.push("/bo/company/add-company");
                  }}
                  className="bg-primary text-white text-sm px-4 py-2"
                >
                  Add New Company <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Total Brand</TableHead>
                    <TableHead>Ticket Submitted</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isFetching ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        Memuat...
                      </TableCell>
                    </TableRow>
                  ) : (
                    data?.data?.list.map((company) => (
                      <TableRow key={company.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Image
                              src={YecLogo}
                              alt="company logo"
                              width={50}
                              height={50}
                            />
                            <div>
                              <p className="text-sm font-medium">
                                {company.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {company.settings.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{company.productTotal} Brand</TableCell>
                        <TableCell>{company.ticketTotal} Tickets</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-6 w-6 p-0 text-gray-900 hover:text-gray-700"
                              >
                                <EllipsisVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" sideOffset={4}>
                              <DropdownMenuItem
                                onClick={() => {
                                  router.push(`/bo/company/${company.id}`);
                                }}
                              >
                                Detail
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  router.push(
                                    `/bo/company/update-company/${company.id}`,
                                  );
                                }}
                              >
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => setOpenDelete(true)}
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
                totalData={data?.data?.total}
                currentPage={currentPage}
                perPage={currentLimit}
                setCurrentPage={setCurrentPage}
                setCurrentLimit={setCurrentLimit}
              />
            </div>
          </div>
          <ConfirmDeleteModal
            isOpen={isOpenDelete}
            setIsOpen={() => setOpenDelete(false)}
            title={"Attention"}
            subtitle={"Are you sure want to delete this company"}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyTable;
