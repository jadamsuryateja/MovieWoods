import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize, Minimize, Volume2, VolumeX, Cpu, Activity, Wifi } from "lucide-react";

interface FuturisticVideoPlayerProps {
    src: string;
    title: string;
    objectFit?: "cover" | "contain";
}

const FuturisticVideoPlayer = ({ src, title, objectFit = "cover" }: FuturisticVideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);

    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(0.7);
    const [progress, setProgress] = useState(0);
    const [showHUD, setShowHUD] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);

    const formatTime = (s: number) => {
        if (!s || isNaN(s)) return "00:00:00";
        const h = Math.floor(s / 3600);
        const m = Math.floor((s % 3600) / 60);
        const sec = Math.floor(s % 60);
        return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
    };

    const formatTimecode = (s: number) => {
        if (!s || isNaN(s)) return "00:00:00:00";
        const h = Math.floor(s / 3600);
        const m = Math.floor((s % 3600) / 60);
        const sec = Math.floor(s % 60);
        const f = Math.floor((s % 1) * 24);
        return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}:${f.toString().padStart(2, "0")}`;
    };

    const togglePlay = useCallback(() => {
        const v = videoRef.current;
        if (!v) return;
        if (playing) { v.pause(); } else { v.play(); }
        setPlaying(!playing);
    }, [playing]);

    const toggleMute = () => {
        const v = videoRef.current;
        if (!v) return;
        v.muted = !muted;
        setMuted(!muted);
    };

    const changeVolume = (newVol: number) => {
        const v = videoRef.current;
        if (!v) return;
        const clamped = Math.max(0, Math.min(1, newVol));
        v.volume = clamped;
        setVolume(clamped);
        v.muted = clamped === 0;
        setMuted(clamped === 0);
    };

    const seekTo = useCallback((e: React.MouseEvent | MouseEvent) => {
        const v = videoRef.current;
        const bar = progressBarRef.current;
        if (!v || !bar || !v.duration) return;
        const rect = bar.getBoundingClientRect();
        const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        v.currentTime = pct * v.duration;
        setProgress(pct * 100);
    }, []);

    const toggleFullscreen = () => {
        const el = videoRef.current?.parentElement;
        if (!el) return;
        if (!document.fullscreenElement) {
            el.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => { });
        } else {
            document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => { });
        }
    };

    // Sync video state
    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        const onUpdate = () => {
            setProgress((v.currentTime / v.duration) * 100 || 0);
            setCurrentTime(v.currentTime);
        };
        const onMeta = () => setTotalDuration(v.duration);
        const onEnded = () => setPlaying(false);
        const onFullChange = () => setIsFullscreen(!!document.fullscreenElement);
        v.addEventListener("timeupdate", onUpdate);
        v.addEventListener("loadedmetadata", onMeta);
        v.addEventListener("ended", onEnded);
        document.addEventListener("fullscreenchange", onFullChange);
        return () => {
            v.removeEventListener("timeupdate", onUpdate);
            v.removeEventListener("loadedmetadata", onMeta);
            v.removeEventListener("ended", onEnded);
            document.removeEventListener("fullscreenchange", onFullChange);
        };
    }, []);

    // Set volume on mount
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume;
            videoRef.current.muted = muted;
        }
    }, []);

    // HUD auto-hide
    useEffect(() => {
        let t: ReturnType<typeof setTimeout>;
        if (playing) t = setTimeout(() => setShowHUD(false), 3500);
        else setShowHUD(true);
        return () => clearTimeout(t);
    }, [playing]);

    // Mouse drag scrub
    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => { if (isDraggingRef.current) seekTo(e); };
        const onMouseUp = () => { isDraggingRef.current = false; };
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [seekTo]);

    // Volume bar segments (8 segments)
    const volSegments = 8;
    const activeSegments = muted ? 0 : Math.round(volume * volSegments);

    return (
        <div
            className="relative bg-black w-full overflow-hidden select-none"
            style={{ aspectRatio: "16/9" }}
            onMouseMove={() => setShowHUD(true)}
            onMouseLeave={() => playing && setShowHUD(false)}
        >
            {/* Video */}
            <video
                ref={videoRef}
                src={src}
                className={`w-full h-full ${objectFit === "contain" ? "object-contain" : "object-cover"} cursor-pointer`}
                playsInline
                muted={muted}
                onClick={togglePlay}
            />

            {/* Corner brackets — always visible */}
            <div className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute top-3 left-3 w-5 h-5 border-t-[1.5px] border-l-[1.5px] border-primary/50" />
                <div className="absolute top-3 right-3 w-5 h-5 border-t-[1.5px] border-r-[1.5px] border-primary/50" />
                <div className="absolute bottom-[88px] left-3 w-5 h-5 border-b-[1.5px] border-l-[1.5px] border-primary/50" />
                <div className="absolute bottom-[88px] right-3 w-5 h-5 border-b-[1.5px] border-r-[1.5px] border-primary/50" />
            </div>

            {/* Zone 1: HUD Top Overlay (fade in/out) */}
            <AnimatePresence>
                {showHUD && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-0 inset-x-0 z-20 pointer-events-none bg-gradient-to-b from-black/70 to-transparent px-5 pt-4 pb-8 flex items-start justify-between"
                    >
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <Cpu size={11} className="text-primary animate-pulse" />
                                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-primary font-bold">{title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Activity size={10} className="text-white/30" />
                                <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">{playing ? "▶ PLAYING" : "⏸ PAUSED"}</span>
                            </div>
                        </div>
                        <div className="hidden sm:flex flex-col items-end gap-1">
                            <div className="flex items-center gap-2">
                                <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">45.2 MBPS</span>
                                <Wifi size={10} className="text-white/30" />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">SECURE</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Large center play button (shows when paused) */}
            <AnimatePresence>
                {!playing && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        onClick={togglePlay}
                        className="absolute inset-0 z-20 flex items-center justify-center w-full h-full pointer-events-auto"
                        style={{ background: "transparent" }}
                    >
                        <div className="relative flex items-center justify-center">
                            {/* Pulsing ring */}
                            <div className="absolute w-20 h-20 rounded-full border border-primary/30 animate-ping" />
                            {/* Hex shape via clip-path */}
                            <div
                                className="w-16 h-16 bg-primary/10 border border-primary/50 backdrop-blur-sm flex items-center justify-center"
                                style={{ clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)" }}
                            >
                                {/* Play triangle */}
                                <div
                                    className="w-0 h-0 ml-1"
                                    style={{ borderTop: "10px solid transparent", borderBottom: "10px solid transparent", borderLeft: "18px solid hsl(var(--primary))" }}
                                />
                            </div>
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Zone 2: Progress Scrubber Strip */}
            <div className="absolute z-30 inset-x-0 bottom-[52px] px-4 flex flex-col gap-1 pointer-events-none">
                {/* Timecodes */}
                <div className="flex items-center justify-between">
                    <span className="text-[9px] sm:text-[10px] font-mono text-primary font-bold tracking-tighter">{formatTimecode(currentTime)}</span>
                    <span className="text-[9px] sm:text-[10px] font-mono text-white/40 tracking-tighter">{formatTime(totalDuration)}</span>
                </div>
                {/* Scrubber */}
                <div
                    ref={progressBarRef}
                    className="relative w-full h-5 flex items-center cursor-pointer pointer-events-auto group"
                    onClick={seekTo}
                    onMouseDown={(e) => { isDraggingRef.current = true; seekTo(e); }}
                >
                    {/* Track background */}
                    <div className="absolute inset-x-0 h-[2px] bg-white/10 rounded-full top-1/2 -translate-y-1/2">
                        {/* Filled */}
                        <div
                            className="absolute top-0 left-0 h-full bg-primary rounded-full transition-none"
                            style={{ width: `${progress}%` }}
                        />
                        {/* Chapter Markers */}
                        {[25, 50, 75].map(p => (
                            <div
                                key={p}
                                className="absolute top-1/2 -translate-y-1/2 w-px h-2 bg-white/20"
                                style={{ left: `${p}%` }}
                            />
                        ))}
                        {/* Glow on filled */}
                        <div
                            className="absolute top-0 left-0 h-full bg-primary/30 blur-[3px] rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    {/* Handle dot */}
                    <div
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_8px_2px_hsl(var(--primary)/0.6)] border border-primary/80 transition-transform group-hover:scale-125 duration-150"
                        style={{ left: `calc(${progress}% - 6px)` }}
                    />
                </div>
            </div>

            {/* Zone 3: Bottom Control Bar */}
            <div className="absolute z-30 inset-x-0 bottom-0 h-[52px] bg-black/80 backdrop-blur-md border-t border-white/[0.06] flex items-center px-4 gap-3 sm:gap-5">

                {/* Play / Pause — Hexagon */}
                <button
                    onClick={togglePlay}
                    className="relative flex-shrink-0 flex items-center justify-center w-8 h-8 group"
                    aria-label={playing ? "Pause" : "Play"}
                >
                    {playing && (
                        <span className="absolute inset-0 rounded-full border border-primary/40 animate-ping" />
                    )}
                    <div
                        className={`w-8 h-8 flex items-center justify-center transition-all duration-200 ${playing ? "bg-primary/20 border-primary/60" : "bg-white/5 border-white/20 group-hover:bg-primary/10 group-hover:border-primary/40"} border`}
                        style={{ clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)" }}
                    >
                        {playing ? (
                            // Pause bars
                            <div className="flex gap-[3px]">
                                <div className="w-[3px] h-3 bg-primary rounded-sm" />
                                <div className="w-[3px] h-3 bg-primary rounded-sm" />
                            </div>
                        ) : (
                            // Play triangle
                            <div
                                className="ml-[2px] w-0 h-0"
                                style={{ borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: "9px solid hsl(var(--primary))" }}
                            />
                        )}
                    </div>
                </button>

                {/* Volume — icon + segment bars */}
                <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                    <button
                        onClick={toggleMute}
                        className="text-white/40 hover:text-primary transition-colors"
                        aria-label={muted ? "Unmute" : "Mute"}
                    >
                        {muted || volume === 0
                            ? <VolumeX size={14} />
                            : <Volume2 size={14} />
                        }
                    </button>
                    {/* Segment bars */}
                    <div className="flex items-end gap-[2px] h-4">
                        {Array.from({ length: volSegments }).map((_, i) => {
                            const isActive = i < activeSegments;
                            const heights = [8, 9, 10, 11, 12, 13, 14, 15];
                            return (
                                <button
                                    key={i}
                                    onClick={() => changeVolume((i + 1) / volSegments)}
                                    className="transition-all duration-150 rounded-[1px] cursor-pointer"
                                    style={{
                                        width: "4px",
                                        height: `${heights[i]}px`,
                                        background: isActive
                                            ? `hsl(var(--primary) / ${0.6 + (i / volSegments) * 0.4})`
                                            : "rgba(255,255,255,0.1)",
                                        boxShadow: isActive ? "0 0 4px hsl(var(--primary)/0.5)" : "none",
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Spacer + Center Live Indicator */}
                <div className="flex-1 flex items-center justify-center gap-3 pointer-events-none">
                    <div className="hidden sm:flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${playing ? "bg-primary animate-pulse" : "bg-white/20"}`} />
                        <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-white/20">
                            {playing ? "Live Output" : "Standby"}
                        </span>
                    </div>
                </div>

                {/* Fullscreen */}
                <button
                    onClick={toggleFullscreen}
                    className="flex-shrink-0 text-white/40 hover:text-white transition-colors ml-auto"
                    aria-label="Toggle fullscreen"
                >
                    {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
                </button>
            </div>

            {/* Scanline overlay */}
            <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.025] overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-primary to-transparent animate-[scanline_9s_linear_infinite]" />
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes scanline {
                        0% { transform: translateY(-100%); }
                        100% { transform: translateY(1200%); }
                    }
                `
            }} />
        </div>
    );
};

export default FuturisticVideoPlayer;
