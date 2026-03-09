import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { works } from "@/data/works";
import PageTransition from "@/components/PageTransition";
import { useCursor } from "@/context/CursorContext";
import useSEO from "@/hooks/useSEO";
import { useEffect } from "react";
import FuturisticVideoPlayer from "@/components/FuturisticVideoPlayer";

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { setCursorType } = useCursor();
    const project = works.find((w) => w.id === id);

    useSEO({
        title: project ? `${project.title} - ${project.category} Portfolio` : "Project Not Found",
        description: project ? `Discover our award-winning ${project.category} work on ${project.title}. High-end visual effects and cinematic storytelling by Dreamswood Vfx.` : "The requested project could not be found in the Dreamswood Vfx portfolio.",
    });

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dreamswood.com/" },
            { "@type": "ListItem", "position": 2, "name": "Work", "item": "https://dreamswood.com/work" }
        ]
    };

    if (project) {
        breadcrumbSchema.itemListElement.push({
            "@type": "ListItem",
            "position": 3,
            "name": project.title,
            "item": `https://dreamswood.com/work/${project.id}`
        });
    }

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
            <script type="application/ld+json">
                {JSON.stringify(breadcrumbSchema)}
            </script>
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

                {/* Header Section (Landscape Only) */}
                {project.aspectRatio !== "portrait" && (
                    <div className="max-w-7xl mx-auto mb-16 md:mb-24 flex flex-col items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center"
                        >
                            <p className="text-xs uppercase tracking-[0.4em] font-bold text-primary mb-6">{project.category}</p>
                            <h1 className="text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none mb-12">
                                {project.title}
                            </h1>
                        </motion.div>
                    </div>
                )}

                {/* Content Layout: Responsive based on Aspect Ratio */}
                <div className={`max-w-7xl mx-auto ${project.aspectRatio === "portrait" ? "lg:grid lg:grid-cols-12 lg:gap-24" : "flex flex-col"}`}>

                    {/* Media Column (Left/Top) */}
                    <div className={`${project.aspectRatio === "portrait" ? "lg:col-span-7" : "w-full mb-24"}`}>
                        <div className={`w-full ${project.aspectRatio === "portrait" ? "aspect-[2/3] max-h-[90vh]" : "aspect-video"} bg-black rounded-sm overflow-hidden relative shadow-2xl group`}>
                            {project.video ? (
                                <FuturisticVideoPlayer src={project.video} title={project.title} objectFit={project.aspectRatio === "portrait" || project.aspectRatio === "original" ? "contain" : "cover"} />
                            ) : project.screenshots && project.screenshots.length > 0 ? (
                                <img
                                    src={project.screenshots[0]}
                                    className={`w-full h-full ${project.aspectRatio === "portrait" || project.aspectRatio === "original" ? "object-contain bg-black" : "object-cover"}`}
                                    alt={`${project.title} - ${project.category} Portfolio Piece by Dreamswood VFX`}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-white/10 text-xs uppercase tracking-widest font-mono">No Media Available</span>
                                </div>
                            )}
                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                        </div>
                    </div>

                    {/* Info Column (Right/Bottom) */}
                    <div className={`${project.aspectRatio === "portrait" ? "lg:col-span-5 pt-12 lg:pt-0" : "w-full"}`}>
                        {/* If portrait, show header here instead of top */}
                        {project.aspectRatio === "portrait" && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="mb-12"
                            >
                                <p className="text-xs uppercase tracking-[0.4em] font-bold text-primary mb-6">{project.category}</p>
                                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-12">
                                    {project.title}
                                </h1>
                            </motion.div>
                        )}

                        <div className="space-y-12">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-8">The Challenge</h2>
                                <p className="text-white/60 text-lg leading-relaxed mb-12">
                                    We collaborated closely to deliver high-end visual solutions for "{project.title}". Our team executed complex VFX sequences and color grading to ensure a cinematic experience that pushes the boundaries of digital production.
                                </p>
                            </div>

                            <div className="border-t border-white/10 pt-8">
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-2">Category</p>
                                    <p className="text-white font-bold">{project.category}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Images Grid */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                    {(project.video ? project.screenshots : project.screenshots.slice(1)).map((s, idx) => (
                        <motion.div
                            key={idx}
                            className={`bg-neutral-900 rounded-sm overflow-hidden ${project.aspectRatio === "portrait" ? "aspect-[2/3]" : "aspect-video"}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <img src={s} className={`w-full h-full ${project.aspectRatio === "portrait" || project.aspectRatio === "original" ? "object-contain bg-black" : "object-cover"} grayscale hover:grayscale-0 transition-all duration-700`} alt={`${project.title} Technical Showcase Detail - Image ${idx + 1}`} />
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
