import { Customer } from "./Customer";

export interface UserResponse {
  loading?: boolean;
  data: Customer[];
  error: null | string;
}

export interface CustomerResponse {
  data: Customer[];
}