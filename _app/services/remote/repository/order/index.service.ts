import { useHttp, useHttpMutation } from "@/root/_app/hooks/http";
import API, { ORDER } from "..";
import { ServiceConfig, ServiceMutationConfig } from "../types";
import {
  HistoryHourListResponse,
  OrderDetailResponse,
  OrderPaymentUpdateStatusPayload,
  OrderPaymentUpdateStatusResponse,
  ResponseUploadAttachment,
} from "./type";

export const useOrderList = (
  config?: ServiceConfig<HistoryHourListResponse>,
) => {
  return useHttp(ORDER.LIST, {
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

export const useOrderDetail = (
  id: string,
  config?: ServiceConfig<OrderDetailResponse>,
) => {
  return useHttp(ORDER.DETAIL(id), {
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

export const useOrderStatusPayment = (
  id: string,
  config?: ServiceMutationConfig<
    OrderPaymentUpdateStatusResponse,
    OrderPaymentUpdateStatusPayload
  >,
) => {
  return useHttpMutation<
    OrderPaymentUpdateStatusResponse,
    OrderPaymentUpdateStatusPayload
  >(ORDER.UPDATE_PAYMENT(id), {
    method: "PATCH",
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

export const useUploadAttachmentProof = (
  config?: ServiceMutationConfig<ResponseUploadAttachment, unknown>,
) =>
  useHttpMutation<ResponseUploadAttachment, unknown>(
    API.ORDER.UPLOAD_ATTACHMENT,
    {
      method: "POST",
      httpOptions: config?.axios,
      queryOptions: config?.query,
    },
  );
