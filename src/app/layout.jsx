import "./globals.css";
import { fontIranYekan } from "@/lib/font";
import Providers from "./Providers";
import ToastProvider from "@/components/ui/ToastProvider";

export const metadata = {
  title: {
    default: "فروکروم با کیفیت | Ferrochrome Industries",
    template: "%s | Ferrochrome Industries",
  },
  description: "تولید و فروش فروکروم با کیفیت ممتاز و تحویل به سراسر دنیا.",
  keywords: [
    "فروکروم",
    "Ferrochrome",
    "فروآلیاژ",
    "تولید فروکروم",
    "صنایع فلزی",
    "فولاد",
    "آلیاژ",
  ],
  authors: [{ name: "Ferrochrome Industries" }],
  creator: "Ferrochrome Industries",
  publisher: "Ferrochrome Industries",
  metadataBase: new URL("https://ferrochrome.ir"), // آدرس دامنه‌ی سایتت
  openGraph: {
    title: "فروکروم با کیفیت | Ferrochrome Industries",
    description: "تولید و فروش فروکروم با کیفیت ممتاز و تحویل به سراسر دنیا.",
    url: "https://ferrochrome.ir",
    siteName: "Ferrochrome Industries",
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: "/images/fallback.PNG", // مسیر عکس برای پیش‌نمایش (در public)
        width: 1200,
        height: 630,
        alt: "Ferrochrome Factory",
      },
    ],
  },
  alternates: {
    canonical: "https://ferrochrome.ir",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${fontIranYekan.variable} bg-black text-white`}>
        <Providers>
          <ToastProvider />
          {children}
        </Providers>
      </body>
    </html>
  );
}
