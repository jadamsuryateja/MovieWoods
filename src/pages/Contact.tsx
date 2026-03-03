import { useState } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import MagneticElement from "@/components/MagneticElement";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // placeholder
  };

  const inputClass =
    "w-full bg-transparent border-0 border-b border-muted-foreground/30 focus:border-foreground py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors duration-300";

  return (
    <PageTransition>
      <div className="pt-28 pb-20 px-6 md:px-16 min-h-screen">
        <h1 className="sr-only">Contact DreamsWood</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-6xl mx-auto">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-primary font-semibold mb-8">Get in Touch</p>

            <a
              href="mailto:hello@dreamswood.com"
              className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground hover:text-primary transition-colors duration-300 break-all leading-tight"
              data-cursor="VIEW"
            >
              hello@
              <br />
              dreamswood
              <br />
              .com
            </a>

            <div className="mt-12 space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-1">Address</p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Mahaveer Radiance, 1st floor
                  <br />
                  Opp: Metro Pillar number 1708 Madhapur,
                  <br />
                  Road No. 36, Jubilee Hills,
                  <br />
                  Telangana 500033
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <form onSubmit={handleSubmit} className="space-y-10">
              <div>
                <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground block mb-2">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your project"
                  rows={4}
                  className={`${inputClass} resize-none`}
                  required
                />
              </div>

              <MagneticElement strength={0.15}>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-10 py-4 bg-foreground text-background text-xs font-bold uppercase tracking-[0.3em] hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                  data-cursor="VIEW"
                >
                  Send Message
                </button>
              </MagneticElement>
            </form>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
