import { DefaultError } from "@/hooks/http";
import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { AxiosRequestConfig, AxiosResponse } from "axios";

export const AUTH = {
  LOGIN: `superadmin/auth/login`,
  ME: `superadmin/auth/login`,
};

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

const API = { AUTH };

export default API;
