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
      <section id="notes" className={styles.notesSection}>
        <Container maxWidth="xl">
          <Reveal y={28}>
            <div className={styles.notesHeader}>
              <p className={styles.eyebrow}>Notes</p>
              <h2 className={styles.notesTitle}>A quieter transition through the page.</h2>
              <p className={styles.notesText}>
                A small visual pause between the introduction and the rest of the work.
              </p>
            </div>
          </Reveal>

          <div className={styles.notesSurface}>
            <Scroll />
          </div>
        </Container>
      </section>
      <AboutSection />
      <ProjectShowcase />
      <ContactCta />
    </main>
  );
}
