import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Experience from "./pages/Experience";
import Stars from "./components/Stars";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import { Box } from "@mui/material";
import { ScrollReveal } from "./components/ScrollReveal";
import { motion, useScroll, useSpring } from "framer-motion";
import { PremiumCursor } from "./components/PremiumCursor";
import { SectionDivider } from "./components/SectionDivider";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Updated for tighter gaps
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = ["home", "experience", "projects", "contact"];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <BrowserRouter>
      <PremiumCursor />
      {/* Scroll Progress Bar */}
      <motion.div
        style={{
          scaleX,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: "linear-gradient(90deg, #FACC15, #38BDF8)",
          transformOrigin: "0%",
          zIndex: 2000
        }}
      />

      <Navbar activeSection={activeSection} />

      {/* High-Performance Blueprint Grid Overlay */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.08) 1.5px, transparent 1.5px),
            linear-gradient(to bottom, rgba(255,255,255,0.08) 1.5px, transparent 1.5px)
          `,
          backgroundSize: "50px 50px",
          zIndex: 10, // On top of all section colors
          pointerEvents: "none",
          // Radial mask for depth: makes the grid fade out toward the edges for a "spotlight" focus
          maskImage: "radial-gradient(circle at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 20%, transparent 100%)",
          opacity: 0.6
        }}
      />
      <Stars />
      <Box component="main" sx={{ position: "relative", zIndex: 1 }}>
        <Box 
          id="home" 
          component="section" 
          sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
        >
          <ScrollReveal>
            <Home />
          </ScrollReveal>
        </Box>

        <Box 
          id="experience" 
          component="section" 
          sx={{ 
            minHeight: "100vh", 
            py: { xs: 8, md: 10 }, 
            display: "flex", 
            alignItems: "center" 
          }}
        >
          <ScrollReveal>
             <Experience />
          </ScrollReveal>
        </Box>

        <Box 
          id="projects" 
          component="section" 
          sx={{ 
            minHeight: "100vh", 
            py: { xs: 8, md: 10 }, 
            display: "flex", 
            flexDirection: "column",
            alignItems: "center" 
          }}
        >
          <ScrollReveal>
             <ProjectsPage />
          </ScrollReveal>
        </Box>

        <SectionDivider color="#0F172A" flip={true} />

        <Box 
          id="contact" 
          component="section" 
          sx={{ 
            minHeight: "100vh", 
            pt: { xs: 8, md: 15 },
            pb: 0, 
            display: "flex", 
            alignItems: "center",
            backgroundColor: "#020617", // Slightly deeper background for the contact area
            position: "relative",
            zIndex: 1
          }}
        >
          <ScrollReveal>
             <ContactPage />
          </ScrollReveal>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;
