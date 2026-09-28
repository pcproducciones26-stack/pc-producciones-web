import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function PastShowsAdminPage() {
  const shows = await prisma.pastShow.findMany({ orderBy: { date: "desc" } });

  return (
    <div>
      <AdminHeader active="realizados" />

      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-950">
              Eventos pasados
            </h1>
            <p className="text-sm text-neutral-500">
              Cargá fecha, lugar, descripción, fotos y videos de los eventos
              ya hechos.
            </p>
          </div>
          <Link
            href="/admin/shows-realizados/new"
            className="rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
          >
            + Nuevo show
          </Link>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-500">
              <tr>
                <th className="px-4 py-3 font-medium">Título</th>
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3 font-medium">Lugar</th>
                <th className="px-4 py-3 font-medium">Fotos</th>
                <th className="px-4 py-3 font-medium">Videos</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {shows.map((show) => (
                <tr key={show.id} className="border-t border-neutral-100">
                  <td className="px-4 py-3 font-medium text-neutral-950">
                    {show.title}
                  </td>
                  <td className="px-4 py-3 text-neutral-500">
                    {new Date(show.date).toLocaleDateString("es-AR", {
                      timeZone: "UTC",
                    })}
                  </td>
                  <td className="px-4 py-3 text-neutral-500">{show.venue}</td>
                  <td className="px-4 py-3 text-neutral-500">
                    {show.photoUrls.length}
                  </td>
                  <td className="px-4 py-3 text-neutral-500">
                    {show.videoUrls.length}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={`/admin/shows-realizados/${show.id}/edit`}
                        className="text-sm font-medium text-neutral-950 hover:opacity-70"
                      >
                        Editar
                      </Link>
                      <DeleteButton
                        endpoint={`/api/admin/past-shows/${show.id}`}
                        confirmMessage={`¿Eliminar el show "${show.title}"? Esta acción no se puede deshacer.`}
                      />
                    </div>
                  </td>
                </tr>
              ))}

              {shows.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-neutral-400"
                  >
                    Todavía no cargaste ningún evento pasado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
