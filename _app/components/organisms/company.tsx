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

const allCompanies = Array.from({ length: 30 }, (_, index) => ({
  name: `Company ${index + 1}`,
  logo: `/path-to-logo/company-${index + 1}.png`,
  email: `company${index + 1}@example.com`,
  totalBrand: Math.floor(Math.random() * 10) + 1,
  totalTickets: Math.floor(Math.random() * 50) + 1,
}));

const ITEMS_PER_PAGE = 6;

const Company = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allCompanies.length / ITEMS_PER_PAGE);
  const currentData = allCompanies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const goToPage = (page: number) => setCurrentPage(page);
  const nextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div className="container mx-auto px-4">
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
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    width={20}
                    height={20}
                    className="w-8 h-8 rounded-full"
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

      <div className="flex justify-center items-center mt-4 space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            variant={currentPage === index + 1 ? "default" : "outline"}
            size="sm"
            onClick={() => goToPage(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Company;
