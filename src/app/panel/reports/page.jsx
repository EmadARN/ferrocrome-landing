import React from "react";
import ClientTable from "./ClientTable";

const Reports = async () => {
  const submissions = await prisma.formSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });
  return <ClientTable initialData={submissions} />;
};

export default Reports;
