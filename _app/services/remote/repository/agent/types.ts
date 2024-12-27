import {
  DefaultListParams,
  DefaultListResponse,
  DefaultResponse,
  IdName,
} from "../types";

export interface Agent {
  id: string;
  company: IdName & { image: string };
  name: string;
  email: string;
  jobTitle: string;
  lastActivityAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AgentListParams extends DefaultListParams {
  q?: string;
}

export type AgentCreatePayload = {
  name: string;
  email: string;
};

export type AgentUpdatePayload = AgentCreatePayload;

export type AgentListResponse = DefaultListResponse<Agent>;
export type AgentDetailResponse = DefaultResponse<Agent>;
export type AgentCreateResponse = DefaultResponse;
export type AgentUpdateResponse = DefaultResponse;
export type AgentDeleteResponse = DefaultResponse;
