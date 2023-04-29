import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "~/lib/state/store";

export interface AppState {
  isDonateModalOpen: boolean;
}

const appStateSlice = createSlice({
  name: "appState",
  initialState: {
    isDonateModalOpen: false,
  } as AppState,
  reducers: {
    toggleDonateModal(state) {
      state.isDonateModalOpen = !state.isDonateModalOpen;
    },
  },
});

export const { toggleDonateModal } = appStateSlice.actions;
export default appStateSlice.reducer;

export const selectAppState = (state: RootState): AppState => state.appState;
