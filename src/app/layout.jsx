import "./globals.css";
import { fontIranYekan } from "@/lib/font";
import Providers from "./Providers";
import ToastProvider from "@/components/ui/ToastProvider";

export const metadata = {
  title: "فروکروم با کیفیت | Ferrochrome Industries",
  description: "تولید و فروش فروکروم با کیفیت ممتاز و تحویل به سراسر دنیا.",
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
