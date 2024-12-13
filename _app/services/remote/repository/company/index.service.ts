import { useHttp } from "@/root/_app/hooks/http";
import { COMPANY, ServiceConfig } from "..";
import { CompanyListResponse } from "./types";

export * from "./types";

export const useCompanyList = (config?: ServiceConfig<CompanyListResponse>) => {
  return useHttp(COMPANY.LIST, {
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};
