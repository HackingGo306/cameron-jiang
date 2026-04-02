"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Reveal } from "../Motion/Reveal";
import { useTheme } from "../AppTheme/AppTheme";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Notes", href: "#notes" },
  { label: "Contact", href: "#contact" },
];

export default function SiteHeader() {
  const { mode, toggleTheme } = useTheme();

  return (
    <AppBar
      position="sticky"
      color="transparent"
      sx={{
        top: 0,
        backgroundColor: "transparent",
        boxShadow: "none",
      }}
    >
      <Reveal y={-18} duration={0.7} amount={0.01}>
        <Container maxWidth="xl" sx={{ py: { xs: 1.5, md: 2 } }}>
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 64, md: 72 },
              justifyContent: "space-between",
              gap: 2,
              px: { xs: 2.25, md: 3 },
              borderRadius: 999,
              border: "1px solid var(--surface-border)",
              background:
                "linear-gradient(180deg, var(--surface-strong), rgba(255, 255, 255, 0.03))",
              backdropFilter: "blur(20px)",
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  display: "grid",
                  placeItems: "center",
                  width: 44,
                  height: 44,
                  borderRadius: "999px",
                  border: "1px solid var(--surface-border)",
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(94, 167, 255, 0.24), transparent 70%), var(--surface-soft)",
                  color: "text.primary",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                }}
              >
                CJ
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.1 }}>
                  Cameron Jiang
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Software engineer
                </Typography>
              </Box>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  color="inherit"
                  component="a"
                  href={item.href}
                  sx={{
                    color: "text.secondary",
                    px: 1.5,
                    "&:hover": {
                      backgroundColor: "var(--surface-tint)",
                      color: "text.primary",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>

            <IconButton
              color="inherit"
              onClick={toggleTheme}
              sx={{
                display: { xs: "none", sm: "inline-flex" },
                border: "1px solid var(--surface-border)",
                backgroundColor: "var(--surface-soft)",
              }}
            >
              {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </Container>
      </Reveal>
    </AppBar>
  );
}
