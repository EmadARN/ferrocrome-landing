"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { toast, Toaster } from "react-hot-toast";
const RichTextEditor = dynamic(() => import("@/components/ui/RichTextEditor"), {
  ssr: false,
});

export default function BlogModal({ blog, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    category: "",
    author: "",
    image: null,
  });
  const [content, setContent] = useState("");

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        summary: blog.summary,
        category: blog.category,
        author: blog.author,
        image: null,
      });
      setContent(blog.content);
    }
  }, [blog]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) form.append(key, formData[key]);
    });
    form.append("content", content);

    try {
      await fetch(blog ? `/api/blogs/${blog.id}` : "/api/blogs", {
        method: blog ? "PUT" : "POST",
        body: form,
      });
      toast.success("بلاگ ذخیره شد!");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("خطا در ذخیره بلاگ");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-gray-800 rounded-md shadow-lg w-11/12 md:w-2/3 p-6 max-h-[90vh] overflow-auto">
        <h2 className="text-2xl font-bold mb-4">
          {blog ? "ویرایش بلاگ" : "افزودن بلاگ جدید"}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="عنوان"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="summary"
            placeholder="خلاصه کوتاه"
            value={formData.summary}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="category"
            placeholder="دسته‌بندی"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="author"
            placeholder="نویسنده"
            value={formData.author}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="file"
            name="image"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files[0] })
            }
          />
          <div>
            <label className="block mb-2 font-semibold">محتوا:</label>
            <RichTextEditor content={content} setContent={setContent} />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 cursor-pointer bg-gray-500 rounded"
            >
              لغو
            </button>
            <button
              type="submit"
              className="px-4 py-2 cursor-pointer bg-yellow-800 text-white rounded"
            >
              ذخیره
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
