import { Dispatch } from "redux";
import { GET_CUSTOMER_INFO_FAILURE, GET_CUSTOMER_INFO_REQUEST, GET_CUSTOMER_INFO_SUCCESS, GetCustomerInfoFailure, GetCustomerInfoSuccess, GetCustomerInfoType } from "../types/customerActionTypes";
import axios from "axios";

const fetchCustomerInfoRequest = (): GetCustomerInfoType => {
  return {
    type: GET_CUSTOMER_INFO_REQUEST
  }
}

const fetchCustomerInfoSuccess =  (response: GetCustomerInfoSuccess): GetCustomerInfoType => {
  return {
    type: GET_CUSTOMER_INFO_SUCCESS,
    payload: response
  }
}

const fetchCustomerInfoFailure = (response: GetCustomerInfoFailure): GetCustomerInfoType => {
  return {
    type: GET_CUSTOMER_INFO_FAILURE,
    payload: response
  }
}

export const fetchCustomerInfo = () => {
  return (dispatch: Dispatch) => {
    dispatch(fetchCustomerInfoRequest());
    axios.get<GetCustomerInfoSuccess>('/userAccounts/createCustomer',{ withCredentials: true }).then((response) => {
      return dispatch(fetchCustomerInfoSuccess(response.data));
    }).catch(error => dispatch(fetchCustomerInfoFailure(error.message)))
  }
}