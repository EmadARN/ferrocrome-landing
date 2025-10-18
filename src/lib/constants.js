import Image from "next/image";

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
