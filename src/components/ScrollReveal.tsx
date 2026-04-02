import { motion } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  width?: "fit-content" | "100%";
}

export const ScrollReveal = ({ children, width = "100%" }: Props) => {
  const ref = useRef(null);

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "visible" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 100, scale: 0.95, filter: "blur(10px)" },
          visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.22, 1, 0.36, 1], // premium elastic ease
          scale: { type: "spring", stiffness: 100, damping: 20 }
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
