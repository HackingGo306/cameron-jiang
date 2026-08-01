import Image from "next/image";
import styles from "./ProjectItem.module.css";

function getTitleId(title) {
  return `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-title`;
}

function OutwardArrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ProjectItem({ project }) {
  const titleId = getTitleId(project.title);
  const projectStyle = {
    "--project-accent": project.accent,
    "--project-color": project.color || "var(--color-brand)",
  };

  return (
    <article className={styles.card} aria-labelledby={titleId} style={projectStyle}>
      <div className={styles.media}>
        <Image
          src={project.media.src}
          alt={project.media.alt}
          fill
          sizes="(min-width: 1536px) 760px, (min-width: 1150px) 52vw, (min-width: 900px) 860px, calc(100vw - 48px)"
          style={{ objectFit: "cover", objectPosition: project.media.position || "center" }}
        />
        <span className={styles.mediaTint} aria-hidden="true" />
      </div>

      <div className={styles.content}>
        <div className={styles.titleRow}>
          <h3 id={titleId}>{project.title}</h3>
          <span className={styles.accentDot} aria-hidden="true" />
        </div>

        <ul className={styles.tags} aria-label={`${project.title} technologies`}>
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <div className={styles.copyBlock}>
          <p className={styles.label}>Overview</p>
          <p>{project.description}</p>
        </div>

        <div className={`${styles.copyBlock} ${styles.contribution}`}>
          <p className={styles.label}>My contribution</p>
          <p>{project.contribution}</p>
        </div>

        <div className={styles.actions}>
          {project.links.map((link) => (
            <a
              key={link.label}
              className={`portfolio-button ${
                link.primary ? "portfolio-button--primary" : "portfolio-button--secondary"
              }`}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label} for ${project.title} (opens in a new tab)`}
            >
              {link.label}
              <OutwardArrow />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
