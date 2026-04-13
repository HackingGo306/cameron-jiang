"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { useTheme } from "../AppTheme/AppTheme";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: "#resume", cursorType: "restricted" },
];

export default function SiteHeader() {
  const { mode, toggleTheme } = useTheme();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (menuOpen) {
      setHidden(false);
      return;
    }

    if (current > previous && current > 16) {
      setHidden(true);
    } else if (current < previous) {
      setHidden(false);
    }
  });

  useEffect(() => {
    if (menuOpen) {
      setHidden(false);
    }
  }, [menuOpen]);

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
      <motion.div
        animate={{ y: hidden && !menuOpen ? -100 : 0 }}
        transition={{ duration: 0.32, ease: "easeInOut" }}
      >
        <Container
          maxWidth="xl"
          sx={{
            py: { xs: 1, md: 2 },
            px: { xs: 1.5, sm: 2, md: 3 },
          }}
        >
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 60, md: 72 },
              justifyContent: "space-between",
              gap: { xs: 1.5, md: 2 },
              px: { xs: 1.5, sm: 2, md: 3 },
              borderRadius: { xs: "1.25rem", md: "2rem" },
              border: "1px solid var(--color-border-subtle)",
              background:
                "linear-gradient(180deg, var(--color-divider) 0%, var(--color-bg-surface-tint) 100%)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          >
            <Stack
              direction="row"
              spacing={{ xs: 1, md: 1.5 }}
              alignItems="center"
              sx={{ minWidth: 0 }}
            >
              <Box
                sx={{
                  display: "grid",
                  placeItems: "center",
                  width: { xs: 40, md: 44 },
                  height: { xs: 40, md: 44 },
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
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    lineHeight: 1.1,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: { xs: "0.98rem", md: "1rem" },
                  }}
                >
                  Cameron Jiang
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: "0.78rem", md: "0.875rem" },
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Software engineer
                </Typography>
              </Box>
            </Stack>

            <Stack
              direction="row"
              spacing={{ xs: 1, sm: 2, md: 5 }}
              alignItems="center"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  color="inherit"
                  component="a"
                  href={item.href}
                  onClick={(event) => {
                    if (item.cursorType === "restricted") {
                      event.preventDefault();
                    }
                  }}
                  sx={{
                    color: "text.primary",
                    padding: 1.5,
                    paddingX: 2,
                    "&:hover": {
                      backgroundColor:
                        item.cursorType === "restricted"
                          ? "transparent"
                          : "var(--color-bg-surface-tint)",
                      cursor: item.cursorType === "restricted" ? "not-allowed" : "pointer",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                color="inherit"
                onClick={toggleTheme}
                sx={{
                  color: "text.primary",
                  backgroundColor: "var(--color-bg-surface-soft)",
                  "&:hover": {
                    backgroundColor: "var(--color-bg-surface-tint)",
                  },
                }}
              >
                {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              <IconButton
                color="inherit"
                onClick={() => setMenuOpen((previous) => !previous)}
                sx={{
                  display: { xs: "inline-flex", md: "none" },
                  color: "text.primary",
                  backgroundColor: menuOpen
                    ? "var(--color-bg-surface-tint)"
                    : "var(--color-bg-surface-soft)",
                  "&:hover": {
                    backgroundColor: "var(--color-bg-surface-tint)",
                  },
                }}
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
              >
                <MenuRoundedIcon />
              </IconButton>
            </Stack>
          </Toolbar>

          <Collapse in={menuOpen} unmountOnExit>
            <Box
              sx={{
                mt: 1,
                p: 1,
                borderRadius: "1.25rem",
                border: "1px solid var(--color-border-subtle)",
                background: "var(--gradient-panel)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                display: { xs: "block", md: "none" },
              }}
            >
              <Stack spacing={1}>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    component="a"
                    href={item.href}
                    color="inherit"
                    fullWidth
                    onClick={(event) => {
                      if (item.cursorType === "restricted") {
                        event.preventDefault();
                        return;
                      }

                      setMenuOpen(false);
                    }}
                    sx={{
                      justifyContent: "flex-start",
                      px: 1.5,
                      py: 1.25,
                      color:
                        item.cursorType === "restricted"
                          ? "text.secondary"
                          : "text.primary",
                      backgroundColor: "var(--color-bg-surface-soft)",
                      "&:hover": {
                        backgroundColor:
                          item.cursorType === "restricted"
                            ? "var(--color-bg-surface-soft)"
                            : "var(--color-bg-surface-tint)",
                      },
                    }}
                  >
                    {item.label}
                    {item.cursorType === "restricted" ? " (Soon)" : ""}
                  </Button>
                ))}
              </Stack>
            </Box>
          </Collapse>
        </Container>
      </motion.div>
    </AppBar>
  );
}
