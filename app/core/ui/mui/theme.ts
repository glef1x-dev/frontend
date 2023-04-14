import { type PaletteMode, responsiveFontSizes, Theme as MuiTheme } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import {
  atom,
  selectorFamily,
  useRecoilCallback,
  useRecoilValue,
} from 'recoil';
import { components } from './components.js';
import palettes from './palettes.js';
import * as typography from './typography.js';

/**
 * The name of the selected UI theme.
 */
export const ThemeName = atom<PaletteMode>({
  key: 'ThemeName',
  effects: [
    (ctx) => {
      const storageKey = 'theme';

      if (ctx.trigger === 'get') {
        const name: PaletteMode = localStorage?.getItem(storageKey) === 'dark'
          ? 'dark'
          : localStorage?.getItem(storageKey) === 'light'
            ? 'light'
            : matchMedia?.('(prefers-color-scheme: dark)').matches
              ? 'dark'
              : 'light';
        ctx.setSelf(name);
      }

      ctx.onSet((value) => {
        localStorage?.setItem(storageKey, value);
      });
    },
  ],
});

/**
 * The customized Material UI theme.
 * @see https://next.material-ui.com/customization/default-theme/
 */
export const Theme = selectorFamily({
  key: 'Theme',
  dangerouslyAllowMutability: true,
  get(name: PaletteMode) {
    return function (): MuiTheme {
      const { palette } = createTheme({ palette: palettes[name] });
      return responsiveFontSizes(
        createTheme(
          {
            palette,
            typography: typography.options,
            components: components(palette),
            breakpoints: {
              values: {
                xs: 0,
                sm: 640,
                md: 1024,
                lg: 1250,
                xl: 1600,
              },
            }
          },
          {
            typography: typography.overrides,
          },
        ),
      );
    };
  },
});

/**
 * Returns a customized Material UI theme.
 *
 * @param name - The name of the requested theme. Defaults to the
 *               auto-detected or user selected value.
 */
export function useTheme(name?: PaletteMode): MuiTheme {
  const selected = useRecoilValue(ThemeName);
  return useRecoilValue(Theme(name ?? selected));
}

/**
 * Switches between "light" and "dark" themes.
 */
export function useToggleTheme(name?: PaletteMode): () => void {
  return useRecoilCallback(
    (ctx) => () => {
      ctx.set(
        ThemeName,
        name ?? ((prev): PaletteMode => (prev === 'dark' ? 'light' : 'dark')),
      );
    },
    [],
  );
}
