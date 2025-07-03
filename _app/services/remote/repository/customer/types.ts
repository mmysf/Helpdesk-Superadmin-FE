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
  companyProductID?: string;
  companyID?: string;
  type?: string;
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
  marketType: string;
}

export interface Subscription {
  status: string;
  hourPackage: HourPackage | null;
  balance: Balance | null;
  startAt: Date;
  endAt: Date;
}

export interface Balance {
  time: Time;
  ticket: Ticket;
}

export interface Ticket {
  remaining: number;
  used: number;
}

export interface Time {
  total: number;
  remaining: Remaining;
  used: number;
}

export interface Remaining {
  total: number;
  hour: number;
  minute: number;
  second: number;
}

export interface HourPackage {
  id: string;
  name: string;
  hours: number;
  price: number;
  benefit: string[];
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

// Subscription

export interface CustomerB2CSubscription {
  id: string;
  customer: Customer;
  hourPackage: null;
  serverPackage: ServerPackage;
  order: Order;
  status: string;
  expiredAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerSubs {
  id: string;
  name: string;
  email: string;
  marketType: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  type: string;
}

export interface ServerPackage {
  id: string;
  name: string;
  price: number;
  customizable: boolean;
  validity: number;
  benefit: string[];
}

export type CustomerListResponse = DefaultListResponse<Customer>;
export type CustomerB2CListResponse = DefaultListResponse<CustomerB2c>;
export type CustomerB2CSubscriptionListResponse =
  DefaultListResponse<CustomerB2CSubscription>;
export type CustomerDetailResponse = DefaultResponse<Customer>;
export type CustomerB2CDetailResponse = DefaultResponse<CustomerB2c>;
export type CustomerCreateResponse = DefaultResponse;
export type CustomerUpdateResponse = DefaultResponse;
export type CustomerDeleteResponse = DefaultResponse;
export type CustomerUploadLogoResponse = DefaultResponse<CustomerLogo>;
