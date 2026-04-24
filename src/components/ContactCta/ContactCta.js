"use client";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Reveal, ScrollBlock } from "../Motion/Reveal";
import dynamic from "next/dynamic";
import { useRef, useCallback, useMemo, useState } from "react";
import { Tooltip } from "@mui/material";
import { DiscordIcon } from "@/utils/utils";
import { genRandomTree } from "@/utils/utils";
import { useMediaQuery, useTheme } from "@mui/material";
import { LinkedIn } from "@mui/icons-material";
const ForceGraph = dynamic(() => import("react-force-graph-3d"), { ssr: false });

export default function ContactCta() {
  const theme = useTheme();
  const fgRef = useRef(null);
  const parentRef = useRef(null);
  const data = useMemo(() => genRandomTree(), []);
  const [fgInitialized, setFgInitialized] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const distance = useMemo(() => {
    if (isMediumScreen) return 700;
    if (isLargeScreen) return 550;
    return 500;
  }, [isLargeScreen, isMediumScreen, parentRef]);

  const beginOrbit = useCallback(() => {
    if (!fgRef.current) return;
    fgRef.current.cameraPosition({ z: distance });
    console.log("Starting orbit with distance:", distance);

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
  }, [fgRef, distance]);

  return (
    <Reveal y={34} delay={0.12} duration={1.05}>
      <Box component="section" sx={{
        pb: { xs: 8, md: 10 },
        pt: { xs: 8, lg: 3, xl: 0 },
      }}>
        <Container maxWidth="xxl">
          <ScrollBlock hover={false}>
            <Box
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: '2rem',
                boxShadow: "0 24px 24px var(--color-box-shadow)",
                background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%)',
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) minmax(280px, 0.7fr)" },
                  gap: { xs: 3, md: 4 },
                  alignItems: "center",
                }}
              >
                <Reveal y={22}>
                  <Stack spacing={3} sx={{ maxWidth: 760 }}>
                    <Typography variant="overline" color="primary.main" sx={{ letterSpacing: "0.2em" }}>
                      Contact
                    </Typography>
                    <Typography variant="h2" sx={{ fontSize: '3.2rem' }}>
                      Like what you see? <span style={{ backgroundImage: "linear-gradient(to right, var(--color-brand), var(--color-brand-strong))", backgroundClip: 'text', color: 'transparent' }}>Say Hi.</span>
                    </Typography>
                    <Typography sx={{ color: "text.secondary", lineHeight: 1.8, fontSize: "1.05rem" }}>
                      Projects, internships, collaborations, or just a good conversation.
                    </Typography>

                    <Reveal delay={0.12}>
                      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                        <Button
                          variant="contained"
                          startIcon={<EmailRoundedIcon />}
                          color="primary"
                          component="a"
                          href="mailto:cameronjiang.dev@gmail.com"
                        >
                          Email me
                        </Button>
                        <Button variant="outlined" startIcon={<GitHubIcon />} component="a" href="https://github.com/HackingGo306" target="_blank">
                          GitHub
                        </Button>
                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<LinkedIn />}
                          component="a"
                          href="https://linkedin.com/in/cameron-jiang"
                          target="_blank"
                        >
                          LinkedIn
                        </Button>
                        {
                          isSmallScreen ?
                          <Button variant="text" endIcon={<LaunchRoundedIcon />} id="contact" disabled>
                            Resume (Soon)
                          </Button> :
                          <Tooltip describeChild title="Currently unavailable">
                            <Button variant="text" endIcon={<LaunchRoundedIcon />} id="contact">
                              {/* Link down here so that the whole contact is scrolled into view */}
                              Resume
                            </Button>
                          </Tooltip>
                        }
                      </Stack>
                    </Reveal>
                  </Stack>
                </Reveal>
              </Box>
            </Box>
          </ScrollBlock>
        </Container >
      </Box >
      <Box
        ref={parentRef}
        sx={{
          position: 'absolute',
          width: '40%',
          height: { md: '100%', lg: '130%', xl: '140%' },
          transform: 'translateY(20%) translateX(25%)',
          right: 0,
          bottom: 0,
          overflow: "hidden",
          display: { xs: "none", sm: "none", md: "block" },
        }}>
        <ForceGraph
          width={parentRef.current?.scrollWidth || 0}
          height={parentRef.current?.scrollHeight || 0}
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
    </Reveal>
  );
}
