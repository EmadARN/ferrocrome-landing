import { cn } from "@/lib/utils";

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}) {
  const base =
    "font-bold py-3 px-6 rounded-xl transition-all duration-300 cursor-pointer";

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-700 hover:bg-gray-600 text-white",
    premium:
      "bg-gradient-to-r from-[#a15300] via-[#521f01] to-[#a15300] text-white shadow-lg hover:scale-105 ",
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
