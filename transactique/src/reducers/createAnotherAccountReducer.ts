import { CreateAnotherAccountResponse } from "../models/Account";
import { CREATE_ANOTHER_ACCOUNT_FAILURE, CREATE_ANOTHER_ACCOUNT_REQUEST, CREATE_ANOTHER_ACCOUNT_SUCCESS, CreateAnotherAccountAction } from "../types/createAnotherAccountTypes";

const initialState: CreateAnotherAccountResponse = {
  loading: false,         
  data: {
    success: "",
    message: ""
  },
  error: null
}

const createAnotherAccountReducer = (state = initialState, action: CreateAnotherAccountAction) => {
  switch(action.type) {
    case CREATE_ANOTHER_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_ANOTHER_ACCOUNT_SUCCESS:
      return {
        ...state,
        data: action.payload
      }
    case CREATE_ANOTHER_ACCOUNT_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

export default createAnotherAccountReducer;