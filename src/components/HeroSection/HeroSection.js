"use client";

import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
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
    <Box component="section" sx={{ pt: { xs: 7, md: 10 }, pb: { xs: 8, md: 11 } }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.18fr) minmax(320px, 0.82fr)" },
            gap: { xs: 4, md: 5, lg: 8 },
            alignItems: "end",
          }}
        >
          <Reveal x={-28} y={20} duration={0.72} delay={0.06}>
            <Stack spacing={{ xs: 3.5, md: 4.25 }}>
              <Chip
                label="Hi, I'm Cameron."
                sx={{
                  width: "fit-content",
                  fontWeight: 600,
                  border: "1px solid var(--surface-border)",
                  backgroundColor: "var(--surface-tint)",
                  color: "primary.main",
                }}
              />

              <Stack spacing={2.25}>
                <Typography variant="h1" sx={{ fontSize: { xs: "3rem", md: "5rem" } }}>
                  I build project A, project B, project C, and other things
                </Typography>

                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{ maxWidth: 760, fontSize: { xs: "1.05rem", md: "1.35rem" }, lineHeight: 1.6 }}
                >
                  I care about clarity, feel, and the details that make software memorable.
                </Typography>
              </Stack>

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
                        backgroundColor: "var(--surface-soft)",
                        borderColor: "var(--surface-border)",
                      }}
                    />
                  ))}
                </Stack>
              </Reveal>
            </Stack>
          </Reveal>

          <Reveal x={28} y={22} duration={0.76} delay={0.14} sx={{ height: "100%" }}>
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
                  {quickNotes.map((item, index) => (
                    <Box
                      key={item.label}
                      sx={{
                        py: 2.25,
                        borderTop: "1px solid var(--section-divider)",
                        borderBottom:
                          index === quickNotes.length - 1 ? "1px solid var(--section-divider)" : "none",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.14em" }}
                      >
                        {item.label}
                      </Typography>
                      <Typography sx={{ mt: 0.9, fontSize: { xs: "1rem", md: "1.08rem" }, lineHeight: 1.7 }}>
                        {item.value}
                      </Typography>
                    </Box>
                  ))}
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
        </Box>

        <Box
          sx={{
            mt: { xs: 5, md: 6 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
            borderTop: "1px solid var(--section-divider)",
            borderBottom: "1px solid var(--section-divider)",
          }}
        >
          {littleCards.map((card, index) => (
            <ScrollBlock key={card.title} delay={0.08 * index} hover={false} sx={{ height: "100%" }}>
              <Box
                sx={{
                  px: { xs: 0, md: 3 },
                  py: { xs: 3, md: 3.5 },
                  height: "100%",
                  borderBottom: {
                    xs: index < littleCards.length - 1 ? "1px solid var(--section-divider)" : "none",
                    md: "none",
                  },
                  borderRight: {
                    md: index < littleCards.length - 1 ? "1px solid var(--section-divider)" : "none",
                  },
                  background: "linear-gradient(180deg, rgba(255, 255, 255, 0.04), transparent 72%)",
                }}
              >
                <Stack spacing={1.3}>
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      display: "grid",
                      placeItems: "center",
                      borderRadius: 3,
                      border: "1px solid var(--surface-border)",
                      backgroundColor: "var(--surface-tint)",
                      color: "primary.main",
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Typography variant="h6">{card.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 280, lineHeight: 1.8 }}>
                    {card.text}
                  </Typography>
                </Stack>
              </Box>
            </ScrollBlock>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
