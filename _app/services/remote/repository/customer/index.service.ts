import { useHttp, useHttpMutation } from "@/root/_app/hooks/http";
import { ServiceConfig, ServiceMutationConfig } from "../types";
import { CUSTOMER, CUSTOMER_B2C } from "..";
import {
  CustomerB2CDetailResponse,
  CustomerB2CListResponse,
  CustomerB2CSubscriptionListResponse,
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

export const useCustomerCompanyList = (
  config?: ServiceConfig<CustomerB2CListResponse>,
) => {
  return useHttp(CUSTOMER.CUSTOMER_LIST, {
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
  config?: ServiceMutationConfig<CustomerCreateResponse, CustomerCreatePayload>,
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
  config?: ServiceMutationConfig<CustomerUpdateResponse, CustomerUpdatePayload>,
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
    CustomerUploadLogoResponse,
    CustomerUploadLogoPayload
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

// B2C

export const useCustomerB2cList = (
  config?: ServiceConfig<CustomerB2CListResponse>,
) => {
  return useHttp(CUSTOMER_B2C.LIST, {
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

export const useCustomerB2cSubscriptionList = (
  id: string,
  config?: ServiceConfig<CustomerB2CSubscriptionListResponse>,
) => {
  return useHttp(CUSTOMER_B2C.SUBS_SERVER(id), {
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

export const useCustomerB2cDetail = (
  id: string,
  config?: ServiceConfig<CustomerB2CDetailResponse>,
) => {
  return useHttp(CUSTOMER_B2C.DETAIL(id), {
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

export const useCustomerB2cDelete = (
  id: string,
  config?: ServiceMutationConfig<CustomerDeleteResponse>,
) => {
  return useHttpMutation(CUSTOMER_B2C.DELETE(id), {
    method: "DELETE",
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};
