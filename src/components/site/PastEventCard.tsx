import type { PublicInstagramPost } from "@/lib/types";

function formatDate(iso: string) {
  // Se guarda como medianoche UTC del dia elegido; forzar timeZone: "UTC"
  // evita que se corra un dia en zonas con offset negativo.
  return new Date(iso).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function buildMeta(post: PublicInstagramPost) {
  const place = [post.venue, post.city].filter(Boolean).join(", ");
  return [post.eventDate ? formatDate(post.eventDate) : null, place || null]
    .filter(Boolean)
    .join(" · ");
}

export function PastEventCard({ post }: { post: PublicInstagramPost }) {
  const meta = buildMeta(post);

  const image = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={post.imageUrl}
        alt={post.caption ?? "Evento pasado"}
        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
      />

      {(meta || post.caption) && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 pt-10">
          {meta && (
            <p className="text-xs font-semibold uppercase tracking-wide text-white/80">
              {meta}
            </p>
          )}
          {post.caption && (
            <p className="mt-1 text-sm font-medium text-white">
              {post.caption}
            </p>
          )}
        </div>
      )}
    </>
  );

  const className =
    "group relative block aspect-square w-full overflow-hidden rounded-2xl bg-neutral-100";

  if (post.postUrl) {
    return (
      <a
        href={post.postUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {image}
      </a>
    );
  }

  return <div className={className}>{image}</div>;
}
