import { useHttp } from "@/root/_app/hooks/http";
import { TicketListResponse } from "./types";
import { ServiceConfig } from "../types";
import { TICKET } from "..";

export * from "./types";

export const useTicketList = (config?: ServiceConfig<TicketListResponse>) => {
  return useHttp(TICKET.LIST, {
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

export const useTicketDetail = (id: string, config?: ServiceConfig) => {
  return useHttp(TICKET.DETAIL(id), {
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};
