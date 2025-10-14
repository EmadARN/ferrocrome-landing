import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req) {
  try {
    const { blogId } = Object.fromEntries(new URL(req.url).searchParams);

    const whereClause = blogId ? { blogId: parseInt(blogId) } : {}; // اگر blogId نبود، همه را بگیر

    const comments = await prisma.comment.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      include: { blog: { select: { title: true } } }, // برای نمایش عنوان پست در پنل
    });

    return NextResponse.json({ comments });
  } catch (error) {
    console.error("GET comments error:", error);
    return NextResponse.json(
      { error: "خطا در دریافت دیدگاه‌ها" },
      { status: 500 }
    );
  }
}
