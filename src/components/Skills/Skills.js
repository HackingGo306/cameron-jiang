"use client";

/* eslint-disable @next/next/no-img-element -- SVG skill marks stay unoptimized and retain their native CDN format. */

import { useEffect, useRef, useState } from "react";

import { skills } from "@/data/skills";

import styles from "./Skills.module.css";

const midpoint = Math.ceil(skills.length / 2);
const skillRows = [skills.slice(0, midpoint), skills.slice(midpoint)];

function SkillList({ clone = false, items, row }) {
  return (
    <ul
      aria-hidden={clone ? "true" : undefined}
      aria-label={clone ? undefined : `Skills row ${row} of ${skillRows.length}`}
      className={`${styles.skillList} ${clone ? styles.clone : ""}`}
    >
      {items.map((skill) => (
        <li className={styles.skillItem} key={`${clone ? "clone-" : ""}${skill.name}`}>
          <div className={styles.skillCard}>
            <img
              alt=""
              aria-hidden="true"
              className={styles.skillIcon}
              data-invert-on-dark={skill.invertOnDark ? "" : undefined}
              decoding="async"
              draggable="false"
              height="44"
              loading="lazy"
              src={skill.iconSrc}
              width="44"
            />
            <span className={styles.skillName}>{skill.name}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updatePageVisibility = () => setIsPageVisible(!document.hidden);

    updatePageVisibility();
    document.addEventListener("visibilitychange", updatePageVisibility);

    return () => document.removeEventListener("visibilitychange", updatePageVisibility);
  }, []);

  const isPaused = isManuallyPaused || !isInView || !isPageVisible;

  return (
    <section
      aria-labelledby="skills-heading"
      className={styles.section}
      data-paused={isPaused}
      id="skills"
      ref={sectionRef}
    >
      <div className={styles.intro}>
        <div className={styles.headingGroup}>
          <span aria-hidden="true" className={styles.accent} />
          <h2 className={styles.heading} id="skills-heading">
            My Skills
          </h2>
        </div>

        <button
          aria-label={isManuallyPaused ? "Play skills animation" : "Pause skills animation"}
          className={styles.pauseButton}
          onClick={() => setIsManuallyPaused((paused) => !paused)}
          type="button"
        >
          <span aria-hidden="true" className={styles.buttonIcon}>
            {isManuallyPaused ? "▶" : "Ⅱ"}
          </span>
          {isManuallyPaused ? "Play" : "Pause"}
        </button>
      </div>

      <div
        aria-label="Skills list"
        className={styles.railsViewport}
        role="region"
        tabIndex={0}
      >
        <div className={styles.rails}>
          {skillRows.map((row, index) => (
            <div className={styles.rail} key={`row-${index + 1}`}>
              <div
                className={`${styles.track} ${index === 0 ? styles.trackForward : styles.trackReverse}`}
              >
                <SkillList items={row} row={index + 1} />
                <SkillList clone items={row} row={index + 1} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
