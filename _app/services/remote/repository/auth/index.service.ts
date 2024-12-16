import { useHttpMutation } from "@/root/_app/hooks/http";
import { AUTH, ServiceMutationConfig } from "..";
import { AuthLoginPayload, AuthLoginResponse } from "./types";

export * from "./types";

export const useAuthLogin = (
  config?: ServiceMutationConfig<AuthLoginPayload, AuthLoginResponse>,
) =>
  useHttpMutation<AuthLoginResponse, AuthLoginPayload>(AUTH.LOGIN, {
    method: "POST",
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
