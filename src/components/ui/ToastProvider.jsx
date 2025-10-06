"use client";
import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "#1f2937", 
          color: "#f3f4f6",     
          borderRadius: "8px",
          fontFamily: "Vazir, sans-serif",
          direction: "rtl",
        },
        success: {
          iconTheme: {
            primary: "#22c55e",
            secondary: "#1f2937",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#1f2937",
          },
        },
      }}
    />
  );
}
