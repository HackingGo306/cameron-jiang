"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useEffect, useRef, useState } from "react";
import ProjectItem from "../ProjectItem/ProjectItem";
import Skills from "../Skills/Skills";

const projects = [
  {
    title: "Bone Fracture Malunion Research",
    description: "A research project analyzing the MIMIC-IV medical dataset to predict bone fracture malunion outcomes using machine learning techniques.",
    note: "I used Pandas and JMP Pro to clean and analyze the data and built predictive models using PyCaret. I also first-authored an abstract that was accepted for presentation in the ASMBR and the BMES 2025 conferences.",
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
      }
    ]
  },
  {
    title: "PatchSight",
    description: "An experimental AI-powered visual debugging system that uses Playwright screenshots and multimodal vision models to identify layout issues in rendered web interfaces.",
    note: "I built the MVP workflow for screenshot capture, structured visual feedback, iterative patch generation, and a human-in-the-loop dashboard for reviewing scores, feedback cards, iteration history, and applied file diffs before changes are committed.",
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
      }
    ]
  },
  {
    title: "MedSnap",
    description: "An AI-powered medical report autocompletion tool made for streamlining repetitive notetaking.",
    note: "As a fullstack developer, I handled API routing, user authentication, database security, and UI efficiency. I implemented the autocompletion feature using OpenAI's API.",
    tags: ["Next.js", "MariaDB", "OpenAI Integration", "LLM", "Data Processing", "MUI"],
    accent: "rgba(45, 212, 191, 0.14)",
    color: "#2dd4bf",
    buttons: [
      {
        label: "Visit site",
        emphasis: true,
        href: "https://medsnap.cameron-jiang.com",
      }
    ]
  },
  {
    title: "Drone Recovery Reinforcement Learning",
    description: "Quadcopter using reinforcement learning (PPO) in Unity environment to recover after a single-rotor failure.",
    note: "I integrated Microsoft's AirSim with Unity and StableBaselines3, using Tensorboard for visualization. I worked on reward shaping and hyperparameter tuning to achieve stable learning and successful recovery behaviors.",
    tags: ["Reinforcement Learning", "Autonomous Systems", "StableBaselines3", "Research"],
    accent: "rgba(255, 141, 86, 0.16)",
    color: "#ff8d56",
    buttons: [
      {
        label: "View code",
        emphasis: true,
        href: "https://github.com/orgs/Cosys-Drone/repositories",
      }
    ]
  },
  {
    title: "Flozable",
    description: "A study website to increase student productivity",
    note: "I worked on the front-end using React, and helped implement Spotify Music API as well as study themes.",
    tags: ["React", "Spotify API", "Web Development", "UX Design", "Teamwork"],
    accent: "rgba(249, 179, 80, 0.16)",
    color: "#f9b350",
    buttons: [
      {
        label: "Visit site",
        emphasis: true,
        href: "https://flozable.com",
      }
    ]
  },
]

export default function ProjectSection() {

  const ref = useRef(null);
  const scrollRef = useRef(null);
  const stickyRef = useRef(null);
  const [scrollElementHeight, setScrollElementHeight] = useState(0);
  const [stickyElementHeight, setStickyElementHeight] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", `end end`],
  });

  useEffect(() => {
    setScrollElementHeight(scrollRef.current?.scrollHeight || 0);
  }, [scrollRef]);

  useEffect(() => {
    setStickyElementHeight(stickyRef.current?.scrollHeight || 0);
  }, [stickyRef]);


  const y = useTransform(scrollYProgress, [0, 1], [0, (-scrollElementHeight + stickyElementHeight)]);
  const [gradientRotate, setGradientRotate] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const gradientRotate = latest * 100;
    setGradientRotate(gradientRotate);
  });

  return (
    <Container maxWidth="xxl" sx={{ position: "relative", height: scrollElementHeight || "auto" }} ref={ref}>
      <Box
        sx={{
          position: "sticky",
          height: "100vh",
          display: "flex",
          top: 0,
          flexDirection: "row",
          justifyContent: 'space-between',
          gap: { md: 4, xl: 6 },
          "&::before": {
            content: '""',
            position: "absolute",
            left: "8%",
            top: "8%",
            width: "30%",
            aspectRatio: "1",
            borderRadius: "999px",
            background: "radial-gradient(circle, var(--color-ambient-tertiary), transparent 72%)",
            opacity: 0.7,
            pointerEvents: "none",
          },
        }}
      >
        <motion.div
          style={{
            width: "46%",
            height: "fit-content",
            paddingTop: "7rem",
          }}
          id="projects"
          ref={stickyRef}
        >
          <Box
            sx={{
              position: "relative",
              height: "100%",
              minHeight: { lg: 420 },
              py: { md: 1 },
              pr: { md: 3 },
            }}
          >
            <Stack spacing={3} sx={{ position: "relative" }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2rem", md: "4.1rem" },
                  lineHeight: 0.95,
                  backgroundImage: 'linear-gradient(135deg, var(--color-gradient-hero-one), var(--color-gradient-hero-two), var(--color-gradient-hero-one), var(--color-gradient-hero-two), var(--color-gradient-hero-one), var(--color-gradient-hero-two), var(--color-brand))',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '200% 100%',
                  backgroundPosition: `${gradientRotate}% 0%`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                My Projects
              </Typography>

              <Stack spacing={2}>
                <Typography variant="h5" sx={{ fontWeight: 500, lineHeight: 1.25 }}>
                  I've been working on a range of projects over the years, from silly games to AI-powered tools.
                </Typography>
                <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                  My first exposure to programming, game development, has taught me to enjoy the process of programming.
                  Now, having experience with AI, I'm even more fascinated by the impact that programming can have on the world.
                </Typography>
              </Stack>
              <Box sx={{ display: "grid", gap: 1 }}>
                <Stack direction="row" spacing={3} alignItems="center">
                  <Button variant="outlined" startIcon={<GitHubIcon />} component="a" href="https://github.com/HackingGo306" target="_blank">
                    GitHub
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </motion.div>


        <Box sx={{ width: "51%", px: "1%", pt: "7rem" }} ref={scrollRef}>
          <motion.div style={{ y }}>
            <Stack spacing={3}>
              {projects.map((project, i) => (
                <ProjectItem key={project.title + "_" + i} project={project} />
              ))}
            </Stack>
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: "translateY(100%) translateY(2.25rem)",
                width: "202%",
                height: "fit-content",
              }}
            >
              <Skills />
            </Box>
          </motion.div>
        </Box>
      </Box>
    </Container>
  );
}
