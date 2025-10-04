import { cn } from "@/lib/utils";

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}) {
  const base = "font-bold py-3 px-6 rounded-xl transition-all duration-300";

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-700 hover:bg-gray-600 text-white",
    premium:
      "bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-black shadow-lg hover:scale-105",
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
