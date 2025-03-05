import { useHttp, useHttpMutation } from "@/root/_app/hooks/http";
import { PRODUCT, ServiceConfig, ServiceMutationConfig } from "..";
import {
  ProductCreatePayload,
  ProductDeleteResponse,
  ProductHourCreateResponse,
  ProductHourUpdateResponse,
  ProductListResponse,
  ProductListServerResponse,
  ProductServerCreateResponse,
  ProductServerUpdateResponse,
  ProductUpdatePayload,
  ProductUpdateStatusPayload,
  ProductUpdateStatusResponse,
} from "./type";

// hour
export const useProductList = (config?: ServiceConfig<ProductListResponse>) => {
  return useHttp(PRODUCT.HOUR.LIST, {
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

export const useProductHourCreate = (
  config?: ServiceMutationConfig<
    ProductHourCreateResponse,
    ProductCreatePayload
  >,
) => {
  return useHttpMutation<ProductHourCreateResponse, ProductCreatePayload>(
    PRODUCT.HOUR.CREATE,
    {
      method: "POST",
      httpOptions: config?.axios,
      queryOptions: config?.query,
    },
  );
};

export const useProductHourUpdate = (
  id: string,
  config?: ServiceMutationConfig<
    ProductHourUpdateResponse,
    ProductUpdatePayload
  >,
) => {
  return useHttpMutation<ProductHourUpdateResponse, ProductUpdatePayload>(
    PRODUCT.HOUR.UPDATE(id),
    {
      method: "PUT",
      httpOptions: config?.axios,
      queryOptions: config?.query,
    },
  );
};

export const useProductHourUpdateStatus = (
  id: string,
  config?: ServiceMutationConfig<
    ProductUpdateStatusResponse,
    ProductUpdateStatusPayload
  >,
) => {
  return useHttpMutation<
    ProductUpdateStatusResponse,
    ProductUpdateStatusPayload
  >(PRODUCT.HOUR.UPDATE_STATUS(id), {
    method: "PATCH",
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

export const useProductHourDelete = (
  id: string,
  config?: ServiceMutationConfig<ProductDeleteResponse>,
) => {
  return useHttpMutation<ProductDeleteResponse>(PRODUCT.HOUR.DELETE(id), {
    method: "DELETE",
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

// server
export const useServerList = (
  config?: ServiceConfig<ProductListServerResponse>,
) => {
  return useHttp(PRODUCT.SERVER.LIST, {
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

export const useProductServerCreate = (
  config?: ServiceMutationConfig<
    ProductServerCreateResponse,
    ProductCreatePayload
  >,
) => {
  return useHttpMutation<ProductServerCreateResponse, ProductCreatePayload>(
    PRODUCT.SERVER.CREATE,
    {
      method: "POST",
      httpOptions: config?.axios,
      queryOptions: config?.query,
    },
  );
};
export const useProductServerUpdate = (
  id: string,
  config?: ServiceMutationConfig<
    ProductServerUpdateResponse,
    ProductUpdatePayload
  >,
) => {
  return useHttpMutation<ProductServerUpdateResponse, ProductUpdatePayload>(
    PRODUCT.SERVER.UPDATE(id),
    {
      method: "PUT",
      httpOptions: config?.axios,
      queryOptions: config?.query,
    },
  );
};

export const useProductServerUpdateStatus = (
  id: string,
  config?: ServiceMutationConfig<
    ProductUpdateStatusResponse,
    ProductUpdateStatusPayload
  >,
) => {
  return useHttpMutation<
    ProductUpdateStatusResponse,
    ProductUpdateStatusPayload
  >(PRODUCT.SERVER.UPDATE_STATUS(id), {
    method: "PATCH",
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};
export const useProductServerDelete = (
  id: string,
  config?: ServiceMutationConfig<ProductDeleteResponse>,
) => {
  return useHttpMutation<ProductDeleteResponse>(PRODUCT.SERVER.DELETE(id), {
    method: "DELETE",
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};
