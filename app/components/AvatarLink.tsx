import { Avatar, Link } from '@mui/material';
import { AvatarClasses } from '@mui/material/Avatar';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

type AvatarLinkProps = {
  alt?: string;
  children?: React.ReactNode;
  classes?: Partial<AvatarClasses>;
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement> & {
    sx?: SxProps<Theme>;
  };
  sizes?: string;
  src?: string;
  srcSet?: string;
  variant?: 'circular' | 'rounded' | 'square'
  to: string;
  style?: React.CSSProperties
};

export default function AvatarLink({ to, ...props }: AvatarLinkProps): JSX.Element {
  return (
    <Link reloadDocument component={RouterLink} to={to}>
      <Avatar
        sx={{
          maxWidth: 40,
          maxHeight: 40,
        }}
        {...props}
      />
    </Link>
  );
}
