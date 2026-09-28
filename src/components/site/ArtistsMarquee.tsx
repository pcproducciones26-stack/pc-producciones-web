// [LISTADO DE ARTISTAS] — reemplazar por los artistas reales producidos por PC
const ARTISTS = [
  "Artista Uno",
  "Artista Dos",
  "Artista Tres",
  "Artista Cuatro",
  "Artista Cinco",
  "Artista Seis",
];

export function ArtistsMarquee() {
  const items = [...ARTISTS, ...ARTISTS];

  return (
    <section id="artistas" className="border-y border-neutral-200 bg-white py-8">
      <div className="overflow-hidden">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
          {items.map((artist, i) => (
            <span
              key={`${artist}-${i}`}
              className="flex items-center gap-12 text-xl font-semibold tracking-wide text-neutral-900"
            >
              {artist}
              <span aria-hidden className="text-neutral-300">
                •
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
