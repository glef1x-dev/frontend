import * as React from "react";
import { usePageEffect } from "../../core/page.js";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function About(): JSX.Element {
  usePageEffect({ title: "About Me" });

  return (
    <Container
      maxWidth="lg"
      sx={{
        m: "0 auto",
        my: "1rem"
      }}
    >
      <Typography variant="h3" fontWeight="bold">
        About
      </Typography>
      <Typography sx={{ mt: "1rem" }} variant="h5">
        Hey, I'm Hlib Haranin.
      </Typography>
      <Typography sx={{mt: "1rem"}} variant="body1">
        My name is Hlib Haranin, but I usually go by Glib or Gleb ("Гліб" in
        Ukrainian). I'm a Pythonista, Gopher, and full-stack developer. I'm a
        software developer from Ukraine &#x1F1FA;&#x1F1E6;. Currently, I'm living in New York,
        USA &#x1F1FA;&#x1F1F8;.
      </Typography>
      <Typography sx={{mt: "1rem"}} variant="body1">
        At present I contribute to open source in Python on projects relating to
        web development, including most notably the HTTP stack. I also have
        experience building full-stack applications and write Python, Typescript
        and React.
      </Typography>
    </Container>
  );
}
