import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from "react-redux";
import type { RootState, AppDispatch } from "~/lib/state/store";
import { Store } from "redux";
import { Persistor } from "redux-persist";

interface AppStore extends Store {
  __persistor: Persistor;
}

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = (): AppStore => useStore() as AppStore;
