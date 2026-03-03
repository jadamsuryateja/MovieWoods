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

  const capabilities = [
    {
      title: "Visual Effects",
      media: "/assets/capabilities/vfx.webp"
    },
    {
      title: "Color Grading",
      media: "/assets/capabilities/color.webp"
    },
    {
      title: "Motion Design",
      media: "/assets/capabilities/motion.webp"
    },
    {
      title: "Sound Design",
      media: "/assets/capabilities/sound.webp"
    },
  ];

  // Parallax for general page scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Horizontal Scroll effect
  const { scrollYProgress: horizontalScroll } = useScroll({
    target: horizontalRef,
  });
  const horizontalX = useTransform(horizontalScroll, [0, 1], ["0%", "-75%"]);

  return (
    <PageTransition>
      <div ref={containerRef} className="relative">
        <h1 className="sr-only">MovieWoods — Visual Effects & Post-Production Studio</h1>

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
                    <p className="text-xs uppercase tracking-[0.4em] font-bold text-primary mb-6">01. Conceptualize</p>
                    <h3 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8 text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.5)]">
                      Ideation <br />& Pre-viz
                    </h3>
                    <p className="text-muted text-sm max-w-md leading-relaxed">
                      Every great visual starts with a brilliant idea. We work closely with directors and agencies to block out scenes, define the color palette, and build robust pre-visualizations before a single frame is shot.
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
                    <p className="text-xs uppercase tracking-[0.4em] font-bold text-primary mb-6">02. Execution</p>
                    <h3 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
                      On-Set <br /><span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.5)]">Supervision</span>
                    </h3>
                    <p className="text-muted text-sm max-w-md leading-relaxed ml-auto">
                      Our VFX supervisors embed seamlessly with your production crew. We ensure that lighting matches our digital environments, tracking markers are perfectly placed, and the shoot runs flawlessly to minimize post-production headaches.
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
                    <p className="text-xs uppercase tracking-[0.4em] font-bold text-primary mb-6">03. Post</p>
                    <h3 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8 text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.5)]">
                      Visual <br /><span className="text-white [-webkit-text-stroke:0px] italic">Alchemy</span>
                    </h3>
                    <p className="text-muted text-sm max-w-md leading-relaxed">
                      This is where the magic happens. Compositing, 3D tracking, simulations, and matte painting. We blend the practical with the impossible, creating photorealistic worlds that serve the narrative.
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
                  <Link
                    to="/work"
                    className="group relative flex items-center justify-center w-32 h-32 border border-white/20 rounded-full hover:bg-white transition-colors duration-500 overflow-hidden"
                    onMouseEnter={() => setCursorType("hover")}
                    onMouseLeave={() => setCursorType("default")}
                  >
                    <span className="text-xs uppercase tracking-[0.2em] font-bold group-hover:text-black z-10 transition-colors duration-500">View Work</span>
                  </Link>
                </div>
              </div>

            </motion.div>
          </div>
        </section>


        {/* Magnetic Capabilities List */}
        <section id="capabilities" className="py-40 bg-background relative z-10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.4em] font-bold text-primary mb-24 block"
            >
              Our Capabilities
            </motion.p>

            <div className="flex flex-col border-t border-black/10 relative z-10 mix-blend-difference text-white">
              {capabilities.map((cap, i) => (
                <div
                  key={cap.title}
                  className="group py-8 md:py-12 border-b border-white/20 flex flex-col md:flex-row justify-between md:items-center relative"
                  onMouseEnter={() => {
                    setHoveredCapability(i);
                    setCursorType("view");
                  }}
                  onMouseLeave={() => {
                    setHoveredCapability(null);
                    setCursorType("default");
                  }}
                >
                  <MagneticElement strength={0.1}>
                    <h4 className="text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter transition-all duration-500 ease-[0.16, 1, 0.3, 1] group-hover:translate-x-8 group-hover:text-transparent group-hover:[-webkit-text-stroke:1px_white]">
                      {cap.title}
                    </h4>
                  </MagneticElement>
                  <span className="text-sm font-black uppercase tracking-[0.2em] mt-4 md:mt-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                    Explore
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Floating Media Tracker */}
          <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
            {capabilities.map((cap, i) => (
              <CapabilityMedia
                key={cap.title}
                cap={cap}
                index={i}
                hoveredCapability={hoveredCapability}
                mouseX={mouseX}
                mouseY={mouseY}
              />
            ))}
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
              The MovieWoods Ethos
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] uppercase tracking-tighter mb-16"
            >
              We believe in the power of <br /><span className="text-primary italic font-black">cinematic storytelling</span><br /> to transcend the ordinary.
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

const CapabilityMedia = ({ cap, index, hoveredCapability, mouseX, mouseY }: any) => {
  const xTransform = useTransform(mouseX, (x: number) => x - 200);
  const yTransform = useTransform(mouseY, (y: number) => y - 250);

  return (
    <motion.div
      className="absolute left-0 top-0 w-[400px] h-[500px] rounded-lg overflow-hidden mix-blend-luminosity"
      style={{
        x: xTransform,
        y: yTransform,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: hoveredCapability === index ? 1 : 0,
        scale: hoveredCapability === index ? 1 : 0.8,
        zIndex: hoveredCapability === index ? 10 : 0
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <img src={cap.media} alt={cap.title} className="w-full h-full object-cover" />
    </motion.div>
  );
};

export default Index;
