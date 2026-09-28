const WIDGET_ID = process.env.NEXT_PUBLIC_INSTAGRAM_WIDGET_ID;
const INSTAGRAM_URL = "https://www.instagram.com/pcproduccionesok/";

export function InstagramFeed() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Seguinos en Instagram
        </h2>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-neutral-500 hover:text-neutral-950"
        >
          Lo último de @pcproduccionesok
        </a>

        <div className="mt-12">
          {WIDGET_ID ? (
            <iframe
              title="Feed de Instagram"
              src={`https://snapwidget.com/embed/${WIDGET_ID}`}
              className="mx-auto h-[480px] w-full max-w-5xl border-0"
              loading="lazy"
            />
          ) : (
            <div className="mx-auto flex h-64 max-w-2xl flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-neutral-300 text-sm text-neutral-400">
              <p>
                Configurar NEXT_PUBLIC_INSTAGRAM_WIDGET_ID (SnapWidget/
                Elfsight/LightWidget) para mostrar el feed acá.
              </p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-neutral-950 px-5 py-2 text-xs font-semibold text-white hover:bg-neutral-800"
              >
                Ver perfil en Instagram
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
