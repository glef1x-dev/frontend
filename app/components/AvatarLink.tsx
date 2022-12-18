import * as React from "react";
import { Avatar, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AvatarClasses } from "@mui/material/Avatar/avatarClasses.js";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import { OverridableStringUnion } from "@mui/types";
import { AvatarPropsVariantOverrides } from "@mui/material/Avatar/Avatar.js";

type AvatarLinkProps = {
  /**
   * Used in combination with `src` or `srcSet` to
   * provide an alt attribute for the rendered `img` element.
   */
  alt?: string;
  /**
   * Used to render icon or text elements inside the Avatar if `src` is not set.
   * This can be an element, or just a string.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<AvatarClasses>;
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attributes) applied to the `img` element if the component is used to display an image.
   * It can be used to listen for the loading error event.
   */
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement> & {
    sx?: SxProps<Theme>;
  };
  /**
   * The `sizes` attribute for the `img` element.
   */
  sizes?: string;
  /**
   * The `src` attribute for the `img` element.
   */
  src?: string;
  /**
   * The `srcSet` attribute for the `img` element.
   * Use this attribute for responsive image display.
   */
  srcSet?: string;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: any;
  /**
   * The shape of the avatar.
   * @default 'circular'
   */
  variant?: OverridableStringUnion<
    "circular" | "rounded" | "square",
    AvatarPropsVariantOverrides
  >;

  to: string;
};

export default React.memo(function AvatarLink(props: AvatarLinkProps) {
  return (
    <Link reloadDocument component={RouterLink} to={props.to}>
      <Avatar
        sx={{
          maxWidth: 40,
          maxHeight: 40,
        }}
        {...props}
      />
    </Link>
  );
});
