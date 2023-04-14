import {
  AppBar, Container, Toolbar, useMediaQuery,
} from '@mui/material';
import * as React from 'react';
import DonateButton from '@/components/Navigation/DonateButton';
import { useTheme } from '@/core/ui/mui/theme';
import NavigationMenuItems from '@/components/Navigation/NavigationMenuItems';
import AvatarLink from '../AvatarLink.js';
import SocialMedias from './SocialMedias.js';
import ThemeButton from '../ThemeButton.js';
import avatarImage from '/images/my-avatar.webp';

function Navigation(): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <AvatarLink
            sx={{ width: '2.5rem', height: '2.5rem' }}
            alt="avatar"
            src={avatarImage}
            to="/"
          />
          <NavigationMenuItems />
          {isMobile ? <DonateButton /> : null}
          <ThemeButton />
          <SocialMedias />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default React.memo(Navigation);
