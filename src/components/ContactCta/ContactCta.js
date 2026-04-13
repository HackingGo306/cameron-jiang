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
const ForceGraph = dynamic(() => import("react-force-graph-3d"), { ssr: false });

export default function ContactCta() {

  const fgRef = useRef(null);
  const parentRef = useRef(null);
  const distance = 500;
  const data = useMemo(() => genRandomTree(), []);
  const [fgInitialized, setFgInitialized] = useState(false);
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
    <Reveal y={34} delay={0.12} duration={1.05}>
      <Box component="section" id="contact" sx={{
        pb: { xs: 8, md: 10 },
      }}>
        <Container maxWidth="xl">
          <ScrollBlock hover={false}>
            <Box
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: '2rem',
                // border: "1px solid var(--color-border-subtle)",
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
                    <Typography variant="h2" sx={{ fontSize: { xs: "2.2rem", md: "3.2rem" } }}>
                      Like what you see? <span style={{ backgroundImage: "linear-gradient(to right, var(--color-brand), var(--color-brand-strong))", backgroundClip: 'text', color: 'transparent' }}>Say Hi.</span>
                    </Typography>
                    <Typography sx={{ color: "text.secondary", lineHeight: 1.8, fontSize: "1.05rem" }}>
                      Projects, internships, collaborations, or just a good conversation.
                    </Typography>

                    <Reveal delay={0.12}>
                      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<EmailRoundedIcon />}
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
                          startIcon={<DiscordIcon />}
                          component="a"
                          href="https://discord.com/users/1021463631285731349"
                          target="_blank"
                        >
                          Chat
                        </Button>
                        <Tooltip describeChild title="Currently unavailable">
                          <Button variant="text" endIcon={<LaunchRoundedIcon />}>
                            Resume
                          </Button>
                        </Tooltip>
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
          height: '140%',
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
