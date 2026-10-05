export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.pcproducciones.com.ar"
).replace(/\/$/, "");

export const SITE_NAME = "PC Producciones";
export const SITE_ALTERNATE_NAMES = [
  "Producciones Clandestinas",
  "PC Producciones Clandestinas",
  "pcproducciones",
  "PC",
];

export const SITE_TITLE =
  "PC Producciones | Producciones Clandestinas — Shows y experiencias en vivo";
export const SITE_DESCRIPTION =
  "PC Producciones (Producciones Clandestinas) es una productora de experiencias en vivo: shows, conciertos, festivales y eventos corporativos. Próximas fechas, entradas y contacto.";

export const SITE_KEYWORDS = [
  "PC Producciones",
  "pcproducciones",
  "Producciones Clandestinas",
  "PC Producciones Clandestinas",
  "productora de eventos",
  "productora de shows",
  "shows en vivo",
  "conciertos",
  "festivales",
  "eventos corporativos",
  "entradas",
  "próximos shows",
  "Argentina",
];

export const SOCIAL_PROFILES = [
  "https://www.instagram.com/pcproduccionesok/",
  "https://www.facebook.com/PCproduccionesOk",
];

// Serializa JSON-LD escapando "<" para evitar inyecciones de HTML.
export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
