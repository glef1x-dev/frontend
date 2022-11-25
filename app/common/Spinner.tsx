import * as React from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { CircularProgressProps } from "@mui/material/CircularProgress/CircularProgress.js";

export default function Spinner({
  isOpen = true,
  circularProgressProps,
  color = "#fff",
}: SpinnerProps): JSX.Element {
  return (
    <Backdrop
      sx={{
        color: color,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={isOpen}
    >
      <CircularProgress color="inherit" {...circularProgressProps} />
    </Backdrop>
  );
}

type SpinnerProps = {
  isOpen?: boolean;
  circularProgressProps?: CircularProgressProps;
  color?: string;
};
