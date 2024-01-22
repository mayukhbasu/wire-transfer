import { combineReducers } from "redux";
import customerDetailsReducer from "./customerDetailsReducer";
import availableAccountsReducer from "./getAvailableAccountsReducer";
import customerCreateReducer from "./customerCreateReducer";

const rootReducer = combineReducers({
  customer: customerDetailsReducer,
  createCustomer: customerCreateReducer,
  accounts: availableAccountsReducer
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
