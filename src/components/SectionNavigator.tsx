import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";

interface Section {
    id: string;
    label: string;
}

interface SectionNavigatorProps {
    sections: Section[];
}

const SectionNavigator: React.FC<SectionNavigatorProps> = ({ sections }) => {
    const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "");

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -70% 0px", // Adjust to trigger when section is in view
            threshold: 0,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [sections]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const currentIdx = sections.findIndex((s) => s.id === activeSection);

    const handlePrev = () => {
        if (currentIdx > 0) {
            scrollToSection(sections[currentIdx - 1].id);
        }
    };

    const handleNext = () => {
        if (currentIdx < sections.length - 1) {
            scrollToSection(sections[currentIdx + 1].id);
        }
    };

    return (
        <div className="fixed left-6 md:left-10 top-1/2 -translate-y-1/2 z-[100] hidden sm:flex flex-col items-center gap-6 text-white/50 mix-blend-difference pointer-events-none">
            <motion.button
                whileHover={{ scale: 1.2, color: "#fff" }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrev}
                disabled={currentIdx === 0}
                className={`p-1 transition-colors pointer-events-auto ${currentIdx === 0 ? "opacity-20 cursor-not-allowed" : "cursor-pointer hover:text-white"
                    }`}
            >
                <ArrowUp className="w-4 h-4" />
            </motion.button>

            <div className="flex flex-col items-center gap-4">
                {sections.map((section) => {
                    const isActive = activeSection === section.id;
                    return (
                        <motion.div
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className="relative cursor-pointer pointer-events-auto p-1 flex items-center justify-center"
                            onMouseEnter={() => { }}
                            whileHover={{ scale: 1.2 }}
                        >
                            {isActive ? (
                                <motion.div
                                    layoutId="activeDot"
                                    className="w-3 h-3 rounded-full border border-white"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            ) : (
                                <div className="w-1.5 h-1.5 rounded-full bg-white/40 hover:bg-white/80 transition-colors" />
                            )}

                            {/* Tooltip on hover could be cool, but keeping it minimal for now to match screenshot */}
                        </motion.div>
                    );
                })}
            </div>

            <motion.button
                whileHover={{ scale: 1.2, color: "#fff" }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                disabled={currentIdx === sections.length - 1}
                className={`p-1 transition-colors pointer-events-auto ${currentIdx === sections.length - 1 ? "opacity-20 cursor-not-allowed" : "cursor-pointer hover:text-white"
                    }`}
            >
                <ArrowDown className="w-4 h-4" />
            </motion.button>
        </div>
    );
};

export default SectionNavigator;
