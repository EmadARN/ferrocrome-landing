"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import toast, { Toaster } from "react-hot-toast";

const RichTextEditor = dynamic(() => import("@/components/ui/RichTextEditor"), {
  ssr: false,
});

export default function NewBlogPage() {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    category: "",
    author: "",
    image: null,
  });
  const [content, setContent] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("summary", formData.summary);
    form.append("category", formData.category);
    form.append("author", formData.author);
    form.append("content", String(content));

    if (formData.image) {
      form.append("image", formData.image);
    }

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        body: form,
      });

      if (!res.ok) throw new Error("Failed to save");

      toast.success("✅ بلاگ با موفقیت ذخیره شد!");
      setFormData({
        title: "",
        summary: "",
        category: "",
        author: "",
        image: null,
      });
      setContent("");
    } catch (err) {
      toast.error("❌ خطا در ذخیره بلاگ");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6">افزودن بلاگ جدید</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-100 dark:bg-gray-900 shadow p-6 rounded-lg"
      >
        <input
          name="title"
          placeholder="عنوان بلاگ"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded p-3 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          name="summary"
          placeholder="خلاصه کوتاه"
          value={formData.summary}
          onChange={handleChange}
          className="w-full border rounded p-3 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          name="category"
          placeholder="دسته‌بندی"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded p-3 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          name="author"
          placeholder="نویسنده"
          value={formData.author}
          onChange={handleChange}
          className="w-full border rounded p-3 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.files[0] })
          }
          className="w-full"
        />

        <div>
          <label className="block mb-2 font-semibold">محتوا:</label>
          <RichTextEditor content={content} setContent={setContent} />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          ذخیره بلاگ
        </button>
      </form>
    </div>
  );
}
