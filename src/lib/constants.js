import Image from "next/image";
import { IoLogoWechat } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { FaAward, FaGlobe, FaCheckCircle, FaLeaf } from "react-icons/fa";
import {
  AiOutlineHome,
  AiOutlineFileText,
  AiOutlineMessage,
  AiOutlineAlert,
} from "react-icons/ai";
import { MessageCircle } from "lucide-react";

export const pages = [
  {
    title: "کاتالوگ تأمین و عرضه کلوخه کرومیت",
    bg: "/images/mines-bg.jpg",
    content: (
      <div className="relative w-full h-full flex flex-col items-center justify-center text-center text-white">
        <Image
          src="/images/mines-bg.jpg"
          alt="background"
          fill
          className="object-cover absolute inset-0 -z-10 brightness-75"
          priority
        />
        ]
        <Image
          src="/images/logo.png"
          alt="logo"
          width={100}
          height={100}
          className="mb-4"
        />
        <h1 className="text-3xl font-bold">
          کاتالوگ تأمین و عرضه کلوخه کرومیت
        </h1>
        <p className="mt-3 text-white/80">شرکت پیشرو کربن</p>
      </div>
    ),
  },
  {
    title: "درباره شرکت",
    content: (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">درباره ما</h2>
        <p className="leading-7 text-gray-700">
          شرکت پیشرو کربن با بیش از ۳۰ سال تجربه در استخراج و تأمین مواد معدنی،
          یکی از تأمین‌کنندگان معتبر کرومیت در ایران است. مأموریت ما تأمین مواد
          اولیه باکیفیت برای صنایع فولاد و ریخته‌گری است.
        </p>
        <div className="relative mt-4 w-full h-48 rounded-xl overflow-hidden">
          <Image
            src="/images/office.jpg"
            alt="دفتر شرکت"
            fill
            className="object-cover"
          />
        </div>
      </div>
    ),
  },
  {
    title: "محصولات اصلی",
    content: (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-3">کلوخه کرومیت با خلوص بالا</h2>
        <table className="w-full border-collapse border border-gray-400 text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ویژگی</th>
              <th className="border p-2">مقدار</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">Cr₂O₃</td>
              <td className="border p-2">۴۶–۴۸٪</td>
            </tr>
            <tr>
              <td className="border p-2">FeO</td>
              <td className="border p-2">۱۸–۲۰٪</td>
            </tr>
            <tr>
              <td className="border p-2">دانه‌بندی</td>
              <td className="border p-2">۱۰–۱۰۰ میلی‌متر</td>
            </tr>
            <tr>
              <td className="border p-2">کاربرد</td>
              <td className="border p-2">صنایع فولاد و آلیاژ</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },
  {
    title: "محصولات ثانویه",
    content: (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-3">کلوخه کرومیت با خلوص متوسط</h2>
        <table className="w-full border-collapse border border-gray-400 text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ویژگی</th>
              <th className="border p-2">مقدار</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">Cr₂O₃</td>
              <td className="border p-2">۴۰–۴۲٪</td>
            </tr>
            <tr>
              <td className="border p-2">FeO</td>
              <td className="border p-2">۲۱–۲۳٪</td>
            </tr>
            <tr>
              <td className="border p-2">کاربرد</td>
              <td className="border p-2">ریخته‌گری و فروآلیاژ</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },
  {
    title: "ویژگی‌ها و مزایا",
    content: (
      <div className="p-6 grid grid-cols-2 gap-4 text-center">
        {[
          { icon: "🚜", text: "استخراج با تجهیزات مدرن" },
          { icon: "📦", text: "بسته‌بندی استاندارد صادراتی" },
          { icon: "🚛", text: "حمل سریع و مطمئن" },
          { icon: "⭐", text: "کنترل کیفی مستمر" },
        ].map((item, i) => (
          <div key={i} className="bg-gray-100 rounded-xl p-4">
            <div className="text-4xl mb-2">{item.icon}</div>
            <p className="font-medium">{item.text}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "کاربردها و صنایع هدف",
    content: (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">کاربردهای کرومیت</h2>
        <ul className="list-disc pr-6 space-y-2 text-gray-700">
          <li>صنایع فولادسازی</li>
          <li>تولید فروکروم</li>
          <li>صنایع نسوز و ریخته‌گری</li>
          <li>تولید رنگدانه‌های صنعتی</li>
        </ul>
        <div className="relative mt-4 w-full h-40 rounded-xl overflow-hidden">
          <Image
            src="/images/industry.jpg"
            alt="صنایع هدف"
            fill
            className="object-cover"
          />
        </div>
      </div>
    ),
  },
  {
    title: "نحوه سفارش و فروش",
    content: (
      <div className="p-6 text-gray-700">
        <h2 className="text-2xl font-bold mb-2">نحوه سفارش</h2>
        <p>
          برای ثبت سفارش، کافی است با واحد فروش تماس بگیرید. سفارشات با حداقل
          حجم ۵۰ تن پذیرفته می‌شود. بسته‌بندی به‌صورت جامبوبگ یا فله‌ای
          امکان‌پذیر است.
        </p>
      </div>
    ),
  },
  {
    title: "تماس با ما",
    content: (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">تماس با ما</h2>
        <p className="text-gray-700">📞 ۰۲۱-۴۴۵۵۵۵۵۵</p>
        <p className="text-gray-700">🌐 www.pishrocarbon.ir</p>
        <p className="text-gray-700">📧 info@pishrocarbon.ir</p>
        <div className="relative mx-auto mt-4 w-32 h-32">
          <Image
            src="/images/qr.png"
            alt="QR Code"
            fill
            className="object-contain"
          />
        </div>
      </div>
    ),
  },
];

//About section

export const stats = [
  { value: "30+", label: "سال تجربه", color: "text-[#c76700]" },
  { value: "500K+", label: "تن تولید سالانه", color: "text-blue-400" },
];

export const images = [
  "/images/high-carbon-ferrochrome.webp",
  "/images/low-carbon-ferrochrome.jpg",
  "/images/micro-carbon-ferrochrome.webp",
];

//Header
export const navItems = [
  { label: "خانه", href: "#hero" },
  { label: "محصولات", href: "#product" },
  { label: "خدمات", href: "#whyus" },
  { label: "درباره ما", href: "#about" },
  { label: "وبلاگ", href: "#blogs" },
];

//Footer
export const socialIcons = [
  {
    href: "https://wa.me/989351946619",
    icon: <FaWhatsapp />,
    bg: "bg-[#3EBD4E]",
  },
  {
    href: "weixin://dl/chat?username=wzid_2lzjd7zm52fn19",
    icon: <IoLogoWechat />,
    bg: "bg-[#18C11D]",
  },
];

//Gallary
export const gallary = [
  { id: 1, image: "/images/gallery/1.jpg" },
  { id: 2, image: "/images/gallery/2.jpg" },
  { id: 3, image: "/images/gallery/3.jpg" },
  { id: 4, image: "/images/gallery/4.jpg" },
  { id: 5, image: "/images/gallery/5.jpg" },
  { id: 6, image: "/images/gallery/7.jpg" },
];

//Product
export const products = [
  {
    id: 1,
    name: "فروکروم پرکربن",
    description:
      "مناسب برای تولید فولادهای ضدزنگ و آلیاژی. دارای درصد بالای کروم و مقاومت حرارتی عالی.",
    features: ["کروم: 65٪", "کربن: 6–8٪", "اندازه ذرات: 10–100 میلی‌متر"],
    image: "/images/high-carbon-ferrochrome.webp",
  },
  {
    id: 2,
    name: "فروکروم کم‌کربن",
    description:
      "ویژه‌ی صنایع دقیق و فولادهای خاص با میزان کربن پایین. مناسب برای استفاده در فولادهای ابزار و مقاوم به خوردگی.",
    features: ["کروم: 70٪", "کربن: ≤0.1٪", "خلوص بالا و پایداری عالی"],
    image: "/images/low-carbon-ferrochrome.jpg",
  },
  {
    id: 3,
    name: "فروکروم میکروکربن",
    description:
      "مناسب برای فولادهای آلیاژی با حساسیت بالا نسبت به کربن. تولید شده با فرآیند الکترولیتی دقیق.",
    features: ["کروم: 75٪", "کربن: ≤0.03٪", "رطوبت پایین و دانه‌بندی یکنواخت"],
    image: "/images/micro-carbon-ferrochrome.webp",
  },
];

//WhatIsFerroChrome
export const tabs = {
  ferrochrome: {
    title: "فرو کروم چیست؟",
    subtitle: "فروکروم",
    color: "var(--color-title)",
    highlight: "var(--color-highlight)",
    text1: `کروم به صورت آزاد در طبیعت پیدا نمی‌شود و غنی‌ترین ماده معدنی حاوی
      کروم، کرومیت با فرمول FeO.Cr2O3 است. کروم از کانی کرومیت به‌دست می‌آید
      که یک کانی اکسیدی از کروم، آهن و اکسیژن می‌باشد.`,
    text2: `فرو کروم یکی از اصلی‌ترین فروآلیاژهای مورد استفاده در صنعت فولادسازی
      و ریخته‌گری است و به عنوان منبع اصلی تأمین عنصر کروم در فولادهای ضدزنگ،
      فولادهای ابزار و آلیاژهای مقاوم به حرارت شناخته می‌شود.`,
    images: [
      "/images/high-carbon-ferrochrome.webp",
      "/images/low-carbon-ferrochrome.jpg",
      "/images/micro-carbon-ferrochrome.webp",
    ],
    glow1: "var(--color-glow-1)",
    glow2: "var(--color-glow-2)",
  },
  chromite: {
    title: "کرومیت چیست؟",
    subtitle: "کانی کرومیت",
    color: "var(--color-title)",
    highlight: "var(--color-highlight)",
    text1: `کرومیت (FeCr₂O₄) تنها منبع اقتصادی استخراج کروم است که در سنگ‌های
      اولترامافیک مانند دونیت و سرپانتین یافت می‌شود. این کانی به دلیل داشتن
      ترکیب آهن و کروم اهمیت بالایی در صنایع فولادسازی دارد.`,
    text2: `کرومیت در فرآیند ذوب به فروکروم تبدیل می‌شود که سپس برای تولید فولاد
      ضدزنگ و سایر آلیاژهای مقاوم به خوردگی به کار می‌رود.`,
    images: [
      "/images/chromite1.webp",
      "/images/chromite2.webp",
      "/images/chromite3.webp",
    ],
    glow1: "var(--color-glow-3)",
    glow2: "var(--color-glow-4)",
  },
};

//WhyChooseUs
export const items = [
  {
    icon: <FaAward className="w-10 h-10 mx-auto text-[#a15300]" />,
    title: "کیفیت ممتاز",
    desc: "تولید با گواهی ISO 9001 و کنترل کیفیت دقیق در تمامی مراحل.",
  },
  {
    icon: <FaGlobe className="w-10 h-10 mx-auto text-blue-400" />,
    title: "پوشش جهانی",
    desc: "خدمات رسانی به بیش از 40 کشور با لجستیک قابل اعتماد.",
  },
  {
    icon: <FaCheckCircle className="w-10 h-10 mx-auto text-gray-400" />,
    title: "قابلیت اطمینان",
    desc: "تحویل 99.8٪ به موقع و مدیریت زنجیره تأمین پایدار.",
  },
  {
    icon: <FaLeaf className="w-10 h-10 mx-auto text-green-400" />,
    title: "پایداری",
    desc: "فرآیندهای تولید دوستدار محیط زیست با حداقل اثر کربن.",
  },
];

//Sidebar
export const sidebarItems = [
  { href: "/panel", label: "خانه", icon: <AiOutlineHome size={20} /> },
  {
    href: "/panel/blogs",
    label: "بلاگ‌ها",
    icon: <AiOutlineFileText size={20} />,
  },
  {
    href: "/panel/comments",
    label: "نظرات",
    icon: <AiOutlineMessage size={20} />,
  },
  {
    href: "/panel/reports",
    label: "گزارش‌ها",
    icon: <AiOutlineAlert size={20} />,
  },
  {
    href: "/panel/contactLogs",
    label: "لاگ ها",
    icon: <MessageCircle size={20} />,
  },
];
