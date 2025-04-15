import { ProductDuration } from "../product-duration/types";
import {
  DefaultListParams,
  DefaultListResponse,
  DefaultResponse,
} from "../types";

export interface ProductSubscriptionDuration {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  totalInSeconds: number;
}

export interface ProductSubscriptionAdditional {
  ticketLimit: null;
}

export interface ProductSubscription {
  id: string;
  category: Pick<ProductDuration, "id" | "name" | "durationInDays">;
  name: string;
  description: string;
  benefit: string[];
  price: number;
  duration: ProductSubscriptionDuration;
  additional: ProductSubscriptionAdditional;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductSubscriptionListParams extends DefaultListParams {
  q?: string;
}

export interface ProductSubscriptionCreatePayload {
  name: string;
  categoryId: string;
  durationHours: number;
  price: number;
  benefit: string[];
}

export type ProductSubscriptionUpdatePayload = ProductSubscriptionCreatePayload;

export interface ProductSubscriptionUpdateStatusPayload {
  status: string;
}

export type ProductSubscriptionListResponse =
  DefaultListResponse<ProductSubscription>;
export type ProductSubscriptionDetailResponse =
  DefaultResponse<ProductSubscription>;
export type ProductSubscriptionCreateResponse =
  DefaultResponse<ProductSubscription>;
export type ProductSubscriptionUpdateResponse =
  DefaultResponse<ProductSubscription>;
export type ProductSubscriptionUpdateStatusResponse =
  DefaultResponse<ProductSubscription>;
export type ProductSubscriptionDeleteResponse =
  DefaultResponse<ProductSubscription>;
