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
];

export default function AboutSection() {
  return (
    <Box component="section" id="about" sx={{ py: { xs: 7, md: 10 } }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 0.95fr) minmax(0, 1.05fr)" },
            gap: { xs: 4, md: 5, lg: 7 },
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
          <Reveal y={34}>
            <Stack spacing={3.5} sx={{ position: "relative", zIndex: 1 }}>
              <Box>
                <Typography variant="overline" color="primary.main" sx={{ letterSpacing: "0.16em" }}>
                  About
                </Typography>
                <Typography variant="h2" sx={{ mt: 1, fontSize: { xs: "2.2rem", md: "3.2rem" } }}>
                  How I think.
                </Typography>
              </Box>

              <Stack spacing={2}>
                <Typography color="text.secondary" sx={{ lineHeight: 1.9, fontSize: "1.05rem" }}>
                  I like projects where code and taste both matter.
                </Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.9, fontSize: "1.05rem" }}>
                  The sweet spot is turning rough ideas into something clear, useful, and a little
                  alive.
                </Typography>
              </Stack>

              <Reveal delay={0.08}>
                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                  {strengths.map((strength) => (
                    <Chip
                      key={strength}
                      label={strength}
                      variant="outlined"
                      sx={{
                        backgroundColor: "var(--surface-soft)",
                        borderColor: "var(--surface-border)",
                      }}
                    />
                  ))}
                </Stack>
              </Reveal>

              <Reveal delay={0.14}>
                <Box
                  sx={{
                    pl: { xs: 2.5, md: 3 },
                    pr: { xs: 2, md: 3 },
                    py: 2.5,
                    borderLeft: "1px solid var(--surface-border)",
                    borderRadius: "0 28px 28px 0",
                    background:
                      "linear-gradient(90deg, var(--surface-tint), rgba(255, 255, 255, 0.01) 72%)",
                  }}
                >
                  <Stack spacing={1.5}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
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
                        <AutoAwesomeRoundedIcon fontSize="small" />
                      </Box>
                      <Typography variant="h6">The short version</Typography>
                    </Stack>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      I want the work to feel calm, capable, and human.
                    </Typography>
                  </Stack>
                </Box>
              </Reveal>
            </Stack>
          </Reveal>

          <Stack spacing={0} sx={{ position: "relative", zIndex: 1, borderTop: "1px solid var(--section-divider)" }}>
            {principles.map((principle, index) => (
              <ScrollBlock key={principle.title} delay={0.08 * index}>
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

            <ScrollBlock delay={0.26}>
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
        </Box>
      </Container>
    </Box>
  );
}
