import { CustomerResponse } from "../models/Customer";
import { GET_CUSTOMER_INFO_FAILURE, GET_CUSTOMER_INFO_REQUEST, GET_CUSTOMER_INFO_SUCCESS, GetCustomerInfoType } from "../types/customerActionTypes";

const initialState: CustomerResponse = {
  loading: false,
  data: [],
  error: null
}

const customerDetailsReducer = (state = initialState, action: GetCustomerInfoType) => {
  switch(action.type) {
    case GET_CUSTOMER_INFO_REQUEST:
      return {
        ...state,
        loading: true
      }
    case GET_CUSTOMER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: null
      }
    case GET_CUSTOMER_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload.message
      }
    default:
      return state
      
  }
}

export default customerDetailsReducer;