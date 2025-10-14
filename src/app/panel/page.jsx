"use client";

import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import LoadingState from "@/components/ui/LoadingState";

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const weeklyBlogsRef = useRef(null);
  const monthlyReportsRef = useRef(null);

  // fetch داده‌ها از API
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/home");
        const json = await res.json();
        if (!json) {
          console.error("API returned empty response");
          return;
        }
        setData(json);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }
    fetchData();
  }, []);

  // ساخت نمودارها
  useEffect(() => {
    if (!data || !data.weeklyPosts || !data.monthlyReports) return;

    let weeklyChart;
    let monthlyChart;

    if (weeklyBlogsRef.current) {
      weeklyChart = new Chart(weeklyBlogsRef.current, {
        type: "line",
        data: {
          labels: data.weeklyPosts.map((w) => w.week || ""), // تاریخ واقعی هفته
          datasets: [
            {
              label: "بلاگ و اخبار",
              data: data.weeklyPosts.map((w) => w.count || 0),
              borderColor: "#3B82F6",
              backgroundColor: "rgba(59,130,246,0.1)",
              borderWidth: 3,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: "#3B82F6",
              pointBorderColor: "#fff",
              pointBorderWidth: 2,
              pointRadius: 6,
              pointHoverRadius: 8,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: "#F3F4F6" },
              ticks: { color: "#6B7280" },
            },
            x: { grid: { display: false }, ticks: { color: "#6B7280" } },
          },
        },
      });
    }

    if (monthlyReportsRef.current) {
      monthlyChart = new Chart(monthlyReportsRef.current, {
        type: "bar",
        data: {
          labels: data.monthlyReports.map((r) => r.month || ""),
          datasets: [
            {
              label: "گزارش‌ها",
              data: data.monthlyReports.map((r) => r.count || 0),
              backgroundColor: "rgba(34,197,94,0.8)",
              borderColor: "#22C55E",
              borderWidth: 1,
              borderRadius: 8,
              borderSkipped: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: "#F3F4F6" },
              ticks: { color: "#6B7280" },
            },
            x: { grid: { display: false }, ticks: { color: "#6B7280" } },
          },
        },
      });
    }

    return () => {
      if (weeklyChart) weeklyChart.destroy();
      if (monthlyChart) monthlyChart.destroy();
    };
  }, [data]);

  if (!data) return <LoadingState text="در حال بارگذاری داده‌ها..." />;

  return (
    <div className="min-h-screen p-6 mt-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-300 mb-2">
          نمای کلی داشبورد
        </h1>
        <p className="text-gray-400">
          خوش آمدید! اینجا اتفاقات امروز پلتفرم شما نمایش داده می‌شود.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-md p-6 shadow-sm border border-gray-500">
          <p className="text-gray-200 text-sm font-medium mb-1">
            تعداد بلاگ و اخبار
          </p>
          <p className="text-3xl font-bold text-gray-300">
            {data.postsCount || 0}
          </p>
        </div>
        <div className="bg-gray-800 rounded-md p-6 shadow-sm border border-gray-500">
          <p className="text-gray-200 text-sm font-medium mb-1">
            تعداد گزارش‌ها
          </p>
          <p className="text-3xl font-bold text-gray-300">
            {data.reportsCount || 0}
          </p>
        </div>
        <div className="bg-gray-800 rounded-md p-6 shadow-sm border border-gray-500">
          <p className="text-gray-200 text-sm font-medium mb-1">
            تعداد دیدگاه‌ها
          </p>
          <p className="text-3xl font-bold text-gray-300">
            {data.commentsCount || 0}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-800 rounded-md p-14 shadow-sm border border-gray-500 h-96">
          <h3 className="text-lg font-semibold text-gray-300 mb-2">
            بلاگ و اخبار هفتگی
          </h3>
          <canvas ref={weeklyBlogsRef}></canvas>
        </div>
        <div className="bg-gray-800 rounded-md p-14 shadow-sm border border-gray-500 h-96">
          <h3 className="text-lg font-semibold text-gray-300 mb-2">
            گزارش‌های ماهانه
          </h3>
          <canvas ref={monthlyReportsRef}></canvas>
        </div>
      </div>
    </div>
  );
}
