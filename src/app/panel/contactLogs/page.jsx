import { prisma } from "@/lib/prisma";
import ContactClickTable from "./ContactClickTable";

export default async function Page() {
  const logs = await prisma.contactClick.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <main className="p-4">
      <ContactClickTable initialData={logs} />
    </main>
  );
}
