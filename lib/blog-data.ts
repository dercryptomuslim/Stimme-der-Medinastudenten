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
  de: {
    studium: { label: "Studium", icon: "BookOpen" },
    leben: { label: "Leben in Medina", icon: "Home" },
    bewerbung: { label: "Bewerbung", icon: "FileCheck" },
  },
  en: {
    studium: { label: "Studies", icon: "BookOpen" },
    leben: { label: "Life in Medina", icon: "Home" },
    bewerbung: { label: "Application", icon: "FileCheck" },
  },
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

export const blogPostsEn: BlogPost[] = [
  {
    slug: "life-in-medina",
    title: "Life as a Student in Medina",
    excerpt: "An honest look at daily life, challenges, and special moments as a student at the Islamic University.",
    date: "Coming soon",
    dateISO: "2026-04-01",
    readTime: "- min",
    content: "<p>This article will be published soon.</p>",
    category: "leben",
  },
  {
    slug: "learning-arabic",
    title: "Learning Arabic in Medina – Tips & Experiences",
    excerpt: "Practical tips and personal experiences on learning the Arabic language directly in Medina.",
    date: "Coming soon",
    dateISO: "2026-04-01",
    readTime: "- min",
    content: "<p>This article will be published soon.</p>",
    category: "studium",
  },
  {
    slug: "application-tips",
    title: "Applying to the Islamic University – What You Need to Know",
    excerpt: "Everything important about the application, requirements, and process for prospective students from the DACH region.",
    date: "Coming soon",
    dateISO: "2026-04-01",
    readTime: "- min",
    content: "<p>This article will be published soon.</p>",
    category: "bewerbung",
  },
];
