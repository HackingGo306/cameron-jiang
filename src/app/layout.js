import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AppTheme from "../components/AppTheme/AppTheme";
import MuiRegistry from "../components/MuiRegistry/MuiRegistry";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Cameron Jiang | Software Engineer",
  description:
    "A personal portfolio showcasing software projects, engineering strengths, and product-minded development work.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <MuiRegistry>
          <AppTheme>{children}</AppTheme>
        </MuiRegistry>
      </body>
    </html>
  );
}
