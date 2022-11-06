import * as React from "react";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

import {
  extractRepoNameAndOwnerFromGithubLink,
  getRepositoryStarsCount,
  useOctokit,
} from "../../core/integrations/github.js";
import Spinner from "../../common/Spinner.js";
import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

function OpenSourceProjectGithubStarsCount({
  sourceCodeLink,
}: OpenSourceProjectGithubStarsCountProps): JSX.Element {
  const octokitInstance = useOctokit();

  const [repoName, repoOwner] =
    extractRepoNameAndOwnerFromGithubLink(sourceCodeLink);

  const query = useQuery(
    ["openSourceProjectStarsCount", sourceCodeLink],
    async () => {
      return await getRepositoryStarsCount(
        octokitInstance,
        repoOwner,
        repoName
      );
    }
  );

  return (
    <React.Fragment>
      {query.isLoading ? (
        <Spinner isOpen={query.isLoading} />
      ) : (
        <Typography variant="h5" color="text.secondary">
          {`${query.data ?? 0} `} &#11088;
        </Typography>
      )}
    </React.Fragment>
  );
}

type OpenSourceProjectGithubStarsCountProps = {
  sourceCodeLink: string;
};

export default function OpenSourceProjectCard({
  icon,
  title,
  description,
  sourceCodeLink,
  documentationLink,
}: OpenSourceProjectCardProps): JSX.Element {
  const { enqueueSnackbar } = useSnackbar();

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
    <Card>
      {icon && <CardMedia component="img" alt="project card" image={icon} />}
      <CardContent>
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
          <OpenSourceProjectGithubStarsCount sourceCodeLink={sourceCodeLink} />
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
      <CardActions>
        <Button
          size="medium"
          target="_blank"
          rel="noreferrer"
          href={sourceCodeLink}
        >
          Source code
        </Button>
        <Button
          size="medium"
          target="_blank"
          rel="noreferrer"
          href={documentationLink ?? "#"}
          onClick={onDocumentationButtonClick}
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
