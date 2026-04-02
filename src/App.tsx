import "./App.css";
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

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <BrowserRouter>
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

      <Navbar />
      {/* Background grid */}
      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          backgroundImage: `
                        linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
          backgroundSize: "40px 40px",
          zIndex: 0,
        }}
      />
      <Stars />
      <Box component="main">
        <section id="home">
          <ScrollReveal>
            <Home />
          </ScrollReveal>
        </section>

        <section id="experience">
          <ScrollReveal>
             <Experience />
          </ScrollReveal>
        </section>

        <section id="projects">
          <ScrollReveal>
             <ProjectsPage />
          </ScrollReveal>
        </section>

        <section id="contact">
          <ScrollReveal>
             <ContactPage />
          </ScrollReveal>
        </section>
      </Box>
    </BrowserRouter>
  );
}

export default App;
