import {
  DefaultListParams,
  DefaultListResponse,
  DefaultResponse,
} from "../types";

export interface ProductDuration {
  id: string;
  name: string;
  durationInDays: number;
  activeCount: number;
  inactiveCount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductDurationListParams extends DefaultListParams {
  q?: string;
}

export interface ProductDurationCreatePayload {
  durationInMonth: number;
}

export type ProductDurationUpdatePayload = ProductDurationCreatePayload;

export interface ProductDurationUpdateStatusPayload {
  status: string;
}

export type ProductDurationListResponse = DefaultListResponse<ProductDuration>;
export type ProductDurationDetailResponse = DefaultResponse<ProductDuration>;
export type ProductDurationCreateResponse = DefaultResponse<ProductDuration>;
export type ProductDurationUpdateResponse = DefaultResponse<ProductDuration>;
export type ProductDurationUpdateStatusResponse =
  DefaultResponse<ProductDuration>;
export type ProductDurationDeleteResponse = DefaultResponse<ProductDuration>;
