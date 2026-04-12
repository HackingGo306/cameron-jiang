import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import { Reveal } from "../Motion/Reveal";
export default function ProjectItem({ project }) {

  return (
    <Reveal y={34} delay={0.1} duration={1}>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          p: { xs: 3, md: 3.5 },
          borderRadius: { xs: "1rem", md: "1.5rem" },
          background: `radial-gradient(circle at top left, ${project.accent}, transparent 24%), var(--color-bg-soft-card)`,
          backdropFilter: "blur(10px)",
          minHeight: 320,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack spacing={2.25} sx={{ height: "100%" }}>

          <Box sx={{ flexGrow: 1, width: '100%' }}>
            <Typography variant="h4" sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, lineHeight: 1.05 }}>
              {project.title}
            </Typography>
          </Box>

          <Stack direction="row" spacing={{ xs: 1, sm: 2, md: 2.5 }} useFlexGap flexWrap="wrap">
            {project.tags.map((tag) => (
              <Typography variant="caption" sx={{ letterSpacing: "0.05em" }} key={tag} fontStyle="italic" color="text.primary">
                {tag}
              </Typography>
            ))}
          </Stack>

          <Typography sx={{ mt: 1.5, color: "text.primary", lineHeight: 1.8 }}>
            {project.description}
          </Typography>

          <Box
            sx={{
              mt: "auto",
              pt: 1,
              display: "grid",
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="overline" sx={{ fontSize: "0.6rem", letterSpacing: "0.25em", lineHeight: 0, color: "var(--color-brand-strong)" }}>
                My role
              </Typography>
              <Typography sx={{ mt: 0.8, color: "text.secondary", lineHeight: 1.7 }}>
                {project.note}
              </Typography>
            </Box>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
              {
                project.buttons?.map((button) => (
                  <Button
                    key={button.label}
                    variant={button.emphasis ? "outlined" : "text"}
                    endIcon={button.emphasis && <ArrowOutwardRoundedIcon />}
                    component="a"
                    href={button.href}
                    target="_blank"
                  >
                    {button.label}
                  </Button>
                ))
              }
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Reveal>
  );
}
