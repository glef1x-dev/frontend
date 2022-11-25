import * as React from "react";

import { Box, Container, Grid, Typography } from "@mui/material";
import OpenSourceProjectCard from "./OpenSourceProjectCard.js";
import { usePageEffect } from "@/hooks/page.js";
import {useTheme} from "@/core/ui/mui/theme.js";

type OpenSourceProject = {
  title: string;
  description: string;
  sourceCodeLink: string;
  documentationLink?: string;
};

const openSourceProjects: OpenSourceProject[] = [
  {
    title: "glQiwiApi",
    description:
      "The ultra rapid and multifunctional wrapper over QIWI and YooMoney",
    sourceCodeLink: "https://github.com/GLEF1X/glQiwiApi",
    documentationLink: "https://glqiwiapi.readthedocs.io/en/latest/",
  },
  {
    title: "apscheduler-di",
    description: "Apscheduler Dependency Injection plugin",
    sourceCodeLink: "https://github.com/GLEF1X/apscheduler-di",
  },
  {
    title: "fastapi-admin2",
    description:
      "Lightweight and extendable admin panel, that supports many ORM dialects",
    sourceCodeLink: "https://github.com/GLEF1X/fastapi-admin2",
  },
  {
    title: "fastapi-ratelimiter",
    description: "Redis-based rate-limiting for FastAPI",
    sourceCodeLink: "https://github.com/GLEF1X/fastapi-ratelimiter",
    documentationLink: "https://fastapi-ratelimit.readthedocs.io/en/latest/",
  },
  {
    title: "aiomonobank",
    description: "Async wrapper over Monobank API",
    sourceCodeLink: "https://github.com/GLEF1X/aiomonobank",
  },
  {
    title: "sqla-pagination",
    description: "Pagination tool for adequate users of sqlalchemy",
    sourceCodeLink: "https://github.com/GLEF1X/sqla-pagination",
  },
];

const OpenSourcePageTitle = () => {
  return (
    <Grid
      item
      container
      direction="column"
      className="openSourcePageTitle"
      sx={{
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
        alignItems: "center",
        justifyContent: "center",
        pb: "1rem",
        py: "1rem",
      }}
    >
      <Typography fontWeight="bold" variant="h1">
        Open Source
      </Typography>
      <Typography
        variant="h3"
        sx={{
          py: 2,
        }}
      >
        These are the open source projects that I am involved with, either as
        the author or as a maintainer.
      </Typography>
    </Grid>
  );
};

export default function OpenSource() {
  usePageEffect({ title: "Opensource" });
  const theme = useTheme();

  return (
    <Container
      sx={{
        display: "grid",
      }}
    >
      <Grid
        container
        direction="column"
        sx={{
          [theme.breakpoints.up("md")]: {
            gap: 2,
            padding: "2rem",
          },
        }}
      >
        <OpenSourcePageTitle />
        <Box
          display="grid"
          gridTemplateColumns="repeat(1, 1fr)"
          gap="1.5rem"
          sx={{
            "@media(min-width: 850px)": {
              gridTemplateColumns: "repeat(2, 1fr)",
            },
          }}
        >
          {openSourceProjects.map((project: OpenSourceProject) => {
            return (
              <Box key={project.title}>
                <OpenSourceProjectCard
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  sourceCodeLink={project.sourceCodeLink}
                  documentationLink={project.documentationLink}
                />
              </Box>
            );
          })}
        </Box>
      </Grid>
    </Container>
  );
}
