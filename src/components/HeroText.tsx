import { Box, Button, Typography } from "@mui/material";
import type { Theme, SxProps } from "@mui/material";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { textVariant } from "../utils/animations";
import { useNavigate } from "react-router-dom";

const MotionDiv = motion.div;

export default function HeroText() {
  const navigate = useNavigate();

  const boxSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "column",
    gap: { xs: 2, sm: 2.5, md: 3 },
    alignItems: { xs: "center", md: "flex-start" },
    textAlign: { xs: "center", md: "left" },
    py: { xs: 1, sm: 2, md: 0 },
    width: "100%",
    maxWidth: { xs: "100%", sm: "90%", md: "none" },
  };

  const typographyH1Sx: SxProps<Theme> = {
    lineHeight: 1.1,
    fontSize: {
      xs: "2rem",
      sm: "2.5rem",
      md: "3rem",
      lg: "3.5rem",
      xl: "4rem",
    },
    wordBreak: "break-word",
  };

  const greetingTextSx: SxProps<Theme> = {
    fontSize: {
      xs: "1rem",
      sm: "1.25rem",
      md: "1.5rem",
      lg: "1.75rem",
      xl: "2rem",
    },
  };

  const typographyH5Sx: SxProps<Theme> = {
    lineHeight: 1.4,
    fontSize: {
      xs: "0.875rem",
      sm: "1rem",
      md: "1.125rem",
      lg: "1.25rem",
      xl: "1.375rem",
    },
    maxWidth: { xs: "100%", sm: "80%", md: "none" },
  };
  const typographyH6Sx: SxProps<Theme> = {
    lineHeight: 1.4,
    fontSize: {
      xs: "0.475rem",
      sm: "0.65rem",
      md: "0.9rem",
      lg: "0.95rem",
      xl: "1.075rem",
    },
    maxWidth: { xs: "100%", sm: "80%", md: "none" },
  };

  const buttonBoxSx: SxProps<Theme> = {
    mt: { xs: 2, sm: 2.5, md: 3 },
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    gap: { xs: 1.5, sm: 2 },
    justifyContent: { xs: "center", md: "flex-start" },
    alignItems: { xs: "stretch", sm: "center" },
    width: { xs: "100%", sm: "auto" },
  };

  const buttonSx: SxProps<Theme> = {
    minHeight: { xs: 44, sm: 48 },
    fontSize: { xs: "0.875rem", sm: "1rem" },
    px: { xs: 2, sm: 3 },
    width: { xs: "100%", sm: "auto" },
    maxWidth: { xs: "280px", sm: "none" },
  };

  return (
    <Box sx={boxSx}>
      <MotionDiv
        custom={0}
        initial="hidden"
        animate="visible"
        variants={textVariant as Variants}
        whileHover={{ scale: 1.02 }}
      >
        <Typography variant="h1" color="text.secondary" sx={typographyH1Sx}>
          <Box component="span" sx={greetingTextSx}>
            Hi, I'm
          </Box>
          <br />
          Harikrishna
          <MotionDiv
            animate={{
              rotate: [0, 5, -5, 5, 0], 
              transition: {
                duration: 1.5, // full wave duration
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            style={{
              display: "inline-block",
              transformOrigin: "bottom center",
            }} // rotate like wrist
          >
            👋
          </MotionDiv>
        </Typography>
      </MotionDiv>

      <MotionDiv
        custom={1}
        initial="hidden"
        animate="visible"
        variants={textVariant as Variants}
      >
        <Typography variant="h5" color="text.secondary" sx={typographyH5Sx}>
          MERN & JavaScript Developer | Problem Solver | Learner
        </Typography>
        {/* <br/> */}
        <Typography color="text.secondary" sx={typographyH6Sx}>
          I also share my learnings on{" "}
          <span
            onClick={() => {
              window.open("https://medium.com/@harikrishnabbomen", "_blank");
            }}
            style={{
              color: "#F59E0B",
              textDecoration: "underline Dotted",
              cursor: "pointer",
            }}
          >
            Medium &#8599;
          </span>
        </Typography>
      </MotionDiv>

      <MotionDiv
        custom={2}
        initial="hidden"
        animate="visible"
        variants={textVariant as Variants}
      >
        <Box sx={buttonBoxSx}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/contact")}
            sx={buttonSx}
          >
            Hire Me
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() =>
              window.open("https://harikrishnabomen.tiiny.site/", "_blank")
            }
            sx={buttonSx}
          >
            Resume
          </Button>
        </Box>
      </MotionDiv>
    </Box>
  );
}
