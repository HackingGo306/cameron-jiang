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
    title: "MedSnap",
    description: "An AI-powered medical report autocompletion tool made for streamlining repetitive notetaking.",
    note: "As a fullstack developer, I handled API routing, user authentication, database security, and UI efficiency. I implemented the autocompletion feature using OpenAI's API.",
    tags: ["Next.js", "MariaDB", "OpenAI Integration", "LLM", "Data Processing", "MUI"],
    accent: "rgba(45, 212, 191, 0.14)",
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
    <Container maxWidth="xl" sx={{ position: "relative", height: scrollElementHeight }} ref={ref}>
      <Box
        sx={{
          position: "sticky",
          height: "100vh",
          display: "flex",
          top: 0,
          flexDirection: "row",
          justifyContent: 'space-between',
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
            width: "50%",
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
              p: { xs: 3, md: 4 },
              borderRadius: { xs: "28px", md: "34px" },
              backdropFilter: "blur(20px)",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                right: "-18%",
                bottom: "-28%",
                width: "72%",
                aspectRatio: "1",
                borderRadius: "999px",
                filter: "blur(24px)",
                opacity: 0.95,
              },
            }}
          >
            <Stack spacing={3} sx={{ position: "relative" }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2rem", md: "4rem" },
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

              <Stack spacing={0}>
                <Typography variant="h5" sx={{ fontWeight: 500, mb: 2 }}>
                  I've been working on a range of projects over the years, from silly games to AI-powered tools.
                </Typography>
                <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                  My first exposure to programming, game development, has taught me to enjoy the process of programming.
                  Now, having experience with AI, I'm even more fascinated by the impact that programming can have on the world.
                </Typography>
              </Stack>
              <Box sx={{ display: "grid", gap: 1 }}>
                <Typography variant="overline" color="primary.main" sx={{ letterSpacing: "0.12em" }}>
                  Check out my Github
                </Typography>
                <Stack direction="row" spacing={3} alignItems="center">
                  <Button variant="outlined" startIcon={<GitHubIcon />} component="a" href="https://github.com/HackingGo306" target="_blank">
                    GitHub
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </motion.div>


        <div style={{ width: "48%", paddingLeft: '1.5%', paddingRight: '1.5%', paddingTop: "7rem" }} ref={scrollRef}>
          <motion.div style={{ y }}>
            <Stack spacing={2.5}>
              {projects.map((project, i) => (
                <ProjectItem key={project.title + "_" + i} project={project} />
              ))}
            </Stack>
            <Box sx={{ position: "absolute", paddingTop: "1rem", bottom: 0, right: 0, transform: "translateY(100%) translateY(2rem)", width: '216%', height: 'fit-content' }}>
              <Skills />
            </Box>
          </motion.div>
        </div>
      </Box>
    </Container>
  );
}
