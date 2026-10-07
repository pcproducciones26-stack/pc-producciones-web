"use client";

import { useEffect, useState } from "react";
import { EventCard } from "./EventCard";
import type { EventsPage } from "@/lib/types";

export function EventsSection({ initialData }: { initialData: EventsPage }) {
  const [fetched, setFetched] = useState<EventsPage | null>(null);
  const [page, setPage] = useState(initialData.page);

  useEffect(() => {
    if (page === initialData.page) return;
    let cancelled = false;
    fetch(`/api/events?page=${page}&pageSize=${initialData.pageSize}`)
      .then((res) => res.json())
      .then((json: EventsPage) => {
        if (!cancelled) setFetched(json);
      });
    return () => {
      cancelled = true;
    };
  }, [page, initialData.page, initialData.pageSize]);

  const data =
    page === initialData.page ? initialData : (fetched ?? initialData);

  return (
    <section
      id="proximos-shows"
      className="scroll-mt-24 bg-neutral-950 py-24 sm:scroll-mt-36"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Próximas fechas
          </h2>
          <p className="mt-3 text-neutral-400">
            Los próximos shows y eventos producidos por PC
          </p>
        </div>

        {data.events.length === 0 && (
          <p className="text-center text-neutral-400">
            Por el momento no hay fechas próximas confirmadas.
          </p>
        )}

        {data.events.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {data.totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-4">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="rounded-full border border-white/30 px-5 py-2 text-sm font-medium text-white disabled:opacity-30"
                >
                  Anteriores
                </button>
                <span className="text-sm text-neutral-400">
                  {data.page} / {data.totalPages}
                </span>
                <button
                  type="button"
                  disabled={page >= data.totalPages}
                  onClick={() =>
                    setPage((p) => Math.min(data.totalPages, p + 1))
                  }
                  className="rounded-full border border-white/30 px-5 py-2 text-sm font-medium text-white disabled:opacity-30"
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
