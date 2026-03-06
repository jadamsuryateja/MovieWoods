export interface Project {
    id: string;
    title: string;
    category: string;
    video?: string;
    screenshots: string[];
    aspectRatio?: "video" | "original" | "portrait";
}

export const categories = ["All", "Future Work", "Commercials", "Film & TV", "Music Promos", "Sound"];

export const works: Project[] = [
    {
        id: "future-01",
        title: "VIBHO - Cinematic Key Art",
        category: "Future Work",
        video: "",
        screenshots: ["/assets/works/future work_01.webp"],
        aspectRatio: "portrait"
    },
    {
        id: "future-02",
        title: "VIBHO - Creative Poster Art",
        category: "Future Work",
        video: "",
        screenshots: ["/assets/works/future work_02.webp"],
        aspectRatio: "portrait"
    },
    {
        id: "comm-01",
        title: "High-End Commercial VFX",
        category: "Commercials",
        video: "/assets/works/commercial_01.mp4",
        screenshots: []
    },
    {
        id: "comm-02",
        title: "Dynamic Product Showcase",
        category: "Commercials",
        video: "",
        screenshots: ["/assets/works/commercials_02.webp"]
    },
    {
        id: "comm-03",
        title: "Luxury Brand Aesthetics",
        category: "Commercials",
        video: "",
        screenshots: ["/assets/works/commercials_03.webp"]
    },
    {
        id: "comm-04",
        title: "Urban Motion Dynamics",
        category: "Commercials",
        video: "",
        screenshots: ["/assets/works/commercials_04.webp"]
    },
    {
        id: "comm-05",
        title: "Premium Tech Visuals",
        category: "Commercials",
        video: "",
        screenshots: ["/assets/works/commercials_05.webp"]
    },
    {
        id: "comm-06",
        title: "Minimalist Product Flow",
        category: "Commercials",
        video: "",
        screenshots: ["/assets/works/commercials_06.webp"]
    },
    {
        id: "comm-07",
        title: "Corporate Identity Motion",
        category: "Commercials",
        video: "",
        screenshots: ["/assets/works/commercials_07.webp"]
    },
    {
        id: "comm-08",
        title: "Cinematic Brand Story",
        category: "Commercials",
        video: "/assets/works/commercials_08.mp4",
        screenshots: []
    },
    {
        id: "film-tv-01",
        title: "Sci-Fi Rooftop Showdown",
        category: "Film & TV",
        video: "/assets/works/film and tv_01.mp4",
        screenshots: []
    },
    {
        id: "film-tv-02",
        title: "Character Animation Study",
        category: "Film & TV",
        video: "/assets/works/film and tv_02.mp4",
        screenshots: []
    },
    {
        id: "film-tv-03",
        title: "Spider-Man Motion Graphic",
        category: "Film & TV",
        video: "/assets/works/film and tv_03.mp4",
        screenshots: []
    },
    {
        id: "film-tv-04",
        title: "Biological Simulation Showcase",
        category: "Film & TV",
        video: "/assets/works/film and tv_04.mp4",
        screenshots: []
    }
];

export const teamMembers = [
    {
        name: "MSN RAJU",
        role: "CEO & VFX Supervisor",
        initials: "MR",
        image: "/assets/MSN RAJU CEO.webp",
        bio: "Highly accomplished VFX Supervisor with 14 years of experience delivering high-quality visual effects for international film, television, and digital projects. Proven expertise in overseeing the complete VFX pipeline — from concept development and on-set supervision to post-production, compositing, and final delivery. \n\nStrong leadership skills with a track record of managing large multidisciplinary teams, mentoring artists, and maintaining the highest industry standards. Recognized for creative problem-solving, attention to detail, and the ability to balance artistic storytelling with technical excellence across diverse genres and platforms. \n\nVFX Supervisor with 14+ years of experience on international projects, specializing in end-to-end VFX pipeline management, on-set supervision, and high-quality visual storytelling. Known for leading global teams, delivering cinematic visuals, and meeting complex creative and technical challenges."
    }
];
