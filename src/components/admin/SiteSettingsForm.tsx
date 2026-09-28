"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";

type Props = {
  initialHeroVideoUrl: string;
  initialArtists: string[];
};

export function SiteSettingsForm({
  initialHeroVideoUrl,
  initialArtists,
}: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [heroVideoUrl, setHeroVideoUrl] = useState(initialHeroVideoUrl);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [artists, setArtists] = useState<string[]>(
    initialArtists.length > 0 ? initialArtists : [""]
  );
  const [savingArtists, setSavingArtists] = useState(false);
  const [artistsSaved, setArtistsSaved] = useState(false);

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

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-neutral-950">
          Video de fondo del hero
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          Se muestra en loop, sin sonido, detrás del título &quot;Experiencias
          en vivo&quot;. Formato MP4, hasta 100MB (ideal: menos de 15MB para
          que cargue rápido).
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
    </div>
  );
}
