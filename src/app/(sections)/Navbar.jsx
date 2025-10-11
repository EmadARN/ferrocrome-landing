// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { cn } from "@/lib/utils";

// const navItems = [
//   { label: "خانه", href: "#hero" },
//   { label: "درباره ما", href: "#about" },
//   { label: "چرا ما", href: "#whyus" },
//   { label: "ارتباط با ما", href: "#contact" },
// ];

// export default function Navbar() {
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 60);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <header
//       className={cn(
//         "fixed top-0 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 shadow-lg",
//         "bg-blue-600/40 backdrop-blur-md border border-white/20",
//         isScrolled ? "w-[95%] md:w-[22%] rounded-xl" : "w-full rounded-none"
//       )}
//     >
//       <div className="flex items-center px-6 py-3">
//         {/* منو سمت چپ */}
//         <nav className="flex items-center gap-8">
//           {/* لوگو سمت راست (فقط وقتی اسکرول شد) */}
//           {isScrolled && (
//             <div className="ml-auto flex items-center">
//               <Image
//                 src="/logo.png"
//                 alt="Logo"
//                 width={40}
//                 height={40}
//                 className="rounded transition-all duration-300"
//               />
//             </div>
//           )}
//           {navItems.map((item) => (
//             <a
//               key={item.href}
//               href={item.href}
//               className="text-white whitespace-nowrap hover:text-yellow-200 transition-colors scroll-smooth"
//             >
//               {item.label}
//             </a>
//           ))}
//         </nav>
//       </div>
//     </header>
//   );
// }


"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "خانه", href: "#hero" },
  { label: "درباره ما", href: "#about" },
  { label: "چرا ما", href: "#whyus" },
  { label: "ارتباط با ما", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
     className={cn(
        "fixed top-0 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 shadow-lg",
        "bg-background/80 backdrop-blur-md border border-border",
        isScrolled ? "w-[95%] md:w-[22%] rounded-xl" : "w-full rounded-none"
      )}
    >
      <div className="flex items-center px-6 py-3">
        {/* منو سمت چپ */}
        <nav className="flex items-center gap-8">
          {/* لوگو سمت راست (فقط وقتی اسکرول شد) */}
          {isScrolled && (
            <div className="ml-auto flex items-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="rounded transition-all duration-300"
              />
            </div>
          )}
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-foreground whitespace-nowrap hover:text-primary transition-colors scroll-smooth"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
