import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { ToggleReadButton } from "@/components/admin/ToggleReadButton";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return date.toLocaleString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function MessagesAdminPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <AdminHeader active="messages" />

      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-2xl font-bold text-neutral-950">
          Mensajes de contacto
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Consultas enviadas desde el formulario de la web.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`rounded-2xl border p-5 ${
                msg.read
                  ? "border-neutral-200 bg-white"
                  : "border-neutral-950 bg-neutral-50"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-neutral-950">
                    {msg.name}{" "}
                    {!msg.read && (
                      <span className="ml-2 rounded-full bg-neutral-950 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                        Nuevo
                      </span>
                    )}
                  </p>
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-sm text-neutral-500 hover:text-neutral-950"
                  >
                    {msg.email}
                  </a>
                </div>
                <p className="text-xs text-neutral-400">
                  {formatDate(msg.createdAt)}
                </p>
              </div>

              <p className="mt-3 whitespace-pre-wrap text-sm text-neutral-700">
                {msg.message}
              </p>

              <div className="mt-4 flex items-center gap-4 border-t border-neutral-200 pt-3">
                <ToggleReadButton id={msg.id} read={msg.read} />
                <DeleteButton
                  endpoint={`/api/admin/messages/${msg.id}`}
                  confirmMessage="¿Eliminar este mensaje?"
                />
              </div>
            </div>
          ))}

          {messages.length === 0 && (
            <p className="py-10 text-center text-neutral-400">
              Todavía no llegó ningún mensaje.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
