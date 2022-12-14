import * as React from "react";

import { useGetStarsCount } from "@/hooks/api/useGithubApi.js";
import OpenInNewIcon from "@mui/icons-material/OpenInNew.js";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";

export default function OpenSourceProjectCard({
  icon,
  title,
  description,
  sourceCodeLink,
  documentationLink,
}: OpenSourceProjectCardProps): JSX.Element {
  const { enqueueSnackbar } = useSnackbar();
  const { data: githubStarsCount } = useGetStarsCount(sourceCodeLink);

  const onDocumentationButtonClick = (event: React.MouseEvent) => {
    if (documentationLink === undefined) {
      event.preventDefault();
      return enqueueSnackbar(
        "Documentation for this project is not available.",
        {
          variant: "error",
        }
      );
    }
  };

  return (
    <Card
      sx={{
        position: "relative",
      }}
    >
      {icon && <CardMedia component="img" alt="project card" image={icon} />}
      <CardContent
        sx={{
          marginBottom: "3rem",
        }}
      >
        <Grid container alignItems="center">
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              textDecoration: "underline",
              paddingRight: "0.4rem",
            }}
            component="div"
          >
            {title}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            {githubStarsCount ?? 0} &#11088;
          </Typography>
        </Grid>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            paddingY: "1rem",
          }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          position: "absolute",
          bottom: 0,
        }}
      >
        <Button
          size="medium"
          target="_blank"
          rel="noreferrer"
          href={sourceCodeLink}
          startIcon={<OpenInNewIcon />}
        >
          Source code
        </Button>
        <Button
          size="medium"
          target="_blank"
          rel="noreferrer"
          href={documentationLink ?? "#"}
          onClick={onDocumentationButtonClick}
          startIcon={<OpenInNewIcon />}
        >
          Documentation
        </Button>
      </CardActions>
    </Card>
  );
}

type OpenSourceProjectCardProps = {
  icon?: string;
  title: string;
  description: string;
  sourceCodeLink: string;
  documentationLink?: string;
  isMaintainer?: boolean;
};
