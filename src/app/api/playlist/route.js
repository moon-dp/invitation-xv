import { NextResponse } from "next/server";

const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);
    const cancion = body?.url?.trim();

    if (!cancion) {
      return NextResponse.json({ error: "Falta el nombre o link de la canción" }, { status: 400 });
    }

    if (!SCRIPT_URL) {
      return NextResponse.json({ error: "Servicio no configurado" }, { status: 503 });
    }

    const res = await fetch(SCRIPT_URL, {
      method:   "POST",
      headers:  { "Content-Type": "application/json" },
      body:     JSON.stringify({ url: cancion }),
      redirect: "follow",
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Error al guardar la canción" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
