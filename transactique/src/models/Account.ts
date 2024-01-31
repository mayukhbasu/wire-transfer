import { CreateAnotherAccountSuccess } from "../types/createAnotherAccountTypes";
import { GetExistingCustomerAccountsFailure, GetExistingCustomerAccountsSuccess } from "../types/getExistingCustomerAccountsTypes";
import { UpdateCustomerBalanceFailure, UpdateCustomerBalanceSuccess } from "../types/updateBalanceTypes";

export interface Account {
  accountNumber: string;
  type: string;
  balance: number;
  customerId: string;
}

export interface GetAvailableAccounts {
  success: boolean;
  message: string;
  data: string[]
}

export interface AvailableAccountsResponse {
  loading: boolean;
  data: GetAvailableAccounts;
  error: string | null | undefined;
}

export interface CreateAnotherAccountResponse {
  loading: boolean;
  data: CreateAnotherAccountSuccess;
  error: string | null | undefined;
}

export interface UpdateBalanceResponse {
  loading: boolean;
  data: UpdateCustomerBalanceSuccess;
  error: UpdateCustomerBalanceFailure;
}

export interface GetExistingAccountsResponse {
  loading: boolean;
  data: GetExistingCustomerAccountsSuccess;
  error: GetExistingCustomerAccountsFailure
}

