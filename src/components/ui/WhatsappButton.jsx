"use client";
import Image from "next/image";

export default function WhatsAppButton() {

  const whatsappLink = `https://wa.me/989351946619`;

  return (
    <div className="fixed bottom-22 right-6 z-50">
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="
          flex items-center justify-center
          w-10 h-10 rounded-md
          bg-[#25D366] 
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
