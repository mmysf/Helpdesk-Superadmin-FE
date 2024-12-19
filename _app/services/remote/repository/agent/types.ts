import {
  DataAttachment,
  DefaultListParams,
  DefaultListResponse,
  DefaultResponse,
  IdName,
} from "../types";

export interface AgentListParams extends DefaultListParams {
  q?: string;
  sort?: string;
  dir?: string;
}

export interface AgentCreatePayload {
  name: string;
  email: string;
  logoAttachId: string;
  companyId: string;
  code: string;
}

export type AgentUpdatePayload = Omit<AgentCreatePayload, "email">;

export interface AgentUploadLogoPayload {
  file: File;
}

export interface Agent {
  id: string;
  company: IdName;
  name: string;
  code: string;
  logo: DataAttachment;
  ticketTotal: number;
  createdAt: string;
  updatedAt: string;
  lastActivityAt: string | null;
}

export type AgentLogo = {
  id: string;
  company: IdName;
  name: string;
  provider: string;
  providerKey: string;
  type: string;
  size: number;
  url: string;
  expiredUrlAt: any;
  isUsed: boolean;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AgentListResponse = DefaultListResponse<Agent>;
export type AgentDetailResponse = DefaultResponse<Agent>;
export type AgentCreateResponse = DefaultResponse;
export type AgentUpdateResponse = DefaultResponse;
export type AgentDeleteResponse = DefaultResponse;
export type AgentUploadLogoResponse = DefaultResponse<AgentLogo>;
