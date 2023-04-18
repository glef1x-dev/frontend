import { Action } from "redux";
import { useAppDispatch, useAppSelector } from "./use-redux";
import { AppSettings, selectSettings } from "~/lib/state/settings/slice";
import { Dispatch } from "react";

export function useSettings(): readonly [
  AppSettings,
  Dispatch<Action<unknown>>
] {
  const settings = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();

  return [settings, dispatch];
}
