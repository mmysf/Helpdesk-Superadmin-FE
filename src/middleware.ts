/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import { NextRequest, NextResponse } from "next/server";
import { Routes } from "@/config/routes";
import CookiesHelper from "@/helper/cookies";
import { AUTH_KEY } from "../_app/constants/auth";

const useAuth = [
  Routes.BO_DASHBOARD,
  Routes.BO_PRODUCT,
  Routes.BO_ORDER,
  Routes.BO_CUSTOMER,
  Routes.BO_TICKET,
  Routes.BO_AGENT,
  Routes.BO_COMPANY,
  Routes.BO_SUBSCRIPTION,
] as const;

const noAuth = [Routes.AUTH_SIGNIN] as const;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

const middleware = (request: NextRequest) => {
  const isLoggedIn = request.cookies.get(AUTH_KEY);

  if (
    isLoggedIn?.value &&
    noAuth.some((route) => request.nextUrl.pathname.includes(route))
  )
    return Response.redirect(new URL(Routes.BO_DASHBOARD, request.url));

  if (
    !isLoggedIn?.value &&
    useAuth.some((route) => request.nextUrl.pathname.includes(route))
  )
    return Response.redirect(new URL(Routes.AUTH_SIGNIN, request.url));

  return NextResponse.next();
};

export default middleware;
