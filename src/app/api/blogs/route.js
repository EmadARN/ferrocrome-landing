import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

export async function GET(req) {
  try {
    const {
      search = "",
      page = "1",
      limit = "10",
    } = Object.fromEntries(new URL(req.url).searchParams);

    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);

    // Filter query
    const where = search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { author: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    // تعداد کل بلاگ‌ها
    const totalItems = await prisma.blog.count({ where });
    const totalPages = Math.ceil(totalItems / pageSize);

    const blogs = await prisma.blog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
    });

    return NextResponse.json({ blogs, totalPages });
  } catch (error) {
    console.error("GET blogs error:", error);
    return NextResponse.json(
      { error: "خطا در دریافت بلاگ‌ها" },
      { status: 500 }
    );
  }
}

// 📝 POST: افزودن بلاگ جدید
export const POST = async (req) => {
  const formData = await req.formData(); // فقط در App Router
  const title = formData.get("title");
  const summary = formData.get("summary");
  const content = formData.get("content");
  const category = formData.get("category");
  const author = formData.get("author");
  const imageFile = formData.get("image"); // File object

  let imageUrl = null;
  if (imageFile && imageFile.size > 0) {
    const uploadsDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

    const filePath = path.join(uploadsDir, imageFile.name);
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    fs.writeFileSync(filePath, buffer);
    imageUrl = "/uploads/" + imageFile.name;
  }

  const newBlog = await prisma.blog.create({
    data: { title, summary, category, content, author, image: imageUrl },
  });

  return new Response(JSON.stringify(newBlog), { status: 201 });
};
