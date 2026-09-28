import type { PublicEvent } from "@/lib/types";

function formatDate(iso: string) {
  const date = new Date(iso);
  const day = date.toLocaleDateString("es-AR", { day: "2-digit" });
  const month = date
    .toLocaleDateString("es-AR", { month: "short" })
    .replace(".", "")
    .toUpperCase();
  const year = date.getFullYear();
  return { day, month, year };
}

export function EventCard({ event }: { event: PublicEvent }) {
  const { day, month, year } = formatDate(event.date);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:shadow-lg">
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
        {event.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.imageUrl}
            alt={event.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-neutral-400">
            Sin imagen
          </div>
        )}
        <div className="absolute left-4 top-4 rounded-lg bg-white/95 px-3 py-1.5 text-center leading-none shadow">
          <div className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
            {month}
          </div>
          <div className="text-lg font-bold text-neutral-950">{day}</div>
          <div className="text-[10px] text-neutral-500">{year}</div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold text-neutral-950">
          {event.title}
        </h3>
        <p className="text-sm text-neutral-500">{event.venue}</p>

        <a
          href={event.ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          Comprar entradas
        </a>
      </div>
    </article>
  );
}
