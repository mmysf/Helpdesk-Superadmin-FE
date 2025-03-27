import { useHttp } from "@/root/_app/hooks/http";
import { ServiceConfig } from "../types";
import { StatsResponse } from "./types";
import { DASHBOARD } from "..";

export const useDashboardStats = (config?: ServiceConfig<StatsResponse>) => {
  return useHttp(DASHBOARD.STATS, {
    httpOptions: config?.axios,
    queryOptions: config?.query,
  });
};
