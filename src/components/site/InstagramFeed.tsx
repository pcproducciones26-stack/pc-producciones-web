import type { PublicInstagramPost } from "@/lib/types";

const INSTAGRAM_HANDLE = "pcproduccionesok";
const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;
// Embed oficial del perfil: no necesita token ni widget de terceros.
const INSTAGRAM_EMBED_URL = `${INSTAGRAM_URL}embed/`;

export function InstagramFeed({ posts }: { posts: PublicInstagramPost[] }) {
  return (
    <section className="border-t border-white/10 bg-neutral-950 py-24 text-white">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Visitanos en Instagram
        </h2>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-neutral-400 hover:text-white"
        >
          @{INSTAGRAM_HANDLE}
        </a>
      </div>

      <div className="mx-auto mt-12 max-w-6xl px-6">
        {posts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {posts.map((post) => (
              <a
                key={post.id}
                href={post.postUrl ?? INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-xl bg-neutral-900"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.imageUrl}
                  alt={post.caption?.slice(0, 120) ?? "Post de Instagram"}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105 group-hover:opacity-80"
                />
              </a>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl">
            <iframe
              src={INSTAGRAM_EMBED_URL}
              title={`Perfil de Instagram @${INSTAGRAM_HANDLE}`}
              loading="lazy"
              className="block h-[560px] w-full"
            />
          </div>
        )}

        <div className="mt-10 text-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
              <path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 4.7a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2zm0 8.4a3.3 3.3 0 1 1 0-6.6 3.3 3.3 0 0 1 0 6.6zm5.3-9.8a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z" />
            </svg>
            Visitá nuestro Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
