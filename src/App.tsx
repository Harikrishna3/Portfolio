import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Experience from "./pages/Experience";
import Stars from "./components/Stars";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import { Box } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
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
          <Home />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <section id="projects">
          <ProjectsPage />
        </section>
        <section id="contact">
          <ContactPage />
        </section>
      </Box>
    </BrowserRouter>
  );
}

export default App;
