"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../ui/Button";

const contactSchema = z.object({
  fullName: z.string().min(2, "نام کامل لازم است"),
  email: z.string().email("ایمیل معتبر وارد کنید"),
  phone: z.string().optional(),
  company: z.string().min(2, "نام شرکت لازم است"),
  message: z.string().min(10, "پیام خیلی کوتاه است"),
});

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    console.log("فرم ارسال شد:", data);
    alert("پیام شما ارسال شد!");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-200 mb-2">نام کامل *</label>
          <input
            type="text"
            {...register("fullName")}
            className="w-full px-4 py-3 rounded-xl bg-gray-700/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="نام خود را وارد کنید"
          />
          {errors.fullName && (
            <p className="text-red-400 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-200 mb-2">ایمیل *</label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-4 py-3 rounded-xl bg-gray-700/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="example@email.com"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-200 mb-2">شماره تلفن</label>
          <input
            type="tel"
            {...register("phone")}
            className="w-full px-4 py-3 rounded-xl bg-gray-700/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="+98 912 123 4567"
          />
        </div>

        <div>
          <label className="block text-gray-200 mb-2">نام شرکت *</label>
          <input
            type="text"
            {...register("company")}
            className="w-full px-4 py-3 rounded-xl bg-gray-700/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="نام شرکت"
          />
          {errors.company && (
            <p className="text-red-400 text-sm mt-1">
              {errors.company.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-gray-200 mb-2">پیام *</label>
        <textarea
          {...register("message")}
          rows={4}
          className="w-full px-4 py-3 rounded-xl bg-gray-700/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
          placeholder="پیام خود را وارد کنید"
        ></textarea>
        {errors.message && (
          <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="premium"
        disabled={isSubmitting}
        className="w-full text-lg"
      >
        ارسال پیام
      </Button>
    </form>
  );
}
