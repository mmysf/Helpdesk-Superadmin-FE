import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/ui/input";
import { Plus, Search } from "lucide-react";
import YecLogo from "@/assets/logo/yec-logo.png";
import Image from "next/image";
import PaginationWithoutLinks from "../PaginationWithoutLinks";

const COMPANY = Array.from({ length: 30 }, (_, index) => ({
  name: `Company ${index + 1}`,
  logo: `@/assets/logo/yec-logo-${index + 1}.png`,
  email: `company${index + 1}@example.com`,
  totalBrand: Math.floor(Math.random() * 10) + 1,
  totalTickets: Math.floor(Math.random() * 50) + 1,
}));

const CompanyTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = COMPANY.filter(
    (customer) =>
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="p-6 bg-white min-h-screen shadow-lg rounded-sm">
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
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="bg-primary text-white text-sm px-4 py-2">
              Add New Company <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className="font-semibold">Name</TableCell>
              <TableCell className="font-semibold">Total Brand</TableCell>
              <TableCell className="font-semibold">Ticket Submitted</TableCell>
              <TableCell className="font-semibold">Action</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((company) => (
              <TableRow key={company.name}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Image
                      src={YecLogo}
                      alt="company logo"
                      width={50}
                      height={50}
                    />
                    <div>
                      <p className="text-sm font-medium">{company.name}</p>
                      <p className="text-sm text-gray-500">{company.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{company.totalBrand} Brand</TableCell>
                <TableCell>{company.totalTickets} Tickets</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-6 w-6 p-0 text-gray-900 hover:text-gray-700"
                      >
                        ...
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" sideOffset={4}>
                      <DropdownMenuItem>Detail</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-center items-center mt-2">
          <PaginationWithoutLinks
            totalData={filteredData.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPage={10}
            setCurrentLimit={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyTable;
