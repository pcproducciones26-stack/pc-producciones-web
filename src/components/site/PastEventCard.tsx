import type { PublicInstagramPost } from "@/lib/types";

export function PastEventCard({ post }: { post: PublicInstagramPost }) {
  return (
    <article className="flex flex-col gap-3">
      {post.caption && (
        <p className="text-sm text-neutral-600">{post.caption}</p>
      )}

      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-neutral-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.imageUrl}
          alt={post.caption ?? "Evento pasado"}
          className="h-full w-full object-cover"
        />
      </div>

      {post.postUrl && (
        <a
          href={post.postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-xs font-medium hover:border-neutral-950"
        >
          Ver post
        </a>
      )}
    </article>
  );
}
