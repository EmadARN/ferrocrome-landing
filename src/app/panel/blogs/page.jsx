"use client";

import { useState, useEffect } from "react";
import DataTable from "@/components/ui/DataTable";
import BlogModal from "@/components/blogs/BlogModal";
import ConfirmModal from "@/components/blogs/ConfirmModal";
import SearchInput from "@/components/ui/SearchInput";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
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
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, search]);

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 rounded shadow bg-gray-900 text-white">
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
            render: (row) => new Date(row.createdAt).toLocaleDateString(),
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
      <div className="mt-4 flex justify-center items-center gap-2">
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
