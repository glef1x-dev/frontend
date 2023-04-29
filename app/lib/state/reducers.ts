import { combineReducers } from "redux";
import settingsReducer from "./settings/slice";
import appStateReducer from "./app-state/slice";

export const rootReducer = combineReducers({
  settings: settingsReducer,
  appState: appStateReducer,
});
