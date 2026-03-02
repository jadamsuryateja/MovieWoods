import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { works } from "@/data/works";
import { useCursor } from "@/context/CursorContext";
import { Play, ArrowRight, ArrowUp, ArrowDown, Facebook, Instagram, Twitter } from "lucide-react";

// Triangle grid geometry via CSS vars for responsiveness

const getTriangleStyle = (col: number, row: number) => {
    const isUp = (col + row) % 2 === 0;
    return {
        left: `calc((${col} * var(--tri-w)) / 2)`,
        top: `calc(${row} * var(--tri-h))`,
        width: `var(--tri-w)`,
        height: `var(--tri-h)`,
        clipPath: isUp
            ? "polygon(50% 0%, 0% 100%, 100% 100%)"
            : "polygon(0% 0%, 100% 0%, 50% 100%)",
        isUp
    };
};

const projectColors = [
    "#ff1a1a", // Deep Red
    "#2a75bb", // Blue
    "#1a1a1a", // Dark/Neutral
    "#e67e22", // Orange
    "#f5f6fa", // White/Silver
    "#8e44ad", // Purple
    "#27ae60", // Green
    "#f1c40f", // Yellow
    "#e74c3c", // Light Red
    "#34495e", // Dark Blue
];

const getImg = (pIdx: number, sIdx: number = 0) => {
    const project = works[pIdx] || works[0];
    return project.screenshots[sIdx] || project.screenshots[0] || "";
};
const activeCells = [
    // Top Row (Row 0)
    { col: 0, row: 0, img: getImg(1, 0), color: projectColors[0] }, // Up
    { col: 1, row: 0, img: getImg(2, 0), color: projectColors[1] }, // Down
    { col: 2, row: 0, img: getImg(3, 0), color: projectColors[2] }, // Up
    { col: 3, row: 0, img: getImg(4, 0), color: projectColors[3] }, // Down

    // Middle Row (Row 1)
    { col: 0, row: 1, img: getImg(5, 0), color: projectColors[4] }, // Down
    { col: 1, row: 1, img: getImg(6, 0), color: projectColors[5] }, // Up
    { col: 2, row: 1, img: getImg(7, 0), color: projectColors[6] }, // Down
    { col: 3, row: 1, img: getImg(8, 0), color: projectColors[7] }, // Up
    { col: 4, row: 1, img: getImg(9, 0), color: projectColors[8] }, // Down

    // Bottom Row (Row 2)
    { col: 0, row: 2, img: getImg(0, 1), color: projectColors[9] }, // Up
    { col: 1, row: 2, img: getImg(1, 1), color: projectColors[0] }, // Down
    { col: 2, row: 2, img: getImg(2, 1), color: projectColors[1] }, // Up
    { col: 3, row: 2, img: getImg(3, 1), color: projectColors[2] }, // Down

    // Extra Rows for Mobile (Row 3, 4)
    { col: 0, row: 3, img: getImg(4, 1), color: projectColors[3] }, // Down
    { col: 1, row: 3, img: getImg(5, 1), color: projectColors[4] }, // Up
    { col: 2, row: 3, img: getImg(6, 1), color: projectColors[5] }, // Down
    { col: 3, row: 3, img: getImg(7, 1), color: projectColors[6] }, // Up

    { col: 0, row: 4, img: getImg(8, 1), color: projectColors[7] }, // Up
    { col: 1, row: 4, img: getImg(9, 1), color: projectColors[8] }, // Down
    { col: 2, row: 4, img: getImg(0, 2), color: projectColors[9] }, // Up
    { col: 3, row: 4, img: getImg(2, 2), color: projectColors[0] }, // Down
];

