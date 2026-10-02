"use client";

import { ElfsightWidget } from "next-elfsight-widget";

const WIDGET_ID = process.env.NEXT_PUBLIC_INSTAGRAM_WIDGET_ID;
const INSTAGRAM_URL = "https://www.instagram.com/pcproduccionesok/";

export function InstagramFeed() {
  return (
    <section className="border-t border-white/10 bg-neutral-950 py-24 text-white">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Seguinos en Instagram
        </h2>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-neutral-400 hover:text-white"
        >
          Lo último de @pcproduccionesok
        </a>
      </div>

      <div className="mt-12 w-full px-6">
        {WIDGET_ID ? (
          <ElfsightWidget widgetId={WIDGET_ID} />
        ) : (
          <div className="mx-auto flex h-48 max-w-2xl flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-neutral-700 text-sm text-neutral-400">
            <p>
              Configurar NEXT_PUBLIC_INSTAGRAM_WIDGET_ID (Elfsight) para
              mostrar el feed acá.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-5 py-2 text-xs font-semibold text-neutral-950 hover:bg-neutral-200"
            >
              Ver perfil en Instagram
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
