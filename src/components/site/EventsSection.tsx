"use client";

import { useEffect, useState } from "react";
import { EventCard } from "./EventCard";
import type { PublicEvent } from "@/lib/types";

type EventsResponse = {
  events: PublicEvent[];
  page: number;
  totalPages: number;
};

export function EventsSection() {
  const [data, setData] = useState<EventsResponse | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/events?page=${page}&pageSize=9`)
      .then((res) => res.json())
      .then((json: EventsResponse) => {
        if (!cancelled) setData(json);
      });
    return () => {
      cancelled = true;
    };
  }, [page]);

  const loading = !data || data.page !== page;

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

        {loading && !data && (
          <p className="text-center text-neutral-400">Cargando eventos...</p>
        )}

        {data && data.events.length === 0 && (
          <p className="text-center text-neutral-400">
            Por el momento no hay fechas próximas confirmadas.
          </p>
        )}

        {data && data.events.length > 0 && (
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
