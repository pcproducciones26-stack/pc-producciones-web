import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

const TABS = [
  { href: "/admin", label: "Próximas fechas" },
  { href: "/admin/shows-realizados", label: "Eventos pasados" },
  { href: "/admin/instagram", label: "Instagram" },
  { href: "/admin/messages", label: "Mensajes" },
  { href: "/admin/settings", label: "Configuración" },
];

export function AdminHeader({
  active,
}: {
  active: "fechas" | "realizados" | "instagram" | "messages" | "settings";
}) {
  return (
    <div className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <nav className="flex gap-6 text-sm font-medium">
          {TABS.map((tab) => {
            const isActive =
              (active === "fechas" && tab.href === "/admin") ||
              (active === "realizados" &&
                tab.href === "/admin/shows-realizados") ||
              (active === "instagram" && tab.href === "/admin/instagram") ||
              (active === "messages" && tab.href === "/admin/messages") ||
              (active === "settings" && tab.href === "/admin/settings");
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={isActive ? "text-neutral-950" : "text-neutral-400 hover:text-neutral-950"}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-neutral-500 hover:text-neutral-950"
          >
            Ver sitio ↗
          </a>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
