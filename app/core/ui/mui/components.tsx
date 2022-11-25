import {type Palette, type ThemeOptions} from "@mui/material/styles";

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
          font-family: 'JetbrainsMonoNL';
          src:  local('JetBrainsMono'), local('JetBrainsMono-Regular'), url('/fonts/JetBrainsMono-Regular.woff2') format('woff2');
          font-weight: 'regular';
        }
      `,
  },
});
