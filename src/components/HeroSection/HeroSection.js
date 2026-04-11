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

const focusAreas = ["Artificial Intelligence", "Systems Thinking", "Fullstack Development", "Data Science", "Research"];


export default function HeroSection() {
  return (
    <Box component="section" id="about" sx={{ pt: { xs: 3, md: 5 }, pb: { xs: 10, md: 13 } }}>
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
              <Typography variant="h1" color="primary.main"
                sx={{
                  fontSize: { xs: "3rem", md: "5rem" }
                }}
              >
                Hi, I'm Cameron
              </Typography>

              <Stack spacing={2.25}>
                <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "4rem" } }}>
                  I build project A, project B, project C, and other things
                </Typography>

                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{ maxWidth: 760, fontSize: { xs: "1.05rem", md: "1.35rem" }, lineHeight: 1.6 }}
                >
                  I care about cohesiveness, accessibility, and impact in my work
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
                  <Button variant="outlined" size="large" component="a" href="#contact">
                    Contact
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
        </Box>
      </Container >
    </Box >
  );
}
