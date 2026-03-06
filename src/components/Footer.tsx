import { Mail, Facebook, Twitter, Instagram, ArrowUpRight } from "lucide-react";
import { useCursor } from "@/context/CursorContext";
import MagneticElement from "./MagneticElement";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61583643260393", label: "Facebook" },
  { icon: Twitter, href: "https://x.com/DreamswoodVfx", label: "Twitter" },
  { icon: Instagram, href: "https://www.instagram.com/dreamswoodvfx/", label: "Instagram" },
];

const pageLinks = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/work" },
  { name: "Services", href: "/#capabilities" },
  { name: "About", href: "/about" },
];

const Footer = () => {
  const { setCursorType } = useCursor();
  const footerRef = useRef<HTMLDivElement>(null);

  return (
    <footer ref={footerRef} id="footer" className="relative bg-black text-white overflow-hidden pt-32 pb-8 px-6 md:px-12 flex flex-col justify-between min-h-[80vh]">
      {/* Top CTA Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 md:mb-40 z-10 w-full max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-0"
        >
          <p className="text-xs uppercase tracking-[0.4em] font-bold text-primary mb-6">Got a project?</p>
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
            Let's <br /> Create.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <MagneticElement strength={0.2}>
            <a
              href="mailto:dreamswoodvfx@gmail.com"
              className="relative w-40 h-16 md:w-56 md:h-20 rounded-xl border border-white/30 text-white flex items-center justify-center gap-3 font-bold text-sm md:text-lg uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 overflow-hidden group"
              onMouseEnter={() => setCursorType("view")}
              onMouseLeave={() => setCursorType("default")}
            >
              <span className="relative z-10 group-hover:-translate-y-px transition-transform duration-500 delay-75">Connect</span>
              <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 z-10" />
            </a>
          </MagneticElement>
        </motion.div>
      </div>

      {/* Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 mb-24 z-10 w-full max-w-7xl mx-auto border-t border-white/20 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h4 className="text-white/40 uppercase tracking-widest text-xs font-bold mb-6">Studio</h4>
          <p className="text-sm font-mono leading-relaxed max-w-xs text-white/80">
            Mahaveer Radiance, Madhapur, Road No. 36, Jubilee Hills, Telangana 500033
          </p>
          <a href="mailto:dreamswoodvfx@gmail.com" className="inline-flex items-center gap-2 mt-6 mt-4 text-sm font-mono hover:text-primary transition-colors group">
            dreamswoodvfx@gmail.com
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h4 className="text-white/40 uppercase tracking-widest text-xs font-bold mb-6">Sitemap</h4>
          <div className="flex flex-col gap-4">
            {pageLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-2xl font-bold uppercase tracking-wide hover:text-primary hover:translate-x-4 transition-all duration-300 w-fit"
                onMouseEnter={() => setCursorType("hover")}
                onMouseLeave={() => setCursorType("default")}
                onClick={() => window.scrollTo(0, 0)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h4 className="text-white/40 uppercase tracking-widest text-xs font-bold mb-6">Social</h4>
          <div className="flex flex-col gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-sm font-mono uppercase tracking-widest hover:text-primary flex items-center gap-4 transition-colors w-fit group"
                onMouseEnter={() => setCursorType("hover")}
                onMouseLeave={() => setCursorType("default")}
              >
                <social.icon size={16} className="group-hover:-translate-y-1 group-hover:scale-110 transition-transform" />
                {social.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Big Typography Base */}
      <div className="w-full flex justify-center items-end pt-12 md:pt-24 mt-auto">
        <motion.h1
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[13vw] md:text-[14vw] font-black uppercase tracking-tighter leading-none text-white select-none relative z-0 pb-4"
        >
          DREAMSWOOD
        </motion.h1>
      </div>

      {/* Relative Bottom Copyright */}
      <div className="w-full pb-6 pt-4 z-10 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/40 font-mono uppercase tracking-widest gap-4 border-t border-white/10 mt-6 mx-auto">
        <p>Dreamswood Studios</p>
        <div className="flex gap-4">
          <p>----------------</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
