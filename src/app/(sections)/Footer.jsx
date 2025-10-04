import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black py-16 border-t border-gray-800">
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <h3 className="text-3xl font-bold text-yellow-400 mb-4">
            FerroCorp Industries
          </h3>
          <p className="text-gray-400 mb-6 text-sm">
            پیشرو در صنعت جهانی فروکروم با محصولات ممتاز، تولید پایدار و همکاری
            قابل اعتماد در بیش از 40 کشور.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold"
            >
              in
            </Link>
            <Link
              href="#"
              className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold"
            >
              f
            </Link>
            <Link
              href="#"
              className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold"
            >
              @
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-gray-200 font-semibold mb-4">اطلاعات تماس</h4>
          <div className="space-y-2 text-gray-400 text-sm">
            <p>📧 sales@ferrocorp.com</p>
            <p>📞 +1 (555) 123-4567</p>
            <p>🏢 Industrial District, Steel City</p>
            <p>🌐 www.ferrocorp.com</p>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-gray-500 text-sm">
        © 2025 Ferrochrome Industries. تمامی حقوق محفوظ است.
      </div>
    </footer>
  );
}
