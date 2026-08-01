import AmbientGraph from "../AmbientGraph/AmbientGraph";
import styles from "./HeroSection.module.css";

const focusAreas = [
  "Artificial Intelligence",
  "Systems Thinking",
  "Fullstack Development",
  "Data Science",
  "Research",
];

function DownArrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M12 4v15m0 0 6-6m-6 6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section className={styles.section} id="about" aria-labelledby="about-heading">
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <div className={styles.headingGroup}>
              <h1 id="about-heading" className={styles.title}>
                Hi, I&apos;m Cameron
              </h1>
              <p className={styles.statement}>
                I build scalable platforms, integrate AI, and turn abstract ideas into reality
              </p>
              <p className={styles.supporting}>
                I care about cohesiveness, accessibility, and impact in my work
              </p>
            </div>

            <div className={styles.actions}>
              <a className="portfolio-button portfolio-button--primary" href="#projects">
                See selected work
                <DownArrow />
              </a>
              <a className="portfolio-button portfolio-button--secondary" href="#contact">
                Contact
              </a>
            </div>

            <ul className={styles.focusAreas} aria-label="Focus areas">
              {focusAreas.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={styles.graphPanel}>
            <AmbientGraph variant="hero" />
          </div>
        </div>
      </div>
    </section>
  );
}
