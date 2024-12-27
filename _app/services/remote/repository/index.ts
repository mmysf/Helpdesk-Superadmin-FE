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

export const TICKET_COMMENT = {
  LIST: (ticketId: string) => `superadmin/ticket-comment/list/${ticketId}`,
  CREATE: `superadmin/ticket-comment/add`,
  DETAIL: (id: string) => `superadmin/ticket-comment/detail/${id}`,
};

// di postman ditulis company product - customer
export const CUSTOMER = {
  LIST: `superadmin/company-product/list`,
  DETAIL: (id: string) => `superadmin/company-product/detail/${id}`,
  CREATE: `superadmin/company-product/create`,
  UPDATE: (id: string) => `superadmin/company-product/update/${id}`,
  DELETE: (id: string) => `superadmin/company-product/delete/${id}`,
  UPLOAD_LOGO: `superadmin/company-product/upload-logo`,
};

export const PRODUCT = {
  DURATION: {
    LIST: `superadmin/package-category/list`,
    DETAIL: (id: string) => `superadmin/package-category/detail/${id}`,
    CREATE: `superadmin/package-category/create`,
    UPDATE: (id: string) => `superadmin/package-category/update/${id}`,
    UPDATE_STATUS: (id: string) =>
      `superadmin/package-category/update-status/${id}`,
    DELETE: (id: string) => `superadmin/package-category/delete/${id}`,
  },
  SUBSCRIPTION: {
    LIST: `superadmin/package/list`,
    DETAIL: (id: string) => `superadmin/package/detail/${id}`,
    CREATE: `superadmin/package/create`,
    UPDATE: (id: string) => `superadmin/package/update/${id}`,
    UPDATE_STATUS: (id: string) => `superadmin/package/update-status/${id}`,
    DELETE: (id: string) => `superadmin/package/delete/${id}`,
  },
};

export const AGENT = {
  LIST: `superadmin/agent/list`,
  CREATE: `superadmin/agent/create`,
  DETAIL: (id: string) => `superadmin/agent/detail/${id}`,
  UPDATE: (id: string) => `superadmin/agent/update/${id}`,
  DELETE: (id: string) => `superadmin/agent/delete/${id}`,
};

const API = { AUTH, COMPANY, TICKET, TICKET_COMMENT, CUSTOMER, PRODUCT, AGENT };

export default API;
