import styles from "./SiteFooter.module.css";

const links = [
  { label: "Email", href: "mailto:cameronjiang.dev@gmail.com" },
  { label: "GitHub", href: "https://github.com/HackingGo306", external: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/cameron-jiang", external: true },
];

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p>© {new Date().getFullYear()} Cameron Jiang</p>
          <nav aria-label="Footer navigation">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                aria-label={link.external ? `${link.label} (opens in a new tab)` : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
