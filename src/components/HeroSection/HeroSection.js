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
import { use, useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { genRandomTree } from "@/utils/utils";
import { useMediaQuery, useTheme } from "@mui/material";

const focusAreas = ["Artificial Intelligence", "Systems Thinking", "Fullstack Development", "Data Science", "Research"];

const ForceGraph = dynamic(() => import("react-force-graph-3d"), { ssr: false });

export default function HeroSection() {
  const theme = useTheme();
  const textRef = useRef(null);
  const graphRef = useRef(null);
  const fgRef = useRef(null);
  const [textHeight, setTextHeight] = useState(0);
  const [graphWidth, setGraphWidth] = useState(0);
  const [graphHeight, setGraphHeight] = useState(0);
  const [fgInitialized, setFgInitialized] = useState(false);

  const heroRef = useRef(null);
  const chipsRef = useRef(null);
  const [mobileHeroMinHeight, setMobileHeroMinHeight] = useState(0);
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const data = useMemo(() => genRandomTree(isLargeScreen ? 350 : 300), [isLargeScreen]);

  useEffect(() => {
    setTextHeight(textRef.current?.scrollHeight || 0);
  }, [textRef]);

  useEffect(() => {
    setGraphWidth(graphRef.current?.scrollWidth || 0);
    setGraphHeight(graphRef.current?.scrollHeight || 0);
  }, [graphRef, textHeight]);

  useEffect(() => {
    if (!heroRef.current || !chipsRef.current) return;
    setMobileHeroMinHeight(heroRef.current.scrollHeight - chipsRef.current.scrollHeight);
  }, [heroRef, chipsRef]);

  const distance = useMemo(() => {
    if (isMediumScreen) return 600 * (graphHeight * 2 / graphWidth);
    return isLargeScreen ? 1200 : Math.pow(10, 6) / Math.pow(Math.min(graphWidth, graphHeight), 1.03);
  }, [isLargeScreen, isMediumScreen, graphWidth, graphHeight]);

  const beginOrbit = useCallback(() => {
    if (!fgRef.current) return;
    fgRef.current.cameraPosition({ z: distance });

    let angle = 0;
    if (!isMediumScreen) {
      const interval = setInterval(() => {
        if (!fgRef.current) return;
        fgRef.current.cameraPosition({
          x: distance * Math.sin(angle),
          z: distance * Math.cos(angle)
        });
        angle += Math.PI / 4800;
      }, 10);

      return () => clearInterval(interval);
    }
  }, [fgRef, distance]);

  return (
    <Box component="section" id="about" sx={{
      pt: { xs: 1, sm: 3, md: 2, xl: 5 },
      pb: { xs: 7, md: 10 },
      px: { xs: 1, sm: 'unset'},
      minHeight: { xs: 'calc(100vh - 6rem)', sm: 'unset' },
      // height: { xs: `calc(100vh - 6rem)`, sm: 'unset' },
      // minHeight: { xs: `${mobileHeroMinHeight}px`, sm: 'unset' },
      // overflow: { xs: 'hidden', sm: 'unset' },
    }}>
      <Container maxWidth="xxl">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: { xs: 4, md: 5, lg: 8 },
            height: "fit-content",
            width: '100%'
          }}
          ref={heroRef}
        >
          <Reveal x={-28} y={20} duration={0.72} delay={0.06} sx={{ zIndex: 1, width: { xs: "100%", sm: "100%", md: "65%", lg: "55%", xl: "50%" }, position: "relative" }} ref={textRef}>
            <Stack spacing={{ xs: 3.5, md: 4, lg: 4.25 }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "4rem", md: "4.5rem", lg: "5rem" },
                  backgroundImage: "var(--gradient-hero)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  textAlign: { xs: "center", sm: "left" }
                }}
              >
                Hi, I'm Cameron
              </Typography>

              <Stack spacing={2.25}>
                <Typography variant="h2" sx={{
                  fontSize: { xs: "2rem", md: "3.25rem", xl: "4rem" },
                  textAlign: { xs: "center", sm: "left" }
                }}>
                  I build scalable platforms, integrate AI, and turn abstract ideas into reality
                </Typography>

                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{ maxWidth: 760, fontSize: { xs: "1.05rem", md: "1.35rem", xl: "1.5rem" }, lineHeight: 1.6 }}
                >
                  I care about cohesiveness, accessibility, and impact in my work
                </Typography>
              </Stack>

              <Reveal delay={0.12}>
                <Stack direction={{ xs: "column", sm: "row" }} sx={{ mt: { xs: 0, xl: 1 } }} spacing={1.5}>
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

              <Reveal delay={0.18} ref={chipsRef}>
                <Stack direction="row" sx={{ mt: { xs: 2.5, sm: 0.5, xl: 2.5 } }} spacing={1} useFlexGap flexWrap="wrap">
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
            width: { md: '70%', lg: '50%', xl: '55%' },
            height: { md: textHeight * 1.25, lg: textHeight * 1.15 },
            transform: { md: "translateX(40%) translateY(-10%)", lg: "translateY(-15%)", xl: "translateY(-7%)" },
            right: 0,
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            display: { xs: "none", sm: "none", md: "block" },
          }}
            ref={graphRef}
          >
            <ForceGraph
              width={(graphWidth)}
              height={(graphHeight)}
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
