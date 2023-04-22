import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from "react-redux";
import type { AppDispatch, RootState } from "~/lib/state/store";
import { Action, Store } from "redux";
import { Persistor } from "redux-persist";
import { Dispatch } from "react";

interface AppStore extends Store {
  __persistor: Persistor;
}

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = (): Dispatch<Action<unknown>> =>
  useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = (): AppStore => useStore() as AppStore;
