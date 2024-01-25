import { Dispatch } from "redux"
import { CREATE_ANOTHER_ACCOUNT_FAILURE, CREATE_ANOTHER_ACCOUNT_REQUEST, CREATE_ANOTHER_ACCOUNT_SUCCESS, CreateAnotherAccountAction, CreateAnotherAccountFailure, CreateAnotherAccountSuccess } from "../types/createAnotherAccountTypes"
import axios from "axios"

const createAnotherAccountRequest = (): CreateAnotherAccountAction => {
  return {
    type: CREATE_ANOTHER_ACCOUNT_REQUEST
  }
}

const createAnotherAccountSuccess = (response: CreateAnotherAccountSuccess): CreateAnotherAccountAction => {
  return {
    type: CREATE_ANOTHER_ACCOUNT_SUCCESS,
    payload: response
  }
}

const createAnotherAccountFailure = (response: CreateAnotherAccountFailure): CreateAnotherAccountAction => {
  return {
    type: CREATE_ANOTHER_ACCOUNT_FAILURE,
    payload: response
  }
}

export const createAnotherAccount = (accountType: string) => {
  return (dispatch: Dispatch) => {
    dispatch(createAnotherAccountRequest());
    axios.post('/userAccounts/createOtherAccounts', {accountType}).then(response => dispatch(createAnotherAccountSuccess(response.data)))
    .catch(err => {
      return dispatch(createAnotherAccountFailure(err))
    })
  }
}