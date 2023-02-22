import { OpenSourceProject } from "@/services/api/types/opensourceProject";
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
import * as React from "react";

export default function OpenSourceProjectCard({
  project,
}: {
  project: OpenSourceProject;
}): JSX.Element {
  const { enqueueSnackbar } = useSnackbar();

  const onDocumentationButtonClick = (event: React.MouseEvent) => {
    if (project.documentationLink === undefined) {
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
      {project.icon && (
        <CardMedia component="img" alt="project card" image={icon} />
      )}
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
            {project.title}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            {project.stargazersCount ?? 0} &#11088;
          </Typography>
        </Grid>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            paddingY: "1rem",
          }}
        >
          {project.description}
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
          href={project.sourceCodeLink}
          startIcon={<OpenInNewIcon />}
        >
          Source code
        </Button>
        <Button
          size="medium"
          target="_blank"
          rel="noreferrer"
          href={project.documentationLink ?? "#"}
          onClick={onDocumentationButtonClick}
          startIcon={<OpenInNewIcon />}
        >
          Documentation
        </Button>
      </CardActions>
    </Card>
  );
}
