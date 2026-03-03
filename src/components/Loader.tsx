import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const loaderImages = [
    "/assets/loader/neon.webp",
    "/assets/loader/contact.webp",
    "/assets/loader/omega.webp",
    "/assets/loader/inferno.webp",
    "/assets/loader/titan.webp",
    "/assets/loader/sands.webp",
    "/assets/loader/neural.webp",
    "/assets/loader/cortex.webp",
    "/assets/loader/soul.webp",
    "/assets/loader/tomorrow.webp",
];

interface LoaderProps {
    onComplete: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
    const [phase, setPhase] = useState<"dw" | "moviewoods" | "grid">("dw");
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // 1. DW minimizes, MOVIEWOODS expands
        const timer1 = setTimeout(() => {
            setPhase("moviewoods");
        }, 800); // Wait 0.8s on just "DW"

        // 2. The background image grid fades in
        const timer2 = setTimeout(() => {
            setPhase("grid");
        }, 2000);

        // 3. The grids unzip and loader unmounts
        const timer3 = setTimeout(() => {
            setIsVisible(false);
        }, 3000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    const cells = [];
    // Generate enough rows and cols to cover large desktop screens and tall mobile screens
    for (let row = -4; row < 4; row++) {
        for (let col = -4; col < 12; col++) {
            cells.push({ col, row });
        }
    }

    const topCells = cells.filter(c => c.row < 0);
    const bottomCells = cells.filter(c => c.row >= 0);

    const renderCell = (cell: { col: number, row: number }, i: number) => {
        const isUp = (cell.col + cell.row) % 2 === 0;
        const imgSrc = loaderImages[i % loaderImages.length];

        // Calculate a staggered delay based on distance from the center column
        // The center is roughly col 4 (grid goes from -4 to 12)
        const distanceFromCenter = Math.abs(cell.col - 4) + Math.abs(cell.row);
        const staggerDelay = distanceFromCenter * 0.05;

        return (
            <motion.div
                key={`${cell.col}-${cell.row}`}
                className="absolute pointer-events-none"
                style={{
                    left: `calc((${cell.col} * var(--tri-w)) / 2)`,
                    top: `calc(${cell.row} * var(--tri-h))`,
                    width: `calc(var(--tri-w) + 1px)`, // Fix sub-pixel rendering gaps
                    height: `calc(var(--tri-h) + 1px)`,
                    clipPath: isUp ? "polygon(50% 0%, 0% 100%, 100% 100%)" : "polygon(0% 0%, 100% 0%, 50% 100%)",
                }}
                exit={{
                    // Zig-zag: "up" pointing triangles fly down, "down" pointing triangles fly up
                    y: isUp ? "150vh" : "-150vh",
                    opacity: 0,
                    scale: 0.8,
                    rotate: isUp ? 15 : -15
                }}
                transition={{
                    duration: 1.2,
                    ease: [0.76, 0, 0.24, 1],
                    delay: staggerDelay
                }}
            >
                <img src={imgSrc} className="w-full h-full object-cover brightness-[0.4]" alt="" />
                <div className="absolute inset-0 bg-[#0a0a0a]/20" /> {/* Subtle tint */}
            </motion.div>
        );
    };

    return (
        <AnimatePresence onExitComplete={onComplete}>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 1 }} // Keep visible during children's exit animations
                    className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden bg-black"
                >
                    <style>{`
                        .loader-grid {
                            --tri-w: 48vw;
                            --tri-h: 55vw;
                        }
                        @media (min-width: 768px) {
                            .loader-grid {
                                --tri-w: 22vw;
                                --tri-h: 25vw;
                            }
                        }
                    `}</style>

                    {/* GRID CONTAINER - Only reveals during "grid" phase */}
                    <motion.div
                        className="absolute inset-x-0 top-1/2 loader-grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: phase === "grid" ? 1 : 0 }}
                        transition={{ duration: 0.5, ease: "linear" }}
                    >
                        {cells.map((c, i) => renderCell(c, i))}
                    </motion.div>

                    {/* Centered Typography */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center z-10"
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{ duration: 0.5, ease: "easeIn" }}
                    >
                        <div className="relative flex items-center justify-center w-full h-[40vh] overflow-hidden">
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                initial={false}
                                animate={
                                    phase === "dw"
                                        ? { opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }
                                        : { opacity: 0, scale: 0.4, x: -100, filter: "blur(10px)" }
                                }
                                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                            >
                                <h1 className="text-[30vw] md:text-[20vw] font-black tracking-tighter leading-none text-white drop-shadow-2xl">
                                    DW
                                </h1>
                            </motion.div>

                            <motion.div
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                initial={false}
                                animate={
                                    phase === "dw"
                                        ? { opacity: 0, scale: 0.8, x: 100, filter: "blur(10px)" }
                                        : { opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }
                                }
                                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                            >
                                <h1 className="text-[12vw] md:text-[8vw] font-black tracking-tighter leading-none text-white whitespace-nowrap drop-shadow-2xl">
                                    MOVIEWOODS
                                </h1>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Loader;
