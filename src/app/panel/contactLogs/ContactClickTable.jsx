"use client";

import { useState, useMemo, useEffect } from "react";
import DataTable from "@/components/ui/DataTable";
import SearchInput from "@/components/ui/SearchInput";
import LoadingState from "@/components/ui/LoadingState";
import EmptyState from "@/components/ui/EmptyState";
import * as XLSX from "xlsx";

export default function ContactClickTable({ initialData = [] }) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [prevSearch, setPrevSearch] = useState("");
  const itemsPerPage = 5;

  // فیلتر داده‌ها بر اساس سرچ
  const filteredData = useMemo(() => {
    if (!search) return initialData;
    return initialData.filter((row) =>
      ["ip", "city", "region", "country", "path", "userAgent"].some((key) =>
        String(row[key] ?? "")
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    );
  }, [initialData, search]);

  // محاسبه totalPages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // حفظ currentPage پایدار
  useEffect(() => {
    if (search !== prevSearch) {
      setCurrentPage(1); // فقط وقتی سرچ تغییر کرد صفحه ریست شود
      setPrevSearch(search);
    } else if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1); // اگر داده‌ها کمتر شد، به آخرین صفحه معتبر برو
    }
  }, [search, prevSearch, currentPage, totalPages]);

  // محاسبه داده‌های صفحه جاری با useMemo
  const pageData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredData.slice(start, end);
  }, [filteredData, currentPage]);

  // لودینگ کوتاه برای UX بهتر
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, [search, initialData]);

  // خروجی اکسل
  const exportToExcel = () => {
    if (!filteredData.length) return;
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ContactLogs");
    XLSX.writeFile(workbook, "contact_click_logs.xlsx");
  };

  if (!initialData.length) return <EmptyState text="هیچ کلیکی ثبت نشده است." />;
  if (loading) return <LoadingState text="در حال بارگذاری داده‌ها..." />;

  return (
    <div className="w-full mt-8 sm:mt-12">
      {/* Search + Export */}
      <div className="flex flex-row text-[12px] sm:text-[16px] justify-between items-start sm:items-center gap-2 mb-4">
        <SearchInput
          value={search}
          onChange={(val) => setSearch(val)}
          placeholder="جستجو در IP، مسیر، موقعیت..."
        />
        <button
          onClick={exportToExcel}
          className="max-w-[120px] px-4 py-2 text-[0.75rem] lg:text-[0.90rem] bg-green-700 text-white rounded-md cursor-pointer hover:bg-green-800 transition w-full sm:w-auto"
        >
          خروجی اکسل
        </button>
      </div>

      {/* DataTable */}
      <DataTable
        data={pageData}
        searchKey={[]} // سرچ بیرونی انجام شده
        searchInput={false}
        typeKey="type"
        columns={[
          {
            key: "createdAt",
            title: "تاریخ",
            render: (row) => (
              <span>{new Date(row.createdAt).toLocaleString("fa-IR")}</span>
            ),
          },
          { key: "ip", title: "IP" },
          {
            key: "location",
            title: "موقعیت",
            render: (row) => (
              <span>
                {row.city ?? ""} {row.region ?? ""} {row.country ?? ""}{" "}
                {row.latitude && row.longitude
                  ? `(${row.latitude}, ${row.longitude})`
                  : ""}
              </span>
            ),
          },
          {
            key: "userAgent",
            title: "مرورگر / دستگاه",
            render: (row) => (
              <span className="block max-w-[200px] truncate text-gray-300">
                {row.userAgent}
              </span>
            ),
          },
          { key: "path", title: "مسیر" },
        ]}
      />

      {/* Pagination */}
      <div className="mt-4 flex justify-end items-center gap-2 flex-wrap sm:flex-nowrap">
        <button
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 text-[12px] sm:text-[16px] cursor-pointer bg-gray-700 rounded disabled:opacity-50"
        >
          قبلی
        </button>
        <span className="whitespace-nowrap">
          صفحه {currentPage} از {totalPages}
        </span>
        <button
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 text-[12px] sm:text-[16px] cursor-pointer bg-gray-700 rounded disabled:opacity-50"
        >
          بعدی
        </button>
      </div>
    </div>
  );
}
