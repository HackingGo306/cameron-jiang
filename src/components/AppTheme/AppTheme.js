"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createContext, useContext, useState, useEffect, useMemo } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export default function AppTheme({ children }) {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
    document.documentElement.setAttribute("data-mui-color-scheme", mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        // cssVariables: true,
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
                primary: "#0c1728",
                secondary: "#566579",
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
