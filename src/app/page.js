"use client";

import ProjectSection from "../components/ProjectSection/ProjectSection";
import ContactCta from "../components/ContactCta/ContactCta";
import HeroSection from "../components/HeroSection/HeroSection";
import SiteHeader from "../components/SiteHeader/SiteHeader";
import styles from "./page.module.css";

import { useTheme, useMediaQuery } from "@mui/material";
import ProjectSectionMobile from "@/components/ProjectSectionMobile/ProjectSectionMobile";

export default function Home() {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <main className={styles.page}>
      <SiteHeader />
      <HeroSection />
      {
        isMobile ?
          <ProjectSectionMobile /> :
          <ProjectSection />
      }
      <ContactCta />
    </main>
  );
}
