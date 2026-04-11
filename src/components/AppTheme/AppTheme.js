"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#666666",
    },
  },
  shape: {
    borderRadius: 24,
  },
  typography: {
    fontFamily: '"Roboto", var(--font-geist-sans), sans-serif',
    h1: {
      fontFamily: 'var(--font-geist-sans), "Roboto", sans-serif',
      fontWeight: 700,
      letterSpacing: "-0.05em",
    },
    h2: {
      fontFamily: 'var(--font-geist-sans), "Roboto", sans-serif',
      fontWeight: 700,
      letterSpacing: "-0.04em",
    },
    h3: {
      fontFamily: 'var(--font-geist-sans), "Roboto", sans-serif',
      fontWeight: 700,
      letterSpacing: "-0.03em",
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "--page-bg-top": "#faf5ee",
          "--page-bg-bottom": "#edf2f7",
          "--page-glow-primary": "rgba(25, 118, 210, 0.14)",
          "--page-glow-secondary": "rgba(255, 138, 104, 0.12)",
          "--page-glow-soft": "rgba(255, 255, 255, 0.58)",
          "--page-grid-line": "rgba(71, 85, 105, 0.08)",
          "--surface-border": "rgba(71, 85, 105, 0.14)",
          "--surface-soft": "rgba(255, 255, 255, 0.48)",
          "--surface-strong": "rgba(255, 255, 255, 0.84)",
          "--surface-tint": "rgba(25, 118, 210, 0.1)",
          "--section-divider": "rgba(71, 85, 105, 0.14)",
          "--text-muted": "rgba(71, 85, 105, 0.88)",
          minHeight: "100vh",
          margin: 0,
          backgroundColor: "#faf5ee",
          backgroundImage: "linear-gradient(180deg, #faf5ee 0%, #f3f5f7 46%, #edf2f7 100%)",
          color: "#000000",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: "1.1rem",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#5ea7ff",
    },
    secondary: {
      main: "#ff8a68",
    },
    background: {
      default: "#0a1020",
      paper: "rgba(15, 23, 42, 0.78)",
    },
    text: {
      primary: "#f8fafc",
      secondary: "#cacaca",
    },
  },
  shape: {
    borderRadius: 24,
  },
  typography: {
    fontFamily: '"Roboto", var(--font-geist-sans), sans-serif',
    h1: {
      fontFamily: 'var(--font-geist-sans), "Roboto", sans-serif',
      fontWeight: 700,
      letterSpacing: "-0.05em",
    },
    h2: {
      fontFamily: 'var(--font-geist-sans), "Roboto", sans-serif',
      fontWeight: 700,
      letterSpacing: "-0.04em",
    },
    h3: {
      fontFamily: 'var(--font-geist-sans), "Roboto", sans-serif',
      fontWeight: 700,
      letterSpacing: "-0.03em",
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "--page-bg-top": "#071221",
          "--page-bg-bottom": "#0b1324",
          "--page-glow-primary": "rgba(94, 167, 255, 0.18)",
          "--page-glow-secondary": "rgba(255, 138, 104, 0.16)",
          "--page-glow-soft": "rgba(255, 255, 255, 0.07)",
          "--page-grid-line": "rgba(148, 163, 184, 0.07)",
          "--surface-border": "rgba(148, 163, 184, 0.16)",
          "--surface-soft": "rgba(9, 16, 30, 0.52)",
          "--surface-strong": "rgba(12, 20, 38, 0.84)",
          "--surface-tint": "rgba(94, 167, 255, 0.12)",
          "--section-divider": "rgba(148, 163, 184, 0.14)",
          "--text-muted": "rgba(148, 163, 184, 0.92)",
          minHeight: "100vh",
          margin: 0,
          backgroundColor: "#071221",
          backgroundImage: "linear-gradient(180deg, #071221 0%, #0a1120 46%, #0b1324 100%)",
          color: "#f8fafc",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: "1.1rem",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

export default function AppTheme({ children }) {
  const [mode, setMode] = useState("dark");

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
