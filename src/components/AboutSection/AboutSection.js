"use client";

import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import GroupWorkRoundedIcon from "@mui/icons-material/GroupWorkRounded";
import PsychologyAltRoundedIcon from "@mui/icons-material/PsychologyAltRounded";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Reveal, ScrollBlock } from "../Motion/Reveal";
import { motion, useScroll, useTransform } from "motion/react"
import { useEffect, useRef, useState } from "react";

const strengths = [
  "frontend systems",
  "design curiosity",
  "product thinking",
  "clear communication",
  "small details",
];

const principles = [
  {
    title: "How I like to work",
    text: "Ask early. Build fast. Refine later.",
    icon: <PsychologyAltRoundedIcon />,
  },
  {
    title: "What I value",
    text: "Curiosity, taste, and technical clarity.",
    icon: <GroupWorkRoundedIcon />,
  },
  {
    title: "What I keep chasing",
    text: "Work that feels useful and alive.",
    icon: <FavoriteBorderRoundedIcon />,
  },
  {
    title: "What I keep chasing i",
    text: "Work that feels useful and alive.",
    icon: <FavoriteBorderRoundedIcon />,
  },
  {
    title: "What I keep chasing ii",
    text: "Work that feels useful and alive.",
    icon: <FavoriteBorderRoundedIcon />,
  },
  {
    title: "What I keep chasing iii",
    text: "Work that feels useful and alive.",
    icon: <FavoriteBorderRoundedIcon />,
  },
  {
    title: "Wh at I keep chasing",
    text: "Work that feels useful and alive.",
    icon: <FavoriteBorderRoundedIcon />,
  },
  {
    title: "What I keep ch asing",
    text: "Work that feels useful and alive.",
    icon: <FavoriteBorderRoundedIcon />,
  },
];

export default function AboutSection() {

  const ref = useRef(null);
  const stickyRef = useRef(null);
  const [scrollElementHeight, setScrollElementHeight] = useState(0);
  const [stickyElementHeight, setStickyElementHeight] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0% 0px", `100% ${stickyElementHeight}px`], // 75 is the height of the sticky icon
  });

  useEffect(() => {
    setScrollElementHeight(ref.current?.offsetHeight || 0);
  }, [ref]);

  useEffect(() => {
    setStickyElementHeight(stickyRef.current?.offsetHeight || 0);
  }, [stickyRef]);

  const y = useTransform(scrollYProgress, [0, 1], [0, scrollElementHeight - stickyElementHeight]);

  return (
    <Box component="section" id="about" sx={{ py: { xs: 7, md: 10 } }}>
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
          <motion.div style={{ y, width: '50%', height: 'fit-content', paddingTop: '2rem' }} ref={stickyRef}>
            <Reveal x={28} y={22} duration={0.76} delay={0.14}>
              <Box
                sx={{
                  position: "relative",
                  height: "100%",
                  minHeight: { lg: 420 },
                  p: { xs: 3, md: 4 },
                  borderRadius: { xs: "28px", md: "34px" },
                  border: "1px solid var(--surface-border)",
                  background:
                    "linear-gradient(180deg, var(--surface-strong), rgba(255, 255, 255, 0.02))",
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
                  <Typography variant="overline" color="primary.main" sx={{ letterSpacing: "0.18em" }}>
                    A few quick notes
                  </Typography>

                  <Stack spacing={0}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      I care about building useful and delightful products.
                    </Typography>
                    <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                      I’ve been fortunate to work on a variety of projects, from small startups to large companies, and I’m always looking for new challenges and opportunities to learn.
                    </Typography>
                    <Typography>
                      Here are some of the things I consider my strengths:
                    </Typography>
                  </Stack>

                  <Box
                    sx={{
                      pt: 2.5,
                      display: "grid",
                      gap: 1,
                    }}
                  >
                    <Typography variant="overline" color="primary.main" sx={{ letterSpacing: "0.12em" }}>
                      The short version
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      Useful first. Memorable second.
                    </Typography>
                    <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                      Both matter.
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Reveal>
          </motion.div>

          <motion.div style={{ width: '40%' }} ref={ref}>
            <Stack spacing={0} sx={{ position: "relative", zIndex: 1, borderTop: "1px solid var(--section-divider)" }}>
              {principles.map((principle, index) => (
                <ScrollBlock hover={false} key={index} delay={0.08 * index}>
                  <Box
                    sx={{
                      py: { xs: 2.75, md: 3.2 },
                      borderBottom: "1px solid var(--section-divider)",
                      background: "linear-gradient(180deg, rgba(255, 255, 255, 0.04), transparent 82%)",
                    }}
                  >
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={2}
                      alignItems={{ xs: "flex-start", sm: "center" }}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          display: "grid",
                          placeItems: "center",
                          borderRadius: 3,
                          border: "1px solid var(--surface-border)",
                          backgroundColor: "var(--surface-tint)",
                          color: "primary.main",
                          flexShrink: 0,
                        }}
                      >
                        {principle.icon}
                      </Box>
                      <Box>
                        <Typography variant="h6">{principle.title}</Typography>
                        <Typography color="text.secondary" sx={{ mt: 1, lineHeight: 1.8 }}>
                          {principle.text}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                </ScrollBlock>
              ))}

              <ScrollBlock hover={false} delay={0.26}>
                <Box
                  sx={{
                    py: { xs: 3, md: 3.4 },
                    borderBottom: "1px solid var(--section-divider)",
                  }}
                >
                  <Stack spacing={1.5}>
                    <Typography variant="overline" color="primary.main" sx={{ letterSpacing: "0.12em" }}>
                      Beyond the usual portfolio language
                    </Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      Good technical work should still feel human.
                    </Typography>
                  </Stack>
                </Box>
              </ScrollBlock>
            </Stack>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
