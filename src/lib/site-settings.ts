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