const TriangleGridHero = () => {
    const { setCursorType } = useCursor();
    const [activeColor, setActiveColor] = useState("#111111");
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
    const yTransform = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

    return (
        <section ref={containerRef} className="relative w-full min-h-screen overflow-hidden pt-0 m-0 bg-[#0a0a0a]">
            {/* Responsive Grid CSS Variables */}
            <style>{`
                .tri-grid {
                    --tri-w: 48vw;
                    --tri-h: 55vw;
                }
                @media (min-width: 768px) {
                    .tri-grid {
                        --tri-w: 22vw;
                        --tri-h: 25vw;
                    }
                }
            `}</style>

            {/* Dynamic Fluid Background Gradients */}
            <div className="absolute inset-0 z-0 bg-black" />

            {/* Primary Fluid Blob */}
            <motion.div
                className="absolute inset[-50%] z-0 rounded-full blur-[120px] mix-blend-screen opacity-60"
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
                className="absolute inset[-50%] z-0 rounded-full blur-[100px] mix-blend-screen opacity-40"
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

            {/* Triangles Grid Layer */}
            <motion.div style={{ y: yTransform }} className="absolute inset-0 pointer-events-none z-10 block">
                <div className="tri-grid relative w-full h-full transform translate-x-[-15vw] md:translate-x-[5vw] -translate-y-[5vw]">
                    {activeCells.map((cell, i) => {
                        const style = getTriangleStyle(cell.col, cell.row);
                        return (
                            <div
                                key={i}
                                className="absolute pointer-events-auto transition-transform duration-700 hover:scale-95 group"
                                style={{
                                    left: style.left,
                                    top: style.top,
                                    width: style.width,
                                    height: style.height,
                                    clipPath: style.clipPath,
                                    // Gap configuration using transform logic
                                    transform: "scale(0.99)",
                                }}
                                onMouseEnter={() => {
                                    setCursorType("hover");
                                    setActiveColor(cell.color);
                                }}
                                onMouseLeave={() => {
                                    setCursorType("default");
                                    setActiveColor("#111111");
                                }}
                            >
                                <img
                                    src={cell.img}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    alt=""
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                            </div>
                        )
                    })}
                </div>
            </motion.div>

            {/* Text Layer (Foreground) */}
            <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center items-center md:items-end px-4 md:px-0 md:pr-16 lg:pr-24">
                <div className="flex flex-col items-center md:items-end w-full">
                    <p
                        className="tracking-[0.4em] font-bold text-[10px] md:text-sm uppercase mb-2 md:mb-4 text-center md:text-right text-white"
                        style={{
                            padding: "0.2em 0",
                            filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.8))"
                        }}
                    >
                        A Creative Community
                    </p>
                    <div className="relative flex items-center justify-center md:justify-end w-full">
                        <h1
                            className="text-[30vw] md:text-[25vw] font-black tracking-tighter leading-none pointer-events-auto text-white cursor-pointer"
                            style={{
                                margin: "-0.2em",
                                padding: "0.2em",
                                lineHeight: 1,
                                filter: "drop-shadow(0px 8px 16px rgba(0,0,0,0.6))"
                            }}
                            onMouseEnter={() => setCursorType("hover")}
                            onMouseLeave={() => setCursorType("default")}
                        >
                            DW
                        </h1>
                    </div>
                    {/* Subtitle underneath massive text */}
                    <p
                        className="tracking-[0.8em] font-bold text-[10px] md:text-xl uppercase mt-2 md:mt-4 text-center md:text-right text-white"
                        style={{
                            padding: "0.2em 0",
                            filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.8))"
                        }}
                    >
                        VFX STUDIO
                    </p>
                </div>
            </div>


            {/* Left Paginations/Bullets */}
            <div className="absolute left-10 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-6 text-white/50 mix-blend-difference">
                <ArrowUp className="w-4 h-4 cursor-pointer hover:text-white transition-colors pointer-events-auto" />
                <div className="w-2 h-2 rounded-full border border-white transition-colors cursor-pointer text-white"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-white/50 transition-colors cursor-pointer hover:bg-white pointer-events-auto"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-white/50 transition-colors cursor-pointer hover:bg-white pointer-events-auto"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-white/50 transition-colors cursor-pointer hover:bg-white pointer-events-auto"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-white/50 transition-colors cursor-pointer hover:bg-white pointer-events-auto"></div>
                <ArrowDown className="w-4 h-4 cursor-pointer hover:text-white transition-colors pointer-events-auto" />
            </div>

            {/* Bottom Left Corner text */}
            <div className="absolute bottom-12 left-12 z-20 flex-col items-start text-white pointer-events-auto hidden md:flex mix-blend-difference">
                <div className="relative flex items-center gap-4 mb-4 cursor-pointer hover:opacity-80 transition-opacity">
                    <span className="absolute -left-12 top-0 text-white/50 text-xs font-mono tracking-widest rotate-[-90deg] origin-bottom-left">PLAY</span>
                    <h3 className="text-xl font-bold tracking-wide">Our Showreel</h3>
                    <ArrowRight className="w-4 h-4 text-cyan-400" />
                </div>
                <p className="text-xs text-white/70 max-w-[250px] leading-relaxed font-mono uppercase tracking-widest">
                    Pushing the boundaries of visual effects and digital storytelling.
                </p>
            </div>

            {/* Bottom Right Socials */}
            <div className="absolute bottom-12 right-12 z-20 flex gap-8 text-white pointer-events-auto mix-blend-difference">
                <Facebook className="w-5 h-5 cursor-pointer hover:text-white/70 transition-colors" />
                <Instagram className="w-5 h-5 cursor-pointer hover:text-white/70 transition-colors" />
                <Twitter className="w-5 h-5 cursor-pointer hover:text-white/70 transition-colors fill-current" />
            </div>
        </section >
    );
};

export default TriangleGridHero;
