import type { PublicEvent } from "@/lib/types";

// Se renderiza en el servidor (UTC) y en el navegador: fijar la zona horaria
// evita que un show de noche aparezca con la fecha del dia siguiente.
const TIME_ZONE = "America/Argentina/Buenos_Aires";

function formatDate(iso: string) {
  const date = new Date(iso);
  const day = date.toLocaleDateString("es-AR", { day: "2-digit", timeZone: TIME_ZONE });
  const month = date
    .toLocaleDateString("es-AR", { month: "short", timeZone: TIME_ZONE })
    .replace(".", "")
    .toUpperCase();
  const year = date.toLocaleDateString("es-AR", { year: "numeric", timeZone: TIME_ZONE });
  return { day, month, year };
}

export function EventCard({
  event,
  past = false,
}: {
  event: PublicEvent;
  past?: boolean;
}) {
  const { day, month, year } = formatDate(event.date);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 transition hover:shadow-lg">
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-800">
        {event.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.imageUrl}
            alt={event.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-neutral-500">
            Sin imagen
          </div>
        )}
        <div className="absolute left-4 top-4 rounded-lg bg-neutral-950/90 px-3 py-1.5 text-center leading-none shadow">
          <div className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
            {month}
          </div>
          <div className="text-lg font-bold text-white">{day}</div>
          <div className="text-[10px] text-neutral-400">{year}</div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold text-white">
          {event.title}
        </h3>
        <p className="text-sm text-neutral-400">{event.venue}</p>

        {past ? (
          <span className="mt-auto inline-flex w-fit items-center justify-center rounded-full bg-neutral-800 px-5 py-2.5 text-sm font-semibold text-neutral-400">
            Evento finalizado
          </span>
        ) : (
          <a
            href={event.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200"
          >
            Comprar entradas
          </a>
        )}
      </div>
    </article>
  );
}
