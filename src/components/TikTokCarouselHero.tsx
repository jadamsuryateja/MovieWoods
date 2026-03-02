import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCursor } from "@/context/CursorContext";
import { works } from "@/data/works";

// Adding some nice aesthetic colors to the first few projects for the background gradient feature
const projectColors = [
    "#ff1a1a", // Deep Red
    "#2a75bb", // Blue
    "#1a1a1a", // Dark/Neutral
    "#e67e22", // Orange
    "#f5f6fa"  // White/Silver
];

const CAROUSEL_ITEMS = works.slice(0, 5).map((project, index) => ({
    id: project.id,
    name: project.title,
    description: project.category + (project.client ? ` · ${project.client}` : ""),
    image: project.screenshots[0],
    color: projectColors[index] || "#1a1a1a"
}));

const TikTokCarouselHero = () => {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(2);
    const { setCursorType } = useCursor();

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                setActiveIndex((prev) => prev - 1);
            } else if (e.key === "ArrowRight") {
                setActiveIndex((prev) => prev + 1);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Auto-advance carousel
    useEffect(() => {
        const intervalId = setInterval(() => {
            setActiveIndex((prev) => prev + 1);
        }, 3000); // Rotate every 3 seconds

        return () => clearInterval(intervalId);
    }, []);

    const activeDataIndex = CAROUSEL_ITEMS.length > 0
        ? ((activeIndex % CAROUSEL_ITEMS.length) + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length
        : 0;

    const activeColor = CAROUSEL_ITEMS.length > 0 ? CAROUSEL_ITEMS[activeDataIndex].color : "#1a1a1a";

    return (
        <section className="relative w-full h-screen overflow-hidden bg-black pt-20">
            {/* Dynamic Fluid Background Gradients */}
            <div className="absolute inset-0 z-0 bg-black" />

            {/* Primary Fluid Blob */}
            <motion.div
                className="absolute inset[-50%] z-0 rounded-full blur-[120px] mix-blend-screen opacity-50"
                style={{ width: "80vw", height: "80vh", left: "10%", top: "10%" }}
                animate={{
                    backgroundColor: activeColor,
                    x: ["0%", "10%", "-5%", "0%"],
                    y: ["0%", "-10%", "10%", "0%"],
                    scale: [1, 1.1, 0.9, 1],
                }}
                transition={{
                    backgroundColor: { duration: 1.5, ease: "easeInOut" },
                    x: { duration: 15, repeat: Infinity, ease: "linear" },
                    y: { duration: 12, repeat: Infinity, ease: "linear" },
                    scale: { duration: 18, repeat: Infinity, ease: "linear" },
                }}
            />

            {/* Secondary Fluid Blob */}
            <motion.div
                className="absolute inset[-50%] z-0 rounded-full blur-[100px] mix-blend-screen opacity-30"
                style={{ width: "60vw", height: "60vh", right: "5%", bottom: "5%" }}
                animate={{
                    backgroundColor: activeColor,
                    x: ["0%", "-15%", "5%", "0%"],
                    y: ["0%", "15%", "-5%", "0%"],
                    scale: [1, 0.8, 1.2, 1],
                }}
                transition={{
                    backgroundColor: { duration: 1.5, ease: "easeInOut" },
                    x: { duration: 20, repeat: Infinity, ease: "linear" },
                    y: { duration: 18, repeat: Infinity, ease: "linear" },
                    scale: { duration: 25, repeat: Infinity, ease: "linear" },
                }}
            />



            {/* Section Header */}
            <div className="absolute top-32 left-8 md:top-40 md:left-24 z-30 flex flex-col pointer-events-none mix-blend-difference">
                <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold text-white mb-2">Portfolio</p>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">Featured Work</h2>
            </div>

            {/* Carousel Context */}
            <div className="absolute inset-x-0 bottom-[10vh] top-[32vh] z-20 flex items-center justify-center overflow-visible">
                <div className="relative w-full max-w-[1200px] h-full flex items-center justify-center perspective-[1200px]">
                    <AnimatePresence initial={false}>
                        {Array.from({ length: 7 }).map((_, loopIndex) => {
                            const i = activeIndex - 3 + loopIndex;
                            const distance = i - activeIndex;
                            const absDistance = Math.abs(distance);
                            const isActive = distance === 0;

                            const dataIndex = ((i % CAROUSEL_ITEMS.length) + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length;
                            const item = CAROUSEL_ITEMS[dataIndex];

                            // Calculate transforms for the curved TikTok style effect
                            const rotateZ = distance * 8;
                            const yOffset = absDistance * 40;
                            const xOffset = distance * 220;
                            const scale = 1 - (absDistance * 0.1);
                            const zIndex = 50 - absDistance;
                            const blur = absDistance > 0 ? "blur(4px)" : "blur(0px)";
                            const brightness = isActive ? "brightness(1)" : "brightness(0.4)";

                            return (
                                <motion.div
                                    key={i}
                                    className="absolute top-1/2 left-1/2 w-[280px] sm:w-[320px] aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer"
                                    style={{
                                        transformOrigin: "bottom center",
                                        zIndex,
                                        filter: `${blur} ${brightness}`
                                    }}
                                    initial={{ opacity: 0, scale: 0.5, x: `calc(-50% + ${xOffset}px)`, y: `calc(-50% + ${yOffset}px)` }}
                                    animate={{
                                        opacity: 1,
                                        x: `calc(-50% + ${xOffset}px)`,
                                        y: `calc(-50% + ${yOffset}px)`,
                                        rotateZ: rotateZ,
                                        scale: scale,
                                    }}
                                    exit={{ opacity: 0, scale: 0.5, x: `calc(-50% + ${xOffset}px)`, y: `calc(-50% + ${yOffset}px)` }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 25,
                                        mass: 0.8
                                    }}
                                    onClick={() => setActiveIndex(i)}
                                    onMouseEnter={() => setCursorType("hover")}
                                    onMouseLeave={() => setCursorType("default")}
                                >
                                    <div className="relative w-full h-full">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                        {/* Shadow overlay at bottom */}
                                        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                                        {/* Content */}
                                        <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-center text-center text-white pointer-events-none">
                                            <motion.h3
                                                className="text-2xl font-bold mb-2 tracking-tight"
                                                animate={{ opacity: isActive ? 1 : 0.4 }}
                                            >
                                                {item.name}
                                            </motion.h3>
                                            <motion.p
                                                className="text-xs text-white/70 mb-6 leading-relaxed hidden sm:block"
                                                animate={{ opacity: isActive ? 1 : 0, height: isActive ? "auto" : 0 }}
                                            >
                                                {item.description}
                                            </motion.p>

                                            <motion.button
                                                className="px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full pointer-events-auto hover:bg-white/90 transition-colors"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                animate={{
                                                    opacity: isActive ? 1 : 0,
                                                    y: isActive ? 0 : 20
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/contact`);
                                                }}
                                            >
                                                Know More
                                            </motion.button>
                                        </div>

                                        {/* Top small pill, purely decorative matching design */}
                                        <div className="absolute top-4 left-4 right-4 flex justify-between">
                                            <div className="w-16 h-1.5 bg-white/20 rounded-full backdrop-blur-md" />
                                            <div className="w-1.5 h-1.5 bg-white/50 rounded-full" />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>


        </section>
    );
};

export default TikTokCarouselHero;
