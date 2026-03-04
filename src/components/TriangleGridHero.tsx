import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useCursor } from "@/context/CursorContext";
import { Play, ArrowRight, ArrowUp, ArrowDown, Facebook, Instagram, Twitter } from "lucide-react";

// Triangle grid geometry via CSS vars for responsiveness

const getTriangleStyle = (col: number, row: number) => {
    const isUp = (col + row) % 2 === 0;
    // gap % logic to create true inner margins on the triangles instead of scaling
    // which caused unequal vertical/horizontal gaps
    const gap = 1.5;
    return {
        left: `calc((${col} * var(--tri-w)) / 2)`,
        top: `calc(${row} * var(--tri-h))`,
        width: `var(--tri-w)`,
        height: `var(--tri-h)`,
        clipPath: isUp
            ? `polygon(50% ${gap * 1.5}%, ${gap}% ${100 - gap}%, ${100 - gap}% ${100 - gap}%)`
            : `polygon(${gap}% ${gap}%, ${100 - gap}% ${gap}%, 50% ${100 - gap * 1.5}%)`,
        isUp
    };
};

const projectColors = [
    "#FFB3B3", // Soft Red
    "#B3D9FF", // Baby Blue
    "#B3FFD9", // Mint Green
    "#FFD9B3", // Peach/Orange
    "#E0B3FF", // Lavender
    "#FFF9B3", // Pale Yellow
    "#B3F0FF", // Sky Blue
    "#FFB3E6", // Rose Pink
    "#F2F2F2", // Soft Silver
    "#B3FFFF", // Pale Aqua
];

const activeCells = [
    // Top Row (Row 0)
    { col: 0, row: 0, img: "/assets/hero/contact.webp", color: projectColors[0] }, // Up
    { col: 1, row: 0, img: "/assets/hero/omega.webp", color: projectColors[1] }, // Down
    { col: 2, row: 0, img: "/assets/hero/inferno.webp", color: projectColors[2] }, // Up
    { col: 3, row: 0, img: "/assets/hero/titan.webp", color: projectColors[3] }, // Down

    // Middle Row (Row 1)
    { col: 0, row: 1, img: "/assets/hero/sands.webp", color: projectColors[4] }, // Down
    { col: 1, row: 1, img: "/assets/hero/neural.webp", color: projectColors[5] }, // Up
    { col: 2, row: 1, img: "/assets/hero/cortex.webp", color: projectColors[6] }, // Down
    { col: 3, row: 1, img: "/assets/hero/soul.webp", color: projectColors[7] }, // Up
    { col: 4, row: 1, img: "/assets/hero/tomorrow.webp", color: projectColors[8] }, // Down

    // Bottom Row (Row 2)
    { col: 0, row: 2, img: "/assets/hero/neon.webp", color: projectColors[9] }, // Up
    { col: 1, row: 2, img: "/assets/hero/contact.webp", color: projectColors[0] }, // Down
    { col: 2, row: 2, img: "/assets/hero/omega.webp", color: projectColors[1] }, // Up
    { col: 3, row: 2, img: "/assets/hero/inferno.webp", color: projectColors[2] }, // Down

    // Extra Rows for Mobile (Row 3, 4)
    { col: 0, row: 3, img: "/assets/hero/titan.webp", color: projectColors[3] }, // Down
    { col: 1, row: 3, img: "/assets/hero/sands.webp", color: projectColors[4] }, // Up
    { col: 2, row: 3, img: "/assets/hero/neural.webp", color: projectColors[5] }, // Down
    { col: 3, row: 3, img: "/assets/hero/cortex.webp", color: projectColors[6] }, // Up

    { col: 0, row: 4, img: "/assets/hero/soul.webp", color: projectColors[7] }, // Up
    { col: 1, row: 4, img: "/assets/hero/tomorrow.webp", color: projectColors[8] }, // Down
    { col: 2, row: 4, img: "/assets/hero/neon.webp", color: projectColors[9] }, // Up
    { col: 3, row: 4, img: "/assets/hero/omega.webp", color: projectColors[0] }, // Down
];

