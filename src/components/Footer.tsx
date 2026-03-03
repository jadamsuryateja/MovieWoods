import { Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useCursor } from "@/context/CursorContext";

const socialLinks = [
  { icon: Mail, href: "mailto:hello@moviewoods.com", label: "Email" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

const Footer = () => {
  const { setCursorType } = useCursor();

  return (
    <footer id="footer" className="border-t border-black/5 mt-20 bg-muted/30">
      <div className="flex items-center justify-center gap-6 py-10">
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            aria-label={social.label}
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
            onMouseEnter={() => setCursorType("hover")}
            onMouseLeave={() => setCursorType("default")}
          >
            <social.icon size={18} strokeWidth={1.5} />
          </a>
        ))}
      </div>
      <div className="border-t border-black/5 px-6 py-8 text-center">
        <p className="text-[10px] text-muted-foreground leading-relaxed max-w-2xl mx-auto tracking-wider uppercase">
          Copyright 2024 — MovieWoods. All rights reserved.
          <br />
          No part of this website may be reproduced without permission.
          <br />
          <span className="inline-flex gap-3 mt-3">
            <a href="#" className="underline hover:text-foreground transition-colors">Terms and Conditions</a>
            <span>·</span>
            <a href="#" className="underline hover:text-foreground transition-colors">Privacy Policy</a>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
