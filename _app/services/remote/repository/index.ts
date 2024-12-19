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
  ASSIGN: (id: string) => `superadmin/ticket/assign-agent/${id}`,
  TOTAL_DBD: (companyId: string) =>
    `superadmin/ticket/total-ticket-day/${companyId}`,
  AVERAGE: (companyId: string) =>
    `superadmin/ticket/average-duration/${companyId}`,
};

// di postman ditulis company product - customer
export const AGENT = {
  LIST: `superadmin/company-product/list`,
  DETAIL: (id: string) => `superadmin/company-product/detail/${id}`,
  CREATE: `superadmin/company-product/create`,
  UPDATE: (id: string) => `superadmin/company-product/update/${id}`,
  DELETE: (id: string) => `superadmin/company-product/delete/${id}`,
  UPLOAD_LOGO: `superadmin/company-product/upload-logo`,
};

const API = { AUTH, COMPANY, TICKET, AGENT };

export default API;
