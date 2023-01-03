import { Box, IconButton } from "@mui/material";
import * as React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default React.memo(function SocialMedias(): JSX.Element {
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
          <a
            title={`Navigate to ${socialMedia.name}`}
            target="_blank"
            href={socialMedia.href}
            rel="noopener noreferrer"
          >
            <IconButton
              edge="end"
              size="large"
              aria-label="github"
              key={socialMedia.name}
            >
              {socialMedia.iconElement}
            </IconButton>
          </a>
        );
      })}
    </Box>
  );
});

export interface SocialMedia {
  name: string;
  href: string;
  iconElement: JSX.Element;
}
