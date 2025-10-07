import bcrypt from "bcrypt";
import { prisma } from "./prisma.js";

async function main() {
  const passwordHash = await bcrypt.hash("123456", 10);
  const user = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: passwordHash,
      name: "Admin",
    },
  });
  console.log("Admin user created:", user);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
