/* eslint-disable react/no-array-index-key */

"use client";

import { useCompanyList } from "@/root/_app/services/remote/repository/company/index.service";
import { DefaultListParams } from "@/root/_app/services/remote/repository";
import CompanyItem from "../../molecules/CompanyItem";
import PaginationWithoutLinks from "../PaginationWithoutLinks";

export default function CompanyDashboard() {
  const [params, setParams] = useState<DefaultListParams>({
    page: 1,
    limit: 3,
    search: "",
    sort: "createdAt",
    dir: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(3);
  const { data, isFetching } = useCompanyList({
    axios: { params },
    query: { queryKey: ["company-list", params] },
  });

  useEffect(() => {
    const setParamsTimeout = setTimeout(() => {
      setParams((val) => ({
        ...val,
        page: currentPage,
        limit: currentLimit,
        sort: "createdAt",
        dir: "desc",
      }));
    }, 3e2);

    return () => {
      clearTimeout(setParamsTimeout);
    };
  }, [currentPage, currentLimit]);

  return (
    <div className="container mx-auto">
      {!isFetching && (
        <>
          <h1 className="text-2xl font-semibold ml-5">Our Company Partner</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-2">
            {data?.data.list.map((item, index) => (
              <CompanyItem data={item} key={index} isLoading={isFetching} />
            ))}
          </div>
          <div className="flex justify-center mt-2">
            {!isFetching && (
              <PaginationWithoutLinks
                totalData={data?.data.total || 0}
                currentPage={currentPage}
                perPage={currentLimit}
                setCurrentPage={setCurrentPage}
                setCurrentLimit={setCurrentLimit}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
