import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  date: z.string().min(1, "La fecha es obligatoria"),
  venue: z.string().min(1, "El lugar es obligatorio"),
  imageUrl: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
  ticketUrl: z.string().url("Debe ser una URL válida"),
  description: z.string().optional().or(z.literal("")),
  status: z.enum(["PUBLISHED", "DRAFT"]),
});

export type EventInput = z.infer<typeof eventSchema>;

export const contactSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional().or(z.literal("")),
  message: z.string().min(1, "El mensaje es obligatorio"),
});

export type ContactInput = z.infer<typeof contactSchema>;
