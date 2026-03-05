import { useNavigate, useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { works, categories } from "@/data/works";
import PageTransition from "@/components/PageTransition";
import { useCursor } from "@/context/CursorContext";
import { useState } from "react";

const Work = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const { setCursorType } = useCursor();

    // Helper to slugify categories for URLs
    const slugify = (text: string) => text.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");
    const unslugify = (slug: string) => {
        const found = categories.find(cat => slugify(cat) === slug);
        return found || "All";
    };

    const currentFilter = category ? unslugify(category) : "All";

    const filteredWorks = currentFilter === "All"
        ? works
        : works.filter(w => w.category === currentFilter);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
        }
    };

    return (
        <PageTransition>
            <div className="min-h-screen bg-black pt-32 pb-24 px-6 md:px-12 lg:px-24">
                {/* Header Section */}
                <div className="max-w-7xl mx-auto mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-xs uppercase tracking-[0.4em] font-bold text-primary mb-6 text-center md:text-left">Selected Works</p>
                        <h1 className="text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none text-center md:text-left">
                            Cinematic <br /> <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.3)]">Visual</span> <br /> Alchemy
                        </h1>
                    </motion.div>
                </div>

                {/* Filters */}
                <div className="max-w-7xl mx-auto mb-12 flex flex-wrap justify-center md:justify-start gap-4 md:gap-8 overflow-x-auto pb-4 no-scrollbar">
                    {categories.map((cat) => {
                        const isSelected = currentFilter === cat;
                        const slug = slugify(cat);
                        const path = cat === "All" ? "/work" : `/work/category/${slug}`;

                        return (
                            <Link
                                key={cat}
                                to={path}
                                onMouseEnter={() => setCursorType("hover")}
                                onMouseLeave={() => setCursorType("default")}
                                className={`text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold transition-all duration-300 relative py-2 ${isSelected ? "text-white" : "text-white/40 hover:text-white/70"
                                    }`}
                            >
                                {cat}
                                {isSelected && (
                                    <motion.div
                                        layoutId="activeFilter"
                                        className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Works Grid */}
                <motion.div
                    key={currentFilter}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredWorks.map((work) => {
                            const [isHovered, setIsHovered] = useState(false);

                            return (
                                <motion.div
                                    key={work.id}
                                    layout
                                    variants={itemVariants}
                                    className="group relative aspect-[16/10] overflow-hidden rounded-sm bg-neutral-900"
                                    onMouseEnter={() => {
                                        setCursorType("hover");
                                        setIsHovered(true);
                                    }}
                                    onMouseLeave={() => {
                                        setCursorType("default");
                                        setIsHovered(false);
                                    }}
                                >
                                    <Link to={`/work/${work.id}`} className="block w-full h-full">
                                        {/* Media Container */}
                                        <div className="absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-105">
                                            {work.video ? (
                                                <video
                                                    src={work.video}
                                                    autoPlay
                                                    muted
                                                    loop
                                                    playsInline
                                                    className={`w-full h-full object-cover transition-all duration-700 ${isHovered
                                                        ? "grayscale-0 brightness-100"
                                                        : "grayscale brightness-50"
                                                        }`}
                                                />
                                            ) : work.screenshots && work.screenshots.length > 0 ? (
                                                <img
                                                    src={work.screenshots[0]}
                                                    alt={`${work.title} | ${work.category} Visual Effects Project by Dreamswood`}
                                                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-neutral-900 flex items-center justify-center p-12">
                                                    <div className="w-full h-full border border-white/5 flex items-center justify-center">
                                                        <span className="text-white/10 text-[10px] uppercase tracking-[0.4em] font-mono">No Preview</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                                        {/* Content */}
                                        <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end h-full">
                                            <div className="overflow-hidden translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                    {work.category}
                                                </p>
                                                <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
                                                    {work.title}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Corner Accent */}
                                        <div className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-0 group-hover:scale-100 transition-transform duration-500">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5 19L19 5M19 5H10M19 5V14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            </div>
        </PageTransition>
    );
};

export default Work;
