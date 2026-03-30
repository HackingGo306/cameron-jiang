"use client";

import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Reveal, ScrollBlock } from "../Motion/Reveal";

const focusAreas = ["frontend", "systems thinking", "design curiosity", "small details"];

const quickNotes = [
  {
    label: "currently into",
    value: "warm interfaces",
  },
  {
    label: "usually thinking about",
    value: "clarity and pacing",
  },
  {
    label: "kinds of projects I like",
    value: "useful tools",
  },
];

const littleCards = [
  {
    title: "Clarity",
    text: "Make the hard thing feel simple.",
    icon: <CodeRoundedIcon fontSize="small" />,
  },
  {
    title: "Warmth",
    text: "Useful can still feel human.",
    icon: <FavoriteBorderRoundedIcon fontSize="small" />,
  },
  {
    title: "Range",
    text: "Code, product, and design all matter.",
    icon: <AutoAwesomeRoundedIcon fontSize="small" />,
  },
];

export default function HeroSection() {
  return (
    <Box component="section" sx={{ pt: { xs: 7, md: 10 }, pb: { xs: 6, md: 8 } }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.1fr) minmax(320px, 0.9fr)" },
            gap: { xs: 4, md: 5 },
            alignItems: "stretch",
          }}
        >
          <Reveal x={-28} y={24} duration={0.72} delay={0.06}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4.75 },
                border: "1px solid rgba(148, 163, 184, 0.16)",
                backgroundColor: "rgba(15, 23, 42, 0.72)",
                backdropFilter: "blur(20px)",
              }}
            >
              <Stack spacing={3.5}>
                <Chip
                  label="Hi, I&apos;m Cameron."
                  sx={{
                    width: "fit-content",
                    fontWeight: 600,
                    backgroundColor: "rgba(94, 167, 255, 0.12)",
                    color: "primary.main",
                  }}
                />

                <Typography variant="h1" sx={{ fontSize: { xs: "3rem", md: "5rem" } }}>
                  I build thoughtful software for the web.
                </Typography>

                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{ maxWidth: 760, fontSize: { xs: "1.05rem", md: "1.35rem" }, lineHeight: 1.6 }}
                >
                  I care about clarity, feel, and the details that make software memorable.
                </Typography>

                <Reveal delay={0.12}>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <Button
                      variant="contained"
                      size="large"
                      endIcon={<ArrowOutwardRoundedIcon />}
                      component="a"
                      href="#projects"
                    >
                      See selected work
                    </Button>
                    <Button variant="outlined" size="large" component="a" href="#about">
                      Read a little about me
                    </Button>
                  </Stack>
                </Reveal>

                <Reveal delay={0.18}>
                  <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                    {focusAreas.map((item) => (
                      <Chip
                        key={item}
                        label={item}
                        variant="outlined"
                        sx={{
                          backgroundColor: "rgba(15, 23, 42, 0.46)",
                          borderColor: "rgba(148, 163, 184, 0.18)",
                        }}
                      />
                    ))}
                  </Stack>
                </Reveal>
              </Stack>
            </Paper>
          </Reveal>

          <Stack spacing={2}>
            <Reveal x={28} y={24} duration={0.76} delay={0.14}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  border: "1px solid rgba(148, 163, 184, 0.16)",
                  background:
                    "linear-gradient(180deg, rgba(15, 23, 42, 0.9), rgba(18, 28, 52, 0.82))",
                  minHeight: 300,
                }}
              >
                <Stack spacing={2.5}>
                  <Typography variant="overline" color="primary.main" sx={{ letterSpacing: "0.18em" }}>
                    A few quick notes
                  </Typography>

                  <Stack spacing={2}>
                    {quickNotes.map((item) => (
                      <Box key={item.label}>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.14em" }}
                        >
                          {item.label}
                        </Typography>
                        <Typography sx={{ mt: 0.6, fontSize: "1.04rem", lineHeight: 1.7 }}>
                          {item.value}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>

                  <Reveal delay={0.18}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2.5,
                        borderRadius: 1,
                        backgroundColor: "rgba(94, 167, 255, 0.08)",
                        border: "1px solid rgba(148, 163, 184, 0.14)",
                      }}
                    >
                      <Typography variant="overline" color="primary.main" sx={{ letterSpacing: "0.12em" }}>
                        The short version
                      </Typography>
                      <Typography variant="h5" sx={{ mt: 0.5, fontWeight: 700 }}>
                        Useful first. Memorable second.
                      </Typography>
                      <Typography sx={{ mt: 1.2, color: "text.secondary" }}>
                        Both matter.
                      </Typography>
                    </Paper>
                  </Reveal>
                </Stack>
              </Paper>
            </Reveal>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
                gap: 2,
              }}
            >
              {littleCards.map((card, index) => (
                <ScrollBlock key={card.title} delay={0.08 * index} hover={false}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      border: "1px solid rgba(148, 163, 184, 0.16)",
                      backgroundColor: "rgba(15, 23, 42, 0.72)",
                      transform: {
                        sm:
                          index === 0
                            ? "rotate(-1.5deg)"
                            : index === 1
                              ? "translateY(14px)"
                              : "rotate(1.5deg)",
                      },
                    }}
                  >
                    <Stack spacing={1.3}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          display: "grid",
                          placeItems: "center",
                          borderRadius: 3,
                          backgroundColor: "rgba(94, 167, 255, 0.1)",
                          color: "primary.main",
                        }}
                      >
                        {card.icon}
                      </Box>
                      <Typography variant="h6">{card.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {card.text}
                      </Typography>
                    </Stack>
                  </Paper>
                </ScrollBlock>
              ))}
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
