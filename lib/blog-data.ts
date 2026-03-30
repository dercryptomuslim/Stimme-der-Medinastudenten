export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  metaDescription?: string;
  date: string;
  dateISO: string;
  readTime: string;
  content: string;
  image?: string;
  category: "studium" | "leben" | "bewerbung";
}

export function sortByDateDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) =>
    new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
  );
}

export const blogCategories = {
  studium: { label: "Studium", icon: "BookOpen" },
  leben: { label: "Leben in Medina", icon: "Home" },
  bewerbung: { label: "Bewerbung", icon: "FileCheck" },
};

// Placeholder blog posts - to be filled with actual content
export const blogPostsDe: BlogPost[] = [
  {
    slug: "leben-in-medina",
    title: "Das Leben als Student in Medina",
    excerpt: "Ein ehrlicher Einblick in den Alltag, die Herausforderungen und die besonderen Momente als Student an der Islamischen Universität.",
    date: "Bald verfügbar",
    dateISO: "2026-04-01",
    readTime: "- min",
    content: "<p>Dieser Artikel wird bald veröffentlicht.</p>",
    category: "leben",
  },
  {
    slug: "arabisch-lernen",
    title: "Arabisch lernen in Medina – Tipps & Erfahrungen",
    excerpt: "Praktische Tipps und persönliche Erfahrungen zum Erlernen der arabischen Sprache direkt in Medina.",
    date: "Bald verfügbar",
    dateISO: "2026-04-01",
    readTime: "- min",
    content: "<p>Dieser Artikel wird bald veröffentlicht.</p>",
    category: "studium",
  },
  {
    slug: "bewerbungstipps",
    title: "Bewerbung an der Islamischen Universität – Was du wissen musst",
    excerpt: "Alles Wichtige rund um die Bewerbung, Voraussetzungen und den Ablauf für Studieninteressierte aus dem DACH-Raum.",
    date: "Bald verfügbar",
    dateISO: "2026-04-01",
    readTime: "- min",
    content: "<p>Dieser Artikel wird bald veröffentlicht.</p>",
    category: "bewerbung",
  },
];
