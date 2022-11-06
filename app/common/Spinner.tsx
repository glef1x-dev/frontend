import * as React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

export default function Spinner({ isOpen = true }: SpinnerProps): JSX.Element {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={isOpen}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

type SpinnerProps = {
  isOpen?: boolean;
};
