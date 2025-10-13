"use client";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 10,
  totalItems = 0,
}) {
  if (totalPages <= 1) return null;

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-4 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/20 shadow-lg gap-2 md:gap-0">
      <div className="text-gray-300 text-sm md:text-base">
        نمایش {startItem} تا {endItem} از {totalItems} مورد
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-lg border border-white/20 bg-white/10 text-gray-200 font-semibold disabled:opacity-50"
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        >
          قبلی
        </button>
        {[...Array(totalPages).keys()].map((n) => (
          <button
            key={n}
            className={`px-3 py-1 rounded-lg border border-white/20 font-semibold ${
              n + 1 === currentPage ? "bg-transparent text-white" : "bg-white/10 text-gray-200"
            }`}
            onClick={() => onPageChange(n + 1)}
          >
            {n + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-lg border border-white/20 bg-white/10 text-gray-200 font-semibold disabled:opacity-50"
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        >
          بعدی
        </button>
      </div>
    </div>
  );
}
