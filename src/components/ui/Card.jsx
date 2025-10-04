import { motion } from "framer-motion";

export default function Card({ children, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-gray-800/40 backdrop-blur-lg rounded-3xl p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
}
