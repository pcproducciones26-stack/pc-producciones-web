import { lookup, reverse } from "node:dns/promises";

// Crawlers de Google que verificamos. Los sitios proxy (p. ej. reportsinsights.com)
// piden nuestras páginas haciéndose pasar por Googlebot para servirle la copia a
// Google bajo su dominio.
const GOOGLE_UA = /Googlebot|Google-InspectionTool|GoogleOther|Storebot-Google|AdsBot-Google/i;
// Hosts oficiales de los crawlers. Ojo: no vale cualquier *.googleusercontent.com,
// porque incluye VMs de Google Cloud que puede alquilar cualquiera.
const GOOGLE_HOST = /\.(googlebot\.com|google\.com|gae\.googleusercontent\.com)$/i;

const cache = new Map<string, { ok: boolean; expires: number }>();
const TTL_MS = 6 * 60 * 60 * 1000;

export function claimsToBeGoogle(userAgent: string | null): boolean {
  return !!userAgent && GOOGLE_UA.test(userAgent);
}

// Verificación recomendada por Google: DNS inverso de la IP → host de Google,
// y DNS directo de ese host → la misma IP.
// https://developers.google.com/search/docs/crawling-indexing/verifying-googlebot
// Ante errores transitorios de DNS se deja pasar, para no bloquear al Googlebot real.
export async function isRealGoogleCrawler(ip: string): Promise<boolean> {
  const cached = cache.get(ip);
  if (cached && cached.expires > Date.now()) return cached.ok;

  let ok: boolean;
  try {
    const hosts = await reverse(ip);
    const host = hosts.find((h) => GOOGLE_HOST.test(h));
    if (!host) {
      ok = false;
    } else {
      const addrs = await lookup(host, { all: true });
      ok = addrs.some((a) => a.address === ip);
    }
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code !== "ENOTFOUND" && code !== "ENODATA") return true;
    ok = false;
  }

  cache.set(ip, { ok, expires: Date.now() + TTL_MS });
  return ok;
}
