"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  instagramPostSchema,
  type InstagramPostInput,
} from "@/lib/validations";

type Props = {
  postId?: string;
  defaultValues?: Partial<InstagramPostInput>;
};

export function InstagramPostForm({ postId, defaultValues }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InstagramPostInput>({
    resolver: zodResolver(instagramPostSchema),
    defaultValues,
  });

  const onSubmit = async (data: InstagramPostInput) => {
    setServerError(null);

    const url = postId
      ? `/api/admin/instagram-posts/${postId}`
      : "/api/admin/instagram-posts";
    const method = postId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      setServerError("No se pudo guardar la foto. Revisá la URL.");
      return;
    }

    if (postId) {
      router.push("/admin/instagram");
    } else {
      reset();
    }
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-6"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
          <label className="text-sm font-medium" htmlFor="postUrl">
            Link al post de Instagram (opcional)
          </label>
          <input
            id="postUrl"
            placeholder="https://www.instagram.com/p/..."
            className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-950"
            {...register("postUrl")}
          />
          {errors.postUrl && (
            <p className="mt-1 text-xs text-red-600">
              {errors.postUrl.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium" htmlFor="caption">
          Descripción (opcional)
        </label>
        <input
          id="caption"
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-950"
          {...register("caption")}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="text-sm font-medium" htmlFor="eventDate">
            Fecha (opcional)
          </label>
          <input
            id="eventDate"
            type="date"
            className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-950"
            {...register("eventDate")}
          />
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="venue">
            Lugar (opcional)
          </label>
          <input
            id="venue"
            placeholder="Movistar Arena"
            className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-950"
            {...register("venue")}
          />
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="city">
            Ciudad (opcional)
          </label>
          <input
            id="city"
            placeholder="Buenos Aires"
            className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-950"
            {...register("city")}
          />
        </div>
      </div>

      {serverError && <p className="text-sm text-red-600">{serverError}</p>}

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-50"
        >
          {isSubmitting
            ? "Guardando..."
            : postId
              ? "Guardar cambios"
              : "+ Agregar foto"}
        </button>
      </div>
    </form>
  );
}
