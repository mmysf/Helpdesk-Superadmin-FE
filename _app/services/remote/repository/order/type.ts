import {
  DefaultListParams,
  DefaultListResponse,
  DefaultResponse,
} from "../types";

export interface HourPackage {
  id: string;
  name: string;
  hours: number;
  price: number;
  benefit: string[];
}

export interface ServerPackage {
  id: string;
  name: string;
  price: number;
  customizable: boolean;
  validity: number;
  benefit: string[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
}

export interface Invoice {
  invoiceURL: string;
  invoiceExternalId: string;
  invoiceXenditId: string;
  merchantName: string;
  PaymentMethod: string;
  bankCode: string;
  paymentChannel: string;
  paymentDestination: string;
  swiftCode: string;
}
export interface Attachment {
  id: string;
  name: string;
  size: number;
  url: string;
  type: string;
  category: string;
  isPrivate: boolean;
  providerKey: string;
}
export interface ManualPaid {
  accountName: string;
  accountNumber: string;
  bankName: string;
  note: string;
  attachment: Attachment;
  approval: undefined;
}

export interface Payment {
  status: string;
  manualPaid: ManualPaid;
  paidAt: string;
}

export interface List {
  id: string;
  hourPackage?: HourPackage;
  serverPackage?: ServerPackage;
  customer: Customer;
  invoice: Invoice;
  orderNumber: string;
  status: string;
  type: string;
  amount: number;
  tax: number;
  adminFee: number;
  discount: number;
  subTotal: number;
  grandTotal: number;
  grandTotalInIdr: number;
  note: string;
  payment: Payment;
  paidAt: null;
  expiredAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderHourListParams extends DefaultListParams {
  q?: string;
  types?: string;
}
export interface OrderPaymentUpdateStatusPayload {
  status: string;
}

export type HistoryHourListResponse = DefaultListResponse<List>;
export type OrderDetailResponse = DefaultResponse<List>;
export type OrderPaymentUpdateStatusResponse = DefaultResponse<List>;
