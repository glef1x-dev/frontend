import * as React from "react";
import { Grid, Typography } from "@mui/material";
import { usePageEffect } from "../../core/page.js";

export default function About(): JSX.Element {
  usePageEffect({ title: "About Me" });
  return (
    <Grid
      container
      direction="column"
      columns={{ xs: 4, sm: 8, md: 12 }}
      sx={{
        gap: "1rem",
        p: "2rem",
        maxWidth: "100ch",
        margin: "0 auto",
      }}
    >
      <Grid item>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          About Hlib
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1">
          My name is Hlib Haranin, but I usually go by Glib or Gleb ("Гліб" in
          Ukrainian). I'm a Pythonista, Gopher, and full-stack developer. I'm a
          software engineer from Ukraine &#x1F1FA;&#x1F1E6;. Currently, I'm
          living in New York, USA &#x1F1FA;&#x1F1F8;
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1">
          At present I contribute to open source in Python on projects relating
          to web development, including most notably the HTTP stack. I also have
          experience building full-stack applications and write Python,
          Typescript and React.
        </Typography>
      </Grid>
    </Grid>
  );
}
