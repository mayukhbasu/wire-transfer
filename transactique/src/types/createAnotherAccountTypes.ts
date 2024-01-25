export const CREATE_ANOTHER_ACCOUNT_REQUEST = 'CREATE_ANOTHER_ACCOUNT_REQUEST';
export const CREATE_ANOTHER_ACCOUNT_SUCCESS = 'CREATE_ANOTHER_ACCOUNT_SUCCESS';
export const CREATE_ANOTHER_ACCOUNT_FAILURE = 'CREATE_ANOTHER_ACCOUNT_FAILURE';

export interface CreateAnotherAccountSuccess {
  success: string;
  message: string;
}

export interface CreateAnotherAccountFailure {
  success: string;
  message: string;
}

interface CreateAnotherAccountActionRequest {
  type: typeof CREATE_ANOTHER_ACCOUNT_REQUEST;
}

interface CreateAnotherAccountActionSuccess {
  type: typeof CREATE_ANOTHER_ACCOUNT_SUCCESS;
  payload: CreateAnotherAccountSuccess;
}

interface CreateAnotherAccountActionFailure {
  type: typeof CREATE_ANOTHER_ACCOUNT_FAILURE;
  payload: CreateAnotherAccountFailure;
}

export type CreateAnotherAccountAction = CreateAnotherAccountActionRequest | CreateAnotherAccountActionSuccess | CreateAnotherAccountActionFailure;





