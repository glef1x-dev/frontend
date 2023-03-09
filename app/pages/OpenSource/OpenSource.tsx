import PageHeader from "@/components/PageHeader.js";
import { useTheme } from "@/core/ui/mui/theme.js";
import { useGetOpensourceProjects } from "@/hooks/api/useProjectsApi.js";
import { usePageEffect } from "@/hooks/page.js";
import { Container } from "@mui/material";
import OpenSourceProjectCard from "./OpenSourceProjectCard.js";
import SEO from "@/components/SEO.js";

export default function OpenSource() {
  usePageEffect({ title: "Opensource" });
  const theme = useTheme();
  const projects = useGetOpensourceProjects();

  return (
    <>
      <SEO description="The open source projects that I am involved with, either as the author or as a maintainer" />
      <PageHeader
        title="Opensource"
        description="These are the open source projects that I am involved with, either as the author or as a maintainer"
      />
      <Container
        sx={{
          "@media(min-width: 850px)": {
            gridTemplateColumns: "repeat(2, 1fr)",
          },
          display: "grid",
          gridTemplateColumns: "repeat(1, 1fr)",
          gap: "1rem",
          padding: theme.spacing(2),
          gridAutoRows: "1fr",
        }}
      >
        {projects.map((project) => (
          <OpenSourceProjectCard key={project.title} project={project} />
        ))}
      </Container>
    </>
  );
}
