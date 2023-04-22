import { combineReducers } from "redux";
import settingsReducer from "./settings/slice";

export const rootReducer = combineReducers({
  settings: settingsReducer,
});
