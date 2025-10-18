"use client";

import DashboardUI from "@/components/DashboardUI";
import LoadingSpinner from "@/components/ui/LoadingState";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {  useEffect } from "react";

export default function PanelLayout({ children }) {
  const { data: session, status } = useSession({ required: true });
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // اگر کاربر logout شد یا توکن منقضی شد
    }
  }, [status, router]);

  if (status === "loading") return <LoadingSpinner />; // وسط صفحه

  return <DashboardUI>{children}</DashboardUI>;
}
