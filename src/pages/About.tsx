import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useEffect } from "react";
import PageTransition from "@/components/PageTransition";
import { teamMembers } from "@/data/works";
import MagneticElement from "@/components/MagneticElement";
import { useCursor } from "@/context/CursorContext";
import useSEO from "@/hooks/useSEO";

const FadeSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const WordHighlight = ({ text }: { text: string }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = text.split(" ");
  return (
    <h3 ref={container} className="text-2xl md:text-5xl font-bold leading-[1.2] flex flex-wrap gap-x-[0.3em] gap-y-2">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return <HighlightWord key={i} range={[start, end]} progress={scrollYProgress}>{word}</HighlightWord>;
      })}
    </h3>
  );
};

const HighlightWord = ({ children, range, progress }: { children: React.ReactNode; range: [number, number]; progress: any }) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  return (
    <motion.span style={{ opacity }} className="text-white relative">
      {children}
    </motion.span>
  );
};

const About = () => {
  const { setCursorType } = useCursor();

  useSEO({
    title: "About Our Studio | Vision, Leadership & Philosophy",
    description: "Learn about Dreamswood Vfx's legacy of cinematic excellence, our leadership in VFX supervision, and our commitment to bringing imagination to life.",
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://dreamswood.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About",
        "item": "https://dreamswood.com/about"
      }
    ]
  };

  useEffect(() => {
    // Handle scroll to section if hash is present
    if (window.location.hash === "#services") {
      const element = document.getElementById("services");
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 500); // Small delay to wait for page transition
      }
    }
  }, []);
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Parallax typography scale and translate
  const scaleText = useTransform(scrollYProgress, [0, 0.3], [1, 1.5]);
  const rotateText = useTransform(scrollYProgress, [0, 0.3], [0, -5]);

  return (
    <PageTransition>
      <div ref={containerRef} className="relative bg-[#0a0a0a] text-white overflow-hidden">
        {/* Cinematic Grid Background */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
          }} />

        <h1 className="sr-only">About Dreamswood | Global Visual Effects & Animation Studio Leadership and Philosophy</h1>

        {/* --- Hero Section with Parallax Background Text --- */}
        <motion.section
          ref={heroRef}
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative h-[80vh] md:h-screen flex items-center justify-center px-6 overflow-hidden"
        >
          {/* Drifting Background Text */}
          <motion.div
            style={{ scale: scaleText, rotate: rotateText }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]"
          >
            <h2 className="text-[50vw] font-black uppercase tracking-tighter text-white leading-none">
              ABOUT
            </h2>
          </motion.div>

          <div className="text-center max-w-4xl relative z-10">
            <motion.p
              initial={{ opacity: 0, letterSpacing: "1em" }}
              animate={{ opacity: 1, letterSpacing: "0.4em" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10px] md:text-xs uppercase text-primary font-bold mb-8"
            >
              Beyond the frame
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-7xl lg:text-[7rem] font-black uppercase tracking-tighter leading-[0.85] mb-2"
              >
                DreamsWood
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-7xl lg:text-[7rem] font-black uppercase tracking-tighter leading-[0.85] italic text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.4)]"
              >
                VFX Studios
              </motion.h2>
            </div>
          </div>
        </motion.section>

        {/* --- Content Sections --- */}
        <div className="relative z-10 space-y-8 md:space-y-48 pb-20 md:pb-40">

          {/* Leadership Section - Redesigned Asymmetric */}
          <section className="px-6 md:px-24">
            <div className="max-w-7xl mx-auto">
              {teamMembers.map((member) => (
                <div key={member.name} className="relative w-full pt-10 md:pt-20">

                  {/* Background Accents */}
                  <div className="absolute top-0 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                  {/* Editorial Grid Layout */}
                  <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">

                    {/* Left Typography Block */}
                    <div className="lg:col-span-7 relative z-10 flex flex-col justify-center order-2 lg:order-1 mt-8 lg:mt-0">
                      <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-6">Leadership</p>

                      <motion.h3
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-7xl lg:text-[6rem] font-black uppercase tracking-tighter leading-[0.85] mb-6"
                      >
                        {member.name}
                      </motion.h3>

                      <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="text-lg md:text-2xl font-light italic text-white/50 mb-10 tracking-[0.1em]"
                      >
                        {member.role}
                      </motion.p>

                      <div className="space-y-6 text-white/60 text-sm font-mono uppercase tracking-widest leading-relaxed max-w-xl pl-4 border-l border-primary/30">
                        <p>{member.bio}</p>
                        <p>Extensive experience collaborating with global production teams, directors, and studios, ensuring creative vision is translated into technically flawless visuals while meeting tight deadlines and budgets.</p>
                      </div>

                      <div className="mt-12">
                        <MagneticElement strength={0.2}>
                          <button
                            onMouseEnter={() => setCursorType("hover")}
                            onMouseLeave={() => setCursorType("default")}
                            className="group inline-flex items-center gap-6"
                          >
                          </button>
                        </MagneticElement>
                      </div>
                    </div>

                    {/* Right Image Block - Smaller & Creative */}
                    <div className="lg:col-span-5 relative mt-12 lg:mt-0 flex lg:justify-end justify-center order-1 lg:order-2">

                      {/* Decorative Outline Frame */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1.2, delay: 0.2 }}
                        className="absolute -top-8 -right-8 md:-top-12 md:-right-12 w-[80%] aspect-[3/4] border border-white/10 z-0 hidden md:block"
                      />


                      {/* Main Image Container */}
                      <motion.div
                        initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
                        whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-[90vw] md:max-w-[400px] aspect-[4/5] overflow-hidden bg-black/10 z-10 shadow-2xl flex items-center justify-center p-2 md:p-4"
                      >
                        {member.image && (
                          <motion.img
                            src={member.image}
                            alt={`${member.name} | ${member.role} at Dreamswood VFX Studio`}
                            className="w-full h-full object-cover object-top transition-all duration-[2s] hover:scale-110 cursor-none"
                            onMouseEnter={() => setCursorType("view")}
                            onMouseLeave={() => setCursorType("default")}
                          />
                        )}
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      </motion.div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Story with Highlight Reveal */}
          <section className="px-6 md:px-24 py-16 md:py-32 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
              <img src="/assets/story-bg.webp" alt="Dreamswood Studio Story: A Legacy of Cinematic Visual Effects" className="w-full h-full object-cover grayscale" />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black" />
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
              <div className="lg:col-span-4">
                <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-8">Our Narrative</p>
                <div className="w-32 h-[1px] bg-primary/30 mb-8" />
              </div>
              <div className="lg:col-span-8">
                <WordHighlight text="DreamsWood VFX Studio is a dynamic Visual Effects and Post-Production Company that brings imagination to life on screen. The studio specializes in delivering high-quality visual effects for film, digital media, commercials, and streaming content." />

                <div className="mt-12 space-y-8">
                  <p className="text-white/60 text-sm md:text-base leading-relaxed font-mono uppercase tracking-widest">
                    With a strong focus on precision, creativity, and storytelling, Dreams Wood VFX transforms creative ideas into visually stunning cinematic experiences. At the heart of the studio is a team of skilled artists and technicians dedicated to excellence in every frame.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-sm overflow-hidden border border-white/5 aspect-video">
                      <img src="/assets/services-detail.webp" alt="Dreamswood VFX Production: Technical Scene Breakdown and Rendering" className="w-full h-full object-cover" />
                    </div>
                    <div className="rounded-sm overflow-hidden border border-white/5 aspect-video">
                      <img src="/assets/philosophy-bg.webp" alt="Advanced CGI Simulation: Fluid and Dynamics Artistry" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <p className="text-white/60 text-sm md:text-base leading-relaxed font-mono uppercase tracking-widest italic border-l-2 border-primary pl-6">
                    Driven by passion and technical expertise, Dreams Wood VFX Studio helps filmmakers, creators, and brands turn their visions into unforgettable on-screen moments.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Full-Width Core Services Section */}
          <section id="services" className="px-6 md:px-24 relative">
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <img src="/assets/services-detail.webp" alt="Dreamswood Core Services: Comprehensive VFX Pipeline Overview" className="w-full h-full object-cover mix-blend-screen" />
            </div>

            <div className="max-w-7xl mx-auto border-t border-white/5 pt-24 relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
                <div className="max-w-2xl">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-8">Technical Expertise</p>
                  <h4 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white leading-[0.85]">
                    Core <br /><span className="text-primary italic">Services</span>
                  </h4>
                </div>
                <div className="lg:max-w-xs text-left lg:text-right">
                  <p className="text-white/40 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] leading-relaxed">
                    A comprehensive suite of high-end VFX solutions, meticulously crafted to elevate every frame of your production.
                  </p>
                </div>
              </div>

              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-px bg-white/10 border border-white/10 overflow-hidden"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                  e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
                }}
              >
                {[
                  { title: "Match-Moving", desc: "Precision camera and object tracking for CG integration." },
                  { title: "Modeling", desc: "Detailed 3D assets and environment creation." },
                  { title: "Texturing", desc: "Realistic surfaces and materials." },
                  { title: "Look Dev", desc: "Defining visual response for digital elements." },
                  { title: "Rigging", desc: "Skeletal systems for fluid character motion." },
                  { title: "Animation", desc: "Bringing digital characters to life." },
                  { title: "FX Simulations", desc: "Fire, water, and particle effects." },
                  { title: "Lighting", desc: "Cinematic illumination and blending." },
                  { title: "Rendering", desc: "High-quality image generation." },
                  { title: "Rotoscoping", desc: "Precision isolation and masking." },
                  { title: "Paint", desc: "Clean-up and wire removal." },
                  { title: "Compositing", desc: "Final cinematic blend." },
                  { title: "Quality Control", desc: "Rigorous technical inspection." },
                  { title: "QC & Review", desc: "Creative vision alignment." },
                  { title: "Final Delivery", desc: "Industry-standard masters." }
                ].map((service, index) => (
                  <div
                    key={index}
                    className="group relative p-8 md:p-10 bg-[#070707] hover:bg-black transition-colors duration-500 overflow-hidden min-h-[220px] flex flex-col justify-between"
                  >
                    {/* Interactive Spotlight Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(184,153,92,0.12)_0%,transparent_60%)]" />
                    </div>

                    {/* Tech Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 pointer-events-none">
                      <img src="/assets/services-detail.webp" alt="Technical VFX Service: Industrial Standard Quality and Precision" className="w-full h-full object-cover scale-150" />
                    </div>

                    {/* Tech Corners */}
                    <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-4 right-4 w-[1px] h-2 bg-primary/40" />
                      <div className="absolute top-4 right-4 w-2 h-[1px] bg-primary/40" />
                    </div>

                    <div className="relative z-10">
                      <span className="text-[10px] font-mono text-primary/30 mb-6 block group-hover:text-primary transition-colors">
                        /{(index + 1).toString().padStart(2, '0')}
                      </span>

                      <h5 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tighter mb-4 group-hover:translate-x-2 transition-transform duration-500">
                        {service.title}
                      </h5>
                    </div>

                    <div className="relative z-10">
                      <p className="text-white/30 text-[10px] md:text-xs font-mono uppercase tracking-widest leading-relaxed group-hover:text-white/60 transition-colors duration-500">
                        {service.desc}
                      </p>
                    </div>

                    {/* Bottom accent */}
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5 group-hover:bg-primary/50 transition-colors duration-500" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Philosophy Section */}
          <section className="px-6 md:px-24 py-40 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <img src="/assets/philosophy-bg.webp" alt="Dreamswood Studio Philosophy: The Intersection of Art and VFX Technology" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
              <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-black to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black to-transparent" />
            </div>

            <div className="max-w-4xl text-center relative z-10">
              <div className="inline-block px-4 py-1 border border-primary/30 rounded-full mb-8">
                <p className="text-[8px] uppercase tracking-[0.4em] text-primary font-bold">Studio Philosophy</p>
              </div>
              <FadeSection>
                <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[1] mb-12">
                  Combining <span className="text-primary italic underline decoration-white/10 underline-offset-8">artistic</span> talent <br />with technology.
                </h3>
                <p className="text-white/40 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-mono uppercase tracking-widest bg-black/40 backdrop-blur-md p-6 border border-white/5 rounded-sm">
                  Beyond our core services, the studio also works on 3D modeling, animation, rendering, and high-end tracking to enhance storytelling for projects of all sizes.
                </p>
              </FadeSection>
            </div>
          </section>

          {/* Why Dreamswood Cards */}
          <section className="px-6 md:px-24 max-w-7xl mx-auto pb-40">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
              <div className="h-[1px] flex-1 bg-white/10" />
              <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold">Why Dreamswood Studios?</p>
              <div className="h-[1px] flex-1 bg-white/10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "High-Quality Output",
                  desc: "Dreamswood Studios consistently delivers premium visual quality while maintaining industry standards across all projects."
                },
                {
                  title: "On-Time Delivery",
                  desc: "Strong planning and an efficient production pipeline ensure projects are completed and delivered within committed timelines."
                },
                {
                  title: "Budget-Friendly",
                  desc: "The studio balances creativity and cost efficiency, providing high-quality results without exceeding budgets."
                }
              ].map((item, i) => (
                <FadeSection key={i} className="group relative p-8 md:p-12 bg-white/[0.02] border border-white/[0.05] hover:border-primary/50 transition-all duration-500 overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-500" />

                  {/* Subtle hover background image */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-1000">
                    <img src="/assets/services-detail.webp" alt="Why Dreamswood: High-Performance VFX Solutions and Reliable Delivery" className="w-full h-full object-cover grayscale" />
                  </div>

                  <h4 className="text-xl md:text-2xl font-bold mb-6 uppercase tracking-tighter group-hover:text-primary transition-colors relative z-10">
                    {item.title}
                  </h4>
                  <p className="text-white/50 text-xs md:text-sm leading-relaxed font-mono uppercase tracking-wider relative z-10">
                    {item.desc}
                  </p>
                  <div className="absolute -bottom-8 -right-8 text-white/[0.03] text-[10rem] font-black group-hover:text-white/[0.05] transition-colors pointer-events-none">
                    0{i + 1}
                  </div>
                </FadeSection>
              ))}
            </div>
          </section>

        </div>

        {/* Floating Decorative Typography */}
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "50%"]) }}
          className="fixed top-0 right-0 h-screen flex items-center z-[-1] opacity-[0.02] pointer-events-none"
        >
          <h4 className="text-[40vh] md:text-[80vh] font-black uppercase tracking-tighter rotate-90 origin-center text-white leading-none whitespace-nowrap">
            VFX STUDIO
          </h4>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default About;
