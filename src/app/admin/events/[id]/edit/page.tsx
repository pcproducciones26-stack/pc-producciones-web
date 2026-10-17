import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { toArgentinaDatetimeLocal } from "@/lib/dates";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { EventForm } from "@/components/admin/EventForm";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id } });

  if (!event) {
    notFound();
  }

  return (
    <div>
      <AdminHeader active="fechas" />

      <div className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="text-2xl font-bold text-neutral-950">Editar fecha</h1>
        <p className="mt-1 text-sm text-neutral-500">{event.title}</p>

        <div className="mt-8">
          <EventForm
            eventId={event.id}
            defaultValues={{
              title: event.title,
              date: toArgentinaDatetimeLocal(event.date),
              venue: event.venue,
              imageUrl: event.imageUrl ?? "",
              ticketUrl: event.ticketUrl,
              description: event.description ?? "",
              status: event.status,
            }}
          />
        </div>
      </div>
    </div>
  );
}
