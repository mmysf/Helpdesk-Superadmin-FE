import { useHttp, useHttpMutation } from "@/root/_app/hooks/http";
import { ServiceConfig, ServiceMutationConfig } from "../types";
import { PRODUCT } from "..";
import {
  ProductDurationCreatePayload,
  ProductDurationCreateResponse,
  ProductDurationDeleteResponse,
  ProductDurationDetailResponse,
  ProductDurationListResponse,
  ProductDurationUpdatePayload,
  ProductDurationUpdateResponse,
  ProductDurationUpdateStatusPayload,
  ProductDurationUpdateStatusResponse,
} from "./types";

export * from "./types";

export const useProductDurationList = (
  config?: ServiceConfig<ProductDurationListResponse>,
) => {
  return useHttp(PRODUCT.DURATION.LIST, {
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

export const useProductDurationDetail = (
  id: string,
  config?: ServiceConfig<ProductDurationDetailResponse>,
) => {
  return useHttp(PRODUCT.DURATION.DETAIL(id), {
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

export const useProductDurationCreate = (
  config?: ServiceMutationConfig<
    ProductDurationCreateResponse,
    ProductDurationCreatePayload
  >,
) => {
  return useHttpMutation<
    ProductDurationCreateResponse,
    ProductDurationCreatePayload
  >(PRODUCT.DURATION.CREATE, {
    method: "POST",
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

export const useProductDurationUpdate = (
  id: string,
  config?: ServiceMutationConfig<
    ProductDurationUpdateResponse,
    ProductDurationUpdatePayload
  >,
) => {
  return useHttpMutation<
    ProductDurationUpdateResponse,
    ProductDurationUpdatePayload
  >(PRODUCT.DURATION.UPDATE(id), {
    method: "PUT",
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

export const useProductDurationUpdateStatus = (
  id: string,
  config?: ServiceMutationConfig<
    ProductDurationUpdateStatusResponse,
    ProductDurationUpdateStatusPayload
  >,
) => {
  return useHttpMutation<
    ProductDurationUpdateStatusResponse,
    ProductDurationUpdateStatusPayload
  >(PRODUCT.DURATION.UPDATE_STATUS(id), {
    method: "PUT",
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

export const useProductDurationDelete = (
  id: string,
  config?: ServiceMutationConfig<ProductDurationDeleteResponse>,
) => {
  return useHttpMutation<ProductDurationDeleteResponse>(
    PRODUCT.DURATION.DELETE(id),
    {
      method: "DELETE",
      httpOptions: config?.axios,
      queryOptions: config?.query,
    },
  );
};
