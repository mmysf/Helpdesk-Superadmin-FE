export * from "./types";

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

export const TICKET = {
  LIST: `superadmin/ticket/list`,
  DETAIL: (id: string) => `superadmin/ticket/detail/${id}`,
};

const API = { AUTH, COMPANY, TICKET };

export default API;
