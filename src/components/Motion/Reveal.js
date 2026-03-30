"use client";

import Box from "@mui/material/Box";
import { motion, useReducedMotion } from "motion/react";

const easing = [0.16, 1, 0.3, 1];

export function Reveal({
  children,
  delay = 0,
  duration = 0.65,
  x = 0,
  y = 24,
  scale = 1,
  blur = 0,
  once = true,
  amount = 0.24,
  sx,
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Box
      component={motion.div}
      initial={
        prefersReducedMotion
          ? undefined
          : {
              opacity: 0,
              x,
              y,
              scale,
              filter: blur ? `blur(${blur}px)` : "blur(0px)",
            }
      }
      whileInView={
        prefersReducedMotion
          ? undefined
          : {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }
      }
      viewport={prefersReducedMotion ? undefined : { once, amount }}
      transition={prefersReducedMotion ? undefined : { duration, delay, ease: easing }}
      sx={sx}
      {...props}
    >
      {children}
    </Box>
  );
}

export function ScrollBlock({
  children,
  delay = 0,
  duration = 0.78,
  hover = true,
  once = true,
  amount = 0.28,
  sx,
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Box
      component={motion.div}
      initial={
        prefersReducedMotion
          ? undefined
          : {
              opacity: 0,
              y: 40,
              scale: 0.97,
              rotateX: 8,
              filter: "blur(8px)",
            }
      }
      whileInView={
        prefersReducedMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              filter: "blur(0px)",
            }
      }
      whileHover={
        prefersReducedMotion || !hover
          ? undefined
          : {
              y: -6,
              scale: 1.01,
              transition: { duration: 0.22, ease: "easeOut" },
            }
      }
      viewport={prefersReducedMotion ? undefined : { once, amount }}
      transition={prefersReducedMotion ? undefined : { duration, delay, ease: easing }}
      style={{ transformPerspective: 1200 }}
      sx={sx}
      {...props}
    >
      {children}
    </Box>
  );
}
