import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Experience from "./pages/Experience";
import Stars from "./components/Stars";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
// import CodeDharmaPage from "./pages/CodeDharma";

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* <Route path="/code-dharma" element={<CodeDharmaPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
