import ProjectSection from "../components/ProjectSection/ProjectSection";
import ContactCta from "../components/ContactCta/ContactCta";
import HeroSection from "../components/HeroSection/HeroSection";
import SiteHeader from "../components/SiteHeader/SiteHeader";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <SiteHeader />
      <HeroSection />
      <ProjectSection />
      <ContactCta />
    </main>
  );
}
