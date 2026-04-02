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
      secondary: "#94a3b8",
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
