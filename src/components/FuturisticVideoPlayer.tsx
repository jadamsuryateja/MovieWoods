import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize, Activity, Cpu, Wifi, Target, Info } from "lucide-react";

interface FuturisticVideoPlayerProps {
    src: string;
    title: string;
    objectFit?: "cover" | "contain";
}

const FuturisticVideoPlayer = ({ src, title, objectFit = "cover" }: FuturisticVideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const volumeRef = useRef<HTMLDivElement>(null);
    const [playing, setPlaying] = useState(true);
    const [muted, setMuted] = useState(true);
    const [volume, setVolume] = useState(0.7);
    const [progress, setProgress] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const [currentTime, setCurrentTime] = useState("00:00:00:00");
    const [duration, setDuration] = useState("00:00:00:00");

    const formatTechnicalTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        const f = Math.floor((seconds % 1) * 24); // Assuming 24fps for cinematic feel
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}:${f.toString().padStart(2, '0')}`;
    };

    const togglePlay = useCallback(() => {
        if (!videoRef.current) return;
        if (playing) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setPlaying(!playing);
    }, [playing]);

    const toggleMute = () => {
        if (!videoRef.current) return;
        videoRef.current.muted = !muted;
        setMuted(!muted);
    };

    const handleVolumeChange = (e: React.MouseEvent) => {
        if (!volumeRef.current || !videoRef.current) return;
        const rect = volumeRef.current.getBoundingClientRect();
        const newVolume = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        videoRef.current.volume = newVolume;
        setVolume(newVolume);
        if (newVolume > 0) {
            videoRef.current.muted = false;
            setMuted(false);
        } else {
            videoRef.current.muted = true;
            setMuted(true);
        }
    };

    const toggleFullscreen = () => {
        if (videoRef.current?.requestFullscreen) {
            videoRef.current.requestFullscreen();
        }
    };

    const handleProgressClick = (e: React.MouseEvent) => {
        if (!progressRef.current || !videoRef.current) return;
        const rect = progressRef.current.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        videoRef.current.currentTime = pct * videoRef.current.duration;
    };

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;

        const update = () => {
            setProgress((v.currentTime / v.duration) * 100 || 0);
            setCurrentTime(formatTechnicalTime(v.currentTime));
            if (v.duration) setDuration(formatTechnicalTime(v.duration));
        };

        v.addEventListener("timeupdate", update);
        v.addEventListener("loadedmetadata", update);
        return () => {
            v.removeEventListener("timeupdate", update);
            v.removeEventListener("loadedmetadata", update);
        };
    }, []);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        if (playing) {
            timeout = setTimeout(() => setShowControls(false), 3000);
        } else {
            setShowControls(true);
        }
        return () => clearTimeout(timeout);
    }, [playing]);

    return (
        <div
            className="relative group bg-black aspect-video w-full overflow-hidden border border-white/10 shadow-2xl"
            onMouseMove={() => setShowControls(true)}
            onMouseLeave={() => playing && setShowControls(false)}
        >
            <video
                ref={videoRef}
                src={src}
                className={`w-full h-full ${objectFit === "contain" ? "object-contain" : "object-cover"}`}
                playsInline
                autoPlay
                muted
                loop={!playing}
                onClick={togglePlay}
            />

            {/* --- HUD OVERLAY --- */}
            <div className="absolute inset-0 pointer-events-none z-10">
                {/* Corner Brackets */}
                <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-primary/40" />
                <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-primary/40" />
                <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-primary/40" />
                <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-primary/40" />

                {/* Technical Info Overlays */}
                <AnimatePresence>
                    {showControls && (
                        <>
                            {/* Top Left: Title & Status */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="absolute top-10 left-10 space-y-2"
                            >
                                <div className="flex items-center gap-3">
                                    <Cpu size={14} className="text-primary animate-pulse" />
                                    <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary font-bold">Project: {title}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Activity size={14} className="text-white/40" />
                                    <p className="text-[8px] font-mono uppercase tracking-[0.2em] text-white/40">Status: {playing ? "Syncing Output" : "Paused"}</p>
                                </div>
                            </motion.div>

                            {/* Top Right: Network/Data Flow */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="absolute top-10 right-10 text-right space-y-2"
                            >
                                <div className="flex items-center justify-end gap-3">
                                    <p className="text-[8px] font-mono uppercase tracking-[0.2em] text-white/40">Bitrate: 45.2 MBPS</p>
                                    <Wifi size={14} className="text-white/40" />
                                </div>
                                <div className="flex items-center justify-end gap-3">
                                    <p className="text-[8px] font-mono uppercase tracking-[0.2em] text-white/40">Link: Secure</p>
                                    <Activity size={14} className="text-primary/60" />
                                </div>
                            </motion.div>

                            {/* Center Crosshair (Subtle) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 0.1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <Target size={120} className="text-white" strokeWidth={0.5} />
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>

            {/* --- PROGRESS HUD (Always Visible) --- */}
            <div className="absolute bottom-16 inset-x-10 z-20 pointer-events-none">
                <div className="flex justify-between items-end mb-2">
                    <div className="flex flex-col">
                        <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest mb-1">Timecode (Current)</span>
                        <span className="text-sm font-mono text-primary font-black tracking-tighter">{currentTime}</span>
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest mb-1">Duration</span>
                        <span className="text-sm font-mono text-white/80 font-black tracking-tighter">{duration}</span>
                    </div>
                </div>
                {/* Scrubber Background Track */}
                <div className="h-[2px] w-full bg-white/10 relative">
                    {/* Animated Glow on Progress */}
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-primary"
                        style={{ width: `${progress}%` }}
                    />
                    {/* Marker Accents */}
                    {[0, 25, 50, 75, 100].map(m => (
                        <div key={m} className={`absolute top-0 w-px h-2 bg-white/20 -translate-y-[25%]`} style={{ left: `${m}%` }} />
                    ))}
                </div>
            </div>

            {/* --- CONTROLS PANEL --- */}
            <AnimatePresence>
                {showControls && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-10 pb-6 pt-20 z-20"
                    >
                        <div className="flex items-center justify-between pointer-events-auto">
                            {/* Playback Controls */}
                            <div className="flex items-center gap-8">
                                <button
                                    onClick={togglePlay}
                                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary text-white hover:text-black transition-all duration-300"
                                >
                                    {playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                                </button>

                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={toggleMute}
                                        className="text-white/60 hover:text-primary transition-colors"
                                    >
                                        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                                    </button>
                                    <div
                                        ref={volumeRef}
                                        onClick={handleVolumeChange}
                                        className="w-24 h-1 bg-white/10 rounded-full overflow-hidden relative cursor-pointer group/volume"
                                    >
                                        <div
                                            className="absolute top-0 left-0 h-full bg-primary/40 group-hover/volume:bg-primary/60 transition-colors"
                                            style={{ width: `${muted ? 0 : volume * 100}%` }}
                                        />
                                        <div className="absolute inset-0 flex justify-between px-1 pointer-events-none">
                                            {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-[1px] h-full bg-white/20" />)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Technical Icons/Status */}
                            <div className="flex items-center gap-6">
                                <button
                                    onClick={toggleFullscreen}
                                    className="p-2 text-white/40 hover:text-white transition-colors"
                                >
                                    <Maximize size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Hidden Progress Area for Interaction */}
                        <div
                            ref={progressRef}
                            onClick={handleProgressClick}
                            className="absolute bottom-16 inset-x-10 h-6 cursor-pointer z-30 opacity-0"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Decorative Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none z-40 opacity-[0.03] select-none overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-primary to-transparent animate-[scanline_8s_linear_infinite]" />
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(800%); }
        }
      `}} />
        </div>
    );
};

export default FuturisticVideoPlayer;
