"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  pastShowFormSchema,
  type PastShowFormInput,
} from "@/lib/validations";

type Props = {
  showId?: string;
  defaultValues?: Partial<PastShowFormInput>;
};

function UrlListField({
  label,
  placeholder,
  name,
  control,
  register,
  errors,
}: {
  label: string;
  placeholder: string;
  name: "photos" | "videos";
  control: ReturnType<typeof useForm<PastShowFormInput>>["control"];
  register: ReturnType<typeof useForm<PastShowFormInput>>["register"];
  errors: ReturnType<typeof useForm<PastShowFormInput>>["formState"]["errors"];
}) {
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{label}</label>
        <button
          type="button"
          onClick={() => append({ value: "" })}
          className="text-xs font-semibold text-neutral-950 hover:opacity-70"
        >
          + Agregar
        </button>
      </div>

      <div className="mt-2 flex flex-col gap-2">
        {fields.length === 0 && (
          <p className="text-xs text-neutral-400">
            Todavía no agregaste ningún link.
          </p>
        )}

        {fields.map((field, index) => (
          <div key={field.id} className="flex items-start gap-2">
            <div className="flex-1">
              <input
                placeholder={placeholder}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-950"
                {...register(`${name}.${index}.value` as const)}
              />
              {errors[name]?.[index]?.value && (
                <p className="mt-1 text-xs text-red-600">
                  {errors[name]?.[index]?.value?.message}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => remove(index)}
              className="mt-1 text-xs font-medium text-red-600 hover:text-red-800"
            >
              Quitar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PastShowForm({ showId, defaultValues }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PastShowFormInput>({
    resolver: zodResolver(pastShowFormSchema),
    defaultValues: {
      photos: [],
      videos: [],
      ...defaultValues,
    },
  });

  const onSubmit = async (data: PastShowFormInput) => {
    setServerError(null);

    const payload = {
      title: data.title,
      date: data.date,
      venue: data.venue,
      description: data.description,
      photoUrls: data.photos.map((p) => p.value),
      videoUrls: data.videos.map((v) => v.value),
    };

    const url = showId
      ? `/api/admin/past-shows/${showId}`
      : "/api/admin/past-shows";
    const method = showId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setServerError("No se pudo guardar el show. Revisá los datos.");
      return;
    }

    router.push("/admin/shows-realizados");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 rounded-2xl border border-neutral-200 bg-white p-6"
    >
      <div>
        <label className="text-sm font-medium" htmlFor="title">
          Título del show
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
            Fecha
          </label>
          <input
            id="date"
            type="date"
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
            <p className="mt-1 text-xs text-red-600">
              {errors.venue.message}
            </p>
          )}
        </div>
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

      <UrlListField
        label="Fotos (URLs)"
        placeholder="https://..."
        name="photos"
        control={control}
        register={register}
        errors={errors}
      />

      <UrlListField
        label="Videos (links de YouTube, Instagram, etc)"
        placeholder="https://..."
        name="videos"
        control={control}
        register={register}
        errors={errors}
      />

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
