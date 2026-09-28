"use client";

import { useEffect, useState } from "react";
import type { PublicInstagramPost } from "@/lib/types";

const INSTAGRAM_URL = "https://www.instagram.com/pcproduccionesok/";

export function InstagramFeed() {
  const [posts, setPosts] = useState<PublicInstagramPost[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/instagram-posts")
      .then((res) => res.json())
      .then((json: { posts: PublicInstagramPost[] }) => {
        if (!cancelled) setPosts(json.posts);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Seguinos en Instagram
        </h2>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-neutral-500 hover:text-neutral-950"
        >
          Lo último de @pcproduccionesok
        </a>
      </div>

      <div className="mt-12">
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-3 gap-0.5 sm:grid-cols-4 md:grid-cols-6">
            {posts.map((post) => (
              <a
                key={post.id}
                href={post.postUrl ?? INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden bg-neutral-100"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.imageUrl}
                  alt={post.caption ?? "Foto de Instagram"}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105 group-hover:opacity-90"
                />
              </a>
            ))}
          </div>
        ) : (
          <div className="mx-auto flex h-48 max-w-2xl flex-col items-center justify-center gap-3 px-6 text-center text-sm text-neutral-400">
            <p>Muy pronto vas a ver acá las últimas fotos de Instagram.</p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-neutral-950 px-5 py-2 text-xs font-semibold text-white hover:bg-neutral-800"
            >
              Ver perfil en Instagram
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
