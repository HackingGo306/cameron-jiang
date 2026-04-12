"use client"

import { Box, Stack, Typography } from "@mui/material";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/dist/css/splide.min.css";

import { IoLogoJavascript } from "react-icons/io5";
import { FaHtml5 } from "react-icons/fa6";

export default function Skills() {

  const splideOptions = {
    type: "loop", // Loop back to the beginning when reaching the end
    autoScroll: {
      pauseOnHover: false, // Do not pause scrolling when hovering over the carousel
      pauseOnFocus: false, // Do not pause scrolling when the carousel is focused
      rewind: true, // Rewind to start when the end is reached
      speed: 1.5, // Scrolling speed
    },
    arrows: false, // Hide navigation arrows
    pagination: false, // Hide pagination dots
    fixedWidth: "6rem", // Set a fixed width for each slide
    gap: '1rem', // Gap between slides
  };

  const skills = [
    {
      name: 'Github',
      icon: <img width={56} height={56} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" />
    },
    {
      name: 'React',
      icon: <img width={56} height={56} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
    },
    {
      name: 'Next.js',
      icon: <img width={56} height={56} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" />
    },
    {
      name: "JavaScript",
      icon: <img width={56} height={56} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" />
    },
    {
      name: 'Node.js',
      icon: <img width={56} height={56} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" />
    },
    {
      name: "HTML",
      icon: <img width={56} height={56} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" />
    },
    {
      name: "CSS",
      icon: <img width={56} height={56} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" />
    },
    {
      name: 'Java',
      icon: <img width={56} height={56} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" />
    },
    {
      name: 'Python',
      icon: <img width={56} height={56} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" />
    },
    {
      name: 'TensorFlow',
      icon: <img width={56} height={56} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" />
    },
    {
      name: 'PyTorch',
      icon: <img width={56} height={56} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" />
    },
    {
      name: 'MySQL',
      icon: <img width={56} height={56} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" />
    },
    {
      name: 'MariaDB',
      icon: <img width={56} height={56} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mariadb/mariadb-original.svg" />
    },
    {
      name: 'Redis',
      icon: <img width={56} height={56} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" />
    },
    {
      name: "PHP",
      icon: <img width={56} height={56} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" />
    },
    {
      name: 'Linux',
      icon: <img width={56} height={56} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" />
    },
    {
      name: 'C++',
      icon: <img width={56} height={56} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" />
    },
    {
      name: 'C#',
      icon: <img width={56} height={56} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg" />
    },
    {
      name: 'Unity',
      icon: <img width={56} height={56} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg" />
    },
    {
      name: "Blender",
      icon: <img width={56} height={56} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg" />
    },
    {
      name: "MUI",
      icon: <img width={56} height={56} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg" />
    },
    {
      name: "Motion",
      icon: <img width={56} height={56} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg" />
    },
    {
      name: "Discord.js",
      icon: <img width={56} height={56} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/discordjs/discordjs-original.svg" />
    },
    {
      name: "Three.js",
      icon: <img width={56} height={56} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg" />
    },
    {
      name: "Visual Studio",
      icon: <img width={56} height={56} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/visualstudio/visualstudio-original.svg" />
    },
    {
      name: "VS Code",
      icon: <img width={56} height={56} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" />
    }
  ]

  return (
    <Box sx={{
      width: "100%",
      height: "100%",
      borderRadius: "1.5rem",
      display: "flex",
      alignItems: "center",
      padding: 4,
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 6,
      border: "1px solid var(--color-border-subtle)",
      overflow: "hidden",
    }}>
      <Box sx={{ minWidth: 'fit-content' }}>
        <Typography variant="h4">
          My Skills:
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, position: 'relative', border: '1px solid transparent', borderRadius: '2rem', paddingY: 1, overflow: 'hidden' }}>
        <Splide options={splideOptions} extensions={{ AutoScroll }}>
          {skills.map((skill) => (
            <SplideSlide key={skill.name}>
              <Stack direction="column" justifyContent="center" spacing={0.5}>
                <Box sx={{
                  alignSelf: "center",
                }}>
                  {skill.icon}
                </Box>
                <Box
                  sx={{
                    py: 1,
                    borderRadius: "999px",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="body2" color="text.primary">
                    {skill.name}
                  </Typography>
                </Box>
              </Stack>
            </SplideSlide>
          ))}
        </Splide>
      </Box>
    </Box>
  );
}