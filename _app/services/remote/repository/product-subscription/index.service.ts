import { useHttp, useHttpMutation } from "@/root/_app/hooks/http";
import { ServiceConfig, ServiceMutationConfig } from "../types";
import { PRODUCT } from "..";
import {
  ProductSubscriptionCreatePayload,
  ProductSubscriptionCreateResponse,
  ProductSubscriptionDeleteResponse,
  ProductSubscriptionDetailResponse,
  ProductSubscriptionListResponse,
  ProductSubscriptionUpdatePayload,
  ProductSubscriptionUpdateResponse,
  ProductSubscriptionUpdateStatusPayload,
  ProductSubscriptionUpdateStatusResponse,
} from "./types";

export * from "./types";

export const useProductSubscriptionList = (
  config?: ServiceConfig<ProductSubscriptionListResponse>,
) => {
  return useHttp(PRODUCT.SUBSCRIPTION.LIST, {
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

export const useProductSubscriptionDetail = (
  id: string,
  config?: ServiceConfig<ProductSubscriptionDetailResponse>,
) => {
  return useHttp(PRODUCT.SUBSCRIPTION.DETAIL(id), {
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

export const useProductSubscriptionCreate = (
  config?: ServiceMutationConfig<
    ProductSubscriptionCreateResponse,
    ProductSubscriptionCreatePayload
  >,
) => {
  return useHttpMutation<
    ProductSubscriptionCreateResponse,
    ProductSubscriptionCreatePayload
  >(PRODUCT.SUBSCRIPTION.CREATE, {
    method: "POST",
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

export const useProductSubscriptionUpdate = (
  id: string,
  config?: ServiceMutationConfig<
    ProductSubscriptionUpdateResponse,
    ProductSubscriptionUpdatePayload
  >,
) => {
  return useHttpMutation<
    ProductSubscriptionUpdateResponse,
    ProductSubscriptionUpdatePayload
  >(PRODUCT.SUBSCRIPTION.UPDATE(id), {
    method: "PUT",
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

export const useProductSubscriptionUpdateStatus = (
  id: string,
  config?: ServiceMutationConfig<
    ProductSubscriptionUpdateStatusResponse,
    ProductSubscriptionUpdateStatusPayload
  >,
) => {
  return useHttpMutation<
    ProductSubscriptionUpdateStatusResponse,
    ProductSubscriptionUpdateStatusPayload
  >(PRODUCT.SUBSCRIPTION.UPDATE_STATUS(id), {
    method: "PATCH",
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

export const useProductSubscriptionDelete = (
  id: string,
  config?: ServiceMutationConfig<ProductSubscriptionDeleteResponse>,
) => {
  return useHttpMutation<ProductSubscriptionDeleteResponse>(
    PRODUCT.SUBSCRIPTION.DELETE(id),
    {
      method: "DELETE",
      httpOptions: config?.axios,
      queryOptions: config?.query,
    },
  );
};
