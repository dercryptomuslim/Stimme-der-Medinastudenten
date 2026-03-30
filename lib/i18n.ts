export type Locale = "de" | "en";

export const defaultLocale: Locale = "de";
export const supportedLocales: Locale[] = ["de", "en"];

const deToEnPaths: Record<string, string> = {
  "/impressum": "/imprint",
  "/datenschutz": "/privacy",
  "/blog": "/blog",
};

// Blog slug translations (DE slug -> EN slug)
const blogSlugDeToEn: Record<string, string> = {
  "leben-in-medina": "life-in-medina",
  "arabisch-lernen": "learning-arabic",
  "bewerbungstipps": "application-tips",
};

const blogSlugEnToDe: Record<string, string> = Object.entries(blogSlugDeToEn).reduce((acc, [de, en]) => {
  acc[en] = de;
  return acc;
}, {} as Record<string, string>);

const SITE_BASE = "https://www.stimme-medinastudenten.de";

export function getBlogPostAlternates(locale: "de" | "en", slug: string): { canonical: string; languages: Record<string, string> } {
  if (locale === "de") {
    const enSlug = blogSlugDeToEn[slug];
    const deUrl = `${SITE_BASE}/blog/${slug}`;
    if (enSlug) {
      const enUrl = `${SITE_BASE}/en/blog/${enSlug}`;
      return { canonical: deUrl, languages: { de: deUrl, en: enUrl, "x-default": deUrl } };
    }
    return { canonical: deUrl, languages: { de: deUrl, "x-default": deUrl } };
  }
  const deSlug = blogSlugEnToDe[slug];
  const enUrl = `${SITE_BASE}/en/blog/${slug}`;
  if (deSlug) {
    const deUrl = `${SITE_BASE}/blog/${deSlug}`;
    return { canonical: enUrl, languages: { de: deUrl, en: enUrl, "x-default": deUrl } };
  }
  return { canonical: enUrl, languages: { en: enUrl, "x-default": enUrl } };
}

export function getBlogIndexAlternates(locale: "de" | "en"): { canonical: string; languages: Record<string, string> } {
  const deUrl = `${SITE_BASE}/blog`;
  const enUrl = `${SITE_BASE}/en/blog`;
  if (locale === "de") {
    return { canonical: deUrl, languages: { de: deUrl, en: enUrl, "x-default": deUrl } };
  }
  return { canonical: enUrl, languages: { de: deUrl, en: enUrl, "x-default": enUrl } };
}

export function getCanonicalBlogSlug(slug: string): string {
  return blogSlugEnToDe[slug] ?? slug;
}

const enToDePaths: Record<string, string> = Object.entries(deToEnPaths).reduce((acc, [de, en]) => {
  acc[en] = de;
  return acc;
}, {} as Record<string, string>);

export function getLocaleFromPathname(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "de";
}

export function stripLocaleFromPathname(pathname: string): string {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.replace(/^\/en/, "") || "/";
  return pathname || "/";
}

export function localizeHref(href: string, locale: Locale): string {
  if (/^(https?:)?\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return href;
  }
  if (href.startsWith("#")) return href;

  const [path, hash] = href.split("#");
  const normalizedPath = path || "/";

  if (locale === "de") {
    return hash ? `${normalizedPath}#${hash}` : normalizedPath;
  }

  let enPathPart = normalizedPath;

  if (deToEnPaths[normalizedPath]) {
    enPathPart = deToEnPaths[normalizedPath];
  }

  const enPath =
    enPathPart === "/"
      ? "/en"
      : `/en${enPathPart}`;

  return hash ? `${enPath}#${hash}` : enPath;
}

export function switchLocalePath(currentPathname: string, targetLocale: Locale): string {
  const currentLocale = getLocaleFromPathname(currentPathname);

  if (currentLocale === targetLocale) return currentPathname;

  let basePath = stripLocaleFromPathname(currentPathname);

  const blogMatch = basePath.match(/^\/blog\/(.+)$/);
  if (blogMatch) {
    const slug = blogMatch[1];

    if (currentLocale === "en" && targetLocale === "de") {
      const deSlug = blogSlugEnToDe[slug] || slug;
      return `/blog/${deSlug}`;
    } else if (currentLocale === "de" && targetLocale === "en") {
      const enSlug = blogSlugDeToEn[slug] || slug;
      return `/en/blog/${enSlug}`;
    }
  }

  if (currentLocale === "en") {
    if (enToDePaths[basePath]) {
      basePath = enToDePaths[basePath];
    }
  }

  return localizeHref(basePath, targetLocale);
}
