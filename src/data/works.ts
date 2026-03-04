export interface Project {
    id: string;
    title: string;
    category: string;
    video: string;
    screenshots: string[];
}

export const categories = ["All", "Commercials", "Film & TV", "Music Promos", "Sound"];

export const works: Project[] = [
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
        title: "Epic World Matte Painting",
        category: "Film & TV",
        video: "",
        screenshots: ["/assets/works/Film& tv_01.webp"]
    },
    {
        id: "film-tv-02",
        title: "Sci-Fi Environment Design",
        category: "Film & TV",
        video: "",
        screenshots: ["/assets/works/Film& tv_02.webp"]
    },
    {
        id: "film-tv-03",
        title: "Historical Epic VFX",
        category: "Film & TV",
        video: "",
        screenshots: ["/assets/works/Film& tv_03.webp"]
    },
    {
        id: "film-tv-04",
        title: "Atmospheric Simulation",
        category: "Film & TV",
        video: "",
        screenshots: ["/assets/works/Film& tv_04.webp"]
    },
    {
        id: "film-tv-05",
        title: "Digital Character Realism",
        category: "Film & TV",
        video: "",
        screenshots: ["/assets/works/Film& tv_05.webp"]
    },
    {
        id: "film-tv-06",
        title: "Action Sequence Mastery",
        category: "Film & TV",
        video: "",
        screenshots: ["/assets/works/Film& tv_06.webp"]
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
