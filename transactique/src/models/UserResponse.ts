import { Customer } from "./Customer";

export interface UserResponse {
  loading?: boolean;
  fullName: string;
  data: Customer[];
  error: null | string;
}