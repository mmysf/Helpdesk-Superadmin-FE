/* eslint-disable no-use-before-define */
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

export interface CustomerB2c {
  id: string;
  company: Company;
  companyProduct: Company;
  name: string;
  email: string;
  isNeedBalance: boolean;
  subscription: Subscription | null;
  profilePicture: ProfilePicture;
  jobTitle: string;
  bio: string;
  role: string;
  isVerified: boolean;
  lastActivityAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subscription {
  status: string;
  hourPackage: null;
  balance: null;
  startAt: Date;
  endAt: Date;
}

export interface Company {
  id: string;
  name: string;
  image: string;
  type?: string;
  code?: string;
}

export interface ProfilePicture {
  id: string;
  name: string;
  size: number;
  url: string;
  type: string;
  category: string;
  isPrivate: boolean;
  providerKey: string;
}

export type CustomerListResponse = DefaultListResponse<Customer>;
export type CustomerB2CListResponse = DefaultListResponse<CustomerB2c>;
export type CustomerDetailResponse = DefaultResponse<Customer>;
export type CustomerCreateResponse = DefaultResponse;
export type CustomerUpdateResponse = DefaultResponse;
export type CustomerDeleteResponse = DefaultResponse;
export type CustomerUploadLogoResponse = DefaultResponse<CustomerLogo>;
