import { Dispatch } from "redux";
import { AvailableAccountsType, GET_AVAILABLE_ACCOUNTS_FAILURE, GET_AVAILABLE_ACCOUNTS_REQUEST, GET_AVAILABLE_ACCOUNTS_SUCCESS, GetAvailableAccountsFailure, GetAvailableAccountsSuccess } from "../types/getAvailableAccountsActionTypes";
import axios from "axios";

const fetchAvailableAccountsRequest = (): AvailableAccountsType => {
  return {
    type: GET_AVAILABLE_ACCOUNTS_REQUEST
  }
}

const fetchAvailableAccountsSuccess = (response: GetAvailableAccountsSuccess): AvailableAccountsType => {
  return {
    type: GET_AVAILABLE_ACCOUNTS_SUCCESS,
    payload: response
  }
}

const fetchAvailableAccountsFailure = (response: GetAvailableAccountsFailure): AvailableAccountsType => {
  return {
    type: GET_AVAILABLE_ACCOUNTS_FAILURE,
    payload: response
  }
}

export const fetchAvailableAccounts = () => {
  return (dispatch: Dispatch) => {
    dispatch(fetchAvailableAccountsRequest())
    axios.get('/userAccounts/getAvailableAccounts',{ withCredentials: true })
    .then(response => {
      return dispatch(fetchAvailableAccountsSuccess(response.data))
    })
    .catch(err => dispatch(fetchAvailableAccountsFailure(err)))
  }
}