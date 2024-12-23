import { useHttp, useHttpMutation } from "@/root/_app/hooks/http";
import { ServiceConfig, ServiceMutationConfig } from "../types";
import { CUSTOMER } from "..";
import {
  CustomerCreatePayload,
  CustomerCreateResponse,
  CustomerDeleteResponse,
  CustomerDetailResponse,
  CustomerListResponse,
  CustomerUpdatePayload,
  CustomerUpdateResponse,
  CustomerUploadLogoPayload,
  CustomerUploadLogoResponse,
} from "./types";

export * from "./types";

export const useCustomerList = (
  config?: ServiceConfig<CustomerListResponse>,
) => {
  return useHttp(CUSTOMER.LIST, {
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

export const useCustomerDetail = (
  id: string,
  config?: ServiceConfig<CustomerDetailResponse>,
) => {
  return useHttp(CUSTOMER.DETAIL(id), {
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

export const useCustomerCreate = (
  config?: ServiceMutationConfig<CustomerCreatePayload, CustomerCreateResponse>,
) => {
  return useHttpMutation<CustomerCreateResponse, CustomerCreatePayload>(
    CUSTOMER.CREATE,
    {
      method: "POST",
      httpOptions: config?.axios,
      queryOptions: config?.query,
    },
  );
};

export const useCustomerUpdate = (
  id: string,
  config?: ServiceMutationConfig<CustomerUpdatePayload, CustomerUpdateResponse>,
) => {
  return useHttpMutation<CustomerUpdateResponse, CustomerUpdatePayload>(
    CUSTOMER.UPDATE(id),
    {
      method: "PUT",
      httpOptions: config?.axios,
      queryOptions: config?.query,
    },
  );
};

export const useCustomerDelete = (
  id: string,
  config?: ServiceMutationConfig<CustomerDeleteResponse>,
) => {
  return useHttpMutation(CUSTOMER.DELETE(id), {
    method: "DELETE",
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

export const useCustomerUploadLogo = (
  config?: ServiceMutationConfig<
    CustomerUploadLogoPayload,
    CustomerUploadLogoResponse
  >,
) => {
  return useHttpMutation<CustomerUploadLogoResponse, FormData>(
    CUSTOMER.UPLOAD_LOGO,
    {
      method: "POST",
      httpOptions: config?.axios,
      queryOptions: config?.query,
    },
  );
};