const TriangleGridHero = () => {
    const { setCursorType } = useCursor();
    const [colorIndex, setColorIndex] = useState(0);
    const [showColor, setShowColor] = useState(true);
    const activeColor = showColor ? projectColors[colorIndex] : "#000000";
    const [currentSlide, setCurrentSlide] = useState(0);
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
    const yTransform = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

    // Mobile Slideshow Logic
    const mobileImages = [
        "/assets/hero/sands.webp",
        "/assets/hero/neon.webp",
        "/assets/hero/titan.webp",
        "/assets/hero/omega.webp",
        "/assets/hero/contact.webp"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % mobileImages.length);
        }, 4000); // Change image every 4 seconds
        return () => clearInterval(interval);
    }, [mobileImages.length]);

    // Automatic Background Color Cycling Logic with Fade Sequence
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const startSequence = () => {
            // Step 1: Stay "On" for 5 seconds
            timeoutId = setTimeout(() => {
                // Step 2: Fade Out to Black
                setShowColor(false);

                // Wait for Fade Out (1.5s) + Black Delay (2s) = 3.5s
                timeoutId = setTimeout(() => {
                    // Step 3: Switch Color and Fade In
                    setColorIndex((prev) => (prev + 1) % projectColors.length);
                    setShowColor(true);

                    // Wait for Fade In (1.5s) before restarting the sequence
                    timeoutId = setTimeout(startSequence, 1500);
                }, 3500);
            }, 5000);
        };

        startSequence();
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);

    return (
        <section ref={containerRef} className="relative w-full min-h-screen overflow-hidden pt-0 m-0 bg-[#0a0a0a]">
            {/* Responsive Grid CSS Variables */}
            <style>{`
                .tri-grid {
                    --tri-w: 38vw;
                    --tri-h: 44vw;
                }
                @media (min-width: 768px) {
                    .tri-grid {
                        --tri-w: 16vw;
                        --tri-h: 18vw;
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

            {/* Desktop Triangles Grid Layer (Hidden on Mobile) */}
            <motion.div style={{ y: yTransform }} className="absolute inset-0 pointer-events-none z-10 hidden md:block">
                <div className="tri-grid relative w-full h-full transform translate-x-[-15vw] md:translate-x-[5vw] -translate-y-[5vw]">
                    {activeCells.map((cell, i) => {
                        const style = getTriangleStyle(cell.col, cell.row);
                        return (
                            <div
                                key={i}
                                className="absolute pointer-events-auto group"
                                style={{
                                    left: style.left,
                                    top: style.top,
                                    width: style.width,
                                    height: style.height,
                                    clipPath: style.clipPath,
                                    // rely purely on the clip-path gap logic for visually perfect gaps
                                    transform: "none",
                                }}
                                onMouseEnter={() => {
                                    setCursorType("hover");
                                }}
                                onMouseLeave={() => {
                                    setCursorType("default");
                                }}
                            >
                                <img
                                    src={cell.img}
                                    className="w-full h-full object-cover transition-transform duration-1000"
                                    alt=""
                                />
                                <div className="absolute inset-0 bg-black/10 transition-colors duration-500" />
                            </div>
                        )
                    })}
                </div>
            </motion.div>

            {/* Mobile Image Slideshow Layer (Hidden on Desktop) */}
            <div className="absolute inset-0 pointer-events-none z-10 block md:hidden bg-black">
                <AnimatePresence mode="popLayout">
                    <motion.img
                        key={currentSlide}
                        src={mobileImages[currentSlide]}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 0.6, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            opacity: { duration: 1.5, ease: "easeInOut" },
                            scale: { duration: 6, ease: "linear" }
                        }}
                        className="absolute inset-0 w-full h-full object-cover"
                        alt="Hero showcase"
                    />
                </AnimatePresence>
                {/* Dark gradient overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
            </div>

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


            {/* Bottom Left Corner text */}
            <div className="absolute bottom-12 left-12 z-20 flex-col items-start text-white pointer-events-auto hidden md:flex" style={{ filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.8))" }}>
                <Link to="/work" className="relative flex items-center gap-4 mb-4 cursor-pointer hover:opacity-80 transition-opacity">
                    <span className="absolute -left-12 top-0 text-white/50 text-xs font-mono tracking-widest rotate-[-90deg] origin-bottom-left" style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.8)" }}>PLAY</span>
                    <h3 className="text-xl font-bold tracking-wide" style={{ textShadow: "0px 2px 8px rgba(0,0,0,1)" }}>OUR WORKS</h3>
                    <ArrowRight className="w-4 h-4 text-cyan-400" />
                </Link>
                <p className="text-xs text-white/90 max-w-[250px] leading-relaxed font-mono uppercase tracking-widest font-bold" style={{ textShadow: "0px 2px 6px rgba(0,0,0,1)" }}>
                    Pushing the boundaries of visual effects and digital storytelling.
                </p>
            </div>

            {/* Bottom Right Socials */}
            <div className="absolute bottom-12 right-12 z-20 flex gap-8 text-white pointer-events-auto" style={{ filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.8))" }}>
                <Facebook className="w-5 h-5 cursor-pointer hover:text-white/70 transition-colors" />
                <Instagram className="w-5 h-5 cursor-pointer hover:text-white/70 transition-colors" />
                <Twitter className="w-5 h-5 cursor-pointer hover:text-white/70 transition-colors fill-current" />
            </div>
        </section >
    );
};

export default TriangleGridHero;
