import { DefaultListResponse } from "..";

export interface CompanySetting {
  code: string;
  email: string;
  color: string;
  subdomain: string;
}

export interface CompanyLogo {
  id: string;
  name: string;
  size: number;
  url: string;
  type: string;
  isPrivate: boolean;
  providerKey: string;
}

export interface CompanyList {
  id: string;
  accessKey: string;
  name: string;
  bio: string;
  type: string;
  productTotal: number;
  ticketTotal: number;
  logo: CompanyLogo;
  settings: CompanySetting;
  createdAt: string;
  updatedAt: string;
}

export interface CompanyListParams {
  page: number;
  limit: number;
}

export type CompanyListResponse = DefaultListResponse<CompanyList>;
