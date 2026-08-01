import { projects } from "@/data/projects";
import ProjectItem from "../ProjectItem/ProjectItem";
import styles from "./ProjectSection.module.css";

function GitHubMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.24c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.38.97.1-.75.4-1.27.74-1.56-2.57-.3-5.27-1.29-5.27-5.69 0-1.26.45-2.29 1.19-3.1-.12-.3-.52-1.47.11-3.06 0 0 .97-.31 3.16 1.18A11 11 0 0 1 12 6.08c.98 0 1.94.13 2.85.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.07.79 2.16v3.26c0 .31.21.67.8.55A11.5 11.5 0 0 0 12 .7Z" />
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

export default function ProjectSection() {
  return (
    <section className={styles.section} id="projects" aria-labelledby="projects-heading">
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.intro}>
            <h2 id="projects-heading">My Projects</h2>
            <div className={styles.introCopy}>
              <p className={styles.lede}>
                I&apos;ve been working on a range of projects over the years, from
                playful ideas to AI-powered tools.
              </p>
              <p>
                Game development first taught me to enjoy the process of building.
                Now, after spending more time with AI and product work, I&apos;m even
                more interested in how software can create real impact.
              </p>
            </div>
            <a
              className="portfolio-button portfolio-button--secondary"
              href="https://github.com/HackingGo306"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Cameron Jiang on GitHub (opens in a new tab)"
            >
              <GitHubMark />
              GitHub
              <OutwardArrow />
            </a>
          </div>

          <div className={styles.projects}>
            {projects.map((project) => (
              <ProjectItem key={project.title} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
