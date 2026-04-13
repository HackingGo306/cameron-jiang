"use client"

import { DiscordIcon } from "@/utils/utils";
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
    fixedWidth: "6rem", // Set a fixed width for each slide
    gap: '1rem', // Gap between slides
  });

  return (
    <Box sx={{
      width: "100%",
      height: "100%",
      borderRadius: "1.5rem",
      display: "flex",
      alignItems: "center",
      padding: 4,
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 6,
      border: "1px solid var(--color-border-subtle)",
      overflow: "hidden",
    }}>
      <Box sx={{ minWidth: 'fit-content' }}>
        <Typography variant="h4">
          My Skills:
        </Typography>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          position: 'relative',
          border: '1px solid transparent',
          borderRadius: '2rem',
          paddingY: 1,
          overflow: 'hidden',
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
                  padding: 0.5,
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