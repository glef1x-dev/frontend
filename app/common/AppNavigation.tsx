import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Link,
  AppBar,
  Menu,
  MenuItem,
  Container,
  IconButton,
  Typography,
  Button,
  Toolbar,
  Box,
} from "@mui/material";
import { Link as ReactRouterLink } from "react-router-dom";
import SocialMedias from "./SocialMedias.js";
import { ThemeButton } from "./ThemeButton.js";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import NewspaperTwoToneIcon from "@mui/icons-material/NewspaperTwoTone";
import AvatarLink from "./AvatarLink.js";

type Route = {
  name: string;
  path: string;
  icon: JSX.Element;
};

const navigationRoutes: Route[] = [
  { name: "About Me", path: "/", icon: <CoPresentIcon fontSize="small" /> },
  {
    name: "Opensource",
    path: "/opensource",
    icon: <AccountTreeIcon fontSize="small" />,
  },
  {
    name: "Blog",
    path: "/blog",
    icon: <NewspaperTwoToneIcon fontSize="small" />,
  },
];

function AppNavigation() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <AvatarLink alt="avatar" src="/my-avatar.webp" to="/" />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                "& ul": {
                  paddingBottom: 0,
                },
              }}
            >
              {navigationRoutes.map((route) => (
                <MenuItem key={route.name} onClick={handleCloseNavMenu} divider>
                  <Link
                    href={route.path}
                    sx={{
                      textDecoration: "none",
                    }}
                  >
                    {route.icon}
                    <Typography
                      sx={{
                        display: "inline-block",
                      }}
                      textAlign="center"
                    >
                      {route.name}
                    </Typography>
                    <></>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              ml: "2rem",
            }}
          >
            {navigationRoutes.map((route) => (
              <Button
                component={ReactRouterLink}
                to={route.path}
                key={route.name}
                startIcon={route.icon}
                size="large"
                onClick={handleCloseNavMenu}
                sx={{
                  mr: "1rem",
                  color: "white",
                }}
              >
                {route.name}
              </Button>
            ))}
          </Box>
          <ThemeButton />
          <SocialMedias />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AppNavigation;
