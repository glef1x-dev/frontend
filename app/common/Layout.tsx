import AppNavigation from "./AppNavigation/AppNavigation.js";
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
      <div className="contentWrapper" style={{ flex: 1 }}>
        <Outlet></Outlet>
      </div>
      <Footer description="" />
    </Box>
  );
}
