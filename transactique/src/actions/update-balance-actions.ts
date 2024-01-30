import { Dispatch } from "redux";
import { UPDATE_CUSTOMER_BALANCE_FAILURE, UPDATE_CUSTOMER_BALANCE_REQUEST, UPDATE_CUSTOMER_BALANCE_SUCCESS, UpdateCustomerBalanceActionType, UpdateCustomerBalanceFailure, UpdateCustomerBalanceSuccess } from "../types/updateBalanceTypes";
import axios from "axios";

type AccountType = "savings" | "current" | "investment";

const updateBalanceRequest = (): UpdateCustomerBalanceActionType => {
  return {
    type: UPDATE_CUSTOMER_BALANCE_REQUEST
  }
}

const updateBalanceSuccess = (response: UpdateCustomerBalanceSuccess): UpdateCustomerBalanceActionType => {
  return {
    type: UPDATE_CUSTOMER_BALANCE_SUCCESS,
    payload: response
  }
}

const updateBalanceFailure = (response: UpdateCustomerBalanceFailure): UpdateCustomerBalanceActionType => {
  return {
    type: UPDATE_CUSTOMER_BALANCE_FAILURE,
    payload: response
  }
}

export const updateBalance = (amount: number, type: AccountType) => {
  return (dispatch: Dispatch): Promise<any> => {
    dispatch(updateBalanceRequest());
    return new Promise((resolve, reject) => {
      axios.post('/userAccounts/updatebalance', {[type]: amount}, {withCredentials: true})
      .then(response => {
        dispatch(updateBalanceSuccess(response.data));
        resolve(response.data);
      }).catch(err => {
        dispatch(updateBalanceFailure(err));
        reject(err);
      })
    })
  }
}