"use client";

import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import PsychologyAltRoundedIcon from "@mui/icons-material/PsychologyAltRounded";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Reveal, ScrollBlock } from "../Motion/Reveal";

const impactItems = [
  {
    title: "Curiosity over autopilot",
    description: "Look at the problem from a few angles.",
    icon: <PsychologyAltRoundedIcon />,
  },
  {
    title: "Craft matters",
    description: "The small details shape the whole feel.",
    icon: <AutoAwesomeRoundedIcon />,
  },
  {
    title: "Warmth matters too",
    description: "Technical does not have to mean cold.",
    icon: <FavoriteBorderRoundedIcon />,
  },
];

export default function ImpactStrip() {
  return (
    <Box component="section" id="notes" sx={{ py: { xs: 7, md: 9 } }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 0.8fr) minmax(0, 1.2fr)" },
            gap: { xs: 3, md: 4 },
          }}
        >
          <Reveal y={32}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                border: "1px solid var(--color-border-subtle)",
                background: "var(--gradient-panel-strong)",
                height: "fit-content",
              }}
            >
              <Stack spacing={2}>
                <Typography variant="overline" color="primary.main" sx={{ letterSpacing: "0.16em" }}>
                  Notes
                </Typography>
                <Typography variant="h3" sx={{ fontSize: { xs: "2rem", md: "2.7rem" } }}>
                  A few recurring themes.
                </Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  What I keep coming back to when I build.
                </Typography>
              </Stack>
            </Paper>
          </Reveal>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 2,
            }}
          >
            {impactItems.map((item, index) => (
              <ScrollBlock key={item.title} delay={0.08 * index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: "100%",
                    borderRadius: 1,
                    border: "1px solid var(--color-border-subtle)",
                    background: "var(--gradient-panel)",
                  }}
                >
                  <Stack spacing={1.75}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        display: "grid",
                        placeItems: "center",
                        borderRadius: 3,
                        backgroundColor: "var(--color-brand-soft)",
                        color: "primary.main",
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography color="text.secondary">{item.description}</Typography>
                  </Stack>
                </Paper>
              </ScrollBlock>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
