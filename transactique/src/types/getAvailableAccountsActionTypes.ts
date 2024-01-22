export const GET_AVAILABLE_ACCOUNTS_REQUEST = 'GET_AVAILABLE_ACCOUNTS_REQUEST';
export const GET_AVAILABLE_ACCOUNTS_SUCCESS = 'GET_AVAILABLE_ACCOUNTS_SUCCESS';
export const GET_AVAILABLE_ACCOUNTS_FAILURE = 'GET_AVAILABLE_ACCOUNTS_FAILURE';

export interface GetAvailableAccountsSuccess {
  success: boolean;
  message: string;
  data: string[];
}

export interface GetAvailableAccountsFailure {
  success: boolean;
  message: string;
  error?: string;
}

interface AvailableAccountsRequest {
  type: typeof GET_AVAILABLE_ACCOUNTS_REQUEST;
}

interface AvailableAccountsSuccess {
  type: typeof GET_AVAILABLE_ACCOUNTS_SUCCESS;
  payload: GetAvailableAccountsSuccess
}

interface AvailableAccountsFailure {
  type: typeof GET_AVAILABLE_ACCOUNTS_FAILURE;
  payload: GetAvailableAccountsFailure
}

export type AvailableAccountsType = AvailableAccountsRequest | AvailableAccountsSuccess | AvailableAccountsFailure;


