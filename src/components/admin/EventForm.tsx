"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema, type EventInput } from "@/lib/validations";

type Props = {
  eventId?: string;
  defaultValues?: Partial<EventInput>;
};

export function EventForm({ eventId, defaultValues }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventInput>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      status: "DRAFT",
      ...defaultValues,
    },
  });

  const onSubmit = async (data: EventInput) => {
    setServerError(null);

    const url = eventId ? `/api/admin/events/${eventId}` : "/api/admin/events";
    const method = eventId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      setServerError("No se pudo guardar el evento. Revisá los datos.");
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 rounded-2xl border border-neutral-200 bg-white p-6"
    >
      <div>
        <label className="text-sm font-medium" htmlFor="title">
          Título del evento
        </label>
        <input
          id="title"
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-950"
          {...register("title")}
        />
        {errors.title && (
          <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium" htmlFor="date">
            Fecha y hora
          </label>
          <input
            id="date"
            type="datetime-local"
            className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-950"
            {...register("date")}
          />
          {errors.date && (
            <p className="mt-1 text-xs text-red-600">{errors.date.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="venue">
            Lugar
          </label>
          <input
            id="venue"
            className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-950"
            {...register("venue")}
          />
          {errors.venue && (
            <p className="mt-1 text-xs text-red-600">{errors.venue.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium" htmlFor="imageUrl">
          URL de la imagen
        </label>
        <input
          id="imageUrl"
          placeholder="https://..."
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-950"
          {...register("imageUrl")}
        />
        {errors.imageUrl && (
          <p className="mt-1 text-xs text-red-600">
            {errors.imageUrl.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium" htmlFor="ticketUrl">
          Link de entradas
        </label>
        <input
          id="ticketUrl"
          placeholder="https://..."
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-950"
          {...register("ticketUrl")}
        />
        {errors.ticketUrl && (
          <p className="mt-1 text-xs text-red-600">
            {errors.ticketUrl.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium" htmlFor="description">
          Descripción (opcional)
        </label>
        <textarea
          id="description"
          rows={3}
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-950"
          {...register("description")}
        />
      </div>

      <div>
        <label className="text-sm font-medium" htmlFor="status">
          Estado
        </label>
        <select
          id="status"
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-950"
          {...register("status")}
        >
          <option value="DRAFT">Borrador (no se muestra en la web)</option>
          <option value="PUBLISHED">Publicado</option>
        </select>
      </div>

      {serverError && <p className="text-sm text-red-600">{serverError}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-50"
        >
          {isSubmitting ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </form>
  );
}
