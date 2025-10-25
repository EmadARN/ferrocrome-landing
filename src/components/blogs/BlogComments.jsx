"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

export default function BlogComments({ blogId, initialComments }) {
  const [comments, setComments] = useState(initialComments || []);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/blogs/${blogId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("خطا در ارسال کامنت");

      const newComment = await res.json();
      setComments([newComment, ...comments]);
      reset();
    } catch (err) {
      console.error(err);
      alert("ارسال کامنت موفق نبود!");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = (hasError) =>
    `w-full px-4 py-3 rounded-md text-gray-900 text-right placeholder-[var(--color-input-label)] 
     border ${hasError ? "border-yellow-900 ring-yellow-900" : "border-gray-300"} 
     focus:outline-none focus:ring-1 focus:ring-yellow-900 focus:border-yellow-900
     transition-colors`;

  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 mt-8 flex flex-col gap-4"
      >
        <h3 className="text-2xl font-bold text-[var(--color-title)] mb-2">
          ثبت دیدگاه شما
        </h3>
        <p
          style={{ color: "var(--color-title-secondary)" }}
          className="text-sm mb-4"
        >
          نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند *
        </p>

        <input
          type="text"
          placeholder="نام شما"
          {...register("author", { required: "وارد کردن نام الزامی است" })}
          className={inputClasses(errors.author)}
        />
        {errors.author && (
          <p className="text-red-500 text-sm">{errors.author.message}</p>
        )}

        <input
          type="email"
          placeholder="ایمیل شما"
          {...register("email", {
            required: "ایمیل الزامی است",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "ایمیل وارد شده معتبر نیست",
            },
          })}
          className={inputClasses(errors.email)}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <input
          type="tel"
          placeholder="شماره همراه (اختیاری)"
          {...register("phone", {
            pattern: {
              value: /^(\+?\d{10,15})$/,
              message: "شماره وارد شده معتبر نیست",
            },
          })}
          className={inputClasses(errors.phone)}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}

        <textarea
          placeholder="دیدگاه شما..."
          {...register("text", { required: "دیدگاه نمی‌تواند خالی باشد" })}
          className={inputClasses(errors.text)}
          rows={5}
        />
        {errors.text && (
          <p className="text-red-500 text-sm">{errors.text.message}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-[#a15300] via-[#521f01] to-[#521f01] text-white font-semibold px-5 py-3 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? "در حال ارسال..." : "ارسال دیدگاه"}
        </button>
      </form>
    </section>
  );
}
