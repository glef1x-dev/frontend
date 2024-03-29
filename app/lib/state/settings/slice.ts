import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "~/lib/state/store";

export interface AppSettings {
  animations: boolean;
  playClickSound: boolean;
}

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    animations: true,
    playClickSound: true,
  } as AppSettings,
  reducers: {
    toggleShowAnimations(state) {
      state.animations = !state.animations;
    },
    togglePlayClickSound(state) {
      state.playClickSound = !state.playClickSound;
    },
  },
  extraReducers: (builder) => {
    builder.addCase("persist/REHYDRATE", (state) => {
      const preferNoAnimations = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (preferNoAnimations) {
        state.animations = false;
      }
    });
  },
});

export const { togglePlayClickSound, toggleShowAnimations } =
  settingsSlice.actions;
export default settingsSlice.reducer;

export const selectSettings = (state: RootState): AppSettings => state.settings;
