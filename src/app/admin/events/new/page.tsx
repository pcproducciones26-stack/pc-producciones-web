import { AdminHeader } from "@/components/admin/AdminHeader";
import { EventForm } from "@/components/admin/EventForm";

export default function NewEventPage() {
  return (
    <div>
      <AdminHeader active="fechas" />

      <div className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="text-2xl font-bold text-neutral-950">Nueva fecha</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Cargá los datos del evento. Podés guardarlo como borrador y
          publicarlo cuando esté listo.
        </p>

        <div className="mt-8">
          <EventForm />
        </div>
      </div>
    </div>
  );
}
