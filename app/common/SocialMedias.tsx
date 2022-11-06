import { Box, IconButton } from "@mui/material";
import * as React from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import GitHubIcon from "@mui/icons-material/GitHub";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function SocialMedias(): JSX.Element {
  const socialMedias: Array<SocialMedia> = [
    {
      name: "github",
      href: "https://github.com/GLEF1X",
      iconElement: <GitHubIcon />,
    },
    {
      name: "linkedin",
      href: "https://www.linkedin.com/in/glef1x/",
      iconElement: <LinkedInIcon />,
    },
  ];

  return (
    <Box className="socialMedias">
      {socialMedias.map((socialMedia) => {
        return (
          <IconButton
            edge="end"
            href="#"
            size="large"
            aria-label="github"
            onClick={() => (window.location.href = socialMedia.href)}
            key={socialMedia.name}
          >
            {socialMedia.iconElement}
          </IconButton>
        );
      })}
    </Box>
  );
}

interface SocialMedia {
  name: string;
  href: string;
  iconElement: JSX.Element;
}
