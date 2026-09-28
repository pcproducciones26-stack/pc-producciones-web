import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { EventForm } from "@/components/admin/EventForm";

function toDatetimeLocal(date: Date) {
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 16);
}

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
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-2xl font-bold text-neutral-950">Editar fecha</h1>
      <p className="mt-1 text-sm text-neutral-500">{event.title}</p>

      <div className="mt-8">
        <EventForm
          eventId={event.id}
          defaultValues={{
            title: event.title,
            date: toDatetimeLocal(event.date),
            venue: event.venue,
            imageUrl: event.imageUrl ?? "",
            ticketUrl: event.ticketUrl,
            description: event.description ?? "",
            status: event.status,
          }}
        />
      </div>
    </div>
  );
}
