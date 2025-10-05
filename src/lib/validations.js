import { z } from "zod";

export const customerRequestSchema = z.object({
  name: z.string().min(3, "نام و نام خانوادگی الزامی است"),
  email: z.string().email("ایمیل معتبر وارد کنید"),
  phone_number: z.string().optional(),
  company_name: z.string().min(2, "نام شرکت الزامی است"),
  message: z.string().min(5, "پیام خود را وارد کنید"),
});
