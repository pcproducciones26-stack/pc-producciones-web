import Image from "next/image";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/pcproduccionesok/" },
  { label: "Facebook", href: "https://www.facebook.com/PCproduccionesOk" },
];

const NAV_LINKS = [
  { href: "#proximos-shows", label: "Próximos Shows" },
  { href: "#eventos-pasados", label: "Eventos pasados" },
  { href: "#quienes-somos", label: "Quiénes Somos" },
  { href: "#contacto", label: "Contacto" },
];

export function Footer() {
  return (
    <footer className="bg-white py-12 text-neutral-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 text-center">
        <Image
          src="/logos/pc-negro.png"
          alt="PC Producciones"
          width={180}
          height={60}
          className="h-14 w-auto"
          style={{ width: "auto" }}
        />

        <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:opacity-70">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex gap-6 text-sm text-neutral-500">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-950"
            >
              {social.label}
            </a>
          ))}
        </div>

        <div className="flex w-full flex-col items-center gap-4 border-t border-neutral-200 pt-6 text-xs text-neutral-400 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} PC Producciones. Todos los derechos reservados.</p>
          <a
            href="#top"
            className="font-medium text-neutral-950 hover:opacity-70"
          >
            Volver arriba
          </a>
        </div>
      </div>
    </footer>
  );
}
