import { AdminHeader } from "@/components/admin/AdminHeader";
import { SiteSettingsForm } from "@/components/admin/SiteSettingsForm";
import { getSiteSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

export default async function SiteSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <AdminHeader active="settings" />

      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-2xl font-bold text-neutral-950">Configuración</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Contenido general del sitio: el texto y video del hero, la
          marquesina de artistas, y &quot;Quiénes somos&quot;.
        </p>

        <div className="mt-8">
          <SiteSettingsForm
            initialHeroVideoUrl={settings.heroVideoUrl}
            initialHeroTitle={settings.heroTitle}
            initialHeroSubtitle={settings.heroSubtitle}
            initialHeroCtaLabel={settings.heroCtaLabel ?? ""}
            initialHeroCtaUrl={settings.heroCtaUrl ?? ""}
            initialArtists={settings.marqueeArtists}
            initialAboutText={settings.aboutText}
            initialAboutAreas={settings.aboutAreas}
            initialInstagramFeedEnabled={settings.instagramFeedEnabled}
          />
        </div>
      </div>
    </div>
  );
}
