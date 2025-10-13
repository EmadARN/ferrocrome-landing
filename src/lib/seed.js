import bcrypt from "bcrypt";
import { prisma } from "./prisma.js";

async function main() {
  console.log("Seeding database...");

  // ---------- Users ----------
  const adminPassword = await bcrypt.hash("123456", 10);
  const userPassword = await bcrypt.hash("password123", 10);

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: adminPassword,
      name: "Admin",
    },
  });

  const normalUser = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com",
      password: userPassword,
      name: "User Test",
    },
  });

  console.log("Users created:", adminUser.email, normalUser.email);

  // ---------- Form Submissions ----------
  const submissions = [
    {
      name: "John Doe",
      email: "john@example.com",
      phoneNumber: "09123456789",
      companyName: "John Co",
      saleType: "Retail",
      message: "I am interested in your products.",
      fileUrl: null,
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      phoneNumber: "09211234567",
      companyName: "Jane LLC",
      saleType: "Wholesale",
      message: "Please contact me for bulk orders.",
      fileUrl: null,
    },
  ];

  for (const submission of submissions) {
    await prisma.formSubmission.create({ data: submission });
  }
  console.log("Form submissions created:", submissions.length);

  // ---------- Blogs ----------
  const blogs = [
    {
      title: "Introduction to FerroChrome",
      summary: "Learn about FerroChrome and its uses in industry.",
      image: null,
      category: "Education",
      content: "<p>FerroChrome is an alloy of chromium and iron...</p>",
      author: "Admin",
    },
    {
      title: "High Carbon vs Low Carbon FerroChrome",
      summary:
        "Differences and applications of High and Low Carbon FerroChrome.",
      image: null,
      category: "Industry",
      content: "<p>High carbon ferrochrome contains more than 4% carbon...</p>",
      author: "Admin",
    },
  ];

  for (const blog of blogs) {
    const createdBlog = await prisma.blog.create({ data: blog });

    // ---------- Sample Comments ----------
    await prisma.comment.createMany({
      data: [
        {
          text: "Great article!",
          author: "Alice",
          blogId: createdBlog.id,
        },
        {
          text: "Very informative, thanks!",
          author: "Bob",
          blogId: createdBlog.id,
        },
      ],
    });
  }
  console.log("Blogs and sample comments created:", blogs.length);

  console.log("✅ Seeding finished!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
