// Edit this file to update the /resume/legacy page. The downloadable PDF is maintained
// separately in public/Resume.pdf.
export const resume = {
  name: "Cameron Jiang",
  location: "Seattle, WA",
  email: "cameronjiang.dev@gmail.com",
  phone: "669-609-0396",
  linkedin: "https://linkedin.com/in/cameron-jiang",
  education: [
    { title: "University of Washington", location: "Seattle, WA", detail: "B.S. Computer Science", date: "Expected June 2030" },
    { title: "Leigh High School", location: "San Jose, CA", detail: "High School Diploma", date: "June 2026" },
  ],
  projects: [
    {
      title: "Franka Emika Panda Box Sorting RL",
      technologies: "Python, JAX, MuJoCo",
      highlights: [
        "Designed a configurable reinforcement-learning environment for the Franka Emika Panda robot arm with fine control over surface friction, box spawn rate, and movement noise",
        "Implemented curriculum training for the robot arm to complete a non-prehensile task of sorting boxes on a moving conveyor",
        "Analyzed 750M+ policy training steps and expanded PPO observation states to avoid training plateaus",
      ],
    },
    {
      title: "TRIBE v2 Visual UI Evaluation",
      technologies: "Python, Nilearn, Playwright",
      highlights: [
        "Integrated Meta’s TRIBE v2 model to predict human brain activation responses to webpage interfaces",
        "Automated webpage screenshot capture using Playwright for model evaluation",
        "Developed a pipeline that maps raw fMRI predictions to 3D space, parcellates the voxels based on region, and predicts neural engagement using activation averages.",
      ],
    },
    {
      title: "AirSim Robust Quadcopter RL",
      technologies: "Python, Stable-Baselines3, Unity",
      highlights: [
        "Built a Unity drone simulation environment with obstacles and a landing target, using Microsoft AirSim for drone physics",
        "Connected AirSim’s API to a Python PPO training script to teach a quadcopter to maintain flight after losing one rotor",
        "Reduced simulated angular velocity during freefall from 100+ rad/s to approximately 15 rad/s",
      ],
    },
  ],
  skills: [
    { label: "Languages", value: "JavaScript, TypeScript, Python, Java, C++" },
    { label: "ML / Robotics", value: "MuJoCo, AirSim, Stable-Baselines3, PyTorch, TensorFlow" },
    { label: "Tools", value: "Git, GitHub, Playwright, Unity, Render" },
    { label: "Other", value: "Linux, REST APIs, Data Analysis" },
  ],
  activities: [
    {
      title: "Bone Fracture Malunion Prediction Research",
      technologies: "JMP, MIMIC-IV, PyCaret",
      highlights: [
        "Worked with Dr. Chamith Rajapakse to investigate predictors of fracture malunion using clinical data from MIMIC-IV bone fracture patients",
        "Performed data preprocessing, feature engineering, and model evaluation",
        "Presented abstracts at ASBMR’s 2025 Annual conference and BMES’s 2025 Annual conference",
      ],
    },
    {
      title: "California State Summer School for Mathematics & Science (COSMOS)",
      highlights: [
        "Investigated the intersection between cybersecurity and autonomous systems at UCSC",
        "Reviewed the math behind encryption methods like SHA256, AES, and Diffie-Hellman",
        "Studied the Bellman equation and implemented Markov decision processes and policy iteration",
      ],
    },
    { title: "USA Computing Olympiad (USACO)", technologies: "Gold Division" },
  ],
};
