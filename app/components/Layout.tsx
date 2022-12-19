import AppNavigation from "./AppNavigation.js";
import { Outlet } from "react-router-dom";
import Footer from "./Footer.js";
import { Box } from "@mui/material";

export default function Layout(): JSX.Element {
  return (
    <Box
      className="Layout"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <AppNavigation />
      <main className="content-wrapper" style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer description="" />
    </Box>
  );
}
