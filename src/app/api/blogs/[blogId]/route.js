import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";
export async function POST(req, { params }) {
  try {
    const { blogId } = params;
    const body = await req.json();
    const { author, text } = body;

    if (!author || !text) {
      return new Response(JSON.stringify({ error: "فیلدها کامل نیستند" }), {
        status: 400,
      });
    }

    const comment = await prisma.comment.create({
      data: {
        blogId: Number(blogId),
        author,
        text,
      },
    });

    return new Response(JSON.stringify(comment), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "خطا در ارسال کامنت" }), {
      status: 500,
    });
  }
}

export async function PUT(req, { params }) {
  try {
    const { blogId } = params;
    const formData = await req.formData();

    const title = formData.get("title");
    const summary = formData.get("summary");
    const category = formData.get("category");
    const author = formData.get("author");
    const content = formData.get("content");
    const imageFile = formData.get("image");

    if (!title || !summary || !category || !author || !content) {
      return new Response(JSON.stringify({ error: "تمام فیلدها الزامی است" }), {
        status: 400,
      });
    }

    let imageUrl = undefined;
    if (imageFile && imageFile.size > 0) {
      const uploadsDir = path.join(process.cwd(), "public/uploads");
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
      const filePath = path.join(uploadsDir, imageFile.name);
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      imageUrl = "/uploads/" + imageFile.name;
    }

    const updateData = { title, summary, category, author, content };
    if (imageUrl) updateData.image = imageUrl;

    const updatedBlog = await prisma.blog.update({
      where: { id: Number(blogId) },
      data: updateData,
    });

    return new Response(JSON.stringify(updatedBlog), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "خطا در بروزرسانی بلاگ" }), {
      status: 500,
    });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { blogId } = params;
    await prisma.blog.delete({ where: { id: Number(blogId) } });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "خطا در حذف بلاگ" }), {
      status: 500,
    });
  }
}
