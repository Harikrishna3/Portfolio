import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  width?: "fit-content" | "100%";
}

export const ScrollReveal = ({ children, width = "100%" }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75, filter: "blur(10px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};
