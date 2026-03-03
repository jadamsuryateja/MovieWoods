import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, Variants } from "framer-motion";
import MagneticElement from "./MagneticElement";
import { works } from "@/data/works";
import { useCursor } from "@/context/CursorContext";

const navLinks = [
  { label: "Home", path: "/", video: works[4]?.video || "" },
  { label: "Work", path: "/work", video: works[0]?.video || "" },
  { label: "About", path: "/about", video: works[3]?.video || "" },
  { label: "Contact", path: "/contact", video: works[3]?.video || "" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const location = useLocation();
  const featuredWorks = works.slice(0, 4);
  const { setCursorType } = useCursor();

  useEffect(() => {
    setMenuOpen(false);
    setHoveredLink(null);
  }, [location.pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      setCursorType("default"); // Reset cursor on open
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen, setCursorType]);

  const menuVariants: Variants = {
    closed: {
      clipPath: "circle(0px at calc(100% - 4rem) 4rem)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        delay: 0.2,
      },
    },
    open: {
      clipPath: "circle(150% at calc(100% - 4rem) 4rem)",
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
      },
    },
  };

  const linkVariants: Variants = {
    closed: { y: "150%", rotate: 5, opacity: 0, transition: { duration: 0.2 } },
    open: (i: number) => ({
      y: 0,
      rotate: 0,
      opacity: 1,
      transition: { delay: i * 0.1 + 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    }),
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-[60] py-4 md:py-6 pointer-events-none text-white">
        {/* Subtle Scrim for guaranteed contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent pointer-events-none h-[150%]" />

        <nav className="flex items-center justify-between px-4 md:px-12 pointer-events-auto relative z-10">
          <Link
            to="/"
            className="flex flex-col relative z-[61] group mt-1"
            onMouseEnter={() => setCursorType("hover")}
            onMouseLeave={() => setCursorType("default")}
          >
            <span
              className="text-lg md:text-3xl font-black tracking-tighter uppercase leading-none text-white"
              style={{ textShadow: "0px 2px 40px rgba(0,0,0,1), 0px 4px 10px rgba(0,0,0,0.8)" }}
            >
              DreamsWood<span className="text-primary transition-colors hover:text-white" style={{ textShadow: "0px 0px 20px var(--primary)" }}>.</span>
            </span>
            <span
              className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-white/90 mt-1 hidden md:block"
              style={{ textShadow: "0px 2px 10px rgba(0,0,0,1)" }}
            >
              VFX & Post-Production
            </span>
          </Link>

          {/* Magnetic Floating Pill */}
          <div className="fixed top-4 right-4 md:top-8 md:right-12 z-[60] font-sans">
            <MagneticElement strength={0.1}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                onMouseEnter={() => setCursorType("hover")}
                onMouseLeave={() => setCursorType("default")}
                className="group relative flex items-center justify-between px-4 md:px-6 h-10 md:h-12 bg-black/20 border border-white/20 hover:border-white transition-colors duration-500 overflow-hidden pointer-events-auto backdrop-blur-md"
                style={{ boxShadow: "0px 4px 20px rgba(0,0,0,0.5)" }}
                aria-label="Toggle menu"
              >
                {/* Hover Background animated fill */}
                <div className="absolute inset-0 bg-white scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-[0.16, 1, 0.3, 1]" />

                <div className="relative z-10 flex items-center gap-4 text-white group-hover:text-black transition-colors duration-500">
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.3em] transition-transform duration-300"
                    style={{ textShadow: "0px 2px 8px rgba(0,0,0,0.8)" }}
                  >
                    {menuOpen ? "Close" : "Menu"}
                  </span>
                  <div className="flex flex-col items-end justify-center gap-[4px] w-5">
                    <motion.div
                      animate={menuOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
                      className="w-5 h-[2px] bg-current origin-center shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                    />
                    <motion.div
                      animate={menuOpen ? { rotate: -45, y: -3, width: "1.25rem" } : { rotate: 0, y: 0, width: "0.75rem" }}
                      className="h-[2px] bg-current origin-center transition-all duration-300 group-hover:w-5 shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                    />
                  </div>
                </div>
              </button>
            </MagneticElement>
          </div>
        </nav>
      </header>

      {/* Cinematic Full Screen Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[55] bg-black overflow-hidden flex flex-col md:flex-row"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            {/* Dynamic Creative Background */}
            <div className="absolute inset-0 z-0 bg-[#050505] overflow-hidden">
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
                backgroundSize: '4vw 4vw',
              }} />

              <AnimatePresence>
                {hoveredLink && (
                  <motion.div
                    key={hoveredLink}
                    initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <h2 className="text-[25vw] font-black uppercase tracking-tighter whitespace-nowrap text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.03)] selection:bg-transparent">
                      {hoveredLink}
                    </h2>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative z-10 flex-1 flex flex-col justify-center px-10 md:px-24">
              <ul className="flex flex-col gap-2 md:gap-4">
                {navLinks.map((link, i) => (
                  <div key={link.label} className="overflow-hidden py-2 px-4 -mx-4 group">
                    <motion.li
                      custom={i}
                      variants={linkVariants}
                      onHoverStart={() => setHoveredLink(link.label)}
                      onHoverEnd={() => setHoveredLink(null)}
                      className="flex items-center gap-6"
                    >
                      <span className="text-sm font-bold text-white/20 font-mono tracking-widest hidden md:block">0{i + 1}</span>
                      <Link
                        to={link.path}
                        onClick={() => setMenuOpen(false)}
                        className="relative inline-block text-5xl md:text-8xl lg:text-[7rem] font-black uppercase tracking-tighter text-white/40 hover:text-white transition-all duration-500 origin-left hover:scale-[1.02] hover:translate-x-4"
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  </div>
                ))}
              </ul>
            </div>

            <div className="relative z-10 md:w-1/3 flex flex-col justify-end pb-24 px-10 md:px-0 md:pr-24">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="mt-auto"
              >
                <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary mb-4">Connect</p>
                <a href="mailto:hello@dreamswood.com" className="text-white/60 hover:text-white transition-colors text-sm font-semibold tracking-wider block mb-2">HELLO@DREAMSWOOD.COM</a>
                <a href="tel:+1234567890" className="text-white/60 hover:text-white transition-colors text-sm font-semibold tracking-wider block mb-8">+1 (234) 567-890</a>

                <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary mb-4">Follow</p>
                <div className="flex gap-4">
                  {['Instagram', 'Vimeo', 'LinkedIn'].map(social => (
                    <a key={social} href="#" className="text-white/60 hover:text-white transition-colors text-xs font-semibold tracking-widest uppercase">{social}</a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
