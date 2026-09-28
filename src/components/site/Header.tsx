"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#proximos-shows", label: "Próximos Shows" },
  { href: "#shows-realizados", label: "Shows" },
  { href: "#quienes-somos", label: "Quiénes Somos" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        dark ? "bg-white text-neutral-950 shadow-sm" : "bg-transparent text-white"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2">
        <a href="#top" className="flex items-center gap-2">
          <Image
            src={dark ? "/logos/pc-negro.png" : "/logos/pc-blanco.png"}
            alt="PC Producciones — volver al inicio"
            width={340}
            height={113}
            className="h-24 w-auto sm:h-36"
            style={{ width: "auto" }}
            priority
          />
        </a>

        <nav className="hidden gap-8 text-sm font-medium tracking-wide md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:opacity-70">
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Abrir menú"
          className="md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="block h-0.5 w-6 bg-current" />
          <span className="mt-1.5 block h-0.5 w-6 bg-current" />
          <span className="mt-1.5 block h-0.5 w-6 bg-current" />
        </button>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 bg-white px-6 pb-6 text-neutral-950 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-2 text-sm font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
