"use client";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Reveal, ScrollBlock } from "../Motion/Reveal";
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react";
import SvgIcon from "@mui/material/SvgIcon";

export default function ContactCta() {

  return (
    <Box component="section" id="contact" sx={{ pt: { xs: 3, md: 4 }, pb: { xs: 8, md: 10 } }}>
      <Container maxWidth="xl">
        <ScrollBlock hover={false}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              border: "1px solid rgba(148, 163, 184, 0.16)",
              background:
                "linear-gradient(135deg, rgba(18, 28, 52, 0.9), rgba(15, 23, 42, 0.82))",
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
                  <Typography variant="overline" color="primary.main" sx={{ letterSpacing: "0.16em" }}>
                    Contact
                  </Typography>
                  <Typography variant="h2" sx={{ fontSize: { xs: "2.2rem", md: "3.2rem" } }}>
                    Like what you see? Say Hi.
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
                      <Button variant="text" endIcon={<LaunchRoundedIcon />} component="a" href="#">
                        Resume
                      </Button>
                    </Stack>
                  </Reveal>
                </Stack>
              </Reveal>
            </Box>
          </Paper>
        </ScrollBlock>
      </Container >
    </Box >
  );
}
