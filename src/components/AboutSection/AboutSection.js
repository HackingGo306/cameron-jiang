"use client";

import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import GroupWorkRoundedIcon from "@mui/icons-material/GroupWorkRounded";
import PsychologyAltRoundedIcon from "@mui/icons-material/PsychologyAltRounded";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

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
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 0.95fr) minmax(0, 1.05fr)" },
            gap: { xs: 3, md: 4 },
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              border: "1px solid rgba(148, 163, 184, 0.16)",
              backgroundColor: "rgba(15, 23, 42, 0.72)",
            }}
          >
            <Stack spacing={3}>
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

              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {strengths.map((strength) => (
                  <Chip
                    key={strength}
                    label={strength}
                    variant="outlined"
                    sx={{ backgroundColor: "rgba(15, 23, 42, 0.42)" }}
                  />
                ))}
              </Stack>

              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  border: "1px solid rgba(148, 163, 184, 0.16)",
                  background:
                    "linear-gradient(135deg, rgba(94, 167, 255, 0.08), rgba(255, 138, 104, 0.08))",
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
                        backgroundColor: "rgba(94, 167, 255, 0.12)",
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
              </Paper>
            </Stack>
          </Paper>

          <Stack spacing={2.5}>
            {principles.map((principle) => (
              <Paper
                key={principle.title}
                elevation={0}
                sx={{
                  p: { xs: 3, md: 3.5 },
                  border: "1px solid rgba(148, 163, 184, 0.16)",
                  backgroundColor: "rgba(15, 23, 42, 0.72)",
                }}
              >
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      display: "grid",
                      placeItems: "center",
                      borderRadius: 3,
                      backgroundColor: "rgba(94, 167, 255, 0.1)",
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
              </Paper>
            ))}

            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 3.5 },
                border: "1px solid rgba(148, 163, 184, 0.16)",
                backgroundColor: "rgba(18, 28, 52, 0.78)",
              }}
            >
              <Stack spacing={1.5}>
                <Typography variant="h6">Beyond the usual portfolio language</Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  Good technical work should still feel human.
                </Typography>
              </Stack>
            </Paper>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
