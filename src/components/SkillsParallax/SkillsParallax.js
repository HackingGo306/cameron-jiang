import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent
} from "framer-motion";
import { wrap } from "@motionone/utils";
import './SkillsParallax.css'
import { Container, Typography, Box, Stack } from "@mui/material";
import { skills } from "@/utils/utils";

function Parallax({ children, baseVelocity = 5 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(0, -50, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * Math.min(velocityFactor.get(), 7.5);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax">
      <motion.div className="scroller" style={{ x }}>
        {
          children.map((child, index) => (
            <span key={index}>{child}</span>
          ))
        }
        {
          children.map((child, index) => (
            <span key={index * 2}>{child}</span>
          ))
        }
      </motion.div>
    </div>
  );
}

export default function SkillsParallax() {

  return (
    <Container maxWidth="md">
      <Typography
        variant="h1"
        sx={{
          fontSize: '2rem', mb: 5, mt: 2,
        }}
      >
        My Skills
      </Typography>
      {[0, 12].map((index) => (
        <Parallax key={index} baseVelocity={5 * ((index / 6) - 1)} children={
          skills.slice(index, index + 12).map((skill) => (
            <Stack direction="column" justifyContent="center" spacing={0.5}>
              <Box sx={{
                alignSelf: "center",
                padding: 0.5,
                '& img': {
                  filter: 'grayscale(70%)',
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
          ))
        } />
      ))
      }
    </Container>
  );
}