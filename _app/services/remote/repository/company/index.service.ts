import { useHttp, useHttpMutation } from "@/root/_app/hooks/http";
import { COMPANY, ServiceConfig, ServiceMutationConfig } from "..";
import {
  CompanyCreatePayload,
  CompanyCreateResponse,
  CompanyDetailResponse,
  CompanyListResponse,
  CompanyLogoUploadResponse,
} from "./types";

export * from "./types";

export const useCompanyList = (config?: ServiceConfig<CompanyListResponse>) => {
  return useHttp(COMPANY.LIST, {
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

export const useCompanyDetail = (
  id: string,
  config?: ServiceConfig<CompanyDetailResponse>,
) => {
  return useHttp(COMPANY.DETAIL(id), {
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

export const useCompanyCreate = (
  config?: ServiceMutationConfig<CompanyCreateResponse, CompanyCreatePayload>,
) => {
  return useHttpMutation<CompanyCreateResponse, CompanyCreatePayload>(
    COMPANY.CREATE,
    {
      method: "POST",
      httpOptions: config?.axios,
      queryOptions: config?.query,
    },
  );
};

export const useCompanyUpdate = (
  id: string,
  config?: ServiceMutationConfig<CompanyCreateResponse, CompanyCreatePayload>,
) => {
  return useHttpMutation<CompanyCreateResponse, CompanyCreatePayload>(
    COMPANY.UPDATE(id),
    {
      method: "PUT",
      httpOptions: config?.axios,
      queryOptions: config?.query,
    },
  );
};

export const useCompanyDelete = (
  id: string,
  config?: ServiceMutationConfig,
) => {
  return useHttpMutation(COMPANY.DELETE(id), {
    method: "DELETE",
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

export const useCompanyUploadLogo = (
  config?: ServiceMutationConfig<CompanyLogoUploadResponse>,
) => {
  return useHttpMutation<CompanyLogoUploadResponse>(COMPANY.UPLOAD_LOGO, {
    method: "POST",
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};
