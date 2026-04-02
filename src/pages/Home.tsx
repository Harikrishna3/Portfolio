import * as React from "react";
import { Box } from "@mui/material";
import FloatingIcons from "../components/FloatingIcons";
import HeroText from "../components/HeroText";
import HeroImage from "../components/HeroImage";

const Home: React.FC = () => {
  return (
    <>
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", md: "row" },
          minHeight: "100vh", 
          position: "relative",
          alignItems: { xs: "stretch", md: "center" },
        }}
      >
       {window.innerWidth  > 1080 && <FloatingIcons />}

        {/* Left side content - Now Full Width */}
        <Box
          sx={{
            flex: 1, // Full Width
            order: 2,
            position: "relative",
            minHeight: { xs: "auto", md: "100vh" },
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center", // Center for minimal look
            px: { 
              xs: 2,
              sm: 3,
              md: 6, 
              lg: 8,
              xl: 12 
            },
            py: { xs: 8, md: 0 },
            zIndex: 10,
          }}
        >
          <HeroText />
        </Box>

        {/* Right side image */}
        <Box
          sx={{
            flex: { xs: "none", md: 1 },
            order: { xs: 1, md: 2 },
            pt: { xs: 10, md: 0 },
            // minHeight: { xs: "50vh", sm: "60vh", md: "100vh" }, // Responsive height
          }}
        >
          <HeroImage />
        </Box>
      </Box>
    </>
  );
};

export default Home;