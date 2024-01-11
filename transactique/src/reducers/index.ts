import { combineReducers } from "redux";
import customerDetailsReducer from "./customerDetailsReducer";

const rootReducer = combineReducers({
  customer: customerDetailsReducer
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;