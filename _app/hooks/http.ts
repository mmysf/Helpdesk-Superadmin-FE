/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import {
  type UseQueryOptions,
  type UseMutationOptions,
  useQuery,
  useMutation,
  UndefinedInitialDataOptions,
} from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { AUTH_KEY } from "../constants/auth";

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

http.interceptors.request.use((config) => {
  const token = Cookies.get(AUTH_KEY);
  return token
    ? ({
        ...config,
        headers: { Authorization: `Bearer ${token}` },
      } as InternalAxiosRequestConfig)
    : config;
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error?.response?.status === 401) {
      Cookies.remove(AUTH_KEY);
      return setTimeout(() => {
        window.location.href = "/";
      }, 200);
    }

    return Promise.reject(error);
  },
);

export type DefaultError = {
  message: string;
  validation: unknown;
};

type Config<TData = unknown, TError = DefaultError> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  keys?: any[];
  params?: Record<string, any>;
  httpOptions?: AxiosRequestConfig;
  queryOptions?: UseQueryOptions<TData, TError>;
};

/**
 * API GET Method request only.
 * @example
    const { data: items, isLoading, isError } = useHttp<number, string>('/', {
      keys: ['id']
      queryOptions: {
        onSuccess: function (data) {
          return
        },
        onError: function (data) {
          data
        },
      },
    })
 * @param url URL API
 * @param options HTTP Mutation Options
 */
export function useHttp<TData = any, TError = any>(
  url: string,
  options?: Config<TData, TError>,
) {
  const defaultOptions: UndefinedInitialDataOptions<TData, TError> = {
    queryKey: [url],
    queryFn: async () => {
      try {
        const defaultConfig = {};

        if (options?.params) {
          Object.assign(defaultConfig, { params: options.params });
        }
        const { data } = await http.get<TData>(url, options?.httpOptions);
        return data ?? null;
      } catch (e: any) {
        Promise.reject(e?.response ?? e);
        return e;
      }
    },
  };

  if (options?.queryOptions) {
    Object.assign(defaultOptions, options.queryOptions);
  }
  return useQuery(defaultOptions);
}

type HttpMutationOptions<
  TData = any,
  TError = any,
  TVariables = any,
  TContext = any,
> = {
  method: "GET" | "HEAD" | "POST" | "OPTIONS" | "PUT" | "DELETE" | "PATCH";
  httpOptions?: AxiosRequestConfig;
  queryOptions?: UseMutationOptions<TData, TError, TVariables, TContext>;
};

/**
 * Update data to the server.
 * @example
  const {mutate, isLoading, isError, error} =  useHttpMutation<TData, TError>('todos/:id', {
    method: 'POST',
    httpOptions: { // axios options
      timeout: 30000,
    },
    queryOptions: { // vue-query options
      onSuccess: function (data) {
        console.log(data);
      },
      onError: function (data) {
        console.log(data);
      },
    },
    })
    const onSubmitForm = (data) => {
      mutate(data)
    }
 * @param url URL API
 * @param options HTTP Mutation Options
 */
export function useHttpMutation<
  TData = any,
  TVariables = any,
  TError = AxiosResponse<DefaultError>,
>(url: string, options: HttpMutationOptions<TData, TError>) {
  return useMutation({
    mutationFn: (value: TVariables) => {
      return new Promise<TData>((resolve, reject) => {
        return http
          .request<TData>({
            url,
            method: options.method,
            ...options.httpOptions,
            data: value,
          })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error: AxiosError<TError>) => {
            reject(error.response ?? error.message);
          });
      });
    },
    ...options.queryOptions,
  });
}
