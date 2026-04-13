"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export default function AppTheme({ children }) {
  let prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState("light");
  const [storedTheme, setStoredTheme] = useState(prefersDarkMode ? "dark" : "light");

  useEffect(() => {
    if (sessionStorage.getItem("theme") && (sessionStorage.getItem("theme") === "light" || sessionStorage.getItem("theme") === "dark")) {
      setStoredTheme(sessionStorage.getItem("theme"));
    }
    else {
      setStoredTheme(prefersDarkMode ? "dark" : "light");
    }
  }, [prefersDarkMode]);

  useEffect(() => {
    setMode(storedTheme);
  }, [storedTheme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
    document.documentElement.setAttribute("data-mui-color-scheme", mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    sessionStorage.setItem("theme", mode === "light" ? "dark" : "light");
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
              primary: {
                main: "#0f6fff",
                light: "#5ea2ff",
                dark: "#0857c7",
                contrastText: "#f8fbff",
              },
              background: {
                default: "#f3f7fc",
                paper: "#ffffff",
              },
              text: {
                primary: "#050b15",
                secondary: "#3d4753",
              },
              divider: "rgba(122, 145, 173, 0.22)",
            }
            : {
              primary: {
                main: "#6cb6ff",
                light: "#a6d6ff",
                dark: "#2f88f8",
                contrastText: "#07111f",
              },
              background: {
                default: "#07111f",
                paper: "#0f1b30",
              },
              text: {
                primary: "#e7f0ff",
                secondary: "#9fb4d0",
              },
              divider: "rgba(134, 160, 190, 0.18)",
            }),
        },
        shape: {
          borderRadius: 18,
        },
        typography: {
          fontFamily: "var(--font-geist-sans), Roboto, sans-serif",
          button: {
            fontWeight: 600,
            letterSpacing: "0.01em",
            textTransform: "none",
          },
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 999,
                paddingInline: 18,
              },
              contained: {
                boxShadow: "none",
              },
              outlined: {
                borderColor: "var(--color-border-subtle)",
                backgroundColor: "var(--color-bg-surface-soft)",
                "&:hover": {
                  borderColor: "var(--color-brand)",
                  backgroundColor: "var(--color-bg-surface-tint)",
                },
              },
              text: {
                "&:hover": {
                  backgroundColor: "var(--color-bg-surface-tint)",
                },
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              outlined: {
                borderColor: "var(--color-border-subtle)",
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme} key={mode}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
