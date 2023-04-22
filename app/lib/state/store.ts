import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { createWrapper } from "next-redux-wrapper";
import logger from "redux-logger";
import { rootReducer } from "~/lib/state/reducers";

const makeStore = (): ReturnType<typeof configureStore> => {
  const isServer = typeof window === "undefined";
  const store = configureStore({
    reducer: rootReducer,
    middleware: [logger],
  });
  if (isServer) {
    return store;
  }

  /* eslint-disable-next-line @typescript-eslint/no-var-requires */
  const storage = require("redux-persist/lib/storage").default;

  const rootPersistConfig = {
    key: "root",
    whitelist: ["settings"],
    storage,
  };

  store.replaceReducer(persistReducer(rootPersistConfig, rootReducer));
  store["__persistor"] = persistStore(store); // Nasty hack
  return store;
};

export const wrapper = createWrapper(makeStore);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
