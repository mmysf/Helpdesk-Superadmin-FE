import { useHttp, useHttpMutation } from "@/root/_app/hooks/http";
import { ServiceConfig, ServiceMutationConfig } from "../types";
import { AGENT } from "..";
import {
  AgentCreatePayload,
  AgentCreateResponse,
  AgentDeleteResponse,
  AgentDetailResponse,
  AgentListResponse,
  AgentUpdatePayload,
  AgentUpdateResponse,
  AgentUploadLogoPayload,
  AgentUploadLogoResponse,
} from "./types";

export * from "./types";

export const useAgentList = (config?: ServiceConfig<AgentListResponse>) => {
  return useHttp(AGENT.LIST, {
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

export const useAgentDetail = (
  id: string,
  config?: ServiceConfig<AgentDetailResponse>,
) => {
  return useHttp(AGENT.DETAIL(id), {
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

export const useAgentCreate = (
  config?: ServiceMutationConfig<AgentCreatePayload, AgentCreateResponse>,
) => {
  return useHttpMutation<AgentCreateResponse, AgentCreatePayload>(
    AGENT.CREATE,
    {
      method: "POST",
      httpOptions: config?.axios,
      queryOptions: config?.query,
    },
  );
};

export const useAgentUpdate = (
  id: string,
  config?: ServiceMutationConfig<AgentUpdatePayload, AgentUpdateResponse>,
) => {
  return useHttpMutation<AgentUpdateResponse, AgentUpdatePayload>(
    AGENT.UPDATE(id),
    {
      method: "PUT",
      httpOptions: config?.axios,
      queryOptions: config?.query,
    },
  );
};

export const useAgentDelete = (
  id: string,
  config?: ServiceMutationConfig<AgentDeleteResponse>,
) => {
  return useHttpMutation(AGENT.DELETE(id), {
    method: "DELETE",
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};

export const useAgentUploadLogo = (
  config?: ServiceMutationConfig<
    AgentUploadLogoPayload,
    AgentUploadLogoResponse
  >,
) => {
  return useHttpMutation<AgentUploadLogoResponse, FormData>(AGENT.UPLOAD_LOGO, {
    method: "POST",
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};
