import Container from "@mui/material/Container";
import Scroll from "@/components/ScrollSection/Scroll";
import AboutSection from "../components/AboutSection/AboutSection";
import ContactCta from "../components/ContactCta/ContactCta";
import HeroSection from "../components/HeroSection/HeroSection";
import { Reveal } from "../components/Motion/Reveal";
import ProjectShowcase from "../components/ProjectShowcase/ProjectShowcase";
import SiteHeader from "../components/SiteHeader/SiteHeader";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <SiteHeader />
      <HeroSection />
      <AboutSection />
      <ProjectShowcase />
      <ContactCta />
    </main>
  );
}
