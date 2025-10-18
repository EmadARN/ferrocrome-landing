"use client";

import React, { useEffect, useState } from "react";
import DataTable from "@/components/ui/DataTable";
import LoadingState from "@/components/ui/LoadingState";
import EmptyState from "@/components/ui/EmptyState";

export default function CommentsPanel() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await fetch(`/api/comments?page=${page}&limit=10`);
        if (!res.ok) throw new Error("Failed to fetch comments");
        const data = await res.json();
        setComments(data.comments || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchComments();
  }, [page]);

  if (loading) return <LoadingState text="در حال بارگذاری دیدگاه‌ها..." />;
  if (!comments.length) return <EmptyState text="هیچ دیدگاهی وجود ندارد." />;

  return (
    <div className="w-full mt-12">
      <DataTable
        data={comments}
        searchKey={["author", "text", "blog.title"]}
        itemsPerPage={10}
        searchInput
        columns={[
          { key: "author", title: "نویسنده" },
          {
            key: "blog",
            title: "مقاله",
            render: (row) => (
              <span className="font-medium text-blue-500">
                {row.blog?.title || "نامشخص"}
              </span>
            ),
          },
          {
            key: "text",
            title: "متن دیدگاه",
            render: (row) => (
              <span className="text-gray-300 break-words max-w-md">
                {row.text.length > 100
                  ? row.text.slice(0, 100) + "..."
                  : row.text}
              </span>
            ),
          },
          {
            key: "createdAt",
            title: "تاریخ ثبت",
            render: (row) => (
              <span className="text-sm text-gray-400">
                {new Date(row.createdAt).toLocaleString("fa-IR")}
              </span>
            ),
          },
        ]}
      />

      {/* Pagination */}
      <div className="mt-4 flex justify-end items-center gap-2">
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 text-[12px] md:text-[16px] cursor-pointer bg-gray-700 rounded disabled:opacity-50"
        >
          قبلی
        </button>
        <span>
          صفحه {page} از {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 text-[12px] md:text-[16px] cursor-pointer bg-gray-700 rounded disabled:opacity-50"
        >
          بعدی
        </button>
      </div>
    </div>
  );
}
