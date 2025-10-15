"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendCustomerRequest } from "@/services/api";
import Button from "../ui/Button";
import { customerRequestSchema } from "@/lib/validations";
import toast from "react-hot-toast";
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
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: { sale_type: "خرید فروکروم" },
  });

  //  تنظیمات فایل آپلود
  const allowedFileTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
  ];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const handleFileChange = (e) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const validFiles = [];

    files.forEach((file) => {
      if (!allowedFileTypes.includes(file.type)) {
        toast.error(`${file.name} فرمت مجاز ندارد!`);
        return;
      }
      if (file.size > maxFileSize) {
        toast.error(`${file.name} بیش از 10MB است!`);
        return;
      }
      validFiles.push(file);
    });

    if (validFiles.length > 1) {
      toast.error("فقط یک فایل می‌توانید آپلود کنید");
      validFiles.splice(1);
    }

    setUploadedFiles(validFiles);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phone_number);
      formData.append("companyName", data.company_name);
      formData.append("saleType", data.sale_type);
      formData.append("message", data.message);
      if (uploadedFiles.length > 0) formData.append("file", uploadedFiles[0]);

      await sendCustomerRequest(formData);
      toast.success("پیام شما با موفقیت ارسال شد!");
      reset();
      setUploadedFiles([]);
    } catch (err) {
      console.error(err);
      toast.error("خطا در ارسال پیام");
    }
  };

  const saleOptions = ["تامین مواد اولیه(کلوخه کرومیت)", "سایر"];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-10 overflow-hidden bg-[var(--color-section-bg)] transition-colors">
      {/* اشکال شناور */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <motion.div
          className="absolute w-12 h-12 rounded-md bg-gradient-to-br from-[var(--color-title)] to-[#d4a373] opacity-10 top-1/5 left-1/10"
          animate={{ y: [-10, 10, -10], rotate: [0, 35, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-12 h-12 rounded-md bg-gradient-to-br from-[var(--color-title)] to-[#d4a373] opacity-10 top-3/5 right-1/6"
          animate={{ y: [-15, 15, -15], rotate: [0, 35, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* فرم */}
      <div className="relative z-10 w-full sm:max-w-2xl backdrop-blur-lg rounded-md p-4 sm:p-10 shadow-2xl transition-colors">
        <h1 className="text-center text-[var(--color-title)] text-[15px] sm:text-3xl font-bold mb-2 drop-shadow-lg">
          فرم درخواست همکاری
        </h1>
        <p className="text-center text-[var(--color-text-muted)] mb-6 sm:mb-8 font-light text-[0.65rem] sm:text-base">
          ارتباط با کارشناسان بازرگانی
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 sm:space-y-6"
          encType="multipart/form-data"
        >
          {/* نام و ایمیل */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-[var(--color-input-label)] text-right mb-1 sm:mb-2 text-sm sm:text-base">
                نام و نام خانوادگی*
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder="نام خود را وارد کنید"
                className="w-full p-3 sm:p-4 rounded-sm bg-[var(--color-input-bg)] text-[var(--color-input-text)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-title)] text-sm sm:text-base"
              />
              {errors.name && (
                <p className="text-red-400 text-xs sm:text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[var(--color-input-label)] text-right mb-1 sm:mb-2 text-sm sm:text-base">
                ایمیل *
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="example@email.com"
                className="w-full p-3 sm:p-4 rounded-sm bg-[var(--color-input-bg)] text-[var(--color-input-text)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-title)] text-sm sm:text-base"
              />
              {errors.email && (
                <p className="text-red-400 text-xs sm:text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* شماره و شرکت */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-[var(--color-input-label)] text-right mb-1 sm:mb-2 text-sm sm:text-base">
                نام شرکت / سازمان*
              </label>
              <input
                type="text"
                {...register("company_name")}
                placeholder="نام شرکت"
                className="w-full p-3 sm:p-4 rounded-sm bg-[var(--color-input-bg)] text-[var(--color-input-text)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-title)] text-sm sm:text-base"
              />
              {errors.company_name && (
                <p className="text-red-400 text-xs sm:text-sm mt-1">
                  {errors.company_name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[var(--color-input-label)] text-right mb-1 sm:mb-2 text-sm sm:text-base">
                شماره تلفن *
              </label>
              <input
                type="tel"
                {...register("phone_number")}
                placeholder="09121234567"
                className="w-full p-3 sm:p-4 rounded-sm bg-[var(--color-input-bg)] text-[var(--color-input-text)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-title)] text-sm sm:text-base"
              />
              {errors.phone_number && (
                <p className="text-red-400 text-xs sm:text-sm mt-1">
                  {errors.phone_number.message}
                </p>
              )}
            </div>
          </div>

          {/* نوع درخواست */}
          <div>
            <label className="block text-[var(--color-input-label)] text-right mb-2 text-sm sm:text-base">
              نوع درخواست *
            </label>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              {saleOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 p-2 sm:p-3 rounded-sm border-2 border-transparent cursor-pointer transition-all bg-[var(--color-input-bg)] hover:bg-[var(--color-title)]/10 text-[12px] sm:text-sm"
                >
                  <input
                    type="radio"
                    value={option}
                    {...register("sale_type")}
                    className="accent-[var(--color-title)]"
                  />
                  <span className="text-[var(--color-input-text)] font-medium">
                    {option}
                  </span>
                </label>
              ))}
            </div>
            {errors.sale_type && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">
                {errors.sale_type.message}
              </p>
            )}
          </div>

          {/* پیام */}
          <div>
            <label className="block text-[var(--color-input-label)] text-right mb-1 sm:mb-2 text-sm sm:text-base">
              پیام *
            </label>
            <textarea
              {...register("message")}
              rows={4}
              placeholder="پیام خود را وارد کنید"
              className="w-full p-3 sm:p-4 rounded-sm bg-[var(--color-input-bg)] text-[var(--color-input-text)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-title)] resize-y text-sm sm:text-base"
            ></textarea>
            {errors.message && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* آپلود فایل */}
          <div>
            <label className="block text-[var(--color-input-label)] text-right mb-1 sm:mb-2 text-sm sm:text-base">
              فایل ضمیمه (اختیاری)
            </label>
            <div className="relative">
              <input
                type="file"
                {...register("file")}
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="p-6 sm:p-8 rounded-sm border-2 border-[var(--color-title)]/30 bg-[var(--color-input-bg)] text-center cursor-pointer transition-all hover:bg-[var(--color-title)]/10 hover:border-[var(--color-title)] text-sm sm:text-base">
                <div className="text-2xl sm:text-3xl text-[var(--color-title)] mb-2">
                  📎
                </div>
                <div className="text-[var(--color-input-text)] text-[10px] sm:text-sm font-medium mb-1">
                  {uploadedFiles.length > 0
                    ? `انتخاب شده: ${uploadedFiles
                        .map((f) => f.name)
                        .join(", ")}`
                    : "فایل‌ها را اینجا بکشید یا کلیک کنید"}
                </div>
                <div className="text-[var(--color-text-muted)] text-[10px] sm:text-sm">
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
            className="w-full mt-4 py-3 sm:py-4 rounded-md bg-gradient-to-br from-[var(--color-title)] to-[#7a3c00] text-white font-semibold uppercase tracking-wider hover:shadow-lg hover:-translate-y-1 transition-all text-sm sm:text-base"
          >
            {isSubmitting ? "در حال ارسال..." : "ارسال درخواست"}
          </Button>
        </form>
      </div>
    </section>
  );
}
