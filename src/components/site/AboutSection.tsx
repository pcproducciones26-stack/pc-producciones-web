// [4 ÁREAS DE TRABAJO] y [TEXTO QUIENES SOMOS] — reemplazar por contenido real de PC
const AREAS = [
  "Producción de shows y conciertos",
  "Festivales",
  "Eventos corporativos",
  "Gira y booking de artistas",
];

export function AboutSection() {
  return (
    <section
      id="quienes-somos"
      className="scroll-mt-24 bg-neutral-950 py-24 text-white sm:scroll-mt-36"
    >
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Quiénes somos
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300">
          PC es una productora especializada en el desarrollo de experiencias
          en vivo. Desde hace años trabajamos junto a artistas nacionales e
          internacionales y marcas líderes para crear shows, festivales y
          eventos corporativos memorables.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {AREAS.map((area) => (
            <div
              key={area}
              className="rounded-2xl border border-white/10 px-6 py-8 text-left"
            >
              <p className="text-lg font-semibold">{area}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
