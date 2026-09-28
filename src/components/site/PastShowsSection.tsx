"use client";

import { useEffect, useState } from "react";
import { PastShowCard } from "./PastShowCard";
import type { PublicPastShow } from "@/lib/types";

type ShowsResponse = {
  shows: PublicPastShow[];
  page: number;
  totalPages: number;
};

export function PastShowsSection() {
  const [data, setData] = useState<ShowsResponse | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/past-shows?page=${page}&pageSize=6`)
      .then((res) => res.json())
      .then((json: ShowsResponse) => {
        if (!cancelled) setData(json);
      });
    return () => {
      cancelled = true;
    };
  }, [page]);

  if (data && data.shows.length === 0 && page === 1) {
    return null;
  }

  return (
    <section id="shows-realizados" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Shows realizados
          </h2>
          <p className="mt-3 text-neutral-500">
            Algunos de los últimos eventos producidos por PC
          </p>
        </div>

        {data && data.shows.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.shows.map((show) => (
                <PastShowCard key={show.id} show={show} />
              ))}
            </div>

            {data.totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-4">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="rounded-full border border-neutral-300 px-5 py-2 text-sm font-medium disabled:opacity-30"
                >
                  Anteriores
                </button>
                <span className="text-sm text-neutral-500">
                  {data.page} / {data.totalPages}
                </span>
                <button
                  type="button"
                  disabled={page >= data.totalPages}
                  onClick={() =>
                    setPage((p) => Math.min(data.totalPages, p + 1))
                  }
                  className="rounded-full border border-neutral-300 px-5 py-2 text-sm font-medium disabled:opacity-30"
                >
                  Siguientes
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
