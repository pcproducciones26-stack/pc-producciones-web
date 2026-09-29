type Props = {
  text: string;
  areas: string[];
};

export function AboutSection({ text, areas }: Props) {
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
          {text}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {areas.map((area) => (
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
