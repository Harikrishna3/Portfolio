import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
  Fade,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import LaunchIcon from "@mui/icons-material/Launch";
import GitHubIcon from "@mui/icons-material/GitHub";
import CodeIcon from "@mui/icons-material/Code";
import BoltIcon from "@mui/icons-material/Bolt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TargetIcon from "@mui/icons-material/GpsFixed";
import { usePortfolio } from "../context/PortfolioContext";

type DetailItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  color?: string;
};

const DetailItem = ({
  icon,
  title,
  description,
  color = "#1E3A8A",
}: DetailItemProps) => (
  <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
    <Avatar
      sx={{
        width: 40,
        height: 40,
        background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`,
        fontSize: "1rem",
        borderRadius: 2.5,
      }}
    >
      {icon}
    </Avatar>
    <Box sx={{ flex: 1 }}>
      <Typography
        variant="subtitle2"
        sx={{ color: "#FACC15", fontWeight: 600, mb: 0.5 }}
      >
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: "#E2E8F0", lineHeight: 1.6 }}>
        {description}
      </Typography>
    </Box>
  </Box>
);

const ProjectsPage = () => {
  const { portfolioData, loading } = usePortfolio();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (loading || !portfolioData) return null;
  const projects = portfolioData.projects;

  const getDetailIcon = (key: string) => {
    switch (key) {
      case "Problem": return <TargetIcon />;
      case "Solution": return <BoltIcon />;
      case "Tech": return <CodeIcon />;
      case "Impact": return <TrendingUpIcon />;
      default: return <TargetIcon />;
    }
  };

  const getDetailColor = (key: string) => {
    switch (key) {
      case "Problem": return "#ef4444";
      case "Solution": return "#22c55e";
      case "Tech": return "#38BDF8";
      case "Impact": return "#FACC15";
      default: return "#1E3A8A";
    }
  };

  return (
    <Box sx={{ mt: 6, minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, py: 8 }}>
        <Fade in={mounted} timeout={1000}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Chip label="Available for new projects" sx={{ background: "rgba(34, 197, 94, 0.1)", color: "#22c55e", border: "1px solid rgba(34, 197, 94, 0.3)", mb: 4, px: 2, borderRadius: 2.5 }} />
            <Typography variant="h1" sx={{ fontSize: { xs: "3rem", md: "4.5rem" }, fontWeight: 700, background: "linear-gradient(135deg, #facc15, #f59e0b)", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", mb: 3, lineHeight: 1.1 }}>
              My Projects
            </Typography>
            <Typography variant="h5" sx={{ color: "#E2E8F0", maxWidth: "600px", mx: "auto", mb: 6, lineHeight: 1.6 }}>
              Showcasing innovative solutions and creative implementations across various domains
            </Typography>
            <Stack direction="row" spacing={6} justifyContent="center" sx={{ flexWrap: "wrap", gap: 2 }}>
              {[{ label: "Projects", value: `${projects.length}+` }, { label: "Technologies", value: "5+" }, { label: "Passion", value: "100%" }].map((stat) => (
                <Box key={stat.label} sx={{ textAlign: "center" }}>
                  <Typography variant="h3" sx={{ color: "#FFFFFF", fontWeight: 700, mb: 1 }}>{stat.value}</Typography>
                  <Typography variant="body2" sx={{ color: "#E2E8F0" }}>{stat.label}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Fade>

        <Stack spacing={6}>
          {projects.map((project: any, index: number) => (
            <Fade key={index} in={mounted} timeout={1000} style={{ transitionDelay: `${index * 200}ms` }}>
              <Box sx={{ position: "relative" }}>
                <Chip label={`${project?.category} • ${project?.year}`} sx={{ position: "absolute", top: -12, left: 32, zIndex: 2, background: "linear-gradient(135deg, #1E3A8A 0%, #38BDF8 100%)", color: "white", fontWeight: 600, px: 3, borderRadius: 2.5 }} />
                <Card sx={{ background: "#1E293B", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: 2.5, transition: "all 0.4s ease", "&:hover": { transform: "translateY(-8px)", boxShadow: "0 25px 50px rgba(0, 0, 0, 0.4)" } }}>
                  <CardContent sx={{ p: 4 }}>
                    <Grid container spacing={4}>
                      <Box sx={{ gridColumn: "1 / -1" }}>
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="h4" sx={{ color: "#FFFFFF", fontWeight: 700, mb: 2, lineHeight: 1.3 }}>{project?.title}</Typography>
                          <Typography variant="body1" sx={{ color: "#E2E8F0", mb: 4, fontSize: "1.1rem", lineHeight: 1.6 }}>{project?.description}</Typography>
                          <Box sx={{ mb: 4 }}>
                            {Object.entries(project?.details ?? {}).map(([key, value]) => (
                                <DetailItem key={key} icon={getDetailIcon(key)} title={key} description={value as string} color={getDetailColor(key)} />
                            ))}
                          </Box>
                          <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", gap: 1 }}>
                            {project?.demoLink && (
                              <Button variant="contained" startIcon={<LaunchIcon />} href={project?.demoLink} target="_blank" sx={{ borderRadius: 2.5, padding: "12px 24px", fontWeight: 600, background: "linear-gradient(135deg, #1E3A8A 0%, #38BDF8 100%)" }}>Live Demo</Button>
                            )}
                            {project?.githubLink && (
                              <Button variant="outlined" startIcon={<GitHubIcon />} href={project?.githubLink} target="_blank" sx={{ borderRadius: 2.5, padding: "12px 24px", color: "white", borderColor: "rgba(255,255,255,0.2)" }}>GitHub</Button>
                            )}
                          </Stack>
                        </Box>
                      </Box>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            </Fade>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default ProjectsPage;
