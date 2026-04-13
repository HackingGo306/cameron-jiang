"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Reveal } from "../Motion/Reveal";
import { ArrowDownward } from "@mui/icons-material";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const focusAreas = ["Artificial Intelligence", "Systems Thinking", "Fullstack Development", "Data Science", "Research"];

const ForceGraph = dynamic(() => import("react-force-graph-3d"), { ssr: false });
function genRandomTree(N = 350, reverse = false) {
  const obj = {
    nodes: [...Array(N).keys()].map(i => ({ id: i })),
    links: [...Array(N).keys()]
      .filter(id => id)
      .map(id => ({
        [reverse ? 'target' : 'source']: id,
        [reverse ? 'source' : 'target']: Math.round(Math.random() * (id - 1))
      }))
  };

  return obj;
}

export default function HeroSection() {
  const textRef = useRef(null);
  const graphRef = useRef(null);
  const fgRef = useRef(null);
  const [textHeight, setTextHeight] = useState(0);
  const [graphWidth, setGraphWidth] = useState(0);
  const [fgInitialized, setFgInitialized] = useState(false);
  const data = useMemo(() => genRandomTree(), []);

  useEffect(() => {
    setTextHeight(textRef.current?.scrollHeight || 0);
  }, [textRef]);

  useEffect(() => {
    setGraphWidth(graphRef.current?.scrollWidth || 0);
  }, [graphRef]);

  const distance = 1200;
  const beginOrbit = useCallback(() => {
    if (!fgRef.current) return;
    fgRef.current.cameraPosition({ z: distance });

    let angle = 0;
    const interval = setInterval(() => {
      if (!fgRef.current) return;
      fgRef.current.cameraPosition({
        x: distance * Math.sin(angle),
        z: distance * Math.cos(angle)
      });
      angle += Math.PI / 4800;
    }, 10);

    return () => clearInterval(interval);
  }, [fgRef]);

  return (
    <Box component="section" id="about" sx={{ pt: { xs: 3, md: 5 }, pb: { xs: 7, md: 10 } }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: { xs: 4, md: 5, lg: 8 },
            height: "fit-content",
            width: '100%'
          }}
        >
          <Reveal x={-28} y={20} duration={0.72} delay={0.06} sx={{ zIndex: 1, width: { xs: "100%", sm: "100%", md: "50%" }, position: "relative" }} ref={textRef}>
            <Stack spacing={{ xs: 3.5, md: 4.25 }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "3rem", md: "5rem" },
                  backgroundImage: "var(--gradient-hero)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                Hi, I'm Cameron
              </Typography>

              <Stack spacing={2.25}>
                <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "4rem" } }}>
                  I build scalable platforms, integrate AI, and turn abstract ideas into reality
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
                <Stack direction={{ xs: "column", sm: "row" }} sx={{ mt: { xs: 0.5, md: 1 } }} spacing={1.5}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowDownward />}
                    component="a"
                    href="#projects"
                  >
                    See selected work
                  </Button>
                  <Button variant="outlined" sx={{ border: "1px solid var(--color-brand-strong)" }} size="large" component="a" href="#contact">
                    Contact
                  </Button>
                </Stack>
              </Reveal>

              <Reveal delay={0.18}>
                <Stack direction="row" sx={{ mt: { xs: 1.5, md: 2.5 } }} spacing={1} useFlexGap flexWrap="wrap">
                  {focusAreas.map((item) => (
                    <Chip
                      key={item}
                      label={item}
                      variant="outlined"
                      sx={{
                        backgroundColor: "var(--color-bg-surface-soft)",
                        borderColor: "var(--color-border-subtle)",
                        color: "text.secondary",
                        transition: "border-color 0.5s ease, color 0.5s ease",
                        ':hover': {
                          borderColor: "var(--color-brand)",
                          color: "var(--color-text-primary)"
                        }
                      }}
                    />
                  ))}
                </Stack>
              </Reveal>
            </Stack>
          </Reveal>
          <Box sx={{
            position: 'absolute',
            width: '55%',
            height: (textHeight) * 1.15,
            transform: 'translateY(-7%)',
            right: 0,
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            display: { xs: "none", sm: "none", md: "block" },
          }}
            ref={graphRef}
            onMouseDown={() => {
              if (!fgRef.current) return;
              // Handle logic here
            }}
          >
            <ForceGraph
              width={(graphWidth)}
              height={(textHeight) * 1.15}
              showNavInfo={false}
              backgroundColor="rgba(0, 0, 0, 0)"
              graphData={data}
              cooldownTicks={Infinity}
              cooldownTime={Infinity}
              ref={fgRef}
              nodeColor={() => getComputedStyle(document.documentElement).getPropertyValue('--color-brand').trim()}
              nodeOpacity={0.9}
              linkColor={() => getComputedStyle(document.documentElement).getPropertyValue('--color-text-primary').trim()}
              linkWidth={0.8}
              d3VelocityDecay={0.7}
              enableNodeDrag={false}
              enableNavigationControls={false}
              onEngineTick={() => {
                const fg = fgRef.current;
                if (!fg) return;
                if (fgInitialized) return;
                setFgInitialized(true);
                beginOrbit();

                const scene = fg.scene();
                const color = getComputedStyle(document.documentElement).getPropertyValue('--color-text-primary').trim();
                const near = 100;
                const far = 2000;
                scene.fog = new THREE.Fog(color, near, far);

                fg.d3Force('drift', () => {
                  const time = Date.now() * 0.001; // Get time in seconds
                  data.nodes.forEach((node, i) => {
                    node.vx += Math.sin(time + i) * 0.2;
                    node.vy += Math.cos(time + i * 1.1) * 0.2;
                    node.vz += Math.sin(time * 0.8 + i) * 0.2;
                  });
                });
              }}
            />
          </Box>
        </Box>
      </Container >
    </Box >
  );
}
