"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";

type Props = {
  initialHeroVideoUrl: string;
  initialHeroTitle: string;
  initialHeroSubtitle: string;
  initialHeroCtaLabel: string;
  initialHeroCtaUrl: string;
  initialArtists: string[];
  initialAboutText: string;
  initialAboutAreas: string[];
  initialFeaturedTitle: string;
  initialFeaturedSubtitle: string;
};

export function SiteSettingsForm({
  initialHeroVideoUrl,
  initialHeroTitle,
  initialHeroSubtitle,
  initialHeroCtaLabel,
  initialHeroCtaUrl,
  initialArtists,
  initialAboutText,
  initialAboutAreas,
  initialFeaturedTitle,
  initialFeaturedSubtitle,
}: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [heroTitle, setHeroTitle] = useState(initialHeroTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(initialHeroSubtitle);
  const [heroCtaLabel, setHeroCtaLabel] = useState(initialHeroCtaLabel);
  const [heroCtaUrl, setHeroCtaUrl] = useState(initialHeroCtaUrl);
  const [savingHeroText, setSavingHeroText] = useState(false);
  const [heroTextSaved, setHeroTextSaved] = useState(false);

  const [heroVideoUrl, setHeroVideoUrl] = useState(initialHeroVideoUrl);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [artists, setArtists] = useState<string[]>(
    initialArtists.length > 0 ? initialArtists : [""]
  );
  const [savingArtists, setSavingArtists] = useState(false);
  const [artistsSaved, setArtistsSaved] = useState(false);

  const [aboutText, setAboutText] = useState(initialAboutText);
  const [aboutAreas, setAboutAreas] = useState<string[]>(
    initialAboutAreas.length > 0 ? initialAboutAreas : [""]
  );
  const [savingAbout, setSavingAbout] = useState(false);
  const [aboutSaved, setAboutSaved] = useState(false);

  const [featuredTitle, setFeaturedTitle] = useState(initialFeaturedTitle);
  const [featuredSubtitle, setFeaturedSubtitle] = useState(
    initialFeaturedSubtitle
  );
  const [savingFeatured, setSavingFeatured] = useState(false);
  const [featuredSaved, setFeaturedSaved] = useState(false);

  const saveHeroText = async () => {
    setSavingHeroText(true);
    setHeroTextSaved(false);
    const res = await fetch("/api/admin/site-settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        heroTitle,
        heroSubtitle,
        heroCtaLabel,
        heroCtaUrl,
      }),
    });
    setSavingHeroText(false);
    if (res.ok) {
      setHeroTextSaved(true);
      router.refresh();
    }
  };

  const onVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/admin/site-settings/hero-video",
      });

      const res = await fetch("/api/admin/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heroVideoUrl: blob.url }),
      });

      if (!res.ok) throw new Error("No se pudo guardar el video");

      setHeroVideoUrl(blob.url);
      router.refresh();
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "Error al subir el video"
      );
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const onArtistChange = (index: number, value: string) => {
    setArtists((prev) => prev.map((a, i) => (i === index ? value : a)));
  };

  const addArtist = () => setArtists((prev) => [...prev, ""]);
  const removeArtist = (index: number) =>
    setArtists((prev) => prev.filter((_, i) => i !== index));

  const saveArtists = async () => {
    setSavingArtists(true);
    setArtistsSaved(false);
    const cleaned = artists.map((a) => a.trim()).filter(Boolean);
    const res = await fetch("/api/admin/site-settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ marqueeArtists: cleaned }),
    });
    setSavingArtists(false);
    if (res.ok) {
      setArtistsSaved(true);
      router.refresh();
    }
  };

  const onAreaChange = (index: number, value: string) => {
    setAboutAreas((prev) => prev.map((a, i) => (i === index ? value : a)));
  };

  const addArea = () => setAboutAreas((prev) => [...prev, ""]);
  const removeArea = (index: number) =>
    setAboutAreas((prev) => prev.filter((_, i) => i !== index));

  const saveAbout = async () => {
    setSavingAbout(true);
    setAboutSaved(false);
    const cleaned = aboutAreas.map((a) => a.trim()).filter(Boolean);
    const res = await fetch("/api/admin/site-settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ aboutText, aboutAreas: cleaned }),
    });
    setSavingAbout(false);
    if (res.ok) {
      setAboutSaved(true);
      router.refresh();
    }
  };

  const saveFeatured = async () => {
    setSavingFeatured(true);
    setFeaturedSaved(false);
    const res = await fetch("/api/admin/site-settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featuredTitle, featuredSubtitle }),
    });
    setSavingFeatured(false);
    if (res.ok) {
      setFeaturedSaved(true);
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-neutral-950">
          Texto principal del hero
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          El título y la bajada que aparecen sobre el video. El botón de
          entradas es opcional: si completás las dos cosas (texto y link),
          aparece al lado de los otros dos botones — si dejás alguno vacío,
          no se muestra.
        </p>

        <div className="mt-4 flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium" htmlFor="heroTitle">
              Título
            </label>
            <input
              id="heroTitle"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-950"
            />
          </div>

          <div>
            <label className="text-sm font-medium" htmlFor="heroSubtitle">
              Bajada
            </label>
            <textarea
              id="heroSubtitle"
              rows={3}
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-950"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium" htmlFor="heroCtaLabel">
                Texto del botón de entradas (opcional)
              </label>
              <input
                id="heroCtaLabel"
                placeholder="Comprar entradas"
                value={heroCtaLabel}
                onChange={(e) => setHeroCtaLabel(e.target.value)}
                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-950"
              />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="heroCtaUrl">
                Link de venta de entradas (opcional)
              </label>
              <input
                id="heroCtaUrl"
                placeholder="https://..."
                value={heroCtaUrl}
                onChange={(e) => setHeroCtaUrl(e.target.value)}
                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-950"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={saveHeroText}
            disabled={savingHeroText}
            className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-800 disabled:opacity-50"
          >
            {savingHeroText ? "Guardando..." : "Guardar cambios"}
          </button>
          {heroTextSaved && (
            <span className="text-sm text-green-600">Guardado.</span>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-neutral-950">
          Video de fondo del hero
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          Se muestra en loop, sin sonido, detrás del título. Formato MP4,
          hasta 100MB (ideal: menos de 15MB para que cargue rápido).
        </p>

        <video
          key={heroVideoUrl}
          src={heroVideoUrl}
          className="mt-4 aspect-video w-full max-w-md rounded-xl bg-neutral-950 object-cover"
          muted
          autoPlay
          loop
          playsInline
        />

        <div className="mt-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            onChange={onVideoChange}
            disabled={uploading}
            className="text-sm"
          />
          {uploading && (
            <p className="mt-2 text-sm text-neutral-500">Subiendo video...</p>
          )}
          {uploadError && (
            <p className="mt-2 text-sm text-red-600">{uploadError}</p>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-neutral-950">
          Artistas de la marquesina
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          El listado que se desplaza en loop debajo del hero.
        </p>

        <div className="mt-4 flex flex-col gap-2">
          {artists.map((artist, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                value={artist}
                onChange={(e) => onArtistChange(index, e.target.value)}
                placeholder="Nombre del artista"
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-950"
              />
              <button
                type="button"
                onClick={() => removeArtist(index)}
                className="text-xs font-medium text-red-600 hover:text-red-800"
              >
                Quitar
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={addArtist}
            className="text-sm font-semibold text-neutral-950 hover:opacity-70"
          >
            + Agregar artista
          </button>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={saveArtists}
            disabled={savingArtists}
            className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-800 disabled:opacity-50"
          >
            {savingArtists ? "Guardando..." : "Guardar cambios"}
          </button>
          {artistsSaved && (
            <span className="text-sm text-green-600">Guardado.</span>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-neutral-950">
          Eventos pasados destacados
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          El título y la bajada de esa sección. Si los dejás vacíos, se usa
          el texto por defecto.
        </p>

        <div className="mt-4 flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium" htmlFor="featuredTitle">
              Título
            </label>
            <input
              id="featuredTitle"
              value={featuredTitle}
              onChange={(e) => setFeaturedTitle(e.target.value)}
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-950"
            />
          </div>

          <div>
            <label className="text-sm font-medium" htmlFor="featuredSubtitle">
              Bajada
            </label>
            <input
              id="featuredSubtitle"
              value={featuredSubtitle}
              onChange={(e) => setFeaturedSubtitle(e.target.value)}
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-950"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={saveFeatured}
            disabled={savingFeatured}
            className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-800 disabled:opacity-50"
          >
            {savingFeatured ? "Guardando..." : "Guardar cambios"}
          </button>
          {featuredSaved && (
            <span className="text-sm text-green-600">Guardado.</span>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-neutral-950">
          Quiénes somos
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          El texto y las áreas de trabajo de esa sección.
        </p>

        <div className="mt-4">
          <label className="text-sm font-medium" htmlFor="aboutText">
            Descripción
          </label>
          <textarea
            id="aboutText"
            rows={4}
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-950"
          />
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium">Áreas de trabajo</label>
          <div className="mt-2 flex flex-col gap-2">
            {aboutAreas.map((area, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  value={area}
                  onChange={(e) => onAreaChange(index, e.target.value)}
                  placeholder="Ej: Festivales"
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-950"
                />
                <button
                  type="button"
                  onClick={() => removeArea(index)}
                  className="text-xs font-medium text-red-600 hover:text-red-800"
                >
                  Quitar
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addArea}
            className="mt-3 text-sm font-semibold text-neutral-950 hover:opacity-70"
          >
            + Agregar área
          </button>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={saveAbout}
            disabled={savingAbout}
            className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-800 disabled:opacity-50"
          >
            {savingAbout ? "Guardando..." : "Guardar cambios"}
          </button>
          {aboutSaved && (
            <span className="text-sm text-green-600">Guardado.</span>
          )}
        </div>
      </section>
    </div>
  );
}
