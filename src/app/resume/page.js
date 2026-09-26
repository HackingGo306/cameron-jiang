import Link from "next/link";
import SiteHeader from "@/components/SiteHeader/SiteHeader";
import pageStyles from "../page.module.css";
import styles from "./resume.module.css";

export const metadata = {
  title: "Resume | Cameron Jiang",
  description: "View and download Cameron Jiang’s resume.",
};

export default function ResumePage() {
  return (
    <div className={pageStyles.page}>
      <SiteHeader />
      <main className={styles.resume}>
        <div className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>Cameron Jiang</p>
            <h1>Resume</h1>
          </div>
          <div className={styles.actions}>
            <a className="portfolio-button portfolio-button--secondary" href="/Resume.pdf" target="_blank" rel="noopener noreferrer">
              Open in new page <span aria-hidden="true">↗</span>
            </a>
            <a className="portfolio-button portfolio-button--primary" href="/Resume.pdf" download>
              Download PDF <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <p className={styles.help}>
          If the preview doesn&apos;t display, open or download the PDF above.
        </p>
        <iframe
          className={styles.viewer}
          src="/Resume.pdf#view=FitH"
          title="Cameron Jiang’s resume PDF"
        />
        <p className={styles.legacy}>
          <Link href="/resume/legacy">View the legacy text resume</Link>
        </p>
      </main>
    </div>
  );
}
