import { Button, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { Link } from "react-router-dom";
import Emoji from "../Emoji/Emoji";
import errorImage from "/error.png";

function NotFoundErrorPage() {
  return (
    <Container
      maxWidth="md"
      sx={{
        marginTop: "2rem",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="1rem"
      >
        <Typography variant="h2" fontWeight="600">
          404
        </Typography>
        <Typography variant="h4" fontWeight="300">
          Page not found <Emoji label="neutral face" symbol="🙁" />
        </Typography>
        <img src={errorImage} width="100%" />
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/"
          sx={{
            marginBottom: "1rem",
          }}
        >
          Back Home
        </Button>
      </Box>
    </Container>
  );
}

export { NotFoundErrorPage };
