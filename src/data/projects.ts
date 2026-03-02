export interface Project {
  id: string;
  title: string;
  category: string;
  video: string;
  client?: string;
  screenshots: string[];
}

export const categories = ["All", "Commercials", "Film & TV", "Music Promos", "Sound"];

export const teamMembers = [
  { name: "James Fletcher", role: "Founder & Creative Director", initials: "JF" },
  { name: "Sarah Chen", role: "Head of VFX", initials: "SC" },
  { name: "Marcus Webb", role: "Lead Compositor", initials: "MW" },
  { name: "Elena Rossi", role: "Color Scientist", initials: "ER" },
  { name: "David Kim", role: "Sound Designer", initials: "DK" },
  { name: "Aria Patel", role: "Motion Designer", initials: "AP" },
];
