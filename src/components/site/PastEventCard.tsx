import type { PublicInstagramPost } from "@/lib/types";

export function PastEventCard({ post }: { post: PublicInstagramPost }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      {post.caption && (
        <p className="p-5 pb-4 text-sm text-neutral-600">{post.caption}</p>
      )}

      <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.imageUrl}
          alt={post.caption ?? "Evento pasado"}
          className="h-full w-full object-cover"
        />
      </div>

      {post.postUrl && (
        <div className="p-5">
          <a
            href={post.postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-xs font-medium hover:border-neutral-950"
          >
            Ver post
          </a>
        </div>
      )}
    </article>
  );
}
