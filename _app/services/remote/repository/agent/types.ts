import {
  DefaultListParams,
  DefaultListResponse,
  DefaultResponse,
} from "../types";

export interface Agent {
  id: string;
  name: string;
  email: string;
}

export interface AgentListParams extends DefaultListParams {
  q?: string;
}

export type AgentCreatePayload = {
  name: string;
  email: string;
};

export type AgentUpdatePayload = AgentCreatePayload;

export type AgentListResponse = DefaultListResponse;
export type AgentDetailResponse = DefaultResponse;
export type AgentCreateResponse = DefaultResponse;
export type AgentUpdateResponse = DefaultResponse;
export type AgentDeleteResponse = DefaultResponse;
