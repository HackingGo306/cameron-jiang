"use client";

import Brightness4RoundedIcon from "@mui/icons-material/Brightness4Rounded";
import Brightness7RoundedIcon from "@mui/icons-material/Brightness7Rounded";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePortfolioColorScheme } from "../AppTheme/AppTheme";

const navItems = [
  { label: "About", href: "#about", id: "about" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function SiteHeader() {
  const { mode, toggleTheme } = usePortfolioColorScheme();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const menuPanelRef = useRef(null);
  const firstMenuLinkRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 72));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-22% 0px -62%", threshold: [0, 0.15, 0.4] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        requestAnimationFrame(() => menuButtonRef.current?.focus());
      }
    };
    const onPointerDown = (event) => {
      if (
        !menuPanelRef.current?.contains(event.target) &&
        !menuButtonRef.current?.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 900px)");
    const closeAtDesktop = (event) => {
      if (event.matches) setMenuOpen(false);
    };
    desktopQuery.addEventListener("change", closeAtDesktop);
    return () => desktopQuery.removeEventListener("change", closeAtDesktop);
  }, []);

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    if (next) requestAnimationFrame(() => firstMenuLinkRef.current?.focus());
  };

  return (
    <AppBar
      component="header"
      data-header-state={scrolled ? "compact" : "expanded"}
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        top: 0,
        zIndex: 1200,
        background: "transparent",
        pointerEvents: "none",
      }}
    >
      <Container
        maxWidth="xxl"
        sx={{
          py: scrolled ? { xs: 0.625, md: 0.75 } : { xs: 0.875, md: 1 },
          px: { xs: 1.25, sm: 2, md: 3 },
          transition: "padding 220ms ease",
          pointerEvents: "auto",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: scrolled ? { xs: 54, md: 56 } : { xs: 58, md: 62 },
            justifyContent: "space-between",
            gap: 2,
            px: { xs: 1.125, sm: 1.75, md: 2.25 },
            border: "1px solid var(--signature-header-border)",
            borderRadius: "999px",
            background: scrolled
              ? "var(--signature-header-surface-strong)"
              : "var(--signature-header-surface)",
            boxShadow: scrolled ? "var(--signature-header-shadow)" : "none",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            transition:
              "min-height 220ms ease, background 220ms ease, box-shadow 220ms ease, border-radius 220ms ease",
          }}
        >
          <Stack
            component="a"
            href="#about"
            direction="row"
            spacing={{ xs: 1, md: 1.25 }}
            alignItems="center"
            aria-label="Cameron Jiang, back to About"
            sx={{ minWidth: 0, borderRadius: "0.75rem" }}
          >
            <Box
              sx={{
                position: "relative",
                width: scrolled ? { xs: 34, md: 36 } : { xs: 38, md: 40 },
                height: scrolled ? { xs: 34, md: 36 } : { xs: 38, md: 40 },
                flex: "0 0 auto",
                overflow: "hidden",
                borderRadius: "0.65rem",
                transition: "width 220ms ease, height 220ms ease",
              }}
            >
              <Image src="/logo.png" alt="" fill sizes="44px" />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                component="span"
                sx={{
                  display: "block",
                  overflow: "hidden",
                  fontSize: { xs: "0.95rem", md: "1rem" },
                  fontWeight: 750,
                  lineHeight: 1.1,
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Cameron Jiang
              </Typography>
              <Typography
                component="span"
                color="text.secondary"
                sx={{
                  display: { xs: "none", sm: "block" },
                  overflow: "hidden",
                  fontSize: "0.78rem",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Software engineer
              </Typography>
            </Box>
          </Stack>

          <Stack
            component="nav"
            aria-label="Primary navigation"
            direction="row"
            spacing={{ md: 1.25, lg: 3 }}
            alignItems="center"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {navItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <Button
                  key={item.id}
                  component="a"
                  href={item.href}
                  color="inherit"
                  aria-current={active ? "location" : undefined}
                  sx={{
                    position: "relative",
                    minWidth: 0,
                    minHeight: 44,
                    px: { md: 1, lg: 1.25 },
                    color: active ? "var(--color-brand)" : "text.primary",
                    backgroundColor: "transparent",
                    "&::after": {
                      content: '\"\"',
                      position: "absolute",
                      right: { md: 8, lg: 10 },
                      bottom: 6,
                      left: { md: 8, lg: 10 },
                      height: "1px",
                      borderRadius: 999,
                      backgroundColor: active ? "currentColor" : "transparent",
                      opacity: active ? 0.72 : 0,
                      transition: "opacity 180ms ease, background-color 180ms ease",
                    },
                    "&:hover": {
                      color: "var(--color-brand)",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
            <Chip
              component="span"
              role="note"
              label="Resume · Soon"
              variant="outlined"
              aria-label="Resume unavailable, coming soon"
              sx={{
                ml: { md: 0, lg: 0.5 },
                color: "text.secondary",
                borderColor: "var(--signature-header-border)",
                backgroundColor: "var(--signature-header-control)",
              }}
            />
          </Stack>

          <Stack direction="row" spacing={0.75} alignItems="center">
            <Tooltip
              title={`Switch to ${mode === "dark" ? "light" : "dark"} theme`}
              describeChild
            >
              <IconButton
                color="inherit"
                onClick={toggleTheme}
                aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} theme`}
                data-theme-mode={mode}
                sx={{
                  color: "text.primary",
                  border: "1px solid var(--signature-header-border)",
                  backgroundColor: "var(--signature-header-control)",
                  "&:hover": { backgroundColor: "var(--color-bg-surface-tint)" },
                }}
              >
                {mode === "dark" ? <Brightness7RoundedIcon /> : <Brightness4RoundedIcon />}
              </IconButton>
            </Tooltip>
            <IconButton
              ref={menuButtonRef}
              color="inherit"
              onClick={toggleMenu}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls={menuOpen ? "mobile-navigation" : undefined}
              sx={{
                display: { xs: "inline-flex", md: "none" },
                color: "text.primary",
                border: "1px solid var(--signature-header-border)",
                backgroundColor: menuOpen
                  ? "var(--color-bg-surface-tint)"
                  : "var(--signature-header-control)",
                "&:hover": { backgroundColor: "var(--color-bg-surface-tint)" },
              }}
            >
              {menuOpen ? <MenuOpenRoundedIcon /> : <MenuRoundedIcon />}
            </IconButton>
          </Stack>
        </Toolbar>

        <Collapse
          in={menuOpen}
          timeout={220}
          unmountOnExit
          sx={{
            position: "absolute",
            top: "calc(100% - 0.25rem)",
            right: { xs: "1.25rem", sm: "2rem" },
            left: { xs: "1.25rem", sm: "auto" },
            width: { sm: 300 },
          }}
        >
          <Box
            id="mobile-navigation"
            ref={menuPanelRef}
            component="nav"
            aria-label="Mobile navigation"
            className="glass-panel"
            sx={{
              p: 1,
              borderColor: "var(--signature-header-border)",
              background: "var(--signature-header-surface-strong)",
              boxShadow: "var(--signature-header-shadow)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <Stack spacing={0.75}>
              {navItems.map((item, index) => (
                <Button
                  key={item.id}
                  ref={index === 0 ? firstMenuLinkRef : undefined}
                  component="a"
                  href={item.href}
                  fullWidth
                  aria-current={activeSection === item.id ? "location" : undefined}
                  onClick={() => setMenuOpen(false)}
                  sx={{
                    justifyContent: "flex-start",
                    color:
                      activeSection === item.id ? "var(--color-brand)" : "text.primary",
                    backgroundColor:
                      activeSection === item.id
                        ? "var(--color-bg-surface-tint)"
                        : "transparent",
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Box
                component="span"
                role="note"
                aria-label="Resume unavailable, coming soon"
                sx={{
                  px: 2,
                  py: 1.25,
                  border: "1px solid var(--color-border-subtle)",
                  borderRadius: 999,
                  color: "text.secondary",
                  backgroundColor: "var(--color-bg-surface-soft)",
                  fontSize: "0.875rem",
                  fontWeight: 650,
                  textAlign: "center",
                }}
              >
                Resume · Soon
              </Box>
            </Stack>
          </Box>
        </Collapse>
      </Container>
    </AppBar>
  );
}
