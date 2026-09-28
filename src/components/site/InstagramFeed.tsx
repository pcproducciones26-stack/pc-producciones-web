const WIDGET_ID = process.env.NEXT_PUBLIC_INSTAGRAM_WIDGET_ID;

export function InstagramFeed() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Seguinos en Instagram
        </h2>
        <p className="mt-3 text-neutral-500">
          {/* [@USUARIO_INSTAGRAM] */}
          Lo último de @pcproducciones
        </p>

        <div className="mt-12">
          {WIDGET_ID ? (
            <iframe
              title="Feed de Instagram"
              src={`https://snapwidget.com/embed/${WIDGET_ID}`}
              className="mx-auto h-[480px] w-full max-w-5xl border-0"
              loading="lazy"
            />
          ) : (
            <div className="mx-auto flex h-64 max-w-2xl items-center justify-center rounded-2xl border border-dashed border-neutral-300 text-sm text-neutral-400">
              Configurar NEXT_PUBLIC_INSTAGRAM_WIDGET_ID (SnapWidget/Elfsight/
              LightWidget) para mostrar el feed de Instagram acá.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
