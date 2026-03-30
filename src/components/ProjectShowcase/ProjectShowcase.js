"use client";

import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const projects = [
  {
    title: "Realtime Ops Dashboard",
    label: "selected project",
    description: "A calmer way to track live system health and team workflows.",
    note: "I liked turning noise into something readable.",
    tags: ["Next.js", "MUI", "Data visualization", "Role-based UX"],
    accent: "rgba(15, 111, 255, 0.12)",
    emphasis: true,
  },
  {
    title: "AI Research Workspace",
    label: "experiment",
    description: "A space for notes, experiments, and loose thinking.",
    note: "I liked giving exploration some structure.",
    tags: ["LLM workflow", "Prompt tooling", "Information design"],
    accent: "rgba(255, 107, 87, 0.12)",
  },
  {
    title: "Developer Portfolio System",
    label: "personal build",
    description: "A portfolio that feels more personal than polished-corporate.",
    note: "I liked shaping the tone as much as the UI.",
    tags: ["Brand system", "Frontend architecture", "Responsive layout"],
    accent: "rgba(15, 23, 42, 0.06)",
  },
];

export default function ProjectShowcase() {
  return (
    <Box component="section" id="projects" sx={{ py: { xs: 7, md: 10 } }}>
      <Container maxWidth="xl">
        <Stack spacing={3.5}>
          <Box sx={{ maxWidth: 760 }}>
            <Typography variant="overline" color="primary.main" sx={{ letterSpacing: "0.16em" }}>
              Selected Work
            </Typography>
            <Typography variant="h2" sx={{ mt: 1, fontSize: { xs: "2.25rem", md: "3.5rem" } }}>
              A few things I&apos;ve made.
            </Typography>
            <Typography sx={{ mt: 2, color: "text.secondary", fontSize: "1.05rem", lineHeight: 1.8 }}>
              Projects that show the kind of problems I like.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "repeat(3, minmax(0, 1fr))" },
              gap: 2.5,
            }}
          >
            {projects.map((project) => (
              <Paper
                key={project.title}
                elevation={0}
                sx={{
                  p: { xs: 3, md: 3.5 },
                  border: "1px solid rgba(148, 163, 184, 0.16)",
                  backgroundColor: "rgba(15, 23, 42, 0.72)",
                  minHeight: 320,
                  display: "flex",
                  flexDirection: "column",
                  gridColumn: { lg: project.emphasis ? "span 2" : "span 1" },
                }}
              >
                <Stack spacing={2.25} sx={{ height: "100%" }}>
                  <Chip
                    label={project.label}
                    sx={{
                      width: "fit-content",
                      backgroundColor: project.accent,
                      color: "text.primary",
                      fontWeight: 600,
                    }}
                  />

                  <Box
                    sx={{
                      flexGrow: 1,
                      p: 2.25,
                      borderRadius: 4,
                      background:
                        "linear-gradient(180deg, rgba(18, 28, 52, 0.82), rgba(15, 23, 42, 0.78))",
                      border: "1px solid rgba(148, 163, 184, 0.14)",
                    }}
                  >
                    <Typography variant="h4" sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}>
                      {project.title}
                    </Typography>
                    <Typography sx={{ mt: 1.5, color: "text.secondary", lineHeight: 1.8 }}>
                      {project.description}
                    </Typography>

                    <Divider sx={{ my: 2.5, borderColor: "rgba(148, 163, 184, 0.14)" }} />

                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        backgroundColor: "rgba(15, 23, 42, 0.64)",
                        border: "1px solid rgba(148, 163, 184, 0.14)",
                      }}
                    >
                      <Typography variant="overline" color="primary.main" sx={{ letterSpacing: "0.12em" }}>
                        What I liked
                      </Typography>
                      <Typography sx={{ mt: 0.8, color: "text.secondary", lineHeight: 1.7 }}>
                        {project.note}
                      </Typography>
                    </Paper>

                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 2.5 }}>
                      {project.tags.map((tag) => (
                        <Chip key={tag} label={tag} variant="outlined" />
                      ))}
                    </Stack>
                  </Box>

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
                    <Button
                      variant="contained"
                      endIcon={<ArrowOutwardRoundedIcon />}
                      component="a"
                      href="#"
                    >
                      See project
                    </Button>
                    <Button variant="text" component="a" href="#">
                      Read the story
                    </Button>
                  </Stack>
                </Stack>
              </Paper>
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
