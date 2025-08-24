import * as React from "react";
import { Box } from "@mui/material";
import FloatingIcons from "../components/FloatingIcons";
import HeroText from "../components/HeroText";
import HeroImage from "../components/HeroImage";

const Home: React.FC = () => {
  return (
    <>
      <Box sx={{ display: "flex", minHeight: "100vh", position: "relative" }}>
        <FloatingIcons />

        {/* Left side content */}
        <Box
          sx={{
            flex: 1,
            position: "relative",
            minHeight: "100vh",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            px: { xs: 4, md: 12 },
            zIndex: 10,
          }}
        >
          <HeroText />
        </Box>

        {/* Right side image */}
        <HeroImage />
      </Box>
    </>
  );
};

export default Home;
