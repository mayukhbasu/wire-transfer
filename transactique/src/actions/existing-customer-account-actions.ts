import { Dispatch } from "redux"
import { GET_EXISTING_CUSTOMER_ACCOUNT_FAILURE, GET_EXISTING_CUSTOMER_ACCOUNT_REQUEST, GET_EXISTING_CUSTOMER_ACCOUNT_SUCCESS, GetExistingCustomerAccountAction, GetExistingCustomerAccountsFailure, GetExistingCustomerAccountsSuccess } from "../types/getExistingCustomerAccountsTypes"
import axios from "axios"

const fetchExistingCustomerAccountRequest = (): GetExistingCustomerAccountAction => {
  return {
    type: GET_EXISTING_CUSTOMER_ACCOUNT_REQUEST
  }
}

const fetchExistingCustomerAccountSuccess = (response: GetExistingCustomerAccountsSuccess): GetExistingCustomerAccountAction => {
  return {
    type: GET_EXISTING_CUSTOMER_ACCOUNT_SUCCESS,
    payload: response
  }
}
const fetchExistingCustomerAccountFailure = (response: GetExistingCustomerAccountsFailure): GetExistingCustomerAccountAction => {
  return {
    type: GET_EXISTING_CUSTOMER_ACCOUNT_FAILURE,
    payload: response
  }
}

export const fetchExistingCustomerAccount = () => {
  return (dispatch: Dispatch) => {
    dispatch(fetchExistingCustomerAccountRequest());
    axios.get('/userAccounts/getCustomerAccounts').then(response => dispatch(fetchExistingCustomerAccountSuccess(response.data)))
    .catch((err) => dispatch(fetchExistingCustomerAccountFailure(err)))
  }
}