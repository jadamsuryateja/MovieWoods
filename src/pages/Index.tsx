import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import PageTransition from "@/components/PageTransition";
import TriangleGridHero from "@/components/TriangleGridHero";
import TikTokCarouselHero from "@/components/TikTokCarouselHero";
import MagneticElement from "@/components/MagneticElement";
import { useCursor } from "@/context/CursorContext";
import SectionNavigator from "@/components/SectionNavigator";

const sections = [
  { id: "hero", label: "Home" },
  { id: "portfolio", label: "Work" },
  { id: "process", label: "Process" },
  { id: "capabilities", label: "Services" },
  { id: "vision", label: "About" },
  { id: "footer", label: "Contact" },
];

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const { setCursorType } = useCursor();

  // Floating capabilities media tracker
  const [hoveredCapability, setHoveredCapability] = useState<number | null>(null);
  const mouseX = useSpring(0, { stiffness: 200, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Parallax for general page scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Horizontal Scroll effect for Process
  const { scrollYProgress: horizontalScroll } = useScroll({
    target: horizontalRef,
  });
  const horizontalX = useTransform(horizontalScroll, [0, 1], ["0%", "-75%"]);

  return (
    <PageTransition>
      <div ref={containerRef} className="relative">
        <h1 className="sr-only">DreamsWood VFX Studio — Visual Effects & Post-Production</h1>

        <SectionNavigator sections={sections} />

        {/* New Triangle Grid Hero Section */}
        <div id="hero">
          <TriangleGridHero />
        </div>

        {/* TikTok Style Carousel Section (Moved down) */}
        <div id="portfolio">
          <TikTokCarouselHero />
        </div>

        {/* Horizontal Scroll Gallery (The Process) */}
        <section id="process" ref={horizontalRef} className="relative h-[400vh] bg-foreground text-background">
          <div className="sticky top-0 h-screen overflow-hidden flex items-center">

            {/* Background Marquee for texture */}
            <motion.div
              style={{ x: useTransform(horizontalScroll, [0, 1], ["0%", "20%"]) }}
              className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap opacity-[0.03] select-none pointer-events-none flex z-0"
            >
              <span className="text-[30vw] font-black uppercase tracking-tighter shrink-0 pr-8">THE PROCESS • THE CRAFT • </span>
              <span className="text-[30vw] font-black uppercase tracking-tighter shrink-0 pr-8">THE PROCESS • THE CRAFT • </span>
            </motion.div>

            <motion.div
              style={{ x: horizontalX }}
              className="flex w-[400vw] h-full relative z-10"
            >

              {/* Panel 1 */}
              <div className="w-[100vw] h-full flex items-center justify-center p-12 md:p-24 relative overflow-hidden">
                <div className="w-full max-w-5xl flex gap-12 items-center">
                  <div className="flex-1 z-10">
                    <p className="text-xs uppercase tracking-[0.4em] font-bold text-primary mb-6">01. Pre-Production (VFX)</p>
                    <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8 text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.5)]">
                      Planning & <br />Setup
                    </h3>
                    <p className="text-muted text-sm max-w-md leading-relaxed">
                      Pre-production is the planning phase where all creative, technical, and logistical decisions are finalized. We analyze scripts, develop concepts, and plan complex shots to ensure clear communication and reduce risks before shooting begins.
                    </p>
                  </div>
                  <motion.div
                    style={{ y: useTransform(horizontalScroll, [0, 0.25], [100, -100]) }}
                    className="flex-1 h-[60vh] relative hidden md:block"
                  >
                    <img src="/assets/process/conceptualize.webp" className="w-full h-full object-cover grayscale brightness-75 rounded-sm" alt="Pre-viz" />
                  </motion.div>
                </div>
              </div>

              {/* Panel 2 */}
              <div className="w-[100vw] h-full flex items-center justify-center p-12 md:p-24 relative overflow-hidden">
                <div className="w-full max-w-5xl flex gap-12 items-center flex-row-reverse">
                  <div className="flex-1 z-10 text-right">
                    <p className="text-xs uppercase tracking-[0.4em] font-bold text-primary mb-6">02. Production</p>
                    <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8">
                      Data <br /><span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.5)]">Capture</span>
                    </h3>
                    <p className="text-muted text-sm max-w-md leading-relaxed ml-auto">
                      Our on-site team ensures all required visual data is captured to support seamless VFX integration. We supervise green screen setups, accurately place tracking markers, and collect lighting references, HDRI, and camera data for flawless post-production.
                    </p>
                  </div>
                  <motion.div
                    style={{ y: useTransform(horizontalScroll, [0.15, 0.5], [-100, 100]) }}
                    className="flex-1 h-[50vh] relative hidden md:block"
                  >
                    <img src="/assets/process/execution.webp" className="w-full h-full object-cover grayscale brightness-75 rounded-sm" alt="On Set" />
                  </motion.div>
                </div>
              </div>

              {/* Panel 3 */}
              <div className="w-[100vw] h-full flex items-center justify-center p-12 md:p-24 relative overflow-hidden">
                <div className="w-full max-w-5xl flex gap-12 items-center">
                  <div className="flex-1 z-10">
                    <p className="text-xs uppercase tracking-[0.4em] font-bold text-primary mb-6">03. Post-Production</p>
                    <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8 text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.5)]">
                      Core <br /><span className="text-white [-webkit-text-stroke:0px] italic">VFX Work</span>
                    </h3>
                    <p className="text-muted text-sm max-w-md leading-relaxed">
                      This is the core phase of the pipeline. From Rotoscoping, Paint, and Match-Moving to Lighting, Rendering, and Compositing, we transform captured footage and blend live-action with digital elements to create cohesive, emotionally engaging visuals.
                    </p>
                  </div>
                  <motion.div
                    style={{ y: useTransform(horizontalScroll, [0.4, 0.75], [100, -100]) }}
                    className="flex-1 h-[60vh] relative hidden md:block"
                  >
                    <video autoPlay loop muted playsInline src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" className="w-full h-full object-cover grayscale brightness-75 rounded-sm" />
                  </motion.div>
                </div>
              </div>

              {/* Panel 4 */}
              <div className="w-[100vw] h-full flex items-center justify-center p-12 md:p-24 relative overflow-hidden">
                <div className="w-full max-w-5xl flex flex-col items-center text-center">
                  <p className="text-xs uppercase tracking-[0.4em] font-bold text-primary mb-6">04. Delivery</p>
                  <h3 className="text-5xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-12">
                    The Final <br /><span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.5)]">Master</span>
                  </h3>
                  <MagneticElement strength={0.1}>
                    <Link
                      to="/work"
                      className="group relative flex items-center justify-center px-12 py-5 bg-transparent border border-white/20 hover:border-primary transition-all duration-500 overflow-hidden"
                      onMouseEnter={() => setCursorType("hover")}
                      onMouseLeave={() => setCursorType("default")}
                    >
                      <span className="text-xs md:text-sm uppercase tracking-[0.3em] font-bold text-background group-hover:text-white z-10 transition-colors duration-500 mix-blend-difference">
                        VIEW WORKS
                      </span>

                      {/* Hover UI accent */}
                      <div className="absolute inset-0 bg-primary/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]" />
                      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 delay-100" />
                    </Link>
                  </MagneticElement>
                </div>
              </div>

            </motion.div>
          </div>
        </section>


        {/* Why Dreamswood Studios Section */}
        <section id="why-us" className="py-24 md:py-40 bg-black text-white overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-24 md:mb-32"
            >
              <p className="text-xs uppercase tracking-[0.4em] font-bold text-primary mb-6">The Studio Advantage</p>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter">
                Why Dreamswood<br />
                <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.5)]">Studios?</span>
              </h2>
            </motion.div>

            <div className="flex flex-col gap-24 md:gap-40">
              {/* Point 1: High Quality Output */}
              <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 group">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full md:w-1/2 relative h-[300px] md:h-[600px] overflow-hidden rounded-sm"
                >
                  <img src="/assets/capabilities/vfx.webp" alt="High Quality Output" className="absolute inset-0 w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="w-full md:w-1/2"
                >
                  <p className="text-9xl font-black text-white/5 absolute -translate-y-1/2 -ml-12 pointer-events-none select-none">01</p>
                  <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight relative z-10">High-Quality Output</h3>
                  <p className="text-lg text-white/70 leading-relaxed font-light relative z-10">
                    Dreamswood Studios consistently delivers premium visual quality while maintaining industry standards across all projects.
                  </p>
                </motion.div>
              </div>

              {/* Point 2: On-Time Delivery (Reversed) */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24 group">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full md:w-1/2 relative h-[300px] md:h-[600px] overflow-hidden rounded-sm"
                >
                  <img src="/assets/capabilities/color.webp" alt="On Time Delivery" className="absolute inset-0 w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="w-full md:w-1/2 md:text-right"
                >
                  <p className="text-9xl font-black text-white/5 absolute -translate-y-1/2 md:right-0 md:-mr-12 pointer-events-none select-none">02</p>
                  <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight relative z-10">On-Time Delivery</h3>
                  <p className="text-lg text-white/70 leading-relaxed font-light relative z-10 md:ml-auto max-w-xl">
                    Strong planning and an efficient production pipeline ensure projects are completed and delivered within committed timelines.
                  </p>
                </motion.div>
              </div>

              {/* Point 3: Budget Friendly */}
              <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 group">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full md:w-1/2 relative h-[300px] md:h-[600px] overflow-hidden rounded-sm"
                >
                  <img src="/assets/capabilities/motion.webp" alt="Budget Friendly" className="absolute inset-0 w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="w-full md:w-1/2"
                >
                  <p className="text-9xl font-black text-white/5 absolute -translate-y-1/2 -ml-12 pointer-events-none select-none">03</p>
                  <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight relative z-10">Budget-Friendly Approach</h3>
                  <p className="text-lg text-white/70 leading-relaxed font-light relative z-10">
                    The studio balances creativity and cost efficiency, providing high-quality results without exceeding budgets.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Studio Vision Section */}
        <section id="vision" className="py-40 bg-foreground text-background overflow-hidden relative">
          <motion.div
            style={{ x: useTransform(scrollYProgress, [0.6, 1], ["0%", "-50%"]) }}
            className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap opacity-[0.03] select-none pointer-events-none flex"
          >
            <span className="text-[20vw] font-black uppercase tracking-tighter shrink-0 pr-8">Creative Direction • Production • Visual Effects • </span>
            <span className="text-[20vw] font-black uppercase tracking-tighter shrink-0 pr-8">Creative Direction • Production • Visual Effects • </span>
          </motion.div>

          <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs uppercase tracking-[0.5em] font-black text-primary mb-12 inline-block px-4 py-2 border border-primary/20 rounded-full"
            >
              DreamsWood VFX Studio
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl md:text-4xl lg:text-5xl font-bold leading-[1.3] tracking-tighter mb-16 max-w-4xl mx-auto"
            >
              A dynamic Visual Effects and Post-Production Company that brings <span className="text-primary italic font-black">imagination</span> to life on screen.
            </motion.h3>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-[1px] bg-primary/30 mx-auto max-w-sm mb-16"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link
                to="/about"
                className="inline-flex items-center gap-6 group"
                onMouseEnter={() => setCursorType("hover")}
                onMouseLeave={() => setCursorType("default")}
              >
                <span className="text-xs uppercase tracking-[0.4em] font-bold">Discover Our Story</span>
                <div className="w-16 h-16 rounded-full border border-background/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500 overflow-hidden relative">
                  <div className="absolute inset-0 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1] bg-white mix-blend-difference" />
                  <ArrowLeft size={24} className="rotate-180 relative z-10 mix-blend-difference" />
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      </div >
    </PageTransition >
  );
};

const ArrowLeft = ({ size, className, style }: { size?: number, className?: string, style?: any }) => (
  <svg
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
  >
    <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
  </svg>
);

export default Index;
