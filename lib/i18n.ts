const SITE_BASE = "https://www.stimme-medinastudenten.de";

export function getCanonicalUrl(path: string): string {
  return `${SITE_BASE}${path}`;
}

export function getBlogPostCanonical(slug: string): { canonical: string } {
  return { canonical: `${SITE_BASE}/blog/${slug}` };
}

export function getBlogIndexCanonical(): { canonical: string } {
  return { canonical: `${SITE_BASE}/blog` };
}
