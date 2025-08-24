import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LeetCodeIcon from "../assets/leetcode-icon.svg";
import JSIcon from "../assets/JS.svg";
import ReactIcon from "../assets/react.svg";
import nodeJs from "../assets/nodejs.svg";
import expressJs from "../assets/express-js.svg";
import mySQL from "../assets/mysql.svg";
import postman from "../assets/postman.svg";
import css from "../assets/css.svg";
import docker from "../assets/docker.svg";
import git from "../assets/git.svg";
import html from "../assets/html.svg";
import typescript from "../assets/typescript.svg";
import vsCode from "../assets/vs-code.svg";

const icons = [LeetCodeIcon, JSIcon, ReactIcon, nodeJs, expressJs, mySQL, postman , css, docker, git, html, typescript, vsCode]; // add more icons

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

function randomCornerPosition() {
  const corners = [
    { x: 0, y: 0 },
    { x: screenWidth - 50, y: 0 },
    { x: 0, y: screenHeight - 50 },
    { x: screenWidth - 50, y: screenHeight - 50 },
  ];
  return corners[Math.floor(Math.random() * corners.length)];
}

function randomNextPosition() {
  return {
    x: Math.random() * (screenWidth - 50),
    y: Math.random() * (screenHeight - 50),
  };
}

export default function FloatingIcons() {
  const [positions, setPositions] = useState(
    icons.map(() => randomCornerPosition())
  );

  // Animate each icon recursively
  const animateIcon = (index: number) => {
    const newTarget = randomNextPosition();
    setPositions((prev) =>
      prev.map((pos, i) => (i === index ? newTarget : pos))
    );

    // Random duration for natural roaming
    const duration = 15 + Math.random() * 10; // 15-25 seconds
    setTimeout(() => animateIcon(index), duration * 1000);
  };

  useEffect(() => {
    icons.forEach((_, i) => animateIcon(i));
  }, []);

  return (
    <>
      {icons.map((icon, i) => (
        <motion.img
          key={i}
          src={icon}
          alt="icon"
           style={{
            width: 50,
            height: 50,
            position: "absolute",
            top: positions[i].y,
            left: positions[i].x,
            pointerEvents: "none",
            filter: "drop-shadow(0 0 0px #38BDF8) drop-shadow(0 0 1.5px #38BDF8)",
            zIndex: 0,
          }}
          animate={{
            top: positions[i].y,
            left: positions[i].x,
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            ease: "linear",
          }}
          
        />
      ))}
    </>
  );
}
