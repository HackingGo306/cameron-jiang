"use client";

import ProjectSection from "../components/ProjectSection/ProjectSection";
import ContactCta from "../components/ContactCta/ContactCta";
import HeroSection from "../components/HeroSection/HeroSection";
import SiteHeader from "../components/SiteHeader/SiteHeader";
import Skills from "../components/Skills/Skills";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <SiteHeader />
      <HeroSection />
      <ProjectSection />
      <Skills />
      <ContactCta />
    </main>
  );
}
