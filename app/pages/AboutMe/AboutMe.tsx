import * as React from "react";
import { usePageEffect } from "@/hooks/page.js";
import { Box, Paper, Typography, Container } from "@mui/material";

export default React.memo(function AboutMe(): JSX.Element {
  usePageEffect({ title: "About Me" });

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          m: "0 auto",
          my: "1rem",
        }}
      >
        <Box
          sx={{
            "@media screen and (min-width: 1060px)": {
              display: "grid",
              gap: "5em",
              gridTemplateColumns: "auto 300px",
            },
          }}
        >
          <Box>
            <Typography
              sx={{ marginTop: "2rem" }}
              variant="h3"
              fontWeight="bold"
            >
              About me
            </Typography>
            <Typography sx={{ mt: "1rem" }} variant="body1">
              Hey, I'm Hlib, but I usually go by Glib or Gleb ("Гліб" in
              Ukrainian)! I'm a software developer from
              Ukraine&#x1F1FA;&#x1F1E6;. Although currently, I live in the
              United States due to the war that has been started by Putin and
              his entourage.
            </Typography>
            <Typography sx={{ mt: "1rem" }} variant="body1">
              Check out the projects page to see a highlight of the open-source
              projects I've made, and articles to see everything I've written.
              I've also written external publications for the educational
              platform called "botfather.dev".
            </Typography>
            <Typography sx={{ mt: "1rem" }} variant="body1">
              My site has no ads, affiliate links, tracking or analytics,
              sponsored posts, or paywall. My only motivation for this site is
              to share what I've learned with the world, document my notes, and
              connect with a few people.
            </Typography>
          </Box>
          <aside className="pictures-of-mine">
            <Paper
              sx={{
                margin: "2rem 0",
                borderRadius: "10px",
              }}
            >
              <Typography
                sx={{
                  paddingLeft: "1.5rem",
                  paddingTop: ".5rem",
                }}
                variant="subtitle1"
              >
                Me
              </Typography>
              <img
                alt="personal-photo"
                style={{
                  maxWidth: "100%",
                  padding: "1.5rem",
                }}
                src="/personal-image.webp"
              />
            </Paper>
          </aside>
        </Box>
      </Box>
    </Container>
  );
});
