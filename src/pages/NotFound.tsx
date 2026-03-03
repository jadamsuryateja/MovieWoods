import { useLocation, Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import MagneticElement from "@/components/MagneticElement";
import { useCursor } from "@/context/CursorContext";

const NotFound = () => {
  const location = useLocation();
  const { setCursorType } = useCursor();
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking setup
  const mouseX = useSpring(0, { stiffness: 100, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 20 });

  useEffect(() => {
    console.error("404 Error: Non-existent route mapped to:", location.pathname);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xOffset = (clientX / innerWidth) - 0.5;
      const yOffset = (clientY / innerHeight) - 0.5;

      mouseX.set(xOffset);
      mouseY.set(yOffset);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [location.pathname, mouseX, mouseY]);

  // Parallax transforms based on mouse input
  const bgX = useTransform(mouseX, [-0.5, 0.5], ["3%", "-3%"]);
  const bgY = useTransform(mouseY, [-0.5, 0.5], ["3%", "-3%"]);

  const fgX = useTransform(mouseX, [-0.5, 0.5], ["-5%", "5%"]);
  const fgY = useTransform(mouseY, [-0.5, 0.5], ["-5%", "5%"]);

  const textX = useTransform(mouseX, [-0.5, 0.5], ["-10px", "10px"]);
  const textY = useTransform(mouseY, [-0.5, 0.5], ["-10px", "10px"]);

  return (
    <PageTransition>
      <div ref={containerRef} className="relative min-h-screen w-full bg-[#0a0a0a] overflow-hidden flex items-center justify-center flex-col">

        {/* --- Ambient Blobs / Gradients --- */}
        <motion.div
          style={{ x: bgX, y: bgY }}
          className="absolute inset-0 z-0 pointer-events-none opacity-40"
        >
          <motion.div
            className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/30 blur-[120px] mix-blend-screen"
            animate={{ scale: [1, 1.2, 0.9, 1], rotate: [0, 90, 180, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#27ae60]/20 blur-[150px] mix-blend-screen"
            animate={{ scale: [1, 0.8, 1.1, 1], rotate: [360, 180, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* --- Animated Mosaic / Grid Pattern Background --- */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: '4vw 4vw',
            backgroundPosition: 'center center',
            maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)'
          }}
        >
          <motion.div
            className="w-full h-full bg-primary/20"
            animate={{
              opacity: [0, 0.2, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "mirror"
            }}
            style={{
              maskImage: 'repeating-linear-gradient(45deg, black, black 10px, transparent 10px, transparent 50px)'
            }}
          />
        </div>


        {/* --- Glitch / Typography Layer --- */}
        <motion.div
          className="relative z-10 flex flex-col items-center text-center mix-blend-difference"
          style={{ x: textX, y: textY }}
        >
          <div className="relative overflow-hidden mb-6 px-4">
            <motion.h1
              initial={{ y: "100%", opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[25vw] md:text-[20vw] font-black uppercase tracking-tighter leading-none text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,1)] md:[-webkit-text-stroke:4px_rgba(255,255,255,1)] drop-shadow-2xl"
            >
              404
            </motion.h1>

            {/* Fake Glitch Overlay */}
            <motion.h1
              className="absolute top-0 left-0 w-full text-center text-[25vw] md:text-[20vw] font-black uppercase tracking-tighter leading-none text-primary mix-blend-screen opacity-50"
              animate={{
                x: [0, -5, 5, -2, 4, 0],
                opacity: [0, 0.8, 0, 0.5, 0, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "mirror",
                repeatDelay: Math.random() * 4 + 2
              }}
            >
              404
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-md px-6 mb-16"
          >
            <p className="text-xl md:text-2xl font-bold tracking-tight text-white mb-4 uppercase drop-shadow-lg">
              Frame Not Found
            </p>
            <p className="text-sm md:text-base text-white/50 leading-relaxed font-mono uppercase tracking-widest">
              The visual you are searching for has been lost in the render queue or never existed in this composition.
            </p>
          </motion.div>

          {/* --- Modern Sleek Button --- */}
          <MagneticElement strength={0.1}>
            <Link
              to="/"
              className="group relative flex items-center justify-center px-12 py-5 bg-transparent border border-white/20 hover:border-primary transition-all duration-500 overflow-hidden"
              onMouseEnter={() => setCursorType("hover")}
              onMouseLeave={() => setCursorType("default")}
            >
              <span className="text-xs md:text-sm uppercase tracking-[0.3em] font-bold text-white z-10">
                Return Base
              </span>

              {/* Hover accent wipe */}
              <div className="absolute inset-0 bg-primary/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1]" />
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 delay-100" />
            </Link>
          </MagneticElement>

        </motion.div>

        {/* Additional Decorative lines */}
        <div className="absolute top-0 left-10 md:left-24 w-[1px] h-full bg-white/[0.03] z-0" />
        <div className="absolute top-0 right-10 md:right-24 w-[1px] h-full bg-white/[0.03] z-0" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/[0.03] z-0" />
      </div>
    </PageTransition>
  );
};

export default NotFound;
