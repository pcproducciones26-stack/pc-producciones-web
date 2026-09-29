type Props = {
  videoUrl: string;
  title: string;
  subtitle: string;
  ctaLabel: string | null;
  ctaUrl: string | null;
};

export function Hero({ videoUrl, title, subtitle, ctaLabel, ctaUrl }: Props) {
  const showTicketCta = Boolean(ctaLabel && ctaUrl);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-950 text-white">
      <video
        key={videoUrl}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Overlay oscuro para mantener el texto legible sobre el video */}
      <div className="absolute inset-0 bg-neutral-950/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300 sm:text-xl">
          {subtitle}
        </p>

        {showTicketCta && (
          <div className="mt-10 flex items-center justify-center">
            <a
              href={ctaUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200"
            >
              {ctaLabel}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
