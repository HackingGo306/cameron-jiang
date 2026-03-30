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

export default function ContactCta() {
  return (
    <Box component="section" id="contact" sx={{ pt: { xs: 3, md: 4 }, pb: { xs: 8, md: 10 } }}>
      <Container maxWidth="xl">
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
            <Stack spacing={3} sx={{ maxWidth: 760 }}>
              <Typography variant="overline" color="primary.main" sx={{ letterSpacing: "0.16em" }}>
                Contact
              </Typography>
              <Typography variant="h2" sx={{ fontSize: { xs: "2.2rem", md: "3.2rem" } }}>
                If this feels like your kind of work, say hi.
              </Typography>
              <Typography sx={{ color: "text.secondary", lineHeight: 1.8, fontSize: "1.05rem" }}>
                Projects, internships, collaborations, or just a good conversation.
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EmailRoundedIcon />}
                  component="a"
                  href="mailto:hello@example.com"
                >
                  Say hello
                </Button>
                <Button variant="outlined" startIcon={<GitHubIcon />} component="a" href="#">
                  GitHub
                </Button>
                <Button variant="text" endIcon={<LaunchRoundedIcon />} component="a" href="#">
                  Resume
                </Button>
              </Stack>
            </Stack>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                border: "1px solid rgba(148, 163, 184, 0.16)",
                backgroundColor: "rgba(15, 23, 42, 0.72)",
              }}
            >
              <Stack spacing={1.5}>
                <Typography variant="h6">A small note</Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  Thoughtful messages are always appreciated.
                </Typography>
              </Stack>
            </Paper>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
