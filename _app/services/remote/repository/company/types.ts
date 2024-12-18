import {
  DataAttachment,
  DefaultListResponse,
  DefaultResponse,
  IdName,
} from "..";

export interface CompanySetting {
  code: string;
  email: string;
  color: string;
  subdomain: string;
}

export interface Company {
  id: string;
  accessKey: string;
  name: string;
  bio: string;
  type: string;
  productTotal: number;
  ticketTotal: number;
  logo: DataAttachment;
  settings: CompanySetting;
  createdAt: string;
  updatedAt: string;
}

export interface CompanyListParams {
  page: number;
  limit: number;
}

export interface CompanyCreatePayload {
  name: string;
  email: string;
  logoAttachId: string;
  primaryColor: string;
  subdomain: string;
}

export interface CompanyLogoUpload {
  id: string;
  company: IdName;
  name: string;
  provider: string;
  providerKey: string;
  type: string;
  size: number;
  url: string;
  expiredUrlAt: string | null;
  isUsed: boolean;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CompanyLogoUploadPayload {
  file: File;
}

export type CompanyListResponse = DefaultListResponse<Company>;
export type CompanyDetailResponse = DefaultResponse<Company>;
export type CompanyCreateResponse = DefaultResponse<Company>;
export type CompanyLogoUploadResponse = DefaultResponse<CompanyLogoUpload>;
