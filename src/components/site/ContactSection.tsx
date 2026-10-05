"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/validations";

type Props = {
  contactEmail: string;
};

export function ContactSection({ contactEmail }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contacto"
      className="scroll-mt-24 bg-neutral-950 py-24 sm:scroll-mt-36"
    >
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Contacto
          </h2>
          <p className="mt-4 text-neutral-400">
            ¿Tenés una consulta sobre un evento o querés trabajar con
            nosotros? Escribinos.
          </p>

          <dl className="mt-8 space-y-3 text-sm">
            <div>
              <dt className="font-semibold text-white">Email</dt>
              <dd className="text-neutral-400">{contactEmail}</dd>
            </div>
            <div>
              <dt className="font-semibold text-white">Ubicación</dt>
              <dd className="text-neutral-400">Santa Fe, Argentina</dd>
            </div>
          </dl>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-neutral-900 p-6"
        >
          <div>
            <label className="text-sm font-medium text-neutral-200" htmlFor="name">
              Nombre
            </label>
            <input
              id="name"
              className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-white"
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-200" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-white"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-200" htmlFor="message">
              Mensaje
            </label>
            <textarea
              id="message"
              rows={4}
              className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-white"
              {...register("message")}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-400">
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200 disabled:opacity-50"
          >
            {status === "sending" ? "Enviando..." : "Enviar mensaje"}
          </button>

          {status === "sent" && (
            <p className="text-sm text-green-400">
              ¡Gracias! Te vamos a responder a la brevedad.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-400">
              Ocurrió un error al enviar el mensaje. Probá de nuevo.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
