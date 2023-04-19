import { combineReducers } from "redux";
import settingsReducer from "./settings/slice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";

const rootPersistConfig = {
  key: "root",
  whitelist: ["settings"],
  storage,
  stateReconciler: hardSet,
};

export default persistReducer(
  rootPersistConfig,
  combineReducers({
    settings: settingsReducer,
  })
);
