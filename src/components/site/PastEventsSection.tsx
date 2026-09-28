"use client";

import { useEffect, useState } from "react";
import { PastEventCard } from "./PastEventCard";
import type { PublicInstagramPost } from "@/lib/types";

export function PastEventsSection() {
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

  if (posts && posts.length === 0) {
    return null;
  }

  return (
    <section id="eventos-pasados" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Eventos pasados
          </h2>
          <p className="mt-3 text-neutral-500">
            Algunos de los últimos eventos producidos por PC
          </p>
        </div>

        {posts && posts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PastEventCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
