import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { floatImage } from "../utils/animations";
import Hari from "../assets/Hari's-Photo.png";

const MotionImg = motion.img;

export default function HeroImage() {
  const boxSx: SxProps<Theme> = {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 10,
    px: { 
      xs: 2,
      sm: 3,
      md: 4,
      lg: 6,
      xl: 8 
    },
    py: { xs: 1, sm: 2, md: 0 },
  };


  const responsiveImgSx: SxProps<Theme> = {
    width: "100%",
    maxWidth: {
      xs: 250,
      sm: 300,
      md: 350,
      lg: 400,
      xl: 450,
    },
    height: "auto",
    aspectRatio: "1",
    objectFit: "cover",
    borderRadius: "50%",
  };

  return (
    <Box sx={boxSx}>
      <Box
        component={MotionImg}
        src={Hari}
        alt="harikrishna"
        sx={responsiveImgSx}
        variants={floatImage as Variants}
        animate="animate"
      />
    </Box>
  );
}