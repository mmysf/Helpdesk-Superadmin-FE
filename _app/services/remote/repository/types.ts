import { DefaultError } from "@/hooks/http";
import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface DefaultListParams {
  search?: string;
  page?: number;
  limit?: number;
  sort?: string;
  dir?: string;
}

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

export interface IdName {
  id: string;
  name: string;
  email?: string;
}

export interface DataAttachment {
  id: string;
  name: string;
  size: number;
  url: string;
  type: string;
  isPrivate: boolean;
  providerKey: string;
}
