import { useTheme } from '@/core/ui/mui/theme.js';
import {
  Card, CardContent, Container, Skeleton,
} from '@mui/material';
import { memo } from 'react';

function ArticleCardSkeleton({
  numberOfCards,
}: {
  numberOfCards: number;
}): JSX.Element {
  const theme = useTheme();

  return (
    <Container
      className="blog-skeletons"
      sx={{
        display: 'grid',
        my: '1rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 'large',
        rowGap: '2rem',
        columnGap: '2rem',
        gridTemplateColumns: 'repeat(auto-fill, 1fr)',
        '@media screen and (min-width: 450px)': {
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px,1fr))',
        },
        padding: theme.spacing(2),
      }}
    >
      {Array(numberOfCards)
        .fill(undefined)
        .map((_, index) => {
          return (
            <Card
              sx={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                height: '100%',
                borderRadius: '12px',
              }}
              key={index}
            >
              <Skeleton animation="wave" variant="rectangular" height={205} />
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                }}
              >
                <Skeleton
                  animation="wave"
                  height={50}
                  style={{ marginBottom: '1.5rem' }}
                />
                <Skeleton animation="wave" height={30} />
                <Skeleton
                  animation="wave"
                  height={40}
                  style={{ marginTop: '.3rem' }}
                />
              </CardContent>
            </Card>
          );
        })}
    </Container>
  );
}

export default memo(ArticleCardSkeleton);
