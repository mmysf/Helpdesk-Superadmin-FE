export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
}

export interface Data {
  token: string;
  user: User;
}
export interface ResponseLogin {
  status: number;
  message: string;
  validation: object;
  data: Data;
}
