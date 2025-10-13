"use client";

import { useState, useMemo } from "react";
import SearchInput from "./SearchInput";
import Pagination from "./Pagination";

export default function DataTable({
  columns,
  data,
  searchKey,
  itemsPerPage = 10,
  searchInput,
}) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // فیلتر کردن داده‌ها بر اساس search
  const filteredData = useMemo(() => {
    if (!searchKey || !search) return data;
    return data.filter((row) =>
      searchKey.some((key) =>
        String(row[key] ?? "")
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    );
  }, [data, search, searchKey]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const pageData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Search */}
      {searchKey && searchInput && (
        <div className="flex justify-center mb-4 px-2">
          <SearchInput
            value={search}
            onChange={(val) => {
              setSearch(val);
              setCurrentPage(1);
            }}
            placeholder="جستجو..."
          />
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
        <table className="min-w-full divide-y divide-white/10 text-center">
          <thead className="bg-white/5 sticky top-0">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 font-semibold ${col.className || ""}`}
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
                <tr
                  key={row.id || index}
                  className={`transition-transform transform hover:-translate-y-0.5 cursor-pointer ${
                    index % 2 === 0 ? "bg-white/5" : "bg-white/10"
                  } hover:bg-white/20`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-4 py-2 ${col.className || ""}`}
                    >
                      {col.render
                        ? col.render(row)
                        : String(row[col.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        totalItems={filteredData.length}
      />
    </div>
  );
}
