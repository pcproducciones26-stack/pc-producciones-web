import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
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
  const to = process.env.CONTACT_EMAIL_TO;
  const apiKey = process.env.RESEND_API_KEY;

  if (!to) {
    return NextResponse.json(
      { error: "El destino de contacto no esta configurado" },
      { status: 500 }
    );
  }

  const emailBody = [`Nombre: ${name}`, `Email: ${email}`, "", message].join(
    "\n"
  );

  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY no configurada, se loguea el mensaje en vez de enviarlo:",
      emailBody
    );
    return NextResponse.json({ ok: true, mode: "logged" });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "PC Producciones <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: `Nueva consulta de ${name} desde la web`,
      text: emailBody,
    });
    return NextResponse.json({ ok: true, mode: "sent" });
  } catch (error) {
    console.error("[contact] error enviando email", error);
    return NextResponse.json(
      { error: "No se pudo enviar el mensaje" },
      { status: 502 }
    );
  }
}
