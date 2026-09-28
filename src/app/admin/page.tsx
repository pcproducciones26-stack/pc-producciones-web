import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { DeleteEventButton } from "@/components/admin/DeleteEventButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const events = await prisma.event.findMany({ orderBy: { date: "desc" } });

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-950">
            Próximas fechas
          </h1>
          <p className="text-sm text-neutral-500">
            Gestioná las fechas que se muestran en la home.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/admin/events/new"
            className="rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
          >
            + Nueva fecha
          </Link>
          <LogoutButton />
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-neutral-500">
            <tr>
              <th className="px-4 py-3 font-medium">Título</th>
              <th className="px-4 py-3 font-medium">Fecha</th>
              <th className="px-4 py-3 font-medium">Lugar</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-t border-neutral-100">
                <td className="px-4 py-3 font-medium text-neutral-950">
                  {event.title}
                </td>
                <td className="px-4 py-3 text-neutral-500">
                  {new Date(event.date).toLocaleDateString("es-AR")}
                </td>
                <td className="px-4 py-3 text-neutral-500">{event.venue}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      event.status === "PUBLISHED"
                        ? "bg-green-100 text-green-700"
                        : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    {event.status === "PUBLISHED" ? "Publicado" : "Borrador"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/events/${event.id}/edit`}
                      className="text-sm font-medium text-neutral-950 hover:opacity-70"
                    >
                      Editar
                    </Link>
                    <DeleteEventButton id={event.id} title={event.title} />
                  </div>
                </td>
              </tr>
            ))}

            {events.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-neutral-400"
                >
                  Todavía no cargaste ninguna fecha.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
