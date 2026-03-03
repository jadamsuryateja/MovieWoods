export interface Project {
    id: string;
    title: string;
    category: string;
    video: string;
    client?: string;
    screenshots: string[];
}

export const categories = ["All", "Commercials", "Film & TV", "Music Promos", "Sound"];

export const works: Project[] = [
    {
        id: "1",
        title: "Neon Frontier",
        category: "Commercials",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        client: "Cyberdyne",
        screenshots: ["https://picsum.photos/seed/neon/1920/1080"]
    },
    {
        id: "2",
        title: "First Contact",
        category: "Film & TV",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        client: "Arasaka",
        screenshots: ["https://picsum.photos/seed/contact/1920/1080"]
    },
    {
        id: "3",
        title: "Omega Protocol",
        category: "Commercials",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        client: "Weyland-Yutani",
        screenshots: ["https://picsum.photos/seed/omega/1920/1080"]
    },
    {
        id: "4",
        title: "Inferno Rising",
        category: "Film & TV",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        client: "OmniCorp",
        screenshots: ["https://picsum.photos/seed/inferno/1920/1080"]
    },
    {
        id: "5",
        title: "Titan's Peak",
        category: "Commercials",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        client: "Tyrell Corp",
        screenshots: ["https://picsum.photos/seed/titan/1920/1080"]
    },
    {
        id: "6",
        title: "Red Sands",
        category: "Film & TV",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        client: "Stark Ind.",
        screenshots: ["https://picsum.photos/seed/sands/1920/1080"]
    },
    {
        id: "7",
        title: "Neural Core",
        category: "Commercials",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        client: "Massive Dynamic",
        screenshots: ["https://picsum.photos/seed/neural/1920/1080"]
    },
    {
        id: "8",
        title: "Cortex Link",
        category: "Film & TV",
        video: "https://commondatachannel.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        client: "Oscorp",
        screenshots: ["https://picsum.photos/seed/cortex/1920/1080"]
    },
    {
        id: "9",
        title: "Synthetic Soul",
        category: "Commercials",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
        client: "Shinra",
        screenshots: ["https://picsum.photos/seed/soul/1920/1080"]
    },
    {
        id: "10",
        title: "Echoes of Tomorrow",
        category: "Film & TV",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        client: "Aperture Science",
        screenshots: ["https://picsum.photos/seed/tomorrow/1920/1080"]
    }
];

export const teamMembers = [
    {
        name: "MSN RAJU",
        role: "CEO & VFX Supervisor",
        initials: "MR",
        image: "/assets/MSN RAJU CEO.png",
        bio: "Highly accomplished VFX Supervisor with 14 years of experience delivering high-quality visual effects for international film, television, and digital projects. Proven expertise in overseeing the complete VFX pipeline — from concept development and on-set supervision to post-production, compositing, and final delivery. \n\nStrong leadership skills with a track record of managing large multidisciplinary teams, mentoring artists, and maintaining the highest industry standards. Recognized for creative problem-solving, attention to detail, and the ability to balance artistic storytelling with technical excellence across diverse genres and platforms. \n\nVFX Supervisor with 14+ years of experience on international projects, specializing in end-to-end VFX pipeline management, on-set supervision, and high-quality visual storytelling. Known for leading global teams, delivering cinematic visuals, and meeting complex creative and technical challenges."
    }
];
