import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { PastShowForm } from "@/components/admin/PastShowForm";

function toDateInput(date: Date) {
  return date.toISOString().slice(0, 10);
}

export default async function EditPastShowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const show = await prisma.pastShow.findUnique({ where: { id } });

  if (!show) {
    notFound();
  }

  return (
    <div>
      <AdminHeader active="realizados" />

      <div className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="text-2xl font-bold text-neutral-950">
          Editar show realizado
        </h1>
        <p className="mt-1 text-sm text-neutral-500">{show.title}</p>

        <div className="mt-8">
          <PastShowForm
            showId={show.id}
            defaultValues={{
              title: show.title,
              date: toDateInput(show.date),
              venue: show.venue,
              description: show.description ?? "",
              photos: show.photoUrls.map((value) => ({ value })),
              videos: show.videoUrls.map((value) => ({ value })),
            }}
          />
        </div>
      </div>
    </div>
  );
}
