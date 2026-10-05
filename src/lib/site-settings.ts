import { prisma } from "@/lib/prisma";

const SETTINGS_ID = "singleton";

export const DEFAULT_ARTISTS = [
  "Artista Uno",
  "Artista Dos",
  "Artista Tres",
  "Artista Cuatro",
  "Artista Cinco",
  "Artista Seis",
];

export const DEFAULT_HERO_VIDEO_URL = "/video/hero-bg.mp4";
export const DEFAULT_HERO_TITLE = "Experiencias en vivo";
export const DEFAULT_HERO_SUBTITLE =
  "PC es una productora especializada en el desarrollo de experiencias en vivo: shows, festivales y eventos corporativos.";
export const DEFAULT_ABOUT_TEXT =
  "PC Producciones (Producciones Clandestinas) es una productora especializada en el desarrollo de experiencias en vivo. Desde hace años trabajamos junto a artistas nacionales e internacionales y marcas líderes para crear shows, festivales y eventos corporativos memorables.";
export const DEFAULT_ABOUT_AREAS = [
  "Producción de shows y conciertos",
  "Festivales",
  "Eventos corporativos",
  "Gira y booking de artistas",
];

export const DEFAULT_FEATURED_TITLE = "Eventos pasados destacados";
export const DEFAULT_FEATURED_SUBTITLE =
  "Algunos de los últimos eventos producidos por PC";

export async function getSiteSettings() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: SETTINGS_ID },
  });

  return {
    heroVideoUrl: settings?.heroVideoUrl || DEFAULT_HERO_VIDEO_URL,
    heroTitle: settings?.heroTitle || DEFAULT_HERO_TITLE,
    heroSubtitle: settings?.heroSubtitle || DEFAULT_HERO_SUBTITLE,
    heroCtaLabel: settings?.heroCtaLabel || null,
    heroCtaUrl: settings?.heroCtaUrl || null,
    marqueeArtists:
      settings?.marqueeArtists && settings.marqueeArtists.length > 0
        ? settings.marqueeArtists
        : DEFAULT_ARTISTS,
    aboutText: settings?.aboutText || DEFAULT_ABOUT_TEXT,
    aboutAreas:
      settings?.aboutAreas && settings.aboutAreas.length > 0
        ? settings.aboutAreas
        : DEFAULT_ABOUT_AREAS,
    featuredTitle: settings?.featuredTitle || DEFAULT_FEATURED_TITLE,
    featuredSubtitle: settings?.featuredSubtitle || DEFAULT_FEATURED_SUBTITLE,
  };
}

export async function updateMarqueeArtists(artists: string[]) {
  return prisma.siteSettings.upsert({
    where: { id: SETTINGS_ID },
    create: { id: SETTINGS_ID, marqueeArtists: artists },
    update: { marqueeArtists: artists },
  });
}

export async function updateHeroVideoUrl(url: string) {
  return prisma.siteSettings.upsert({
    where: { id: SETTINGS_ID },
    create: { id: SETTINGS_ID, heroVideoUrl: url },
    update: { heroVideoUrl: url },
  });
}

export async function updateHeroText(data: {
  heroTitle: string;
  heroSubtitle: string;
  heroCtaLabel: string | null;
  heroCtaUrl: string | null;
}) {
  return prisma.siteSettings.upsert({
    where: { id: SETTINGS_ID },
    create: { id: SETTINGS_ID, ...data },
    update: data,
  });
}

export async function updateAboutSection(data: {
  aboutText: string;
  aboutAreas: string[];
}) {
  return prisma.siteSettings.upsert({
    where: { id: SETTINGS_ID },
    create: { id: SETTINGS_ID, ...data },
    update: data,
  });
}

export async function updateFeaturedSection(data: {
  featuredTitle: string;
  featuredSubtitle: string;
}) {
  return prisma.siteSettings.upsert({
    where: { id: SETTINGS_ID },
    create: { id: SETTINGS_ID, ...data },
    update: data,
  });
}
