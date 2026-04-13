"use client";

import GitHubIcon from "@mui/icons-material/GitHub";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ProjectItem from "../ProjectItem/ProjectItem";
import SkillsParallax from "../SkillsParallax/SkillsParallax";

const projects = [
  {
    title: "Bone Fracture Malunion Research",
    description:
      "A research project analyzing the MIMIC-IV medical dataset to predict bone fracture malunion outcomes using machine learning techniques.",
    note:
      "I used Pandas and JMP Pro to clean and analyze the data and built predictive models using PyCaret. I also first-authored an abstract that was accepted for presentation in the ASMBR and the BMES 2025 conferences.",
    tags: ["Data Science", "Machine Learning", "Data Visualization", "Research", "Pandas"],
    accent: "rgba(15, 111, 255, 0.16)",
    buttons: [
      {
        label: "See abstract",
        emphasis: true,
        href: "https://asbmr.confex.com/asbmr/2025/meetingapp.cgi/Paper/5144",
      },
      {
        label: "View code",
        href: "https://github.com/HackingGo306/MIMIC-Analysis",
      },
    ],
  },
  {
    title: "MedSnap",
    description:
      "An AI-powered medical report autocompletion tool made for streamlining repetitive notetaking.",
    note:
      "As a fullstack developer, I handled API routing, user authentication, database security, and UI efficiency. I implemented the autocompletion feature using OpenAI's API.",
    tags: ["Next.js", "MariaDB", "OpenAI Integration", "LLM", "Data Processing", "MUI"],
    accent: "rgba(45, 212, 191, 0.14)",
    buttons: [
      {
        label: "Visit site",
        emphasis: true,
        href: "https://medsnap.cameron-jiang.com",
      },
    ],
  },
  {
    title: "Drone Recovery Reinforcement Learning",
    description:
      "Quadcopter using reinforcement learning (PPO) in Unity environment to recover after a single-rotor failure.",
    note:
      "I integrated Microsoft's AirSim with Unity and StableBaselines3, using Tensorboard for visualization. I worked on reward shaping and hyperparameter tuning to achieve stable learning and successful recovery behaviors.",
    tags: ["Reinforcement Learning", "Autonomous Systems", "StableBaselines3", "Research"],
    accent: "rgba(255, 141, 86, 0.16)",
    buttons: [
      {
        label: "View code",
        emphasis: true,
        href: "https://github.com/orgs/Cosys-Drone/repositories",
      },
    ],
  },
  {
    title: "Flozable",
    description: "A study website to increase student productivity",
    note:
      "I worked on the front-end using React, and helped implement Spotify Music API as well as study themes.",
    tags: ["React", "Spotify API", "Web Development", "UX Design", "Teamwork"],
    accent: "rgba(249, 179, 80, 0.16)",
    buttons: [
      {
        label: "Visit site",
        emphasis: true,
        href: "https://flozable.com",
      },
    ],
  },
];

export default function ProjectSectionMobile() {
  return (
    <Box
      component="section"
      id="projects"
      sx={{
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          left: "-12%",
          top: "3rem",
          width: "62%",
          aspectRatio: "1",
          borderRadius: "999px",
          background: "radial-gradient(circle, var(--color-ambient-tertiary), transparent 72%)",
          opacity: 0.7,
          pointerEvents: "none",
          filter: "blur(6px)",
        },
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h1"
          sx={{
            fontSize: "2.6rem",
            backgroundImage: 'var(--mobile-gradient-hero)',
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            textAlign: "center",
            mb: 2,
          }}
        >
          My Projects
        </Typography>
        <Stack spacing={2.5}>
          <Box
            sx={{
              p: 2.5,
              mb: 2.5,
              borderRadius: "1.75rem",
              background: "var(--color-bg-soft-card)",
              boxShadow: "0 18px 30px var(--color-box-shadow)",
            }}
          >
            <Stack spacing={2.25}>
              <Stack spacing={1.5}>
                <Typography variant="h6" sx={{ fontWeight: 500, lineHeight: 1.25 }}>
                  I&apos;ve been working on a range of projects over the years, from playful ideas to AI-powered tools.
                </Typography>
                <Typography sx={{ color: "text.secondary", lineHeight: 1.5 }}>
                  Game development first taught me to enjoy the process of building.
                  Now, after spending more time with AI and product work, I&apos;m even
                  more interested in how software can create real impact.
                </Typography>
              </Stack>

              <Box sx={{ display: "grid", gap: 0 }}>
                <Button
                  variant="outlined"
                  startIcon={<GitHubIcon />}
                  component="a"
                  href="https://github.com/HackingGo306"
                  target="_blank"
                  sx={{ alignSelf: "flex-start" }}
                >
                  GitHub
                </Button>
              </Box>
            </Stack>
          </Box>
          <Stack spacing={4}>
            {projects.map((project, i) => (
              <ProjectItem smallButtons={true} key={project.title + "_" + i} project={project} />
            ))}
          </Stack>
          <SkillsParallax />
        </Stack>
      </Container>
    </Box>
  );
}
