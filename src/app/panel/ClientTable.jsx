"use client";
import { useState } from "react";

export default function ClientTable({ initialData }) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = initialData.filter(
    (row) =>
      row.name.toLowerCase().includes(search.toLowerCase()) ||
      row.email.toLowerCase().includes(search.toLowerCase()) ||
      row.companyName.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const pageData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full">
      {/* Search */}
      <div className="flex justify-center mb-6 px-2">
        <input
          type="text"
          placeholder="جستجو بر اساس نام، ایمیل یا شرکت..."
          className="w-full max-w-md px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:border-white/30 focus:bg-white/20 transition"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
        <table className="min-w-full divide-y divide-white/10 text-center">
          <thead className="bg-white/5 sticky top-0">
            <tr>
              <th className="px-4 py-3 font-semibold">نام</th>
              <th className="px-4 py-3 font-semibold">ایمیل</th>
              <th className="px-4 py-3 font-semibold">شماره</th>
              <th className="px-4 py-3 font-semibold">شرکت</th>
              <th className="px-4 py-3 font-semibold">نوع فروش</th>
              <th className="px-4 py-3 font-semibold">پیام</th>
              <th className="px-4 py-3 font-semibold">فایل</th>
            </tr>
          </thead>
          <tbody>
            {pageData.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-400">
                  نتیجه‌ای یافت نشد
                </td>
              </tr>
            ) : (
              pageData.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-white/10 transition-transform transform hover:-translate-y-0.5"
                >
                  <td className="px-4 py-2 flex items-center justify-center gap-2">
                    <span>{row.name}</span>
                  </td>
                  <td className="px-4 py-2">{row.email}</td>
                  <td className="px-4 py-2">{row.phoneNumber}</td>
                  <td className="px-4 py-2">{row.companyName}</td>
                  <td className="px-4 py-2">
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
                  </td>
                  <td className="px-4 py-2 max-w-xs break-words text-gray-300 italic">
                    {row.message}
                  </td>
                  <td className="px-4 py-2">
                    {row.fileUrl ? (
                      <a
                        href={row.fileUrl}
                        download
                        target="_blank"
                        className="px-2 py-1 rounded-lg bg-transparent cursor-pointer font-semibold inline-flex items-center gap-1  transition"
                      >
                        📎 دانلود
                      </a>
                    ) : (
                      <span className="text-gray-400 italic">فاقد فایل</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/20 shadow-lg gap-2 md:gap-0">
        <div className="text-gray-300 text-sm md:text-base">
          نمایش{" "}
          {filteredData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}{" "}
          تا {Math.min(currentPage * itemsPerPage, filteredData.length)} از{" "}
          {filteredData.length} مورد
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-lg border border-white/20 bg-white/10 text-gray-200 font-semibold disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          >
            قبلی
          </button>
          {[...Array(totalPages).keys()].map((n) => (
            <button
              key={n}
              className={`px-3 py-1 rounded-lg border border-white/20 font-semibold ${
                n + 1 === currentPage
                  ? "bg-transparent text-white"
                  : "bg-white/10 text-gray-200"
              }`}
              onClick={() => setCurrentPage(n + 1)}
            >
              {n + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-lg border border-white/20 bg-white/10 text-gray-200 font-semibold disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          >
            بعدی
          </button>
        </div>
      </div>
    </div>
  );
}
