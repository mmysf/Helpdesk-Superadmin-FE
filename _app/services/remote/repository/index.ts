import { DefaultError } from "@/hooks/http";
import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface DefaultResponse<R = unknown> {
  data: R;
  message: string;
  status: number;
  validation: unknown;
}

export interface DefaultListResponse<R = unknown> extends DefaultResponse {
  data: {
    list: R[];
    page: number;
    limit: number;
    total: number;
  };
}

export interface ServiceMutationConfig<Res = unknown, Var = unknown> {
  axios?: AxiosRequestConfig;
  query?: UseMutationOptions<Res, AxiosResponse<DefaultError>, Var>;
}

export interface ServiceConfig<Res = unknown> {
  axios?: AxiosRequestConfig;
  query?: UseQueryOptions<Res, AxiosResponse<DefaultError>>;
}

export const AUTH = {
  LOGIN: `superadmin/auth/login`,
  ME: `superadmin/auth/login`,
};

export const COMPANY = {
  LIST: `superadmin/company/list`,
  DETAIL: (id: string) => `superadmin/company/detail/${id}`,
  DETAIL_BY_SUBDOMAIN: (subdomain: string) =>
    `superadmin/company/detail-by-subdomain/${subdomain}`,
  CREATE: `superadmin/company/create`,
  UPDATE: (id: string) => `superadmin/company/update/${id}`,
  DELETE: (id: string) => `superadmin/company/delete/${id}`,
  UPLOAD_LOGO: `superadmin/company/upload-logo`,
};

const API = { AUTH, COMPANY };

export default API;
