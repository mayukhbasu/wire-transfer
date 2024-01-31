import { combineReducers } from "redux";
import customerDetailsReducer from "./customerDetailsReducer";
import availableAccountsReducer from "./getAvailableAccountsReducer";
import customerCreateReducer from "./customerCreateReducer";
import createAnotherAccountReducer from "./createAnotherAccountReducer";
import getExistingCustomerAccountsReducer from "./getExistingCustomerAccountsReducer";

const rootReducer = combineReducers({
  customer: customerDetailsReducer,
  createCustomer: customerCreateReducer,
  accounts: availableAccountsReducer,
  createAnotherAccount: createAnotherAccountReducer,
  getExistingCustomerAccounts: getExistingCustomerAccountsReducer
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
