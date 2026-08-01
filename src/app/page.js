import ContactCta from "@/components/ContactCta/ContactCta";
import HeroSection from "@/components/HeroSection/HeroSection";
import ProjectSection from "@/components/ProjectSection/ProjectSection";
import SiteFooter from "@/components/SiteFooter/SiteFooter";
import SiteHeader from "@/components/SiteHeader/SiteHeader";
import Skills from "@/components/Skills/Skills";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className={styles.page}>
        <HeroSection />
        <ProjectSection />
        <Skills />
        <ContactCta />
      </main>
      <SiteFooter />
    </>
  );
}
