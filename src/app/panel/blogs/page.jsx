"use client";

import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import DataTable from "@/components/ui/DataTable";
import BlogModal from "@/components/blogs/BlogModal";
import ConfirmModal from "@/components/blogs/ConfirmModal";
import SearchInput from "@/components/ui/SearchInput";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import LoadingState from "@/components/ui/LoadingState";
import EmptyState from "@/components/ui/EmptyState";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // ✅ دریافت بلاگ‌ها از API
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/blogs?search=${encodeURIComponent(search)}&page=${page}&limit=10`
      );
      const data = await res.json();
      setBlogs(data.blogs || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
      setBlogs([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, search]);

  // ✅ حذف بلاگ با Toastify و duration
  const handleDelete = async (id) => {
    const loadingToast = toast.loading("در حال حذف بلاگ...", {
      duration: 3000, // خود toast loading بعد از 3 ثانیه بسته میشه
    });

    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("خطا در حذف بلاگ");

      await fetchBlogs();
      toast.dismiss(loadingToast);
      toast.success("بلاگ با موفقیت حذف شد ✅", { duration: 3000 });
    } catch (err) {
      console.error(err);
      toast.dismiss(loadingToast);
      toast.error("خطا در حذف بلاگ ❌", { duration: 4000 });
    }
  };

  // ✅ حالت‌های لودینگ و خالی
  if (loading) return <LoadingState text="در حال بارگذاری بلاگ‌ها..." />;

  if (!blogs.length)
    return (
      <div className="p-4 rounded shadow bg-gray-900 text-white mt-12 flex flex-col items-center justify-center gap-4">
        <EmptyState text="هیچ بلاگی یافت نشد." />
        <button
          onClick={() => {
            setEditingBlog(null);
            setOpenModal(true);
          }}
          className="px-4 py-2 bg-gradient-to-r cursor-pointer from-[#a15300] via-[#521f01] to-[#521f01] text-white rounded-md"
        >
          افزودن بلاگ جدید
        </button>

        {openModal && (
          <BlogModal
            blog={editingBlog}
            onClose={() => {
              setOpenModal(false);
              fetchBlogs();
            }}
          />
        )}

        {/* ✅ Toast با مدت مشخص */}
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      </div>
    );

  // ✅ حالت نرمال
  return (
    <div className="p-4 rounded shadow bg-gray-900 text-white mt-12">
      {/* Toast Container با مدت پیش‌فرض ۳ ثانیه */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
            fontSize: "0.9rem",
            borderRadius: "8px",
          },
        }}
      />

      {/* Search & Add */}
      <div className="flex justify-between mb-4">
        <SearchInput
          value={search}
          onChange={(val) => {
            setSearch(val);
            setPage(1);
          }}
          placeholder="جستجو..."
        />
        <button
          onClick={() => {
            setEditingBlog(null);
            setOpenModal(true);
          }}
          className="px-4 py-2 bg-gradient-to-r cursor-pointer from-[#a15300] via-[#521f01] to-[#521f01] text-white rounded-md"
        >
          افزودن بلاگ جدید
        </button>
      </div>

      {/* DataTable */}
      <DataTable
        data={blogs}
        searchKey={[]} // چون سرچ بیرون انجام میشه
        searchInput={false}
        columns={[
          { key: "title", title: "عنوان" },
          { key: "author", title: "نویسنده" },
          {
            key: "createdAt",
            title: "تاریخ",
            render: (row) =>
              new Date(row.createdAt).toLocaleDateString("fa-IR"),
          },
          {
            key: "actions",
            title: "عملیات",
            render: (row) => (
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => {
                    setEditingBlog(row);
                    setOpenModal(true);
                  }}
                  className="text-blue-400 cursor-pointer hover:text-blue-500"
                >
                  <FiEdit size={18} />
                </button>
                <button
                  onClick={() => setConfirmDelete(row)}
                  className="text-red-500 cursor-pointer hover:text-red-600"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            ),
          },
        ]}
      />

      {/* Pagination */}
      <div className="mt-4 flex justify-end items-center gap-2">
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 cursor-pointer bg-gray-700 rounded disabled:opacity-50"
        >
          قبلی
        </button>
        <span>
          صفحه {page} از {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 cursor-pointer bg-gray-700 rounded disabled:opacity-50"
        >
          بعدی
        </button>
      </div>

      {/* Modals */}
      {openModal && (
        <BlogModal
          blog={editingBlog}
          onClose={() => {
            setOpenModal(false);
            fetchBlogs();
          }}
        />
      )}

      {confirmDelete && (
        <ConfirmModal
          title={`آیا می‌خواهید "${confirmDelete.title}" حذف شود؟`}
          onCancel={() => setConfirmDelete(null)}
          onConfirm={() => {
            handleDelete(confirmDelete.id);
            setConfirmDelete(null);
          }}
        />
      )}
    </div>
  );
}
