export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
          Experiencias en vivo
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300 sm:text-xl">
          {/* [COPY HERO] — reemplazar por la bajada definitiva de PC */}
          PC es una productora especializada en el desarrollo de experiencias
          en vivo: shows, festivales y eventos corporativos.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#proximos-shows"
            className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200"
          >
            Ver próximos shows
          </a>
          <a
            href="#quienes-somos"
            className="rounded-full border border-white/40 px-8 py-3 text-sm font-semibold text-white transition hover:border-white"
          >
            Conocé la productora
          </a>
        </div>
      </div>
    </section>
  );
}
