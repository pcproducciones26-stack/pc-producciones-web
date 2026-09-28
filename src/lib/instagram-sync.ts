import { prisma } from "@/lib/prisma";
import { fetchRecentMedia, refreshLongLivedToken } from "@/lib/instagram";

const CONFIG_ID = "singleton";

export async function getInstagramConfig() {
  return prisma.instagramConfig.findUnique({ where: { id: CONFIG_ID } });
}

export async function saveInstagramConfig(data: {
  accessToken: string;
  businessAccountId: string;
  tokenExpiresAt: Date;
}) {
  return prisma.instagramConfig.upsert({
    where: { id: CONFIG_ID },
    create: { id: CONFIG_ID, ...data },
    update: data,
  });
}

export async function syncInstagramPosts() {
  const config = await getInstagramConfig();
  if (!config) {
    throw new Error("Instagram no esta conectado todavia");
  }

  const media = await fetchRecentMedia(config.accessToken);

  let synced = 0;
  for (const item of media) {
    if (item.media_type === "VIDEO" && !item.thumbnail_url) continue;
    const imageUrl =
      item.media_type === "VIDEO"
        ? item.thumbnail_url!
        : (item.media_url ?? item.thumbnail_url);
    if (!imageUrl) continue;

    await prisma.instagramPost.upsert({
      where: { externalId: item.id },
      create: {
        externalId: item.id,
        imageUrl,
        postUrl: item.permalink,
        caption: item.caption ?? null,
        postedAt: new Date(item.timestamp),
      },
      update: {
        imageUrl,
        postUrl: item.permalink,
        caption: item.caption ?? null,
        postedAt: new Date(item.timestamp),
      },
    });
    synced += 1;
  }

  await prisma.instagramConfig.update({
    where: { id: CONFIG_ID },
    data: { lastSyncedAt: new Date() },
  });

  return synced;
}

export async function refreshInstagramTokenIfNeeded() {
  const config = await getInstagramConfig();
  if (!config) return { refreshed: false, reason: "no-config" as const };

  const daysUntilExpiry = config.tokenExpiresAt
    ? (config.tokenExpiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    : 0;

  // Refrescar cuando falten 10 dias o menos para vencer.
  if (daysUntilExpiry > 10) {
    return { refreshed: false, reason: "not-due" as const };
  }

  const refreshed = await refreshLongLivedToken(config.accessToken);
  const tokenExpiresAt = new Date(
    Date.now() + refreshed.expires_in * 1000
  );

  await prisma.instagramConfig.update({
    where: { id: CONFIG_ID },
    data: { accessToken: refreshed.access_token, tokenExpiresAt },
  });

  return { refreshed: true as const };
}
