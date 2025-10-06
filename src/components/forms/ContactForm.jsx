"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { sendCustomerRequest } from "@/services/api";
import Button from "../ui/Button";
import { customerRequestSchema } from "@/lib/validations";
import toast from "react-hot-toast";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(customerRequestSchema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "file") {
        // فقط اگر فایل وجود داره و کاربر فایلی انتخاب کرده:
        if (value && value.length > 0 && value[0] instanceof File) {
          formData.append("file", value[0]);
        }
      } else {
        formData.append(key, value);
      }
    });

    formData.append("is_response", false);

    try {
      await sendCustomerRequest(formData);
      toast.success("پیام شما با موفقیت ارسال شد!");
      reset();
    } catch (err) {
      console.error(err);
       toast.error("خطا در ارسال پیام ");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      encType="multipart/form-data"
    >
      {/* نام و ایمیل */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-200 mb-2 text-start">نام کامل *</label>
          <input
            type="text"
            {...register("name")}
            className="w-full px-4 py-3 rounded-xl bg-gray-700/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a15300]"
            placeholder="نام خود را وارد کنید"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-200 mb-2 text-start">ایمیل *</label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-4 py-3 rounded-xl bg-gray-700/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a15300]"
            placeholder="example@email.com"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* شماره و شرکت */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-200 mb-2 text-start">شماره تلفن</label>
          <input
            type="tel"
            {...register("phone_number")}
            className="w-full px-4 py-3 rounded-xl bg-gray-700/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a15300]"
            placeholder="+98 912 123 4567"
          />
        </div>

        <div>
          <label className="block text-gray-200 mb-2 text-start">نام شرکت *</label>
          <input
            type="text"
            {...register("company_name")}
            className="w-full px-4 py-3 rounded-xl bg-gray-700/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a15300]"
            placeholder="نام شرکت"
          />
          {errors.company_name && (
            <p className="text-red-400 text-sm mt-1">
              {errors.company_name.message}
            </p>
          )}
        </div>
      </div>

      {/* انتخاب نوع درخواست */}
      <div>
        <label className="block text-gray-200 mb-3 text-start">نوع درخواست *</label>
        <div className="flex flex-col sm:flex-row gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="خرید فروکروم"
              {...register("sale_type")}
              className="accent-yellow-400"
            />
            <span className="text-gray-300">خرید فروکروم</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="فروش فروکروم"
              {...register("sale_type")}
              className="accent-yellow-400"
            />
            <span className="text-gray-300">فروش فروکروم</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="سایر"
              {...register("sale_type")}
              className="accent-yellow-400"
            />
            <span className="text-gray-300">سایر</span>
          </label>
        </div>
        {errors.request_type && (
          <p className="text-red-400 text-sm mt-1">
            {errors.request_type.message}
          </p>
        )}
      </div>
        <div>
  <label className="block text-gray-200 mb-2 text-start">فایل ضمیمه (اختیاری)</label>

  <label
    htmlFor="fileUpload"
    className="flex items-center justify-center w-full bg-gray-700/40 rounded-xl p-3 text-gray-200 cursor-pointer hover:bg-gray-700/60 transition"
  >
    <span className=" bg-[#c76700] text-gray-900 px-4 py-2 rounded-lg ml-3 hover:bg-[#a35603] transition">
      انتخاب فایل
    </span>
    <span className="truncate text-sm opacity-80" id="fileName">
      فایلی انتخاب نشده است
    </span>
  </label>

  <input
    id="fileUpload"
    type="file"
    {...register("file")}
    className="hidden"
    onChange={(e) => {
      const fileName = e.target.files?.[0]?.name || "فایلی انتخاب نشده است";
      document.getElementById("fileName").textContent = fileName;
    }}
  />

  {errors.file && (
    <p className="text-red-400 text-sm mt-1">{errors.file.message}</p>
  )}
</div>

      {/* پیام */}
      <div>
        <label className="block text-gray-200 mb-2 text-start">پیام *</label>
        <textarea
          {...register("message")}
          rows={4}
          className="w-full px-4 py-3 rounded-xl bg-gray-700/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a15300] resize-none"
          placeholder="پیام خود را وارد کنید"
        ></textarea>
        {errors.message && (
          <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      
   

      {/* دکمه ارسال */}
      <Button
        type="submit"
        variant="premium"
        disabled={isSubmitting}
        className="w-full text-lg"
      >
        {isSubmitting ? "در حال ارسال..." : "ارسال پیام"}
      </Button>
    </form>
  );
}
