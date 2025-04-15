import {
  DataAttachment,
  DefaultListParams,
  DefaultListResponse,
  DefaultResponse,
  IdName,
} from "../types";

export interface CustomerListParams extends DefaultListParams {
  q?: string;
  sort?: string;
  dir?: string;
}

export interface CustomerCreatePayload {
  name: string;
  email: string;
  logoAttachId: string;
  companyId: string;
  code: string;
}

export type CustomerUpdatePayload = Omit<CustomerCreatePayload, "email">;

export interface CustomerUploadLogoPayload {
  file: File;
}

export interface Customer {
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

export type CustomerLogo = {
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
};

export type CustomerListResponse = DefaultListResponse<Customer>;
export type CustomerDetailResponse = DefaultResponse<Customer>;
export type CustomerCreateResponse = DefaultResponse;
export type CustomerUpdateResponse = DefaultResponse;
export type CustomerDeleteResponse = DefaultResponse;
export type CustomerUploadLogoResponse = DefaultResponse<CustomerLogo>;
