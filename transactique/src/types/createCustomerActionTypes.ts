export const CREATE_CUSTOMER_INFO_REQUEST = 'CREATE_CUSTOMER_INFO_REQUEST';
export const CREATE_CUSTOMER_INFO_SUCSESS = 'CREATE_CUSTOMER_INFO_SUCCESS';
export const CREATE_CUSTOMER_INFO_FAILURE = 'CREATE_CUSTOMER_INFO_FAILURE';

export interface CreateCustomerSuccess {
  message: string;
}

export interface CreateCustomerFailure {
  error: string;
}

interface CreateCustomerActionRequest {
  type: typeof CREATE_CUSTOMER_INFO_REQUEST;
}
interface CreateCustomerActionSuccess {
  type: typeof CREATE_CUSTOMER_INFO_SUCSESS;
  payload: CreateCustomerSuccess;
}

interface CreateCustomerActionFailure {
  type: typeof CREATE_CUSTOMER_INFO_FAILURE;
  payload: CreateCustomerFailure
}

export type CreateCustomerType = CreateCustomerActionRequest | CreateCustomerActionSuccess
| CreateCustomerActionFailure;

