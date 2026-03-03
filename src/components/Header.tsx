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
    closed: { y: 50, opacity: 0, transition: { duration: 0.2 } },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * 0.1 + 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    }),
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-[60] py-6 pointer-events-none mix-blend-difference text-white">
        <nav className="flex items-center justify-between px-6 md:px-12 pointer-events-auto">
          <Link
            to="/"
            className="text-xl md:text-2xl font-black tracking-tight uppercase relative z-[61]"
            onMouseEnter={() => setCursorType("hover")}
            onMouseLeave={() => setCursorType("default")}
          >
            MovieWoods<span className="text-primary">.</span>
          </Link>

          {/* Magnetic Floating Pill */}
          <div className="fixed top-6 right-6 md:top-8 md:right-12 z-[60] font-sans">
            <MagneticElement strength={0.4}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                onMouseEnter={() => setCursorType("hover")}
                onMouseLeave={() => setCursorType("default")}
                className="group relative flex items-center justify-center w-24 h-12 bg-white rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 pointer-events-auto"
                aria-label="Toggle menu"
              >
                <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1]" />
                <div className="relative z-10 flex flex-col items-center justify-center gap-[4px] w-full mix-blend-difference text-white">
                  <motion.div
                    animate={menuOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
                    className="w-8 h-[2px] bg-white origin-center"
                  />
                  <motion.div
                    animate={menuOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
                    className="w-8 h-[2px] bg-white origin-center"
                  />
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
            {/* Dynamic Background Videos */}
            <div className="absolute inset-0 z-0">
              <AnimatePresence>
                {hoveredLink && navLinks.find(l => l.label === hoveredLink)?.video && (
                  <motion.video
                    key={hoveredLink}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 0.3, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover grayscale brightness-50"
                    src={navLinks.find(l => l.label === hoveredLink)?.video}
                  />
                )}
              </AnimatePresence>
              {/* Fallback pattern if no hover */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900 to-black opacity-50" />
            </div>

            <div className="relative z-10 flex-1 flex flex-col justify-center px-10 md:px-24">
              <ul className="flex flex-col gap-4 md:gap-8">
                {navLinks.map((link, i) => (
                  <div key={link.label} className="overflow-hidden">
                    <motion.li
                      custom={i}
                      variants={linkVariants}
                      onHoverStart={() => setHoveredLink(link.label)}
                      onHoverEnd={() => setHoveredLink(null)}
                    >
                      <Link
                        to={link.path}
                        className="group inline-block text-5xl md:text-8xl lg:text-[7rem] font-black uppercase tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.3)] hover:[-webkit-text-stroke:1px_transparent] hover:text-white transition-all duration-500 pt-2"
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
                <a href="mailto:hello@moviewoods.com" className="text-white/60 hover:text-white transition-colors text-sm font-semibold tracking-wider block mb-2">HELLO@MOVIEWOODS.COM</a>
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
