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
import SvgIcon from "@mui/material/SvgIcon";
import dynamic from "next/dynamic";
import { useRef, useCallback, useMemo, useState } from "react";
import { Tooltip } from "@mui/material";
const ForceGraph = dynamic(() => import("react-force-graph-3d"), { ssr: false });

function genRandomTree(N = 50, reverse = false) {
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
                          startIcon={
                            <SvgIcon>
                              <svg
                                role="img"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#5865F2"
                              >
                                <path
                                  d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"
                                />
                              </svg>
                            </SvgIcon>
                          }
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
