import { GetExistingAccountsResponse } from "../models/Account";
import { GET_EXISTING_CUSTOMER_ACCOUNT_FAILURE, GET_EXISTING_CUSTOMER_ACCOUNT_REQUEST, GET_EXISTING_CUSTOMER_ACCOUNT_SUCCESS, GetExistingCustomerAccountAction } from "../types/getExistingCustomerAccountsTypes";

const initialState: GetExistingAccountsResponse = {
  loading: false,
  data: {
    success: false,
    message: "",
    data: []
  },
  error: {
    success: false,
    message: ""
  }
}

const getExistingCustomerAccountsReducer = (state = initialState, action: GetExistingCustomerAccountAction): GetExistingAccountsResponse => {
  switch(action.type) {
    case GET_EXISTING_CUSTOMER_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: false
      }
    case GET_EXISTING_CUSTOMER_ACCOUNT_SUCCESS:
      return {
        ...state,
        data: action.payload
      }
    case GET_EXISTING_CUSTOMER_ACCOUNT_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

export default getExistingCustomerAccountsReducer;