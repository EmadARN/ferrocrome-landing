
"use client";

import { useState, useMemo } from "react";
import SearchInput from "./SearchInput";
import Pagination from "./Pagination";
import Tooltip from "./Tooltip";
import DataTableFilters from "./DataTableFilters";

export default function DataTable({
  columns,
  data,
  searchKey,
  itemsPerPage = 10,
  searchInput = true,
  typeKey, // برای نمایش تعداد رکوردها بر اساس نوع
}) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc");
  const [dateRange, setDateRange] = useState({
    start: null,
    end: null,
  });

  // 🧠 فیلتر و مرتب‌سازی داده‌ها
  const filteredData = useMemo(() => {
    let result = [...data];

    // 🔍 فیلتر جستجو
    if (searchKey && search) {
      result = result.filter((row) =>
        searchKey.some((key) =>
          String(row[key] ?? "")
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      );
    }

    // 📅 فیلتر بازه‌ی تاریخ (مثلاً با فیلد createdAt یا date)
    if (dateRange.start && dateRange.end) {
      result = result.filter((row) => {
        const rowDate = new Date(row.createdAt || row.date || row.updatedAt);
        return rowDate >= dateRange.start && rowDate <= dateRange.end;
      });
    }

    // 🔄 مرتب‌سازی جدیدترین / قدیمی‌ترین
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt || a.date || a.updatedAt);
      const dateB = new Date(b.createdAt || b.date || b.updatedAt);
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [data, search, searchKey, dateRange, sortOrder]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const pageData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 📦 شمارش بر اساس typeKey
  const counts = useMemo(() => {
    if (!typeKey) return {};
    const c = {};
    data.forEach((item) => {
      const type = item[typeKey] || "تعداد";
      if (!c[type]) c[type] = 0;
      c[type]++;
    });
    return c;
  }, [data, typeKey]);

  return (
    <div className="flex flex-col gap-4">
      {/* 📊 باکس آمار */}
      <div className="flex w-full items-center justify-between gap-4 flex-wrap">
        {typeKey && (
          <div className="flex flex-wrap gap-3">
            {Object.entries(counts).map(([type, count]) => (
              <div
                key={type}
                className="px-3 py-1 bg-gray-700/50 rounded-md text-gray-200 text-sm"
              >
                {type}: {count}
              </div>
            ))}
          </div>
        )}

        {/* 🔍 باکس جستجو */}
        {searchKey && searchInput && (
          <div className="flex flex-1 justify-center px-2 min-w-[200px]">
            <SearchInput
              value={search}
              onChange={(val) => {
                setSearch(val);
                setCurrentPage(1);
              }}
              placeholder="جستجو..."
              className="w-full sm:max-w-[400px]"
            />
          </div>
        )}
      </div>

      {/* 🗂️ فیلتر تاریخ و مرتب‌سازی */}
      <div className="flex justify-start">
        <DataTableFilters
          onSortChange={setSortOrder}
          onDateFilter={(start, end) => setDateRange({ start, end })}
        />
      </div>

      {/* 📋 جدول */}
      <div className="overflow-x-auto rounded-md shadow-lg border border-white/20 bg-white/10 backdrop-blur-md scrollbar-thin scrollbar-thumb-gray-500/40 scrollbar-track-gray-900/20">
        <table className="min-w-[600px] w-full divide-y divide-white/10 text-center">
          <thead className="bg-white/10 sticky top-0 z-10">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-2 sm:px-4 py-2 sm:py-3 font-semibold whitespace-nowrap text-gray-400 ${
                    col.className || ""
                  }`}
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {pageData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-6 text-gray-400"
                >
                  نتیجه‌ای یافت نشد
                </td>
              </tr>
            ) : (
              pageData.map((row, index) => (
                <tr key={row.id || index}>
                  {columns.map((col) => {
                    const cellValue =
                      typeof col.render === "function"
                        ? col.render(row)
                        : String(row[col.key] ?? "");

                    return (
                      <td
                        key={col.key}
                        className={`px-2 sm:px-4 py-2 whitespace-nowrap text-gray-200 ${
                          col.className || ""
                        }`}
                      >
                        {col.key === "actions" ||
                        col.key === "file" ||
                        col.key === "path" ? (
                          <div className="truncate max-w-[200px] cursor-pointer hover:text-white">
                            {cellValue || "-"}
                          </div>
                        ) : (
                          <Tooltip content={cellValue}>
                            <div className="truncate max-w-[200px] cursor-pointer hover:text-white">
                              {cellValue || "-"}
                            </div>
                          </Tooltip>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 📑 Pagination */}
      <div className="mt-4 flex justify-end items-center gap-2 flex-wrap sm:flex-nowrap">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredData.length}
        />
      </div>
    </div>
  );
}
