"use client";

export default function WhatsAppButton() {
  const whatsappNumber = "989123456789"; 
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="
          flex items-center justify-center
          w-14 h-14 rounded-full
          bg-[#25D366] hover:bg-[#1ebe5d]
          text-white text-2xl
          shadow-lg hover:shadow-xl
          transition-all duration-300
        "
      >
        {/* آیکون واتس‌اپ */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7"
        >
          <path d="M12.04 2C6.48 2 2 6.48 2 12c0 2.12.55 4.1 1.51 5.83L2 22l4.33-1.43C8.03 21.45 10 22 12.04 22c5.56 0 10.04-4.48 10.04-10S17.6 2 12.04 2zm5.36 14.55c-.23.64-1.34 1.21-1.82 1.28-.47.07-1.02.1-1.6-.05-2.55-.53-4.2-2.68-4.33-2.82-.13-.14-1.04-1.25-1.04-2.38s.7-1.67.94-1.91c.24-.24.52-.25.7-.25.18 0 .36 0 .52.02.17.03.48-.06.75.56.27.63.93 2.16 1 2.31.07.14.12.3.02.48-.1.18-.15.3-.3.48-.15.18-.32.38-.47.52-.15.14-.31.31-.13.6.18.28.8 1.3 1.72 2.1 1.19.99 2.18 1.29 2.49 1.43.31.14.49.12.67-.07.18-.18.78-.9.99-1.21.2-.31.41-.25.69-.15.27.1 1.73.82 2.03.97.3.15.5.23.57.36.08.13.08.75-.15 1.39z" />
        </svg>
      </a>
    </div>
  );
}
