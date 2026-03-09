export interface Project {
    id: string;
    title: string;
    category: string;
    video?: string;
    screenshots?: string[];
    aspectRatio?: "video" | "original" | "portrait";
    previewImage?: string;
}

export const categories = ["All", "Future Work", "Commercials", "Film & TV", "Music Promos", "Sound"];

export const works: Project[] = [
    {
        id: "future-01",
        title: "VIBHO - Cinematic Key Art",
        category: "Future Work",
        screenshots: ["/assets/works/future work_01.webp"],
        aspectRatio: "portrait"
    },
    {
        id: "future-02",
        title: "VIBHO - Creative Poster Art",
        category: "Future Work",
        screenshots: ["/assets/works/future work_02.webp"],
        aspectRatio: "portrait"
    },
    {
        id: "future-03",
        title: "Future Concept Visualization",
        category: "Future Work",
        video: "/future work_03.0.mp4",
        screenshots: ["/future work_03.1.webp"],
        previewImage: "/future work_03.webp",
        aspectRatio: "original"
    },
    {
        id: "comm-01",
        title: "High-End Commercial VFX",
        category: "Commercials",
        video: "/assets/works/commercial_01.mp4"
    },
    {
        id: "comm-02",
        title: "Dynamic Product Showcase",
        category: "Commercials",
        screenshots: ["/assets/works/commercials_02.webp"]
    },
    {
        id: "comm-06",
        title: "Minimalist Product Flow",
        category: "Commercials",
        screenshots: ["/assets/works/commercials_06.webp"]
    },
    {
        id: "comm-07",
        title: "Corporate Identity Motion",
        category: "Commercials",
        screenshots: ["/assets/works/commercials_07.webp"]
    },
    {
        id: "comm-08",
        title: "Cinematic Brand Story",
        category: "Commercials",
        video: "/assets/works/commercials_08.mp4"
    },
    {
        id: "comm-03",
        title: "FX Simulation",
        category: "Commercials",
        video: "/commercials_03.mp4"
    },
    {
        id: "comm-04",
        title: "High Quality Water Simulation",
        category: "Commercials",
        video: "/commercials_04.mp4"
    },
    {
        id: "comm-05",
        title: "Advanced Digital Compositing",
        category: "Commercials",
        video: "/commercials_05.mp4"
    },
    {
        id: "film-tv-01",
        title: "Sci-Fi Rooftop Showdown",
        category: "Film & TV",
        video: "/assets/works/film and tv_01.mp4"
    },
    {
        id: "film-tv-02",
        title: "Character Animation Study",
        category: "Film & TV",
        video: "/assets/works/film and tv_02.mp4"
    },
    {
        id: "film-tv-03",
        title: "Spider-Man Motion Graphic",
        category: "Film & TV",
        video: "/assets/works/film and tv_03.mp4"
    },
    {
        id: "film-tv-04",
        title: "Biological Simulation Showcase",
        category: "Film & TV",
        video: "/assets/works/film and tv_04.mp4"
    },
    {
        id: "film-tv-05",
        title: "T-Rex River Chase VFX Breakdown",
        category: "Film & TV",
        video: "/film and tv_05.mp4"
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
