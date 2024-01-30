import { UpdateBalanceResponse } from "../models/Account";
import { UPDATE_CUSTOMER_BALANCE_FAILURE, UPDATE_CUSTOMER_BALANCE_REQUEST, UPDATE_CUSTOMER_BALANCE_SUCCESS, UpdateCustomerBalanceActionType } from "../types/updateBalanceTypes";

const initialState: UpdateBalanceResponse = {
  loading: false,
  data: {
    success: false,
    message: ""
  },
  error: {
    success: false,
    message: ""
  }
}

const updateBalanceReducer = (state = initialState, action: UpdateCustomerBalanceActionType): UpdateBalanceResponse => {
  switch(action.type) {
    case UPDATE_CUSTOMER_BALANCE_REQUEST: 
      return {
        ...state,
        loading: true
      }
    case UPDATE_CUSTOMER_BALANCE_SUCCESS:
      return {
        ...state,
        data: action.payload
      }
    case UPDATE_CUSTOMER_BALANCE_FAILURE:
      return {
        ...state,
        error: action.payload
      }
      default:
        return state
  }
}

export default updateBalanceReducer;