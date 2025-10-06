import { z } from "zod";

export const customerRequestSchema = z.object({
  name: z.string().min(3, "نام و نام خانوادگی الزامی است"),
  email: z.string().email("ایمیل معتبر وارد کنید"),
  phone_number: z
    .string()
    .min(1, "شماره تلفن الزامی است")
    .refine((val) => /^(\+98|0)?9\d{9}$/.test(val), {
      message: "شماره تلفن معتبر نیست",
    }),

  company_name: z.string().min(2, "نام شرکت الزامی است"),
  sale_type: z.enum(["خرید فروکروم", "فروش فروکروم", "سایر"], {
    required_error: "انتخاب نوع درخواست الزامی است",
  }),
  message: z.string().min(5, "پیام خود را وارد کنید"),
  file: z
    .any()
    .refine(
      (files) => !files || files.length === 0 || files[0] instanceof File,
      "فایل انتخاب‌شده معتبر نیست"
    )
    .optional(),
});
