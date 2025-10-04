import "./globals.css";

export const metadata = {
  title: "فروکروم با کیفیت | Ferrochrome Industries",
  description: "تولید و فروش فروکروم با کیفیت ممتاز و تحویل به سراسر دنیا.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-sans bg-black text-white">{children}</body>
    </html>
  );
}
