/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { DefaultListParams } from "@/root/_app/services/remote/repository";
import {
  Company,
  useCompanyList,
} from "@/root/_app/services/remote/repository/company/index.service";

interface FilterDashboardProps {
  isOpen: boolean;
  isCompany?: boolean;
  onClose: () => void;
  onApplyFilters: (filters: {
    sort: string;
    code: string;
    companyID: string;
  }) => void;
}

export default function FilterModal({
  isOpen,
  isCompany = false,
  onClose,
  onApplyFilters,
}: FilterDashboardProps) {
  const [hasMore, setHasMore] = useState(true);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filters, setFilters] = useState({
    sort: "",
    code: "",
    companyID: "",
  });

  const [params, setParams] = useState<DefaultListParams>({
    page: 1,
    limit: 4,
    sort: "createdAt",
    dir: "desc",
  });

  const { data, isFetching } = useCompanyList({
    axios: { params },
    query: { queryKey: ["company-list", params] },
  });

  useEffect(() => {
    if (data?.data?.list?.length) {
      setCompanies((prev) => [...prev, ...data.data.list]);
    }

    setHasMore(
      companies.length + (data?.data?.list?.length ?? 0) <
        (data?.data?.total ?? 0),
    );
  }, [data]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    onApplyFilters(filters);
  };

  const handleReset = () => {
    setFilters({
      sort: "",
      code: "",
      companyID: "",
    });
    applyFilters();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" rounded-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Filter
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <Select
            onValueChange={(value) => handleFilterChange("sort", value)}
            value={filters.sort}
            defaultValue="createdAt"
          >
            <SelectTrigger className="w-full bg-gray-200">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Date Created</SelectItem>
              <SelectItem value="updatedAt">Last Modified</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="text"
            placeholder="Search by Ticket ID"
            className="w-full bg-gray-200"
            wrapperClass="p-0 border-none bg-gray-200"
            onChange={(e) => handleFilterChange("code", e.target.value)}
            value={filters.code}
          />
          {!isCompany && (
            <Select
              onValueChange={(value) => handleFilterChange("companyID", value)}
              value={filters.companyID}
            >
              <SelectTrigger className="w-full bg-gray-200">
                <SelectValue placeholder="Select Company" />
              </SelectTrigger>
              <SelectContent>
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))}
                {isFetching && <p>Loading...</p>}
                {!isFetching && companies.length === 0 && (
                  <div className="w-full flex justify-center">
                    <p>No companies found</p>
                  </div>
                )}
                {!isFetching && hasMore && (
                  <div className="w-full flex justify-center">
                    <Button
                      onClick={() =>
                        setParams((prev) => ({
                          ...prev,
                          page: (params.page ?? 0) + 1,
                        }))
                      }
                    >
                      load more
                    </Button>
                  </div>
                )}
              </SelectContent>
            </Select>
          )}
        </div>

        <DialogFooter className="flex justify-between mt-6 ">
          <Button
            variant="outline"
            className="px-4 py-2 rounded-lg items-center"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            className="px-4 py-2 rounded-lg items-center"
            onClick={applyFilters}
          >
            Filter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
