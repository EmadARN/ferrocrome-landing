"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendCustomerRequest } from "@/services/api";
import Button from "../ui/Button";
import { customerRequestSchema } from "@/lib/validations";
import toast from "react-hot-toast";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(customerRequestSchema),
  });

  const handleFileChange = (e) => {
    if (e.target.files) setUploadedFiles(Array.from(e.target.files));
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "file") {
        if (value && value.length > 0 && value[0] instanceof File) {
          formData.append("file", value[0]);
        }
      } else {
        formData.append(key, value);
      }
    });
    formData.append("is_response", "false");

    try {
      await sendCustomerRequest(formData);
      toast.success("پیام شما با موفقیت ارسال شد!");
      reset();
      setUploadedFiles([]);
    } catch (err) {
      console.error(err);
      toast.error("خطا در ارسال پیام");
    }
  };

  const saleOptions = ["خرید فروکروم", "فروش فروکروم", "سایر"];

  return (
    <section className="relative min-h-screen flex items-center justify-center  overflow-hidden px-4">
      {/* اشکال شناور */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <motion.div
          className="absolute w-12 h-12 rounded-md bg-gradient-to-br from-[#c76700] to-[#f59e0b] opacity-10 top-1/5 left-1/10"
          animate={{ y: [-10, 10, -10], rotate: [0, 35, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-12 h-12 rounded-md bg-gradient-to-br from-[#c76700] to-[#f59e0b] opacity-10 top-3/5 right-1/6"
          animate={{ y: [-15, 15, -15], rotate: [0, 35, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
        <motion.div
          className="absolute w-12 h-12 rounded-md bg-gradient-to-br from-[#c76700] to-[#f59e0b] opacity-10 top-4/5 left-1/5"
          animate={{ y: [-8, 8, -8], rotate: [0, 35, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 4 }}
        />
      </div>

      <div className="relative z-10 w-full max-w-lg bg-white/5 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-[#c76700]/20">
        <h1 className="text-center text-[#c76700] text-3xl font-bold mb-2 drop-shadow-lg">
          فرم درخواست تماس
        </h1>
        <p className="text-center text-white/80 mb-8 font-light">
          بیایید پروژه بعدی شما را بررسی کنیم
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          encType="multipart/form-data"
        >
          {/* نام و ایمیل */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#c76700] text-right mb-2">
                نام کامل *
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder="نام خود را وارد کنید"
                className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c76700]"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[#c76700] text-right mb-2">
                ایمیل *
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="example@email.com"
                className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c76700]"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* شماره و شرکت */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#c76700] text-right mb-2">
                شماره تلفن
              </label>
              <input
                type="tel"
                {...register("phone_number")}
                placeholder="+98 912 123 4567"
                className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c76700]"
              />
            </div>

            <div>
              <label className="block text-[#c76700] text-right mb-2">
                نام شرکت *
              </label>
              <input
                type="text"
                {...register("company_name")}
                placeholder="نام شرکت"
                className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c76700]"
              />
              {errors.company_name && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.company_name.message}
                </p>
              )}
            </div>
          </div>

          {/* نوع درخواست */}
          <div>
            <label className="block text-[#c76700] text-right mb-3">
              نوع درخواست *
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              {saleOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 p-3 rounded-xl border-2 border-transparent cursor-pointer transition-all bg-white/10 hover:bg-[#c76700]/20"
                >
                  <input
                    type="radio"
                    value={option}
                    {...register("sale_type")}
                    className="accent-[#c76700]"
                  />
                  <span className="text-white font-medium">{option}</span>
                </label>
              ))}
            </div>
            {errors.sale_type && (
              <p className="text-red-400 text-sm mt-1">
                {errors.sale_type.message}
              </p>
            )}
          </div>

          {/* پیام */}
          <div>
            <label className="block text-[#c76700] text-right mb-2">
              پیام *
            </label>
            <textarea
              {...register("message")}
              rows={4}
              placeholder="پیام خود را وارد کنید"
              className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c76700] resize-y"
            ></textarea>
            {errors.message && (
              <p className="text-red-400 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* آپلود فایل */}
          <div>
            <label className="block text-[#c76700] text-right mb-2">
              فایل ضمیمه (اختیاری)
            </label>
            <div className="relative">
              <input
                type="file"
                {...register("file")}
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="p-8 rounded-xl border-2 border-[#c76700]/50 bg-white/5 text-center cursor-pointer transition-all hover:bg-[#c76700]/10 hover:border-[#c76700]">
                <div className="text-3xl text-[#c76700] mb-2">📎</div>
                <div className="text-white font-medium mb-1">
                  {uploadedFiles.length > 0
                    ? `انتخاب شده: ${uploadedFiles
                        .map((f) => f.name)
                        .join(", ")}`
                    : "فایل‌ها را اینجا بکشید یا کلیک کنید"}
                </div>
                <div className="text-white/60 text-sm">
                  PDF، DOC یا تصاویر تا 10MB
                </div>
              </div>
            </div>
          </div>

          {/* دکمه ارسال */}
          <Button
            type="submit"
            variant="premium"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl bg-gradient-to-br from-[#a15300] via-[#521f01] to-[#521f01] text-white font-semibold uppercase tracking-wider hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            {isSubmitting ? "در حال ارسال..." : "ارسال درخواست"}
          </Button>
        </form>
      </div>
    </section>
  );
}
