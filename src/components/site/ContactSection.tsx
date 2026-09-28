"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/validations";

type Props = {
  contactEmail: string;
  whatsappNumber: string;
};

export function ContactSection({ contactEmail, whatsappNumber }: Props) {
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

  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hola, quiero hacer una consulta a PC Producciones"
  )}`;

  return (
    <section id="contacto" className="bg-neutral-50 py-24">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Contacto
          </h2>
          <p className="mt-4 text-neutral-500">
            ¿Tenés una consulta sobre un evento o querés trabajar con
            nosotros? Escribinos.
          </p>

          <dl className="mt-8 space-y-3 text-sm">
            <div>
              <dt className="font-semibold text-neutral-950">Email</dt>
              <dd className="text-neutral-500">{contactEmail}</dd>
            </div>
            <div>
              <dt className="font-semibold text-neutral-950">Ubicación</dt>
              <dd className="text-neutral-500">Santa Fe, Argentina</dd>
            </div>
          </dl>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Escribinos por WhatsApp
          </a>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-6"
        >
          <div>
            <label className="text-sm font-medium" htmlFor="name">
              Nombre
            </label>
            <input
              id="name"
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-950"
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-950"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium" htmlFor="phone">
              Teléfono (opcional)
            </label>
            <input
              id="phone"
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-950"
              {...register("phone")}
            />
          </div>

          <div>
            <label className="text-sm font-medium" htmlFor="message">
              Mensaje
            </label>
            <textarea
              id="message"
              rows={4}
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-950"
              {...register("message")}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-600">
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-2 rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-50"
          >
            {status === "sending" ? "Enviando..." : "Enviar mensaje"}
          </button>

          {status === "sent" && (
            <p className="text-sm text-green-600">
              ¡Gracias! Te vamos a responder a la brevedad.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-600">
              Ocurrió un error al enviar el mensaje. Probá de nuevo.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
