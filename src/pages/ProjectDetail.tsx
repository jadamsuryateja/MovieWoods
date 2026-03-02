import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { works } from "@/data/works";
import PageTransition from "@/components/PageTransition";
import { useCursor } from "@/context/CursorContext";
import { useEffect } from "react";

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { setCursorType } = useCursor();
    const project = works.find((w) => w.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!project) {
        return (
            <div className="h-screen flex items-center justify-center bg-black">
                <h1 className="text-white text-2xl uppercase tracking-widest font-black">Project Not Found</h1>
                <Link to="/work" className="mt-8 text-primary hover:text-white transition-colors uppercase tracking-[0.2em] font-bold text-xs">Back to Works</Link>
            </div>
        );
    }

    return (
        <PageTransition>
            <div className="min-h-screen bg-black pt-32 pb-24 px-6 md:px-12 lg:px-24">
                {/* Back Button */}
                <div className="max-w-7xl mx-auto mb-16 md:mb-24">
                    <Link
                        to="/work"
                        className="group flex items-center gap-4 text-xs uppercase tracking-[0.3em] font-bold text-white/40 hover:text-white transition-colors"
                        onMouseEnter={() => setCursorType("hover")}
                        onMouseLeave={() => setCursorType("default")}
                    >
                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                        </div>
                        Back to Works
                    </Link>
                </div>

                {/* Header Section */}
                <div className="max-w-7xl mx-auto mb-16 md:mb-24 flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <p className="text-xs uppercase tracking-[0.4em] font-bold text-primary mb-6">{project.category} {project.client ? `· ${project.client}` : ""}</p>
                        <h1 className="text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none mb-12">
                            {project.title}
                        </h1>
                    </motion.div>
                </div>

                {/* Main Video/Hero */}
                <div className="max-w-[1400px] mx-auto mb-24 aspect-video bg-neutral-900 rounded-sm overflow-hidden relative shadow-2xl">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        src={project.video}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                </div>

                {/* Info Grid */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
                    <div className="md:col-span-8">
                        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-8">The Challenge</h2>
                        <p className="text-white/60 text-lg leading-relaxed max-w-2xl mb-12">
                            We collaborated closely with {project.client || "the client"} to deliver high-end visual solutions for "{project.title}". Our team executed complex VFX sequences and color grading to ensure a cinematic experience that pushes the boundaries of digital production.
                        </p>
                    </div>

                    <div className="md:col-span-4 border-l border-white/10 pl-8">
                        <div className="mb-8">
                            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-2">Category</p>
                            <p className="text-white font-bold">{project.category}</p>
                        </div>
                        <div className="mb-8">
                            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-2">Client</p>
                            <p className="text-white font-bold">{project.client || "Various"}</p>
                        </div>
                        <div className="mb-8">
                            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-2">Year</p>
                            <p className="text-white font-bold">2024</p>
                        </div>
                    </div>
                </div>

                {/* Images Grid */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                    {project.screenshots.map((s, idx) => (
                        <motion.div
                            key={idx}
                            className="aspect-video bg-neutral-900 rounded-sm overflow-hidden"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <img src={s} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="" />
                        </motion.div>
                    ))}
                </div>

                {/* Footer CTA */}
                <div className="max-w-7xl mx-auto flex flex-col items-center pt-24 border-t border-white/10">
                    <p className="text-xs uppercase tracking-[0.3em] font-bold text-white/40 mb-8">Next Project</p>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        onMouseEnter={() => setCursorType("hover")}
                        onMouseLeave={() => setCursorType("default")}
                    >
                        <button
                            onClick={() => {
                                const currentIndex = works.indexOf(project);
                                const next = works[(currentIndex + 1) % works.length];
                                navigate(`/work/${next.id}`);
                            }}
                            className="text-4xl md:text-7xl font-black uppercase tracking-tighter hover:text-primary transition-colors"
                        >
                            Next Experience
                        </button>
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    );
};

export default ProjectDetail;
