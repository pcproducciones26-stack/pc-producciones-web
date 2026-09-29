import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { name, email, message } = parsed.data;

  await prisma.contactMessage.create({
    data: { name, email, message },
  });

  const to = process.env.CONTACT_EMAIL_TO;
  const apiKey = process.env.RESEND_API_KEY;

  if (to && apiKey) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: "PC Producciones <onboarding@resend.dev>",
        to,
        replyTo: email,
        subject: `Nueva consulta de ${name} desde la web`,
        text: [`Nombre: ${name}`, `Email: ${email}`, "", message].join("\n"),
      });
    } catch (error) {
      // El mensaje ya quedo guardado en el admin, el email es un extra.
      console.error("[contact] error enviando email", error);
    }
  }

  return NextResponse.json({ ok: true });
}
