import { OpenSourceProject } from '@/services/api/types/opensourceProject';
import { formatStargazersCount } from '@/utils/formatting';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';
import { SnackbarKey, useSnackbar } from 'notistack';
import * as React from 'react';
import Emoji from '@/components/Emoji/Emoji';

type OpenSourceProjectCardProps = {
  project?: OpenSourceProject;
  loading?: true;
} & ({ loading: true } | { project: OpenSourceProject });

export default function OpenSourceProjectCard({
  project,
  loading,
}: OpenSourceProjectCardProps): JSX.Element {
  const { enqueueSnackbar } = useSnackbar();

  const onDocumentationButtonClick = (event: React.MouseEvent): SnackbarKey | null => {
    if (project && project.documentationLink === undefined) {
      event.preventDefault();
      return enqueueSnackbar(
        'Documentation for this project is not available.',
        {
          variant: 'error',
        },
      );
    }

    return null;
  };

  return (
    <Card
      sx={{
        position: 'relative',
      }}
    >
      <CardContent
        sx={{
          marginBottom: '3rem',
        }}
      >
        {loading ? (
          <Skeleton animation="wave" height={100} />
        ) : (
          <Grid container alignItems="center">
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                textDecoration: 'underline',
                paddingRight: '0.4rem',
              }}
              component="div"
            >
              {project.title}
            </Typography>
            <Typography
              variant="h4"
              color="text.secondary"
              sx={{
                mr: '2px',
              }}
            >
              {formatStargazersCount(project.stargazersCount ?? 0)}
            </Typography>
            <Emoji label="glowing-star" symbol="🌟" />
          </Grid>
        )}
        {loading ? (
          <Skeleton animation="wave" variant="rounded" />
        ) : (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              paddingY: '1rem',
            }}
          >
            {project.description}
          </Typography>
        )}
      </CardContent>
      {loading ? null : (
        <CardActions
          sx={{
            position: 'absolute',
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
            href={project.documentationLink ?? '#'}
            onClick={onDocumentationButtonClick}
            startIcon={<OpenInNewIcon />}
          >
            Documentation
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
