/**
 * @typedef {Object} ProjectLink
 * @property {string} label
 * @property {string} href
 * @property {boolean} [primary]
 */

/**
 * @typedef {Object} ProjectMedia
 * @property {string} src
 * @property {string} alt
 * @property {string} [position]
 */

/**
 * @typedef {Object} Project
 * @property {string} title
 * @property {string} description
 * @property {string} contribution
 * @property {string[]} tags
 * @property {string} accent
 * @property {string} color
 * @property {ProjectMedia} media
 * @property {ProjectLink[]} links
 */

/** @type {Project[]} */
export const projects = [
  {
    title: "Bone Fracture Malunion Research",
    description:
      "A research project analyzing the MIMIC-IV medical dataset to predict bone fracture malunion outcomes using machine learning techniques.",
    contribution:
      "I used Pandas and JMP Pro to clean and analyze the data and built predictive models using PyCaret. I also first-authored an abstract that was accepted for presentation in the ASBMR and the BMES 2025 conferences.",
    tags: ["Data Science", "Machine Learning", "Data Visualization", "Research", "Pandas"],
    accent: "rgba(15, 111, 255, 0.2)",
    color: "#1672d8",
    media: {
      src: "/projects/bone-research.webp",
      alt: "Abstract illustration of bone fracture analysis and predictive modeling",
    },
    links: [
      {
        label: "See abstract",
        href: "https://asbmr.confex.com/asbmr/2025/meetingapp.cgi/Paper/5144",
        primary: true,
      },
      {
        label: "View code",
        href: "https://github.com/HackingGo306/MIMIC-Analysis",
      },
    ],
  },
  {
    title: "PatchSight",
    description:
      "An experimental AI-powered visual debugging system that uses Playwright screenshots and multimodal vision models to identify layout issues in rendered web interfaces.",
    contribution:
      "I built the MVP workflow for screenshot capture, structured visual feedback, iterative patch generation, and a human-in-the-loop dashboard for reviewing scores, feedback cards, iteration history, and applied file diffs before changes are committed.",
    tags: ["AI Tooling", "Playwright", "Vision Models", "Frontend", "Human-in-the-loop"],
    accent: "rgba(168, 85, 247, 0.2)",
    color: "#9350d8",
    media: {
      src: "/projects/patchsight.webp",
      alt: "Abstract PatchSight debugging dashboard with feedback and iteration history",
    },
    links: [
      {
        label: "View code",
        href: "https://github.com/HackingGo306/PatchSight",
        primary: true,
      },
      {
        label: "LinkedIn post",
        href: "https://www.linkedin.com/posts/cameron-jiang_fixing-ui-bugs-with-ai-can-feel-frustrating-ugcPost-7459728081767804928-UsaK?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEmIVWUB2JRUhqKM8ejpXKsDnJPoua8UR-E",
      },
    ],
  },
  {
    title: "MedSnap",
    description:
      "An AI-powered medical report autocompletion tool made for streamlining repetitive notetaking.",
    contribution:
      "As a fullstack developer, I handled API routing, user authentication, database security, and UI efficiency. I implemented the autocompletion feature using OpenAI's API.",
    tags: ["Next.js", "MariaDB", "OpenAI Integration", "LLM", "Data Processing", "MUI"],
    accent: "rgba(21, 148, 130, 0.2)",
    color: "#167f72",
    media: {
      src: "/projects/medsnap.webp",
      alt: "Abstract MedSnap medical report editor with AI-assisted autocompletion",
    },
    links: [
      {
        label: "Visit site",
        href: "https://medsnap.cameron-jiang.com",
        primary: true,
      },
    ],
  },
  {
    title: "Drone Recovery Reinforcement Learning",
    description:
      "Quadcopter using reinforcement learning (PPO) in Unity environment to recover after a single-rotor failure.",
    contribution:
      "I integrated Microsoft's AirSim with Unity and StableBaselines3, using Tensorboard for visualization. I worked on reward shaping and hyperparameter tuning to achieve stable learning and successful recovery behaviors.",
    tags: ["Reinforcement Learning", "Autonomous Systems", "StableBaselines3", "Research"],
    accent: "rgba(224, 103, 48, 0.2)",
    color: "#c65a2d",
    media: {
      src: "/projects/drone-recovery.webp",
      alt: "Abstract drone recovery simulation with a reinforcement-learning trajectory",
    },
    links: [
      {
        label: "View code",
        href: "https://github.com/orgs/Cosys-Drone/repositories",
        primary: true,
      },
    ],
  },
  {
    title: "Flozable",
    description: "A study website to increase student productivity",
    contribution:
      "I worked on the front-end using React, and helped implement Spotify Music API as well as study themes.",
    tags: ["React", "Spotify API", "Web Development", "UX Design", "Teamwork"],
    accent: "rgba(194, 119, 11, 0.2)",
    color: "#a96708",
    media: {
      src: "/projects/flozable.webp",
      alt: "Abstract Flozable study dashboard with focus tools and productivity themes",
    },
    links: [
      {
        label: "Visit site",
        href: "https://flozable.com",
        primary: true,
      },
    ],
  },
];
