import { Dispatch } from "redux";

import { CREATE_CUSTOMER_INFO_FAILURE, CREATE_CUSTOMER_INFO_REQUEST, CREATE_CUSTOMER_INFO_SUCSESS, CreateCustomerFailure, CreateCustomerSuccess, CreateCustomerType } from "../types/createCustomerActionTypes";
import axios from "axios";


const createCustomerRequest = (): CreateCustomerType => {
  return {
    type: CREATE_CUSTOMER_INFO_REQUEST
  }
}

const createCustomerSuccess = (response: CreateCustomerSuccess): CreateCustomerType => {
  return {
    type: CREATE_CUSTOMER_INFO_SUCSESS,
    payload: response
  }
}

const createCustomerFailure = (response: CreateCustomerFailure): CreateCustomerType => {
  return {
    type: CREATE_CUSTOMER_INFO_FAILURE,
    payload: response
  }
}

export const createCustomer = () => {
  return async (dispatch: Dispatch) => {
    dispatch(createCustomerRequest());
    try {
      const response = await axios.post('/userAccounts/createCustomer',{ withCredentials: true })
      dispatch(createCustomerSuccess(response.data));
    } catch(error) {
      if (typeof error === 'object' && error !== null && 'message' in error) {
        // Assuming the error object has a 'message' property
        dispatch(createCustomerFailure({ message: (error as { message: string }).message }));
      } else {
        // Handle unexpected error format
        dispatch(createCustomerFailure({ message: 'An unexpected error occurred' }));
      }
    }
  }
}