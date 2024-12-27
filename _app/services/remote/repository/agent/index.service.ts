import { useHttp, useHttpMutation } from "@/root/_app/hooks/http";
import { ServiceConfig, ServiceMutationConfig } from "../types";
import { AGENT } from "..";

export * from "./types";

export const useAgentList = (config?: ServiceConfig) => {
  return useHttp(AGENT.LIST, {
    queryOptions: config?.query,
    httpOptions: config?.axios,
  });
};

export const useAgentCreate = (config?: ServiceMutationConfig) => {
  return useHttpMutation(AGENT.CREATE, {
    method: "POST",
    queryOptions: config?.query,
    httpOptions: config?.axios,
  });
};

export const useAgentDetail = (id: string, config?: ServiceConfig) => {
  return useHttp(AGENT.DETAIL(id), {
    queryOptions: config?.query,
    httpOptions: config?.axios,
  });
};

export const useAgentUpdate = (id: string, config?: ServiceMutationConfig) => {
  return useHttpMutation(AGENT.UPDATE(id), {
    method: "PUT",
    queryOptions: config?.query,
    httpOptions: config?.axios,
  });
};

export const useAgentDelete = (id: string, config?: ServiceMutationConfig) => {
  return useHttpMutation(AGENT.DELETE(id), {
    method: "DELETE",
    queryOptions: config?.query,
    httpOptions: config?.axios,
  });
};
