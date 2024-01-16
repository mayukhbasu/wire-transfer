import { CREATE_CUSTOMER_INFO_FAILURE, CREATE_CUSTOMER_INFO_REQUEST, CREATE_CUSTOMER_INFO_SUCSESS, CreateCustomerType } from "../types/createCustomerActionTypes"

const initialState: {loading: boolean, message: string, error: string} = {
  loading: false,
  message: "",
  error: ""
}

const customerCreateReducer = (state = initialState, action: CreateCustomerType):{loading: boolean, message: string, error: string} => {
    switch(action.type) {
      case CREATE_CUSTOMER_INFO_REQUEST:
        return {
          ...state,
          loading: true
        }
      case CREATE_CUSTOMER_INFO_SUCSESS:
        return {
          ...state,
          message: action.payload.message
        }
      case CREATE_CUSTOMER_INFO_FAILURE:
        return {
          ...state,
          message: action.payload.error
        }
      default:
        return state
    }
}

export default customerCreateReducer;