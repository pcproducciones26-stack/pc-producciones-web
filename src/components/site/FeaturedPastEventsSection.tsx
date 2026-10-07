import { PastEventCard } from "./PastEventCard";
import type { PublicInstagramPost } from "@/lib/types";

type Props = {
  title: string;
  subtitle: string;
  posts: PublicInstagramPost[];
};

export function FeaturedPastEventsSection({ title, subtitle, posts }: Props) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section
      id="eventos-pasados-destacados"
      className="scroll-mt-24 border-t border-white/10 bg-neutral-950 py-24 sm:scroll-mt-36"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-neutral-400">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PastEventCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
