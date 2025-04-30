/* eslint-disable no-use-before-define */
import { DefaultListParams, DefaultListResponse } from "../types";

export interface Duration {
  hours: number;
  totalInSeconds: number;
}

export interface Additional {
  ticketLimit: unknown;
}
export interface List {
  id: string;
  name: string;
  description: string;
  benefit: string[];
  price: Price;
  duration: Duration;
  additional: Additional;
  status: string;
  createdAt: string;
  updatedAt: string;
  customizable: boolean;
  validity: number;
  marketType: string[];
}

export interface Price {
  idr?: number;
  usd?: number;
}

export interface ProductCreatePayload {
  benefit: string[];
  categoryId: string;
  durationHours: number;
  name: string;
  validity: number;
  priceIdr: number;
  priceUsd: number;
  customizable: boolean;
  isIndonesia: boolean;
  isInternational: boolean;
  marketType: string[];
}

export type ProductUpdatePayload = ProductCreatePayload;

export interface ProductListParams extends DefaultListParams {
  q?: string;
}
export interface ProductUpdateStatusPayload {
  status: string;
}

export type ProductListResponse = DefaultListResponse<List>;
export type ProductListServerResponse = DefaultListResponse<List>;
export type ProductHourCreateResponse = DefaultListResponse<List>;
export type ProductServerCreateResponse = DefaultListResponse<List>;
export type ProductHourUpdateResponse = DefaultListResponse<List>;
export type ProductServerUpdateResponse = DefaultListResponse<List>;
export type ProductUpdateStatusResponse = DefaultListResponse<List>;
export type ProductDeleteResponse = DefaultListResponse<List>;
