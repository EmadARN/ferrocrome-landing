"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { toast, Toaster } from "react-hot-toast";
import { IoClose } from "react-icons/io5";

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
  const editorRef = useRef();

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || "",
        summary: blog.summary || "",
        category: blog.category || "",
        author: blog.author || "",
        image: null,
      });
    }
  }, [blog]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // فقط در زمان کلیک روی دکمه ذخیره، محتوای ویرایشگر را بگیریم
    const content = editorRef.current?.getContent() || "";
    if (!content) {
      toast.error("محتوای بلاگ نمی‌تواند خالی باشد!", { duration: 3000 });
      return;
    }

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) form.append(key, formData[key]);
    });
    form.append("content", content);

    try {
      const response = await fetch(
        blog ? `/api/blogs/${blog.id}` : "/api/blogs",
        {
          method: blog ? "PUT" : "POST",
          body: form,
        }
      );

      if (!response.ok) {
        throw new Error("خطا در ذخیره‌سازی بلاگ");
      }

      toast.success("بلاگ با موفقیت ذخیره شد!", { duration: 3000 });
      onClose(); // بستن مدال پس از ذخیره موفق
    } catch (err) {
      console.error("خطا در ذخیره بلاگ:", err);
      toast.error("خطا در ذخیره بلاگ", { duration: 3000 });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-gray-800 rounded-md shadow-lg w-11/12 md:w-2/3 p-6 max-h-[90vh] overflow-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 left-3 text-white cursor-pointer hover:text-amber-600 transition-colors duration-200"
        >
          <IoClose size={24} />
        </button>
        <h2 className="text-2xl font-bold my-4">
          {blog ? "ویرایش بلاگ" : "افزودن بلاگ جدید"}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="عنوان"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="summary"
            placeholder="خلاصه کوتاه"
            value={formData.summary}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="category"
            placeholder="دسته‌بندی"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="author"
            placeholder="نویسنده"
            value={formData.author}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <div className="mb-4">
            <label className="block mb-2 font-semibold">
              تصویر فعلی / جدید:
            </label>
            {(formData.image || blog?.image) && (
              <img
                src={
                  formData.image instanceof File
                    ? URL.createObjectURL(formData.image)
                    : blog?.image
                }
                alt="پیش‌نمایش تصویر"
                className="w-32 h-32 object-cover rounded mb-2"
              />
            )}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">محتوا:</label>
            <RichTextEditor
              ref={editorRef}
              initialContent={blog?.content || ""}
            />
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
