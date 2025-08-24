// src/components/HeroImage.tsx
import { Box,  } from "@mui/material";
import type {SxProps, Theme} from "@mui/material"
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { floatImage } from "../utils/animations";
import Hari from "../assets/Hari's-photo.jpeg";

const MotionImg = motion.img;

export default function HeroImage() {
  const boxSx: SxProps<Theme> = {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 10,
    px: { xs: 2, md: 8 },
  };

  const imgStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: 400,
    borderRadius: "50%",
    boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
  };

  return (
    <Box sx={boxSx}>
      <MotionImg
        src={Hari}
        alt="harikrishna"
        style={imgStyle}
        variants={floatImage as Variants}
        animate="animate"
      />
    </Box>
  );
}
