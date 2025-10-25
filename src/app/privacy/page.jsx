// app/privacy/page.tsx
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">
        سیاست حفظ حریم خصوصی
      </h1>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            ۱. داده‌های جمع‌آوری شده
          </h2>
          <p>
            وقتی شما روی دکمه <strong>"تماس با ما"</strong> کلیک می‌کنید، ما به
            صورت خودکار اطلاعات زیر را ثبت می‌کنیم:
          </p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>موقعیت جغرافیایی تقریبی (کشور، شهر، مختصات جغرافیایی)</li>
            <li>تاریخ و زمان کلیک</li>
          </ul>
          <p className="mt-2">
            <strong>توجه:</strong> آدرس IP شما فقط برای یک لحظه (برای تشخیص
            موقعیت) استفاده می‌شود و <strong>ذخیره نمی‌شود</strong>. هیچ اطلاعات
            شخصی مثل نام، ایمیل یا شماره تلفن جمع‌آوری نمی‌شود.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">۲. هدف جمع‌آوری</h2>
          <p>این داده‌ها فقط برای موارد زیر استفاده می‌شوند:</p>
          <ul className="list-disc list-inside ml-4">
            <li>تحلیل آماری بازدیدکنندگان</li>
            <li>بهبود تجربه کاربری</li>
            <li>شناسایی الگوهای جغرافیایی کاربران</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">۳. مدت نگهداری</h2>
          <p>
            داده‌ها حداکثر <strong>۶ ماه</strong> نگهداری شده و سپس به صورت
            خودکار حذف می‌شوند.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">۴. حقوق شما</h2>
          <p>شما حق دارید:</p>
          <ul className="list-disc list-inside ml-4">
            <li>درخواست حذف داده‌های خود را داشته باشید.</li>
            <li>
              با ایمیل{" "}
              <a
                href="mailto:admin@yoursite.com"
                className="text-blue-600 underline"
              >
                admin@yoursite.com
              </a>{" "}
              تماس بگیرید.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">۵. عدم فروش داده</h2>
          <p>
            ما داده‌های شما را به هیچ شخص یا شرکتی <strong>نمی‌فروشیم</strong>.
          </p>
        </section>

        <hr className="my-8" />

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Privacy Policy (English)
          </h2>
          <p>When you click "Contact Us", we log:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Approximate location (country, city, coordinates)</li>
            <li>Date and time</li>
          </ul>
          <p className="mt-2">
            <strong>IP is not stored.</strong> No personal data (name, email) is
            collected.
          </p>
          <p>
            Data is kept for 6 months and then deleted. You can request removal
            anytime.
          </p>
        </section>

        <div className="text-center mt-12">
          <Link href="/" className="text-blue-600 hover:underline">
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  );
}
