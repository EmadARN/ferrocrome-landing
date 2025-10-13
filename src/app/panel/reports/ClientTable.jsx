"use client";

import DataTable from "@/components/ui/DataTable";

export default function ClientTable({ initialData }) {
  return (
    <div className="w-full">
      <DataTable
        data={initialData}
        searchKey={["name", "email", "companyName"]}
        itemsPerPage={10}
        searchInput
        columns={[
          { key: "name", title: "نام" },
          { key: "email", title: "ایمیل" },
          { key: "phoneNumber", title: "شماره" },
          { key: "companyName", title: "شرکت" },
          {
            key: "saleType",
            title: "نوع فروش",
            render: (row) => (
              <span
                className={`px-3 py-1 rounded-md text-sm font-semibold ${
                  row.saleType === "new-business"
                    ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
                    : row.saleType === "existing-client"
                    ? "bg-gradient-to-r from-green-500 to-green-700 text-white"
                    : "bg-gradient-to-r from-[#a15300] via-[#521f01] to-[#521f01] text-white"
                }`}
              >
                {row.saleType.replace("-", " ")}
              </span>
            ),
          },
          {
            key: "message",
            title: "پیام",
            render: (row) => (
              <span className="max-w-xs break-words text-gray-300">
                {row.message}
              </span>
            ),
          },
          {
            key: "file",
            title: "فایل",
            render: (row) =>
              row.fileUrl ? (
                <a
                  href={row.fileUrl}
                  download
                  target="_blank"
                  className="px-2 py-1 rounded-md bg-transparent cursor-pointer font-semibold inline-flex items-center gap-1 transition"
                >
                  📎 دانلود
                </a>
              ) : (
                <span className="text-gray-400">فاقد فایل</span>
              ),
          },
        ]}
      />
    </div>
  );
}
