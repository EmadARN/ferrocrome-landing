"use client";

import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import LoadingState from "@/components/ui/LoadingState";
import {
  FiFileText,
  FiEdit3,
  FiMessageSquare,
  FiMaximize2,
  FiClipboard,
} from "react-icons/fi";

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(null);
  const weeklyBlogsRef = useRef(null);
  const monthlyReportsRef = useRef(null);
  const fullScreenChartRef = useRef(null);

  // Fetch داده‌ها
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

  // نمودارهای اصلی
  useEffect(() => {
    if (!data || !data.weeklyPosts || !data.monthlyReports) return;

    let weeklyChart = null;
    let monthlyChart = null;

    if (weeklyBlogsRef.current) {
      weeklyChart = new Chart(weeklyBlogsRef.current, {
        type: "line",
        data: {
          labels: data.weeklyPosts.map((w) => w.week || ""),
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
          plugins: {
            legend: { display: false },
            tooltip: {
              enabled: true,
              callbacks: {
                label: (context) =>
                  `${context.dataset.label}: ${context.parsed.y}`,
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: "#F3F4F6" },
              ticks: { color: "#6B7280", stepSize: 1 },
            },
            x: {
              grid: { display: false },
              ticks: {
                color: "#6B7280",
                maxRotation: 45,
                minRotation: 45,
                autoSkip: false,
              },
            },
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
          plugins: {
            legend: { display: false },
            tooltip: {
              enabled: true,
              callbacks: {
                label: (context) =>
                  `${context.dataset.label}: ${context.parsed.y}`,
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: "#F3F4F6" },
              ticks: { color: "#6B7280", stepSize: 1 },
            },
            x: {
              grid: { display: false },
              ticks: {
                color: "#6B7280",
                maxRotation: 45,
                minRotation: 45,
                autoSkip: false,
              },
            },
          },
        },
      });
    }

    return () => {
      if (weeklyChart) weeklyChart.destroy();
      if (monthlyChart) monthlyChart.destroy();
    };
  }, [data]);

  // نمودار تمام‌صفحه
  useEffect(() => {
    if (!isFullScreen || !data || !fullScreenChartRef.current) return;

    let fullScreenChart = null;

    const chartConfig =
      isFullScreen === "weekly"
        ? {
            type: "line",
            data: {
              labels: data.weeklyPosts.map((w) => w.week || ""),
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
          }
        : {
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
          };

    fullScreenChart = new Chart(fullScreenChartRef.current, {
      ...chartConfig,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            callbacks: {
              label: (context) =>
                `${context.dataset.label}: ${context.parsed.y}`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: "#F3F4F6" },
            ticks: { color: "#6B7280", stepSize: 1 },
          },
          x: {
            grid: { display: false },
            ticks: {
              color: "#6B7280",
              maxRotation: 45,
              minRotation: 45,
              autoSkip: false,
            },
          },
        },
      },
    });

    return () => {
      if (fullScreenChart) fullScreenChart.destroy();
    };
  }, [isFullScreen, data]);

  const handleFullScreen = (chartType) => setIsFullScreen(chartType);
  const closeFullScreen = () => setIsFullScreen(null);

  if (!data) return <LoadingState text="در حال بارگذاری داده‌ها..." />;

  return (
    <div className="min-h-screen p-4 sm:p-6 mt-8 sm:mt-12">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-300 mb-2">
          نمای کلی داشبورد
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          خوش آمدید! اینجا اتفاقات امروز پلتفرم شما نمایش داده می‌شود.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-gray-700 rounded-md p-4 sm:p-6 shadow-sm border border-gray-500 flex items-center gap-4">
          <div className="text-blue-500 text-2xl sm:text-3xl">
            <FiEdit3 />
          </div>
          <div>
            <p className="text-gray-200 text-sm font-medium mb-1">
              تعداد بلاگ و اخبار
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-300">
              {data.postsCount || 0}
            </p>
          </div>
        </div>

        <div className="bg-gray-700 rounded-md p-4 sm:p-6 shadow-sm border border-gray-500 flex items-center gap-4">
          <div className="text-green-500 text-2xl sm:text-3xl">
            <FiFileText />
          </div>
          <div>
            <p className="text-gray-200 text-sm font-medium mb-1">
              تعداد گزارش‌ها
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-300">
              {data.reportsCount || 0}
            </p>
          </div>
        </div>

        <div className="bg-gray-700 rounded-md p-4 sm:p-6 shadow-sm border border-gray-500 flex items-center gap-4">
          <div className="text-yellow-500 text-2xl sm:text-3xl">
            <FiMessageSquare />
          </div>
          <div>
            <p className="text-gray-200 text-sm font-medium mb-1">
              تعداد دیدگاه‌ها
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-300">
              {data.commentsCount || 0}
            </p>
          </div>
        </div>

        <div className="bg-gray-700 rounded-md p-4 sm:p-6 shadow-sm border border-gray-500 flex items-center gap-4">
          <div className="text-purple-500 text-2xl sm:text-3xl">
            <FiClipboard />
          </div>
          <div>
            <p className="text-gray-200 text-sm font-medium mb-1">
              تعداد لاگ‌ها
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-300">
              {data.logsCount || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Weekly Blogs Chart */}
        <div className="bg-gray-700 rounded-md p-4 sm:p-6 shadow-sm border border-gray-500 relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-300">
              بلاگ و اخبار هفتگی
            </h3>
            <button
              onClick={() => handleFullScreen("weekly")}
              className="text-gray-400 hover:text-gray-200"
              title="بزرگنمایی"
            >
              <FiMaximize2 className="text-xl cursor-pointer" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[300px] h-56 sm:h-64 lg:h-80">
              <canvas ref={weeklyBlogsRef}></canvas>
            </div>
          </div>
        </div>

        {/* Monthly Reports Chart */}
        <div className="bg-gray-700 rounded-md p-4 sm:p-6 shadow-sm border border-gray-500 relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-300">
              گزارش‌های ماهانه
            </h3>
            <button
              onClick={() => handleFullScreen("monthly")}
              className="text-gray-400 hover:text-gray-200"
              title="بزرگنمایی"
            >
              <FiMaximize2 className="text-xl cursor-pointer" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[300px] h-56 sm:h-64 lg:h-80">
              <canvas ref={monthlyReportsRef}></canvas>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullScreen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
          <div className="bg-gray-800 rounded-md p-4 sm:p-6 w-full max-w-4xl sm:max-w-5xl relative transform transition-transform duration-300 scale-100">
            <button
              onClick={closeFullScreen}
              className="absolute top-4 left-4 text-gray-400 hover:text-gray-200"
              title="بستن"
            >
              <FiMaximize2 className="text-2xl rotate-45 cursor-pointer" />
            </button>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-300 mb-4">
              {isFullScreen === "weekly"
                ? "بلاگ و اخبار هفتگی"
                : "گزارش‌های ماهانه"}
            </h3>
            <div className="h-[70vh] sm:h-[80vh] w-full">
              <canvas ref={fullScreenChartRef}></canvas>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
