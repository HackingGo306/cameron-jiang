"use client";

import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import GroupWorkRoundedIcon from "@mui/icons-material/GroupWorkRounded";
import PsychologyAltRoundedIcon from "@mui/icons-material/PsychologyAltRounded";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Reveal } from "../Motion/Reveal";
import { motion, useScroll, useTransform } from "motion/react"
import { useEffect, useRef, useState } from "react";
import { Icon } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from "next/link";
import ProjectItem from "../ProjectItem/ProjectItem";

const projects = [
  {
    title: "MedSnap",
    description: "An AI-powered medical report autocompletion tool made for streamlining repetitive notetaking.",
    note: "As a fullstack developer, I handled API routing, user authentication, database security, and UI efficiency.",
    tags: ["Next.js", "MariaDB", "OpenAI Integration", "Healthcare", "Data Processing", "MUI"],
    accent: "rgba(15, 111, 255, 0.12)",
    emphasis: true,
  },
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
]

export default function AboutSection() {

  const ref = useRef(null);
  const stickyRef = useRef(null);
  const [scrollElementHeight, setScrollElementHeight] = useState(0);
  const [stickyElementHeight, setStickyElementHeight] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0% 0px", `100% ${stickyElementHeight}px`],
  });

  useEffect(() => {
    setScrollElementHeight(ref.current?.offsetHeight || 0);
  }, [ref]);

  useEffect(() => {
    setStickyElementHeight(stickyRef.current?.offsetHeight || 0);
  }, [stickyRef]);

  const y = useTransform(scrollYProgress, [0, 1], [0, scrollElementHeight - stickyElementHeight]);

  return (
    <Box component="section" sx={{ py: { xs: 2, md: 5 } }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            position: "relative",
            display: "flex",
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
              background: "radial-gradient(circle, var(--page-glow-primary), transparent 72%)",
              filter: "blur(28px)",
              opacity: 0.7,
              pointerEvents: "none",
            },
          }}
        >
          <motion.div style={{ position: 'relative', y: y, width: '50%', height: 'fit-content', paddingTop: '7rem' }} ref={stickyRef} id="projects">
            <Reveal x={28} y={22} duration={0.76} delay={0.14}>
              <Box
                sx={{
                  position: "relative",
                  height: "100%",
                  minHeight: { lg: 420 },
                  p: { xs: 3, md: 4 },
                  borderRadius: { xs: "28px", md: "34px" },
                  border: "1px solid var(--surface-border)",
                  // background: "linear-gradient(180deg, var(--surface-strong), rgba(255, 255, 255, 0.02))",
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
                    background: "radial-gradient(circle, var(--page-glow-primary), transparent 72%)",
                    filter: "blur(24px)",
                    opacity: 0.95,
                  },
                }}
              >
                <Stack spacing={3} sx={{ position: "relative" }}>
                  <Typography variant="h1" color="primary.main"
                    sx={{
                      fontSize: { xs: "2rem", md: "4rem" }
                    }}
                  >
                    My Projects
                  </Typography>

                  <Stack spacing={0}>
                    <Typography variant="h5" sx={{ fontWeight: 600 }} gutterBottom>
                      I've been working on a range of projects over the years, from silly games to AI-powered tools.
                    </Typography>
                    <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                      My first exposure to programming, game development, has taught me to enjoy the process of programming.
                      Now, having experience with AI, I'm even more fascinated by the impact that programming can have on the world.
                    </Typography>
                  </Stack>
                  <Box sx={{ display: "grid", gap: 1, }}>
                    <Typography variant="overline" color="primary.main" sx={{ letterSpacing: "0.12em" }}>
                      My current goal
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      Impactful and Accessible AI
                    </Typography>
                    <Stack direction="row" spacing={3} alignItems="center" sx={{ mt: 1 }}>
                      <Link href="https://github.com/HackingGo306" target="_blank" rel="noopener noreferrer">
                        <GitHubIcon sx={{ fontSize: '2.5rem' }} />
                      </Link>
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            </Reveal>
          </motion.div>

          <motion.div style={{ width: '45%', height: 'max-content', paddingTop: '7rem' }} ref={ref}>
            <Stack spacing={2.5}>
              {projects.map((project, i) => (
                <ProjectItem key={project.title + "_" + i} project={project} />
              ))}
            </Stack>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
