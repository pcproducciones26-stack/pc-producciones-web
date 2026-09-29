export function ArtistsMarquee({ artists }: { artists: string[] }) {
  const items = [...artists, ...artists];

  return (
    <section
      id="artistas"
      className="scroll-mt-24 border-y border-neutral-800 bg-neutral-800 py-8 sm:scroll-mt-36"
    >
      <div className="overflow-hidden">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
          {items.map((artist, i) => (
            <span
              key={`${artist}-${i}`}
              className="flex items-center gap-12 text-xl font-semibold tracking-wide text-white"
            >
              {artist}
              <span aria-hidden className="text-neutral-500">
                •
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
