/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

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
          font-family: 'Wotfard';
          src: local('Wotfard'), local('Wotfard-Regular'), url("/fonts/wotfard-regular-webfont.woff2") format('woff2');
          font-weight: 'regular';
        }

        @font-face {
          font-family: 'FantasqueSansMonoRegular';
          src:  local('FantasqueSansMonoRegular'), local('FantasqueSansMonoRegular-regular'), url('/fonts/FantasqueSansMono-Regular.woff');
          font-weight: 'regular';
        }
      `,
  },
});
