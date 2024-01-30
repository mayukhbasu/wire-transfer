export const UPDATE_CUSTOMER_BALANCE_REQUEST = 'UPDATE_CUSTOMER_BALANCE_REQUEST';
export const UPDATE_CUSTOMER_BALANCE_SUCCESS = 'UPDATE_CUSTOMER_BALANCE_SUCCESS';
export const UPDATE_CUSTOMER_BALANCE_FAILURE = 'UPDATE_CUSTOMER_BALANCE_FAILURE';


interface UpdateCustomerBalanceSuccess {
  success: boolean;
  message: string;
}

interface UpdateCustomerBalanceFailure {
  success: boolean;
  message: string;
}

interface UpdateCustomerBalanceActionRequest {
  type: typeof UPDATE_CUSTOMER_BALANCE_REQUEST;
}

interface UpdateCustomerBalanceActionSuccess {
  type: typeof UPDATE_CUSTOMER_BALANCE_SUCCESS;
  payload: UpdateCustomerBalanceSuccess
}

interface UpdateCustomerBalanceActionFailure {
  type: typeof UPDATE_CUSTOMER_BALANCE_FAILURE;
  payload: UpdateCustomerBalanceFailure
}

export type UpdateCustomerBalanceActionType = UpdateCustomerBalanceActionRequest | UpdateCustomerBalanceActionSuccess | UpdateCustomerBalanceActionFailure;
