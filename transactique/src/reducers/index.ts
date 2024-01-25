import { combineReducers } from "redux";
import customerDetailsReducer from "./customerDetailsReducer";
import availableAccountsReducer from "./getAvailableAccountsReducer";
import customerCreateReducer from "./customerCreateReducer";
import createAnotherAccountReducer from "./createAnotherAccountReducer";

const rootReducer = combineReducers({
  customer: customerDetailsReducer,
  createCustomer: customerCreateReducer,
  accounts: availableAccountsReducer,
  createAnotherAccount: createAnotherAccountReducer
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
