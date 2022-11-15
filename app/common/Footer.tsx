import { Box, Container, Link, Typography } from "@mui/material";
import * as React from "react";

function Copyright() {
  return (
    <Typography variant="h2" color="text.secondary" align="center">
      {"© "}
      <Link color="inherit" href="">
        Hlib Haranin
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

interface FooterProps {
  description: string;
}

export default function Footer(props: FooterProps) {
  const { description } = props;

  return (
    <Box
      component="footer"
      sx={{
        maxHeight: "10vh",
        display: "flex",
        alignItems: "center",
        paddingY: "2rem",
      }}
    >
      <Container>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          {description}
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
}
