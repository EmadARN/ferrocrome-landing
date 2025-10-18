export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function truncateText(str, length) {
  if (str.length < length) return str;
  return str.slice(0, length) + "...";
}
