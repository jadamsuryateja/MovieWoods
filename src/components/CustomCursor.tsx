import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

const CustomCursor = () => {
  const { cursorType, cursorText } = useCursor();

  // Track mouse position directly
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth the position (this creates the fluid, jelly-like feel)
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Slower spring for the trailing ring
  const ringSpringConfig = { damping: 25, stiffness: 150, mass: 0.8 };
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  // Determine size and styling based on context state
  let cursorSize = 8;
  let ringSize = 40;
  let cursorColor = "bg-white";
  let cursorMixBlend = "mix-blend-difference";
  let isText = false;

  switch (cursorType) {
    case "hover":
      cursorSize = 64;
      ringSize = 0; // Hide ring on hover
      cursorColor = "bg-white";
      cursorMixBlend = "mix-blend-difference";
      break;
    case "view":
    case "play":
      cursorSize = 100;
      ringSize = 120;
      cursorColor = "bg-white/80 backdrop-blur-md border border-white";
      cursorMixBlend = "mix-blend-normal text-black";
      isText = true;
      break;
    case "text":
      cursorSize = 40;
      ringSize = 0;
      cursorColor = "bg-white";
      cursorMixBlend = "mix-blend-difference";
      break;
    case "hidden":
      cursorSize = 0;
      ringSize = 0;
      break;
    default:
      cursorSize = 12; // Modestly increased dot size for visibility
      ringSize = 40; // Trailing ring
      cursorColor = "bg-white";
      cursorMixBlend = "mix-blend-difference";
      break;
  }

  // Smooth out the size changes
  const smoothSize = useSpring(cursorSize, { stiffness: 300, damping: 25 });
  const smoothRingSize = useSpring(ringSize, { stiffness: 200, damping: 25 });

  // Hide default cursor across document
  useEffect(() => {
    document.body.style.cursor = 'none';
    const originalCursors = new Map();

    const addCursorNone = () => {
      const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"], .cursor-pointer');
      interactiveElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        if (htmlEl.style.cursor !== 'none') {
          originalCursors.set(htmlEl, htmlEl.style.cursor);
          htmlEl.style.cursor = 'none';
        }
      });
    };

    addCursorNone();
    const observer = new MutationObserver(addCursorNone);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.style.cursor = '';
      observer.disconnect();
      originalCursors.forEach((cursor, el) => {
        if (document.body.contains(el)) {
          el.style.cursor = cursor;
        }
      });
    };
  }, []);

  return (
    <>
      {/* Primary Dot / Shape */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-[99999] flex items-center justify-center font-bold tracking-widest text-[12px] uppercase shadow-2xl ${cursorColor} ${cursorMixBlend}`}
        style={{
          x: useTransform(cursorX, x => x - smoothSize.get() / 2),
          y: useTransform(cursorY, y => y - smoothSize.get() / 2),
          width: cursorType === "text" ? 2 : smoothSize,
          height: smoothSize,
          borderRadius: cursorType === "text" ? "2px" : "50%",
          color: cursorType === "play" || cursorType === "view" ? "#000" : "var(--foreground)"
        }}
        animate={{
          opacity: cursorType === "hidden" ? 0 : 1,
        }}
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: isText ? 1 : 0, scale: isText ? 1 : 0.5 }}
          transition={{ duration: 0.2 }}
        >
          {cursorText}
        </motion.span>
      </motion.div>

      {/* Secondary Trailing Ring (Creative Effect) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full border-[2px] border-white mix-blend-difference"
        style={{
          x: useTransform(ringX, x => x - smoothRingSize.get() / 2),
          y: useTransform(ringY, y => y - smoothRingSize.get() / 2),
          width: smoothRingSize,
          height: smoothRingSize,
        }}
        animate={{
          opacity: cursorType === "default" || cursorType === "view" || cursorType === "play" ? 1 : 0,
          scale: cursorType === "view" || cursorType === "play" ? 1.1 : 1
        }}
      />
    </>
  );
};

export default CustomCursor;
