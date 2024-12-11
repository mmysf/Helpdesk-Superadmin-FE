export interface Logo {
  id: string;
  name: string;
  size: number;
  url: string;
  type: string;
  isPrivate: boolean;
  providerKey: string;
}

export interface Settings {
  code: string;
  email: string;
  color: string;
  subdomain: string;
}

export interface Data {
  id: string;
  accessKey: string;
  name: string;
  address: string;
  type: string;
  productTotal: number;
  logo: Logo;
  settings: Settings;
  createdAt: Date;
  updatedAt: Date;
}
export interface ResponseCreateCompany {
  status: number;
  message: string;
  validation: object;
  data: Data;
}
