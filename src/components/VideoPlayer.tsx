import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

interface VideoPlayerProps {
  src: string;
  title: string;
  onPlayStateChange?: (playing: boolean) => void;
}

const VideoPlayer = ({ src, title, onPlayStateChange }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
    onPlayStateChange?.(!playing);
  }, [playing, onPlayStateChange]);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  const toggleFullscreen = () => {
    videoRef.current?.requestFullscreen?.();
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
    const update = () => setProgress((v.currentTime / v.duration) * 100 || 0);
    v.addEventListener("timeupdate", update);
    return () => v.removeEventListener("timeupdate", update);
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
      className="relative group bg-transparent aspect-video w-full max-w-5xl mx-auto overflow-hidden"
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => playing && setShowControls(false)}
      data-cursor="PLAY"
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        playsInline
        onClick={togglePlay}
      />

      {/* Title */}
      <div className="absolute top-4 left-5 z-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">{title}</p>
      </div>

      {/* Controls overlay */}
      <motion.div
        initial={false}
        animate={{ opacity: showControls ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 inset-x-0 bg-transparent px-5 pb-4 pt-12"
      >
        {/* Progress bar */}
        <div
          ref={progressRef}
          onClick={handleProgressClick}
          className="w-full h-1 bg-muted mb-4 cursor-pointer group/progress"
        >
          <div
            className="h-full bg-foreground transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center gap-4">
          <button onClick={togglePlay} className="text-foreground hover:text-primary transition-colors">
            {playing ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button onClick={toggleMute} className="text-foreground hover:text-primary transition-colors">
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <div className="flex-1" />
          <button onClick={toggleFullscreen} className="text-foreground hover:text-primary transition-colors">
            <Maximize size={16} />
          </button>
        </div>
      </motion.div>

      {/* Big play button when paused */}
      {!playing && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex items-center justify-center"
          onClick={togglePlay}
        >
          <div className="w-16 h-16 rounded-full bg-foreground/10 backdrop-blur-sm flex items-center justify-center border border-foreground/20">
            <Play size={24} className="text-foreground ml-1" />
          </div>
        </motion.button>
      )}
    </div>
  );
};

export default VideoPlayer;
