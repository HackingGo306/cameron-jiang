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
        backdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(148, 163, 184, 0.14)",
        backgroundColor: "rgba(5, 10, 24, 0.72)",
      }}
    >
      <Reveal y={-18} duration={0.7} amount={0.01}>
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 72, md: 84 },
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  display: "grid",
                  placeItems: "center",
                  width: 42,
                  height: 42,
                  borderRadius: "14px",
                  background:
                    "linear-gradient(135deg, rgba(15, 111, 255, 0.92), rgba(255, 107, 87, 0.88))",
                  color: "common.white",
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
                  sx={{ color: "text.secondary" }}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>

            <IconButton
              color="inherit"
              onClick={toggleTheme}
              sx={{ display: { xs: "none", sm: "inline-flex" } }}
            >
              {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </Container>
      </Reveal>
    </AppBar>
  );
}
