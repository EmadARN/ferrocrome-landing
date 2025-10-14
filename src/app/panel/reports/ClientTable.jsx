"use client";

import { useState, useMemo } from "react";
import DataTable from "@/components/ui/DataTable";
import SearchInput from "@/components/ui/SearchInput";
import LoadingState from "@/components/ui/LoadingState";
import EmptyState from "@/components/ui/EmptyState";
import * as XLSX from "xlsx";

export default function ClientTable({ initialData = [] }) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(false);

  // داده‌های فیلتر شده بر اساس سرچ
  const filteredData = useMemo(() => {
    setLoading(true);
    const result = search
      ? initialData.filter((row) =>
          ["name", "email", "companyName"].some((key) =>
            String(row[key] ?? "")
              .toLowerCase()
              .includes(search.toLowerCase())
          )
        )
      : initialData;
    setLoading(false);
    return result;
  }, [initialData, search]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const pageData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // خروجی اکسل
  const exportToExcel = () => {
    if (!filteredData.length) return;
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
    XLSX.writeFile(workbook, "customers.xlsx");
  };

  if (!initialData.length) return <EmptyState text="هیچ مشتری‌ای یافت نشد." />;
  if (loading) return <LoadingState text="در حال بارگذاری داده‌ها..." />;

  return (
    <div className="w-full mt-12">
      {/* Search + Export */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
        <SearchInput
          value={search}
          onChange={(val) => {
            setSearch(val);
            setCurrentPage(1);
          }}
          placeholder="جستجو..."
        />
        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-green-700 text-white rounded-md cursor-pointer hover:bg-green-700 transition"
        >
          خروجی اکسل
        </button>
      </div>

      {/* DataTable */}
      <DataTable
        data={pageData}
        searchKey={[]} // سرچ بیرونی انجام شده
        searchInput={false}
        itemsPerPage={itemsPerPage}
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

      {/* Pagination */}
      <div className="mt-4 flex justify-end items-center gap-2">
        <button
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-3 py-1 cursor-pointer bg-gray-700 rounded disabled:opacity-50"
        >
          قبلی
        </button>
        <span>
          صفحه {currentPage} از {totalPages}
        </span>
        <button
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-3 py-1 cursor-pointer bg-gray-700 rounded disabled:opacity-50"
        >
          بعدی
        </button>
      </div>
    </div>
  );
}
