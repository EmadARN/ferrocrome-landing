// app/dashboard/page.tsx
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ClientTable from "./ClientTable";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const submissions = await prisma.formSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-[#0A0A1A] via-[#16213E] to-[#0F3460] text-white font-sans">
      <h1 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-white via-gray-400 to-gray-300 bg-clip-text text-transparent">
        گزارشگیری
      </h1>

      <ClientTable initialData={submissions} />
    </div>
  );
}
