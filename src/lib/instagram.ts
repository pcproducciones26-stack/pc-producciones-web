const AUTHORIZE_URL = "https://www.instagram.com/oauth/authorize";
const TOKEN_URL = "https://api.instagram.com/oauth/access_token";
const GRAPH_HOST = "https://graph.instagram.com";

function getRedirectUri() {
  const uri = process.env.INSTAGRAM_REDIRECT_URI;
  if (!uri) throw new Error("INSTAGRAM_REDIRECT_URI no esta configurado");
  return uri;
}

export function getAuthorizeUrl(state: string) {
  const clientId = process.env.INSTAGRAM_APP_ID;
  if (!clientId) throw new Error("INSTAGRAM_APP_ID no esta configurado");

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: getRedirectUri(),
    response_type: "code",
    scope: "instagram_business_basic",
    state,
  });

  return `${AUTHORIZE_URL}?${params.toString()}`;
}

type ShortLivedTokenResponse = {
  access_token: string;
  user_id: string;
  permissions: string[];
};

export async function exchangeCodeForToken(code: string) {
  const clientId = process.env.INSTAGRAM_APP_ID;
  const clientSecret = process.env.INSTAGRAM_APP_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("INSTAGRAM_APP_ID/INSTAGRAM_APP_SECRET no configurados");
  }

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "authorization_code",
    redirect_uri: getRedirectUri(),
    code,
  });

  const res = await fetch(TOKEN_URL, { method: "POST", body });
  if (!res.ok) {
    throw new Error(`Error canjeando el code: ${await res.text()}`);
  }
  return (await res.json()) as ShortLivedTokenResponse;
}

type LongLivedTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export async function exchangeForLongLivedToken(shortLivedToken: string) {
  const clientSecret = process.env.INSTAGRAM_APP_SECRET;
  if (!clientSecret) throw new Error("INSTAGRAM_APP_SECRET no configurado");

  const params = new URLSearchParams({
    grant_type: "ig_exchange_token",
    client_secret: clientSecret,
    access_token: shortLivedToken,
  });

  const res = await fetch(`${GRAPH_HOST}/access_token?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`Error obteniendo token de larga duracion: ${await res.text()}`);
  }
  return (await res.json()) as LongLivedTokenResponse;
}

export async function refreshLongLivedToken(currentToken: string) {
  const params = new URLSearchParams({
    grant_type: "ig_refresh_token",
    access_token: currentToken,
  });

  const res = await fetch(
    `${GRAPH_HOST}/refresh_access_token?${params.toString()}`
  );
  if (!res.ok) {
    throw new Error(`Error refrescando el token: ${await res.text()}`);
  }
  return (await res.json()) as LongLivedTokenResponse;
}

export type InstagramMediaItem = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
};

export async function fetchRecentMedia(accessToken: string, limit = 25) {
  const params = new URLSearchParams({
    fields: "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp",
    access_token: accessToken,
    limit: String(limit),
  });

  const res = await fetch(`${GRAPH_HOST}/me/media?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`Error obteniendo el feed de Instagram: ${await res.text()}`);
  }
  const json = (await res.json()) as { data: InstagramMediaItem[] };
  return json.data;
}
