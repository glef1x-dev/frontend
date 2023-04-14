import {
  Box, Container, Link, Typography,
} from '@mui/material';

const Copyright: React.FC = function () {
  return (
    <Typography variant="h6" color="text.secondary" align="center">
      {'© '}
      <Link color="inherit" href="/">
        Hlib Haranin
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
};

interface FooterProps {
  description: string;
}

const Footer: React.FC<FooterProps> = function (props) {
  const { description } = props;

  return (
    <Box
      component="footer"
      sx={{
        maxHeight: '10vh',
        display: 'flex',
        alignItems: 'center',
        paddingY: '2rem',
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
};

export default Footer;
