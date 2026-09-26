import SiteHeader from "@/components/SiteHeader/SiteHeader";
import { resume } from "@/data/resume";
import pageStyles from "../../page.module.css";
import styles from "./resume.module.css";

export const metadata = {
  title: "Legacy Resume | Cameron Jiang",
  description: "Cameron Jiang’s education, projects, technical skills, research, and honors.",
};

function Entry({ entry }) {
  return (
    <article className={styles.entry}>
      <h3>{entry.title}</h3>
      {entry.technologies && <p className={styles.meta}>{entry.technologies}</p>}
      {entry.highlights && (
        <ul>{entry.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
      )}
    </article>
  );
}

export default function LegacyResumePage() {
  return (
    <div className={pageStyles.page}>
      <SiteHeader />
      <main className={styles.resume}>
        <div className={styles.intro}>
          <div>
            <p className={styles.eyebrow}>Resume</p>
            <h1>{resume.name}</h1>
            <p className={styles.location}>{resume.location}</p>
          </div>
          <a className="portfolio-button portfolio-button--primary" href="/Resume.pdf" download>
            Download PDF <span aria-hidden="true">↓</span>
          </a>
        </div>
        <nav className={styles.contact} aria-label="Resume contact details">
          <a href={`mailto:${resume.email}`}>{resume.email}</a>
          <a href={`tel:${resume.phone.replace(/[^+\d]/g, "")}`}>{resume.phone}</a>
          <a href={resume.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
        </nav>
        <div className={styles.content}>
          <section aria-labelledby="resume-education">
            <h2 id="resume-education">Education</h2>
            {resume.education.map((entry) => (
              <article className={styles.entry} key={entry.title}>
                <div className={styles.entryHeading}><h3>{entry.title}</h3><span className={styles.meta}>{entry.date}</span></div>
                <p>{entry.detail}</p>
                <p className={styles.meta}>{entry.location}</p>
              </article>
            ))}
          </section>
          <section aria-labelledby="resume-projects">
            <h2 id="resume-projects">Projects</h2>
            {resume.projects.map((entry) => <Entry key={entry.title} entry={entry} />)}
          </section>
          <section aria-labelledby="resume-skills">
            <h2 id="resume-skills">Technical skills</h2>
            <dl className={styles.skills}>
              {resume.skills.map((skill) => (
                <div key={skill.label}><dt>{skill.label}</dt><dd>{skill.value}</dd></div>
              ))}
            </dl>
          </section>
          <section aria-labelledby="resume-activities">
            <h2 id="resume-activities">Research, activities &amp; honors</h2>
            {resume.activities.map((entry) => <Entry key={entry.title} entry={entry} />)}
          </section>
        </div>
      </main>
    </div>
  );
}
