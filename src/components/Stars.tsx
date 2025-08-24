import { motion } from "framer-motion";

const starsCount = 30;
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

function randomStarPosition() {
  return {
    x: Math.random() * screenWidth,
    y: Math.random() * screenHeight,
    scale: Math.random() * 1 + 0.3, // small variation in size
    opacity: Math.random() * 0.5 + 0.5,
  };
}

export default function Stars() {
  const stars = Array.from({ length: starsCount }, () => randomStarPosition());

  return (
    <>
      {stars.map((star, i) => (
        <motion.div
          key={i}
          style={{
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "white",
            position: "absolute",
            top: star.y,
            left: star.x,
            opacity: star.opacity,
          }}
          animate={{
            x: [0, Math.random() * 20 - 10, 0],
            y: [0, Math.random() * 20 - 10, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}
