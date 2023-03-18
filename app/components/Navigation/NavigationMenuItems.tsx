import {
  Box,
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import DonateButton from "@/components/Navigation/DonateButton";
import * as React from "react";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import NewspaperTwoToneIcon from "@mui/icons-material/NewspaperTwoTone";

const NAVIGATION_ROUTES = [
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
] as const;

export default function NavigationMenuItems() {
  const { pathname: currentPath } = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
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
          {NAVIGATION_ROUTES.map((route) => (
            <MenuItem
              key={route.name}
              onClick={handleCloseNavMenu}
              selected={route.path === currentPath}
              divider={true}
            >
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
        {NAVIGATION_ROUTES.map((route) => (
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
        <DonateButton />
      </Box>
    </>
  );
}
