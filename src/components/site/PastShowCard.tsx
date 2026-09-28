import type { PublicPastShow } from "@/lib/types";

function formatDate(iso: string) {
  // La fecha se guarda como medianoche UTC del día elegido (sin hora asociada);
  // forzar timeZone: "UTC" evita que se corra un día en zonas con offset negativo.
  return new Date(iso).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function PastShowCard({ show }: { show: PublicPastShow }) {
  const cover = show.photoUrls[0];
  const extraPhotos = show.photoUrls.slice(1, 4);

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      {show.description && (
        <p className="p-5 pb-4 text-sm text-neutral-600">
          {show.description}
        </p>
      )}

      <div className="grid grid-cols-4 gap-0.5 bg-neutral-100">
        <div className="relative col-span-3 aspect-4/3 overflow-hidden bg-neutral-200">
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cover}
              alt={show.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-neutral-400">
              Sin foto
            </div>
          )}
        </div>
        <div className="col-span-1 grid grid-rows-3 gap-0.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="relative overflow-hidden bg-neutral-200"
            >
              {extraPhotos[i] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={extraPhotos[i]}
                  alt=""
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
          {formatDate(show.date)}
        </p>
        <h3 className="text-lg font-semibold text-neutral-950">
          {show.title}
        </h3>
        <p className="text-sm text-neutral-500">{show.venue}</p>

        {show.videoUrls.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {show.videoUrls.map((url, i) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-neutral-300 px-3 py-1.5 text-xs font-medium hover:border-neutral-950"
              >
                Ver video {show.videoUrls.length > 1 ? i + 1 : ""}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
