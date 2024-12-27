import { useHttp, useHttpMutation } from "@/root/_app/hooks/http";
import { ServiceConfig, ServiceMutationConfig, TICKET_COMMENT } from "..";
import {
  TicketCommentCreatePayload,
  TicketCommentCreateResponse,
  TicketCommentDetailResponse,
  TicketCommentListResponse,
} from "./types";

export * from "./types";

export const useTicketCommentList = (
  ticketId: string,
  config?: ServiceConfig<TicketCommentListResponse>,
) => {
  return useHttp(TICKET_COMMENT.LIST(ticketId), {
    queryOptions: config?.query,
    httpOptions: config?.axios,
  });
};

export const useTicketCommentDetail = (
  id: string,
  config?: ServiceConfig<TicketCommentDetailResponse>,
) => {
  return useHttp(TICKET_COMMENT.DETAIL(id), {
    queryOptions: config?.query,
    httpOptions: config?.axios,
  });
};

export const useTicketCommentCreate = (
  config?: ServiceMutationConfig<
    TicketCommentCreateResponse,
    TicketCommentCreatePayload
  >,
) => {
  return useHttpMutation<
    TicketCommentCreateResponse,
    TicketCommentCreatePayload
  >(TICKET_COMMENT.CREATE, {
    method: "POST",
    queryOptions: config?.query,
    httpOptions: config?.axios,
  });
};
