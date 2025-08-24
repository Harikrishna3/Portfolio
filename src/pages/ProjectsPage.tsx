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
  Paper,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import LaunchIcon from "@mui/icons-material/Launch";
import GitHubIcon from "@mui/icons-material/GitHub";
import CodeIcon from "@mui/icons-material/Code";
import BoltIcon from "@mui/icons-material/Bolt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TargetIcon from "@mui/icons-material/GpsFixed";

const projectData = [
  {
    title: "ShopEasy - React E-Commerce",
    description:
      "A modern and user-friendly online shopping platform that enhances shopping experience and analytics tracking.",
    details: {
      Problem: "Many online stores are slow and confusing, frustrating users.",
      Solution:
        "Developed a React-based platform with lazy loading, smooth navigation, and integrated Google Analytics for tracking user behavior.",
      Tech: "React, Redux, JavaScript, HTML/CSS",
      Impact:
        "Users experienced faster load times, smoother navigation, and better engagement due to analytics insights.",
    },
    demoLink: "https://shopeasy-react.netlify.app/",
    githubLink: "https://github.com/Harikrishna3/ShopEasy-React",
    category: "E-Commerce",
    year: "2024",
  },
  ,
  {
    title: "My Portfolio Website",
    description:
      "A personal portfolio to showcase my projects, skills, and achievements with interactive UI and background animations.",
    details: {
      Problem:
        "I needed a professional way to present my work and experience online.",
      Solution:
        "Built a responsive React-based portfolio with dynamic project display, animated background, and interactive elements.",
      Tech: "React, JavaScript, CSS, Framer Motion, HTML",
      Impact:
        "A live, professional portfolio that highlights my skills, projects, and attracts potential employers.",
    },
    // demoLink: "https://harikrishna-portfolio.netlify.app/",
    githubLink: "https://github.com/Harikrishna3/Portfolio",
    category: "Portfolio",
    year: "2025",
  },
  {
    title: "Video Chat Application",
    description:
      "A real-time peer-to-peer video chat app built for seamless communication directly in the browser.",
    details: {
      Problem:
        "Existing solutions had unreliable connections and complex setup.",
      Solution:
        "Implemented WebRTC with signaling servers for stable video/audio streaming and easy connection setup.",
      Tech: "WebRTC, JavaScript, HTML/CSS",
      Impact:
        "Reliable video calling in-browser, low latency, and easy to use for multiple users.",
    },
    // demoLink: "https://demo.videochatapp.com",
    // githubLink: "https://github.com/username/videochatapp",
    category: "Communication",
    year: "2024",
  },
];

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
        borderRadius: 2.5, // Using theme's border radius approach
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getDetailIcon = (key: string) => {
    switch (key) {
      case "Problem":
        return <TargetIcon />;
      case "Solution":
        return <BoltIcon />;
      case "Tech":
        return <CodeIcon />;
      case "Impact":
        return <TrendingUpIcon />;
      default:
        return <TargetIcon />;
    }
  };

  const getDetailColor = (key: string) => {
    switch (key) {
      case "Problem":
        return "#ef4444";
      case "Solution":
        return "#22c55e";
      case "Tech":
        return "#38BDF8"; // Using theme's info color
      case "Impact":
        return "#FACC15"; // Using theme's secondary color
      default:
        return "#1E3A8A";
    }
  };

  return (
    <Box
      sx={{
        mt: 6,
        // background: "#0F172A", // Using theme's background color
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          // background:
          //   "radial-gradient(circle at 20% 20%, rgba(30, 58, 138, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(250, 204, 21, 0.1) 0%, transparent 50%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, py: 8 }}>
        {/* Header Section */}
        <Fade in={mounted} timeout={1000}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Chip
              label="Available for new projects"
              sx={{
                background: "rgba(34, 197, 94, 0.1)",
                color: "#22c55e",
                border: "1px solid rgba(34, 197, 94, 0.3)",
                mb: 4,
                px: 2,
                borderRadius: 2.5, // Using theme's border radius approach
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#22c55e",
                  borderRadius: "50%",
                  animation: "pulse 2s infinite",
                },
                "@keyframes pulse": {
                  "0%, 100%": {
                    opacity: 1,
                  },
                  "50%": {
                    opacity: 0.5,
                  },
                },
              }}
            />

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "3rem", md: "4.5rem" },
                fontWeight: 700,
                background: "linear-gradient(135deg, #facc15, #f59e0b)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 3,
                lineHeight: 1.1,
              }}
            >
              My Projects
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: "#E2E8F0",
                maxWidth: "600px",
                mx: "auto",
                mb: 6,
                lineHeight: 1.6,
              }}
            >
              Showcasing innovative solutions and creative implementations
              across various domains
            </Typography>

            {/* Stats */}
            <Stack
              direction="row"
              spacing={6}
              justifyContent="center"
              sx={{ flexWrap: "wrap", gap: 2 }}
            >
              {[
                { label: "Projects", value: "2+" },
                { label: "Technologies", value: "5+" },
                { label: "Passion", value: "100%" },
              ].map((stat) => (
                <Box key={stat.label} sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h3"
                    sx={{ color: "#FFFFFF", fontWeight: 700, mb: 1 }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#E2E8F0" }}>
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Fade>

        {/* Projects */}
        <Stack spacing={6}>
          {projectData.map((project, index) => (
            <Fade
              key={index}
              in={mounted}
              timeout={1000}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <Box sx={{ position: "relative" }}>
                {/* Category Badge */}
                <Chip
                  label={`${project?.category} • ${project?.year}`}
                  sx={{
                    position: "absolute",
                    top: -12,
                    left: 32,
                    zIndex: 2,
                    background:
                      "linear-gradient(135deg, #1E3A8A 0%, #38BDF8 100%)",
                    color: "white",
                    fontWeight: 600,
                    px: 3,
                    borderRadius: 2.5,
                  }}
                />

                <Card
                  sx={{
                    background: "#1E293B", // Using theme's paper color
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: 2.5, // Using theme's border radius
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    overflow: "visible",
                    "&:hover": {
                      transform: "translateY(-8px) scale(1.02)",
                      boxShadow:
                        "0 25px 50px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                      "&::after": {
                        opacity: 1,
                      },
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background:
                        "linear-gradient(135deg, rgba(30, 58, 138, 0.1) 0%, rgba(56, 189, 248, 0.1) 50%, rgba(250, 204, 21, 0.1) 100%)",
                      borderRadius: 2.5,
                      opacity: 0,
                      transition: "opacity 0.4s ease",
                      pointerEvents: "none",
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Grid container spacing={4}>
                      {/* Left Column - Project Info */}
                      <Box
                        sx={{
                          gridColumn: "1 / -1", // same as xs={12} → full width
                        }}
                      >
                        <Box sx={{ mt: 2 }}>
                          <Typography
                            variant="h4"
                            sx={{
                              color: "#FFFFFF",
                              fontWeight: 700,
                              mb: 2,
                              lineHeight: 1.3,
                            }}
                          >
                            {project?.title}
                          </Typography>

                          <Typography
                            variant="body1"
                            sx={{
                              color: "#E2E8F0",
                              mb: 4,
                              fontSize: "1.1rem",
                              lineHeight: 1.6,
                            }}
                          >
                            {project?.description}
                          </Typography>

                          {/* Project Details */}
                          <Box sx={{ mb: 4 }}>
                            {Object.entries(project?.details ?? {}).map(
                              ([key, value]) => (
                                <DetailItem
                                  key={key}
                                  icon={getDetailIcon(key)}
                                  title={key}
                                  description={value}
                                  color={getDetailColor(key)}
                                />
                              )
                            )}
                          </Box>

                          {/* Action Buttons */}
                          <Stack
                            direction="row"
                            spacing={2}
                            sx={{ flexWrap: "wrap", gap: 1 }}
                          >
                            {project?.demoLink && (
                              <Button
                                variant="contained"
                                startIcon={<LaunchIcon />}
                                href={project?.demoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  borderRadius: 2.5,
                                  padding: "12px 24px",
                                  fontWeight: 600,
                                  textTransform: "none",
                                  background:
                                    "linear-gradient(135deg, #1E3A8A 0%, #38BDF8 100%)",
                                  "&:hover": {
                                    background:
                                      "linear-gradient(135deg, #1e40af 0%, #0ea5e9 100%)",
                                    transform: "translateY(-2px)",
                                    boxShadow:
                                      "0 10px 25px rgba(30, 58, 138, 0.4)",
                                  },
                                }}
                              >
                                Live Demo
                              </Button>
                            )}
                            {project?.githubLink && (
                              <Button
                                variant="outlined"
                                startIcon={<GitHubIcon />}
                                href={project?.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  borderRadius: 2.5,
                                  padding: "12px 24px",
                                  fontWeight: 600,
                                  textTransform: "none",
                                  background: "rgba(255, 255, 255, 0.05)",
                                  color: "#FFFFFF",
                                  border: "1px solid rgba(255, 255, 255, 0.2)",
                                  "&:hover": {
                                    background: "rgba(255, 255, 255, 0.1)",
                                    transform: "translateY(-2px)",
                                  },
                                }}
                              >
                                GitHub
                              </Button>
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

        {/* Call to Action */}
        <Fade in={mounted} timeout={1000} style={{ transitionDelay: "800ms" }}>
          <Box sx={{ mt: 10, textAlign: "center" }}>
            <Paper
              sx={{
                background: "#1E293B", // Using theme's paper color
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 2.5,
                p: 6,
              }}
            >
              <Typography
                variant="h4"
                sx={{ color: "#FFFFFF", fontWeight: 700, mb: 2 }}
              >
                Interested in collaborating?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#E2E8F0",
                  maxWidth: "500px",
                  mx: "auto",
                  mb: 4,
                  fontSize: "1.1rem",
                }}
              >
                I'm always excited to work on innovative projects and bring
                creative ideas to life.
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{
                  borderRadius: 2.5,
                  padding: "12px 32px",
                  fontWeight: 600,
                  textTransform: "none",
                  background:
                    "linear-gradient(135deg, #1E3A8A 0%, #38BDF8 100%)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #1e40af 0%, #0ea5e9 100%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 25px rgba(30, 58, 138, 0.4)",
                  },
                }}
              >
                Get In Touch
              </Button>
            </Paper>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default ProjectsPage;
