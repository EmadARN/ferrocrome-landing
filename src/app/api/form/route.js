import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const phoneNumber = formData.get("phoneNumber");
    const companyName = formData.get("companyName");
    const saleType = formData.get("saleType");
    const message = formData.get("message");
    const file = formData.get("file");

    let fileUrl = "";

    if (file && file.name) {
      const uploadDir = path.join(process.cwd(), "public/uploads");
      await fs.mkdir(uploadDir, { recursive: true });

      const buffer = Buffer.from(await file.arrayBuffer());
      const filePath = path.join(uploadDir, file.name);

      await fs.writeFile(filePath, buffer);
      fileUrl = `/uploads/${file.name}`;
    }

    const submission = await prisma.formSubmission.create({
      data: {
        name,
        email,
        phoneNumber,
        companyName,
        saleType,
        message,
        fileUrl,
      },
    });



    return new Response(JSON.stringify(submission), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("❌ خطا در POST:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const submissions = await prisma.formSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });
    return new Response(JSON.stringify(submissions), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("❌ خطا در GET:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
