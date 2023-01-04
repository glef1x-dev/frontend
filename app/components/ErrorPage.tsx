import { usePageEffect } from "@/hooks/page.js";
import {
  Button,
  createTheme,
  responsiveFontSizes,
  Typography,
} from "@mui/material";
import { Box, ThemeProvider } from "@mui/system";
import { Link, useRouteError } from "react-router-dom";
// @ts-ignore
import { ErrorResponse } from "@remix-run/router/utils";

const _theme = responsiveFontSizes(
  createTheme({
    typography: {
      h1: {
        fontSize: "3rem",
      },
    },
  })
);

function ErrorPage(): JSX.Element {
  const error = useRouteError() as ErrorResponse;
  const errorStatus = error.status ?? 500;
  const statusText =
    error.statusText ?? error.message ?? "Server internal error";
  usePageEffect({ title: statusText });

  return (
    <ThemeProvider theme={_theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "100vh",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        <Typography variant="h1">{errorStatus + " " + statusText}</Typography>
        <Button variant="contained" size="large" component={Link} to="/">
          Back Home
        </Button>
      </Box>
    </ThemeProvider>
  );
}

export { ErrorPage };
