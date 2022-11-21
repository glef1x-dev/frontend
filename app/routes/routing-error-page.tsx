import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";

interface RouterError {
  status: number;
  statusText: string;
  data: unknown;
}

export default function Error(): JSX.Element {
  const error = useRouteError() as RouterError;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h1" fontWeight="bold" fontSize="6rem">
        {error.status}
      </Typography>
      <Typography variant="h6" fontSize="2rem">
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button variant="contained" sx={{ my: 2 }} href=".">
        Back Home
      </Button>
    </Box>
  );
}
