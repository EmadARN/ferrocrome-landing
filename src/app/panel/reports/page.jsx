import { prisma } from "@/lib/prisma";
import ClientTable from "./ClientTable";

// جلوگیری از prerender در زمان build
export const dynamic = "force-dynamic";

export default async function Reports() {
  // دریافت داده‌ها از Prisma
  const submissions = await prisma.formSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <ClientTable initialData={submissions} />;
}
