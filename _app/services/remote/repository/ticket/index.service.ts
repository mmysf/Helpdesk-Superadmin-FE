import { useHttp, useHttpMutation } from "@/root/_app/hooks/http";
import {
  TicketAssignToPayload,
  TicketAverageResponse,
  TicketDetailResponse,
  TicketListResponse,
  TicketTotalDBDResponse,
} from "./types";
import { ServiceConfig, ServiceMutationConfig } from "../types";
import { TICKET } from "..";

export * from "./types";

export const useTicketList = (config?: ServiceConfig<TicketListResponse>) => {
  return useHttp(TICKET.LIST, {
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

export const useTicketDetail = (
  id: string,
  config?: ServiceConfig<TicketDetailResponse>,
) => {
  return useHttp(TICKET.DETAIL(id), {
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

export const useTicketTotalDBD = (
  companyId: string,
  config?: ServiceConfig<TicketTotalDBDResponse>,
) => {
  return useHttp(TICKET.TOTAL_DBD(companyId), {
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

export const useTicketAverage = (
  companyId: string,
  config?: ServiceConfig<TicketAverageResponse>,
) => {
  return useHttp(TICKET.AVERAGE(companyId), {
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

export const useTicketAssignTo = (
  id: string,
  config?: ServiceMutationConfig<TicketAssignToPayload>,
) => {
  return useHttpMutation<unknown, TicketAssignToPayload>(TICKET.ASSIGN(id), {
    method: "POST",
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};
