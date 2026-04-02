"use client";

import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Reveal, ScrollBlock } from "../Motion/Reveal";

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
        <Stack spacing={4}>
          <Reveal y={30}>
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
          </Reveal>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "repeat(3, minmax(0, 1fr))" },
              gap: 2.5,
            }}
          >
            {projects.map((project, index) => (
              <ScrollBlock
                key={project.title}
                delay={0.1 * index}
                sx={{ height: "100%", gridColumn: { lg: project.emphasis ? "span 2" : "span 1" } }}
              >
                <Box
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    p: { xs: 3, md: 3.5 },
                    borderRadius: { xs: "28px", md: "32px" },
                    border: "1px solid var(--surface-border)",
                    background: `radial-gradient(circle at top left, ${project.accent}, transparent 42%), linear-gradient(180deg, var(--surface-strong), rgba(255, 255, 255, 0.02))`,
                    backdropFilter: "blur(18px)",
                    minHeight: 320,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Stack spacing={2.25} sx={{ height: "100%" }}>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={1.25}
                      justifyContent="space-between"
                      alignItems={{ xs: "flex-start", sm: "center" }}
                    >
                      <Chip
                        label={project.label}
                        sx={{
                          width: "fit-content",
                          backgroundColor: "var(--surface-soft)",
                          border: "1px solid var(--surface-border)",
                          color: "text.primary",
                          fontWeight: 600,
                        }}
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ letterSpacing: "0.12em" }}>
                        0{index + 1}
                      </Typography>
                    </Stack>

                    <Box sx={{ flexGrow: 1, maxWidth: project.emphasis ? 620 : 460 }}>
                      <Typography variant="h4" sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, lineHeight: 1.05 }}>
                        {project.title}
                      </Typography>
                      <Typography sx={{ mt: 1.5, color: "text.secondary", lineHeight: 1.8 }}>
                        {project.description}
                      </Typography>
                    </Box>

                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                      {project.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          variant="outlined"
                          sx={{
                            borderColor: "var(--surface-border)",
                            backgroundColor: "rgba(255, 255, 255, 0.03)",
                          }}
                        />
                      ))}
                    </Stack>

                    <Reveal delay={0.12}>
                      <Box
                        sx={{
                          mt: "auto",
                          pt: 2.5,
                          borderTop: "1px solid var(--section-divider)",
                          display: "grid",
                          gap: 2,
                        }}
                      >
                        <Box>
                          <Typography variant="overline" color="primary.main" sx={{ letterSpacing: "0.12em" }}>
                            What I liked
                          </Typography>
                          <Typography sx={{ mt: 0.8, color: "text.secondary", lineHeight: 1.7 }}>
                            {project.note}
                          </Typography>
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
                      </Box>
                    </Reveal>
                  </Stack>
                </Box>
              </ScrollBlock>
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
