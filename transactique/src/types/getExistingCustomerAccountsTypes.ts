import { Account } from "../models/Account";

export const GET_EXISTING_CUSTOMER_ACCOUNT_REQUEST = 'GET_EXISTING_CUSTOMER_ACCOUNT_REQUEST';
export const GET_EXISTING_CUSTOMER_ACCOUNT_SUCCESS = 'GET_EXISTING_CUSTOMER_ACCOUNT_SUCCESS';
export const GET_EXISTING_CUSTOMER_ACCOUNT_FAILURE = 'GET_EXISTING_CUSTOMER_ACCOUNT_FAILURE';

export interface GetExistingCustomerAccountsSuccess {
  success: boolean;
  message: string;
  data: Account[];
}

export interface GetExistingCustomerAccountsFailure {
  success: boolean;
  message: string;
}

interface GetExistingCustomerAccountActionRequest {
  type: typeof GET_EXISTING_CUSTOMER_ACCOUNT_REQUEST;
}

interface GetExistingCustomerAccountActionSuccess {
  type: typeof GET_EXISTING_CUSTOMER_ACCOUNT_SUCCESS;
  payload: GetExistingCustomerAccountsSuccess
}

interface GetExistingCustomerAccountActionFailure {
  type: typeof GET_EXISTING_CUSTOMER_ACCOUNT_FAILURE;
  payload: GetExistingCustomerAccountsFailure
}

export type GetExistingCustomerAccountAction = GetExistingCustomerAccountActionRequest | GetExistingCustomerAccountActionSuccess | GetExistingCustomerAccountActionFailure;


