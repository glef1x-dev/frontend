import { Button, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import axios from 'axios';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';
import Emoji from '../Emoji/Emoji.js';
import errorImage from '/images/error.png';

type ErrorBoundaryProps = {
  defaultErrorMessage: string;
};

export default function ErrorBoundary({
  defaultErrorMessage,
}: Partial<ErrorBoundaryProps>): JSX.Element {
  const error = useRouteError();
  let statusCode = 500;
  let errorMessage = defaultErrorMessage;

  if (axios.isAxiosError(error)) {
    if (error?.response?.status) {
      statusCode = error?.response?.status;
      errorMessage = error.message;
    }
  } else if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    errorMessage = error.statusText;
  }

  switch (statusCode) {
    case 404:
      errorMessage = 'Page not found';
      break;
    case 500:
      errorMessage = 'Internal server error';
      break;
    default:
      errorMessage = 'Something went wrong';
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        marginTop: '2rem',
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="1rem"
      >
        <Typography variant="h1" fontWeight="600">
          {statusCode}
        </Typography>
        <Typography variant="h2" fontWeight="300">
          {errorMessage} <Emoji label="neutral face" symbol="🙁" />
        </Typography>
        <img src={errorImage} width="100%" alt="" />
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/"
          sx={{
            marginBottom: '1rem',
          }}
        >
          Back Home
        </Button>
      </Box>
    </Container>
  );
}
