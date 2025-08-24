// src/components/HeroText.tsx
import { Box, Button, Typography } from "@mui/material";
import type { Theme, SxProps } from "@mui/material";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { textVariant } from "../utils/animations";
import { useNavigate } from "react-router-dom";

const MotionDiv = motion.div;

export default function HeroText() {
  const boxSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "column",
    gap: 2.5,
    alignItems: { xs: "center", md: "flex-start" },
    textAlign: { xs: "center", md: "left" },
    py: { xs: 4, md: 0 },
  };
  const navigate = useNavigate();
  const typographyH1Sx: SxProps<Theme> = { lineHeight: 1.1 };
  const typographyH5Sx: SxProps<Theme> = { lineHeight: 1.4 };

  const buttonBoxSx: SxProps<Theme> = {
    mt: 3,
    display: "flex",
    gap: 2,
    justifyContent: { xs: "center", md: "flex-start" },
  };

  return (
    <Box sx={boxSx}>
      <MotionDiv
        custom={0}
        initial="hidden"
        animate="visible"
        variants={textVariant as Variants}
        whileHover={{ scale: 1.05 }}
      >
        <Typography variant="h1" color="text.secondary" sx={typographyH1Sx}>
          <span style={{ fontSize: "30px" }}> Hi, I’m </span>
          <br />
          Harikrishna 👋
        </Typography>
      </MotionDiv>

      <MotionDiv custom={1} initial="hidden" animate="visible" variants={textVariant as Variants}>
        <Typography variant="h5" color="text.secondary" sx={typographyH5Sx}>
          MERN & JavaScript Developer | Problem Solver | Learner
        </Typography>
      </MotionDiv>

      <MotionDiv custom={2} initial="hidden" animate="visible" variants={textVariant as Variants}>
        <Box sx={buttonBoxSx}>
          <Button variant="contained" color="primary" onClick={() => navigate("/contact")}>
            Hire Me
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() =>
              window.open("https://harikrishnabomen.tiiny.site/", "_blank")
            }
          >
            Resume
          </Button>
        </Box>
      </MotionDiv>
    </Box>
  );
}
