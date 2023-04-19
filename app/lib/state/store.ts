import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import rootReducer from "./reducers";
import { createWrapper } from "next-redux-wrapper";
import logger from "redux-logger";

const makeStore = (): ReturnType<typeof configureStore> => {
  const isServer = typeof window === "undefined";
  const store = configureStore({
    reducer: rootReducer,
    middleware: [logger],
  });
  if (isServer) {
    return store;
  }

  store["__persistor"] = persistStore(store); // Nasty hack
  return store;
};

export const wrapper = createWrapper(makeStore);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
