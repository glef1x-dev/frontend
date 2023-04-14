import { useTheme, useToggleTheme } from '@/core/ui/mui/theme.js';
import { DarkMode, LightMode } from '@mui/icons-material';
import { IconButton, IconButtonProps } from '@mui/material';
import { memo } from 'react';

function ThemeButton(props: ThemeButtonProps): JSX.Element {
  const { ...other } = props;
  const toggleTheme = useToggleTheme();
  const theme = useTheme();

  return (
    <IconButton
      onClick={toggleTheme}
      aria-live="polite"
      aria-label="auto"
      title="Toggles light & dark"
      sx={{
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
      }}
      {...other}
    >
      {theme.palette.mode === 'light' ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
}

type ThemeButtonProps = Omit<IconButtonProps, 'children'>;

export default memo(ThemeButton);
