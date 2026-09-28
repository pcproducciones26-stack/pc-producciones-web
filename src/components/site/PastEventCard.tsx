import type { PublicInstagramPost } from "@/lib/types";

export function PastEventCard({ post }: { post: PublicInstagramPost }) {
  const image = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={post.imageUrl}
        alt={post.caption ?? "Evento pasado"}
        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
      />

      {post.caption && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 pt-10">
          <p className="text-sm font-medium text-white">{post.caption}</p>
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
