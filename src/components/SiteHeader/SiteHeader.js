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
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: "#resume" },
];

export default function SiteHeader() {
  const { mode, toggleTheme } = useTheme();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (current > previous && current > 16) {
      setHidden(true);
    } else if (current < previous) {
      setHidden(false);
    }
  });

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
        <motion.div
          animate={{ y: hidden ? -100 : 0 }}
          transition={{ duration: 0.32, ease: "easeInOut" }}
        >
          <Container maxWidth="xxl" sx={{ py: { xs: 1.5, md: 2 }, width: "calc(100% - 4rem)" }}>
            <Toolbar
              disableGutters
              sx={{
                minHeight: { xs: 64, md: 72 },
                justifyContent: "space-between",
                gap: 2,
                px: { xs: 2, md: 3 },
                borderRadius: "2rem",
                border: "1px solid var(--color-border-subtle)",
                background: "var(--gradient-panel)",
                backdropFilter: "blur(16px)",
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
                    border: "1px solid var(--color-border-subtle)",
                    background:
                      "radial-gradient(circle at 30% 30%, var(--color-brand-soft), transparent 70%), var(--color-bg-surface-soft)",
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
                      color: "text.primary",
                      px: 1.5,
                      "&:hover": {
                        backgroundColor: "var(--color-bg-surface-tint)",
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
                  color: "text.primary",
                  border: "1px solid var(--color-border-subtle)",
                  backgroundColor: "var(--color-bg-surface-soft)",
                  "&:hover": {
                    backgroundColor: "var(--color-bg-surface-tint)",
                  },
                }}
              >
                {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Toolbar>
          </Container>
        </motion.div>
      </Reveal>
    </AppBar>
  );
}
