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
    color: "#5cadff",
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
    color: "#2dd4bf",
    buttons: [
      {
        label: "Visit site",
        emphasis: true,
        href: "https://medsnap.cameron-jiang.com",
      },
    ],
  },
  {
    title: "PatchSight",
    description:
      "An experimental AI-powered visual debugging system that uses Playwright screenshots and multimodal vision models to identify layout issues in rendered web interfaces.",
    note:
      "I built the MVP workflow for screenshot capture, structured visual feedback, iterative patch generation, and a human-in-the-loop dashboard for reviewing scores, feedback cards, iteration history, and applied file diffs before changes are committed.",
    tags: ["AI Tooling", "Playwright", "Vision Models", "Frontend", "Human-in-the-loop"],
    accent: "rgba(168, 85, 247, 0.16)",
    color: "#a855f7",
    buttons: [
      {
        label: "View code",
        emphasis: true,
        href: "https://github.com/HackingGo306/PatchSight",
      },
      {
        label: "LinkedIn post",
        href: "https://www.linkedin.com/posts/cameron-jiang_fixing-ui-bugs-with-ai-can-feel-frustrating-ugcPost-7459728081767804928-UsaK?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEmIVWUB2JRUhqKM8ejpXKsDnJPoua8UR-E",
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
    color: "#ff8d56",
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
    color: "#f9b350",
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
      <Container maxWidth="md" sx={{ position: "relative" }}>
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
              position: "relative",
              p: 0,
              mb: 2.5,
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
