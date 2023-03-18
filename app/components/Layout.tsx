import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation/Navigation.js";
import Footer from "./Footer.js";
import ScrollToTop from "./ScrollToTop.js";

export default function Layout(): JSX.Element {
  return (
    <>
      <ScrollToTop />
      <Box
        className="Layout"
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Navigation />
        <main className="content-wrapper" style={{ flex: 1 }}>
          <Outlet />
        </main>
        <Footer description="" />
      </Box>
    </>
  );
}
