import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import PageTransition from "@/components/PageTransition";
import { teamMembers } from "@/data/works";

const FadeSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <PageTransition>
      <h1 className="sr-only">About MovieWoods</h1>

      {/* Hero */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, y: heroY }}
        className="h-screen flex items-center justify-center px-6"
      >
        <div className="text-center max-w-3xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xs uppercase tracking-[0.4em] text-primary font-bold mb-6"
          >
            Est. 2008 — London
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.9]"
          >
            Crafting the
            <br />
            <span className="text-primary">impossible</span>
          </motion.h2>
        </div>
      </motion.section>

      {/* Story sections */}
      <section className="px-6 md:px-16 max-w-5xl mx-auto space-y-32 pb-20">
        <FadeSection>
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-4">Our Story</p>
          <h3 className="text-2xl md:text-4xl font-bold leading-snug mb-6">
            We are a team of artists, technicians, and storytellers who believe in the power of visual narrative.
          </h3>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl">
            Founded in 2008, MovieWoods has grown from a boutique VFX house to one of the most respected
            post-production studios in the world. We combine cutting-edge technology with artistic vision to
            deliver work that transcends expectations.
          </p>
        </FadeSection>

        <FadeSection>
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-4">Philosophy</p>
          <h3 className="text-2xl md:text-4xl font-bold leading-snug mb-6">
            Every frame is an opportunity. Every pixel, a decision.
          </h3>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl">
            We don't just execute briefs — we elevate them. Our multidisciplinary approach ensures that
            every project receives the full spectrum of our creative and technical expertise, from concept
            through final delivery.
          </p>
        </FadeSection>

        {/* Team */}
        <FadeSection>
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-4">The Team</p>
          <h3 className="text-2xl md:text-4xl font-bold leading-snug mb-12">Meet the people behind the pixels</h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group relative aspect-[3/4] bg-secondary overflow-hidden"
              >
                {/* B&W placeholder with initials */}
                <div className="absolute inset-0 flex items-center justify-center bg-secondary grayscale group-hover:grayscale-0 transition-all duration-700">
                  <span className="text-5xl md:text-6xl font-black text-muted-foreground/20 group-hover:text-primary/30 transition-colors duration-500 select-none">
                    {member.initials}
                  </span>
                </div>

                {/* Info overlay */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-background/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <p className="text-sm font-bold text-foreground">{member.name}</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeSection>
      </section>
    </PageTransition>
  );
};

export default About;
