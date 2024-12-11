export interface CreateCompanyPayload {
  name: string;
  email: string;
  subdomain: string;
  color: string;
  logo: File | null;
}
