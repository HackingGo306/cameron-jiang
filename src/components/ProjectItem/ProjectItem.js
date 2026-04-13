import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import { Reveal } from "../Motion/Reveal";
export default function ProjectItem({ smallButtons = false, project }) {
  return (
    <Reveal y={34} delay={0.1} duration={1}>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          p: { xs: 2.5, md: 3.5 },
          pb: { xs: 1.5, md: 3.5 },
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
            <Typography variant="h4" sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, lineHeight: 1.05, marginBottom: { xs: -1, md: 'unset' } }}>
              {project.title}
            </Typography>
          </Box>

          <Stack direction="row" spacing={{ xs: 1, sm: 2, md: 2.5 }} useFlexGap flexWrap="wrap">
            {project.tags.map((tag) => (
              <Typography variant="caption" sx={{ letterSpacing: { xs: "0", md: "0.05em" }, marginBottom: { xs: -1, sm: -2, md: -2.5 } }} key={tag} fontStyle="italic" color="text.primary">
                {tag}
              </Typography>
            ))}
          </Stack>

          <Box sx={{ pt: 1 }}>
            <Typography sx={{ color: "text.primary", lineHeight: { xs: 1.15, md: 1.7} }}>
              {project.description}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="overline" sx={{ fontSize: "0.6rem", letterSpacing: "0.25em", lineHeight: 0, color: "var(--color-brand-strong)" }}>
                My role
              </Typography>
              <Typography sx={{ mt: 0.8, color: "text.secondary", lineHeight: { xs: 1.15, md: 1.5} }}>
                {project.note}
              </Typography>
            </Box>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
              {
                project.buttons?.map((button) => (
                  <Button
                    key={button.label}
                    size={smallButtons ? "small" : "medium"}
                    variant="outlined"
                    sx={{
                      background: button.emphasis ? "auto" : "transparent",
                    }}
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
