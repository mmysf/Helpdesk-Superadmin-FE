import { DefaultResponse } from "..";

export interface AuthLoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export type AuthLoginResponse = DefaultResponse<{
  token: string;
  user: AuthUser;
}>;
