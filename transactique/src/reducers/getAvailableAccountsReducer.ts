import { AvailableAccountsResponse } from "../models/Account";
import { AvailableAccountsType, GET_AVAILABLE_ACCOUNTS_FAILURE, GET_AVAILABLE_ACCOUNTS_REQUEST, GET_AVAILABLE_ACCOUNTS_SUCCESS } from "../types/getAvailableAccountsActionTypes";

const initialState: AvailableAccountsResponse = {
  loading: false,
  data: {
    success: false,
    message: "",
    data: []
  },
  error: null
}

const availableAccountsReducer = (state = initialState, action: AvailableAccountsType): AvailableAccountsResponse => {
  switch(action.type) {
    case GET_AVAILABLE_ACCOUNTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    case GET_AVAILABLE_ACCOUNTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.response
      }
    case GET_AVAILABLE_ACCOUNTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
  }
  return state
}

export default availableAccountsReducer;