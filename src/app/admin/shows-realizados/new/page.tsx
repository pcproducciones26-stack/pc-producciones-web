import { AdminHeader } from "@/components/admin/AdminHeader";
import { PastShowForm } from "@/components/admin/PastShowForm";

export default function NewPastShowPage() {
  return (
    <div>
      <AdminHeader active="realizados" />

      <div className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="text-2xl font-bold text-neutral-950">
          Nuevo evento pasado
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Cargá los datos del show, y las fotos/videos que quieras mostrar.
        </p>

        <div className="mt-8">
          <PastShowForm />
        </div>
      </div>
    </div>
  );
}
