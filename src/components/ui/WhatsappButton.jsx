"use client";
import Image from "next/image";

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
          text-white
          shadow-lg 
          transition-all duration-300
        "
      >
        <Image
          src="/whatsapp.svg"
          alt="WhatsApp"
          width={28}
          height={28}
          className="w-7 h-7"
        />
      </a>
    </div>
  );
}
