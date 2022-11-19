import AppNavigation from "./AppNavigation.js";
import { Outlet } from "react-router-dom";
import Footer from "./Footer.js";
import { Box, Container } from "@mui/material";

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
      <Container className="content-wrapper" maxWidth="lg" sx={{ flex: 1 }}>
        <Outlet />
      </Container>
      <Footer description="" />
    </Box>
  );
}
