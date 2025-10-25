import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function fetchGeo() {
  try {
    // درخواست خالی می‌فرستیم، IP خودکار توسط سرویس تشخیص داده می‌شود
    const res = await fetch("https://ipwhois.app/json/");
    if (!res.ok) return null;

    const j = await res.json();
    if (!j.success) return null;

    return {
      ip: j.ip ?? null,
      country: j.country ?? null,
      region: j.region ?? null,
      city: j.city ?? null,
      latitude: j.latitude ?? null,
      longitude: j.longitude ?? null,
    };
  } catch (err) {
    console.error("fetchGeo error:", err);
    return null;
  }
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));

    const userAgent = req.headers.get("user-agent") ?? null;
    const referer = req.headers.get("referer") ?? null;

    const geo = await fetchGeo();

    const record = await prisma.contactClick.create({
      data: {
        ip: geo?.ip ?? null,
        userAgent,
        referer,
        path: body.path ?? null,
        country: geo?.country ?? null,
        region: geo?.region ?? null,
        city: geo?.city ?? null,
        latitude: geo?.latitude ?? null,
        longitude: geo?.longitude ?? null,
        meta: body.meta ?? {},
      },
    });

    return NextResponse.json({ ok: true, id: record.id });
  } catch (err) {
    console.error("track-contact error:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
