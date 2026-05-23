import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import { Reveal } from "../Motion/Reveal";

export default function ProjectItem({ smallButtons = false, project }) {
  const accentColor = project.color || "var(--color-brand)";

  return (
    <Reveal y={34} delay={0.1} duration={1}>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          isolation: "isolate",
          p: { xs: 2.35, md: 3.25 },
          borderRadius: { xs: "1.15rem", md: "1.35rem" },
          border: "1px solid var(--color-border-subtle)",
          background: `
            radial-gradient(circle at 12% 0%, ${project.accent}, transparent 34%),
            linear-gradient(145deg, var(--color-bg-surface-strong), var(--color-bg-surface-soft))
          `,
          boxShadow: "0 18px 42px rgba(0, 0, 0, 0.12)",
          backdropFilter: "blur(16px)",
          minHeight: { xs: "auto", md: 330 },
          display: "flex",
          flexDirection: "column",
          transition: "transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08), transparent 44%)",
            opacity: 0.5,
            pointerEvents: "none",
            zIndex: -1,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: { xs: 10, md: 12 },
            left: { xs: 18, md: 26 },
            right: { xs: 58, md: 76 },
            height: 2,
            borderRadius: "999px",
            background: `linear-gradient(90deg, ${accentColor}, transparent 82%)`,
            boxShadow: `0 0 18px ${project.accent}`,
            opacity: 0.9,
            pointerEvents: "none",
          },
          "&:hover": {
            transform: { md: "translateY(-4px)" },
            borderColor: accentColor,
            boxShadow: "0 24px 58px rgba(0, 0, 0, 0.18)",
          },
        }}
      >
        <Stack spacing={{ xs: 2, md: 2.35 }} sx={{ height: "100%" }}>
          <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent="space-between">
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "1.45rem", sm: "1.65rem", md: "2rem" },
                  lineHeight: 1.08,
                  fontWeight: 500,
                }}
              >
                {project.title}
              </Typography>
            </Box>
            <Box
              aria-hidden="true"
              sx={{
                mt: 0.35,
                width: { xs: 10, md: 12 },
                height: { xs: 10, md: 12 },
                flex: "0 0 auto",
                borderRadius: "999px",
                background: accentColor,
                boxShadow: `0 0 24px ${project.accent}`,
              }}
            />
          </Stack>

          <Stack
            component="ul"
            direction="row"
            spacing={0.8}
            useFlexGap
            flexWrap="wrap"
            sx={{
              p: 0,
              m: 0,
              listStyle: "none",
            }}
          >
            {project.tags.map((tag) => (
              <Box
                component="li"
                key={tag}
                sx={{
                  px: 1.05,
                  py: 0.45,
                  borderRadius: "999px",
                  border: "1px solid var(--color-border-subtle)",
                  backgroundColor: "var(--color-bg-surface-tint)",
                  lineHeight: 1,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    fontSize: { xs: "0.7rem", md: "0.72rem" },
                    lineHeight: 1,
                  }}
                >
                  {tag}
                </Typography>
              </Box>
            ))}
          </Stack>

          <Box>
            <Typography sx={{ color: "text.primary", lineHeight: { xs: 1.45, md: 1.65 } }}>
              {project.description}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gap: 1.8,
              pt: 2,
              mt: "auto",
              borderTop: "1px solid var(--color-divider)",
            }}
          >
            <Box>
              <Typography sx={{ color: "text.secondary", lineHeight: { xs: 1.45, md: 1.55 } }}>
                {project.note}
              </Typography>
            </Box>

            {!!project.buttons?.length && (
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25} useFlexGap flexWrap="wrap">
                {project.buttons.map((button) => (
                  <Button
                    key={button.label}
                    size={smallButtons ? "small" : "medium"}
                    variant="outlined"
                    sx={{
                      alignSelf: { xs: "stretch", sm: "flex-start" },
                      borderColor: button.emphasis ? accentColor : "var(--color-border-subtle)",
                      backgroundColor: button.emphasis ? "var(--color-bg-surface-tint)" : "transparent",
                    }}
                    endIcon={button.emphasis ? <ArrowOutwardRoundedIcon /> : undefined}
                    component="a"
                    href={button.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {button.label}
                  </Button>
                ))}
              </Stack>
            )}
          </Box>
        </Stack>
      </Box>
    </Reveal>
  );
}
