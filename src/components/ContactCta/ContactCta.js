import AmbientGraph from "../AmbientGraph/AmbientGraph";
import styles from "./ContactCta.module.css";

function EmailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M3.5 6.5h17v11h-17z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m4.5 7.5 7.5 5.7 7.5-5.7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.24c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.38.97.1-.75.4-1.27.74-1.56-2.57-.3-5.27-1.29-5.27-5.69 0-1.26.45-2.29 1.19-3.1-.12-.3-.52-1.47.11-3.06 0 0 .97-.31 3.16 1.18A11 11 0 0 1 12 6.08c.98 0 1.94.13 2.85.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.07.79 2.16v3.26c0 .31.21.67.8.55A11.5 11.5 0 0 0 12 .7Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5.2 8.5H2V22h3.2V8.5ZM3.6 2a1.9 1.9 0 1 0 0 3.8A1.9 1.9 0 0 0 3.6 2Zm6 6.5H6.5V22h3.2v-6.7c0-1.8.3-3.5 2.6-3.5s2.3 2.1 2.3 3.6V22H18v-7.5c0-3.7-.8-6.5-5-6.5-1.9 0-3.2 1-3.7 2h-.1l.4-1.5Z" />
    </svg>
  );
}

function OutwardArrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ContactCta() {
  return (
    <section className={styles.section} id="contact" aria-labelledby="contact-heading">
      <div className={styles.container}>
        <div className={styles.panel}>
          <div className={styles.layout}>
            <div className={styles.copy}>
              <p className="section-eyebrow">Contact</p>
              <h2 id="contact-heading">
                Like what you see? <span>Say Hi.</span>
              </h2>
              <p className={styles.supporting}>
                Projects, internships, collaborations, or just a good conversation.
              </p>

              <div className={styles.actions}>
                <a
                  className="portfolio-button portfolio-button--primary"
                  href="mailto:cameronjiang.dev@gmail.com"
                >
                  <EmailIcon />
                  Email me
                </a>
                <a
                  className="portfolio-button portfolio-button--secondary"
                  href="https://github.com/HackingGo306"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Cameron Jiang on GitHub (opens in a new tab)"
                >
                  <GitHubIcon />
                  GitHub
                  <OutwardArrow />
                </a>
                <a
                  className="portfolio-button portfolio-button--secondary"
                  href="https://linkedin.com/in/cameron-jiang"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Cameron Jiang on LinkedIn (opens in a new tab)"
                >
                  <LinkedInIcon />
                  LinkedIn
                  <OutwardArrow />
                </a>
                <span
                  className={styles.status}
                  role="note"
                  aria-label="Resume unavailable, coming soon"
                >
                  Resume · Soon
                </span>
              </div>
            </div>
          </div>

          <div className={styles.graph}>
            <AmbientGraph variant="contact" />
          </div>
        </div>
      </div>
    </section>
  );
}
