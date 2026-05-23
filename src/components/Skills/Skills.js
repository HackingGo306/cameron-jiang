"use client"

import { Box, Stack, Typography } from "@mui/material";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/dist/css/splide.min.css";
import { useState } from "react";
import { skills } from "@/utils/utils";

export default function Skills() {

  const [splideOptions, setSplideOptions] = useState({
    type: "loop", // Loop back to the beginning when reaching the end
    autoScroll: {
      pauseOnHover: false, // Do not pause scrolling when hovering over the carousel
      pauseOnFocus: false, // Do not pause scrolling when the carousel is focused
      rewind: true, // Rewind to start when the end is reached
      speed: 1.5, // Scrolling speed
    },
    arrows: false, // Hide navigation arrows
    pagination: false, // Hide pagination dots
    fixedWidth: "5.75rem", // Set a fixed width for each slide
    gap: '1rem', // Gap between slides
  });

  return (
    <Box sx={{
      width: "100%",
      minHeight: 150,
      borderRadius: "1.35rem",
      display: "flex",
      alignItems: "center",
      p: { md: 3 },
      flexDirection: "row",
      gap: { md: 2.5, lg: 3 },
      border: "1px solid var(--color-border-subtle)",
      overflow: "hidden",
      background: `
        radial-gradient(circle at 10% 20%, var(--color-ambient-secondary), transparent 32%),
        linear-gradient(145deg, var(--color-bg-surface-strong), var(--color-bg-surface-soft))
      `,
      boxShadow: "0 18px 42px rgba(0, 0, 0, 0.1)",
      backdropFilter: "blur(16px)",
    }}>
      <Box
        sx={{
          width: { md: 140, lg: 150 },
          flex: "0 0 auto",
          display: "grid",
          gap: 1.25,
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            width: 46,
            height: 2,
            borderRadius: "999px",
            background: "linear-gradient(90deg, var(--color-brand), transparent)",
          }}
        />
        <Typography
          variant="h4"
          sx={{
            fontSize: { md: "1.7rem", lg: "1.95rem" },
            lineHeight: 1,
            fontWeight: 500,
          }}
        >
          My Skills
        </Typography>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          minWidth: 0,
          position: 'relative',
          py: 1,
          overflow: 'hidden',
          "& .splide__track": {
            maskImage: "linear-gradient(90deg, transparent 0, black 34px, black calc(100% - 34px), transparent 100%)",
            WebkitMaskImage: "linear-gradient(90deg, transparent 0, black 34px, black calc(100% - 34px), transparent 100%)",
          },
        }}
        onMouseEnter={() => setSplideOptions((prev) => ({
          ...prev,
          autoScroll: {
            ...prev.autoScroll,
            speed: 0.75, // Slow down scrolling on hover
          },
        }))}
        onMouseLeave={() => setSplideOptions((prev) => ({
          ...prev,
          autoScroll: {
            ...prev.autoScroll,
            speed: 1.5, // Restore original speed when not hovering
          },
        }))}
      >
        <Splide options={splideOptions} extensions={{ AutoScroll }}>
          {skills.map((skill) => (
            <SplideSlide key={skill.name}>
              <Stack direction="column" justifyContent="center" spacing={0.5}>
                <Box sx={{
                  alignSelf: "center",
                  p: 0.5,
                  height: 66,
                  display: "grid",
                  placeItems: "center",
                  '& img': {
                    filter: 'grayscale(70%)',
                    transition: 'filter 0.1s ease',
                    ':hover': {
                      filter: 'grayscale(0%) brightness(110%) drop-shadow(0 0 2px var(--color-brand-strong))',
                    }
                  }
                }}>
                  {skill.icon}
                </Box>
                <Box
                  sx={{
                    py: 1,
                    borderRadius: "999px",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="body2" color="text.primary">
                    {skill.name}
                  </Typography>
                </Box>
              </Stack>
            </SplideSlide>
          ))}
        </Splide>
      </Box>
    </Box>
  );
}
