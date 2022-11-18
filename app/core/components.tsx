import { type Palette, type ThemeOptions } from "@mui/material/styles";

/**
 * Style overrides for Material UI components.
 */
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export const components = (palette: Palette): ThemeOptions["components"] => ({
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "unset",
      },
      contained: {
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none",
        },
      },
    },
  },

  MuiButtonGroup: {
    styleOverrides: {
      root: {
        boxShadow: "none",
      },
    },
  },
  MuiCssBaseline: {
    styleOverrides: `
        @font-face {
          font-family: 'FantasqueSansMonoRegular';
          src:  local('FantasqueSansMonoRegular'), local('FantasqueSansMonoRegular-regular'), url('/fonts/FantasqueSansMono-Regular.woff') format('woff');
          font-weight: 'regular';
        }
      `,
  },
});
