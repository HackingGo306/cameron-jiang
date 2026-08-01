"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme, useColorScheme } from "@mui/material/styles";
import {
  COLOR_SCHEME_STORAGE_KEY,
  MODE_STORAGE_KEY,
} from "@/theme/colorScheme";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 900,
      lg: 1150,
      xl: 1375,
      xxl: 1536,
    },
  },
  cssVariables: {
    colorSchemeSelector: "data-mui-color-scheme",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#0b63d1",
          light: "#4b94ec",
          dark: "#074b9f",
          contrastText: "#ffffff",
        },
        background: {
          default: "#f3f7fc",
          paper: "#ffffff",
        },
        text: {
          primary: "#0c1728",
          secondary: "#4a5a70",
        },
        divider: "rgba(89, 112, 140, 0.24)",
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#77bdff",
          light: "#acd9ff",
          dark: "#398dde",
          contrastText: "#07111f",
        },
        background: {
          default: "#000112",
          paper: "#0f1b30",
        },
        text: {
          primary: "#e7f0ff",
          secondary: "#a9bdd8",
        },
        divider: "rgba(151, 177, 208, 0.2)",
      },
    },
  },
  shape: {
    borderRadius: 18,
  },
  typography: {
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
    button: {
      fontWeight: 650,
      letterSpacing: "0.01em",
      textTransform: "none",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          color: "var(--color-text-primary)",
          backgroundColor: "var(--color-bg-canvas)",
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
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&.Mui-focusVisible": {
            outline: "3px solid var(--color-focus-ring)",
            outlineOffset: 3,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 44,
          borderRadius: 999,
          paddingInline: 20,
        },
        contained: {
          boxShadow: "0 12px 28px var(--color-brand-soft)",
          "&:hover": {
            boxShadow: "0 14px 34px var(--color-brand-soft)",
          },
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
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          border: "1px solid var(--color-border-subtle)",
          backgroundColor: "var(--color-bg-surface-strong)",
          color: "var(--color-text-primary)",
          boxShadow: "var(--shadow-card)",
        },
      },
    },
  },
});

export function usePortfolioColorScheme() {
  const { mode, systemMode, setMode } = useColorScheme();
  const resolvedMode = mode === "system" ? systemMode : mode;
  const activeMode = resolvedMode || "light";

  return {
    mode: activeMode,
    toggleTheme: () => setMode(activeMode === "dark" ? "light" : "dark"),
  };
}

export default function AppTheme({ children }) {
  return (
    <ThemeProvider
      theme={theme}
      defaultMode="system"
      modeStorageKey={MODE_STORAGE_KEY}
      colorSchemeStorageKey={COLOR_SCHEME_STORAGE_KEY}
      disableTransitionOnChange
    >
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
}
