/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable no-use-before-define */
export interface StatsResponse {
  status: number;
  message: string;
  validation: Validation;
  data: Data;
}

export interface Data {
  totalAgent: number;
  totalClient: number;
  totalCustomer: number;
  totalNewTicket: number;
  totalOrder: number;
}

export interface Validation {}
