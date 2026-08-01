import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { Geist } from "next/font/google";
import AppTheme from "../components/AppTheme/AppTheme";
import MuiRegistry from "../components/MuiRegistry/MuiRegistry";
import {
  COLOR_SCHEME_STORAGE_KEY,
  MODE_STORAGE_KEY,
} from "@/theme/colorScheme";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://cameronjiang.dev"),
  title: "Cameron Jiang | Software Engineer",
  description:
    "Hi, I’m Cameron, a CS student focused on AI and creative tech. Explore my projects, ideas, and ways to get in touch.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Cameron Jiang | Software Engineer",
    description:
      "AI, full-stack engineering, research, and creative technology projects by Cameron Jiang.",
    url: "/",
    siteName: "Cameron Jiang",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Cameron Jiang | Software Engineer",
    description:
      "AI, full-stack engineering, research, and creative technology projects by Cameron Jiang.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={geistSans.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <InitColorSchemeScript
          defaultMode="system"
          modeStorageKey={MODE_STORAGE_KEY}
          colorSchemeStorageKey={COLOR_SCHEME_STORAGE_KEY}
        />
        <MuiRegistry>
          <AppTheme>{children}</AppTheme>
        </MuiRegistry>
      </body>
    </html>
  );
}
