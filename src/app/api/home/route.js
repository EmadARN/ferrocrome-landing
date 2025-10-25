import { prisma } from "@/lib/prisma";
import { startOfWeek, endOfWeek, subWeeks } from "date-fns";

export async function GET() {
  try {
    // شمارنده‌های اصلی
    const [postsCount, commentsCount, reportsCount, logsCount] =
      await Promise.all([
        prisma.blog.count(),
        prisma.comment.count(),
        prisma.formSubmission.count(),
        prisma.contactClick.count(),
      ]);

    // 📅 چهار هفته اخیر (شنبه تا جمعه)
    const weeklyPosts = [];
    for (let i = 3; i >= 0; i--) {
      const start = startOfWeek(subWeeks(new Date(), i), { weekStartsOn: 6 });
      const end = endOfWeek(subWeeks(new Date(), i), { weekStartsOn: 6 });

      const count = await prisma.blog.count({
        where: { createdAt: { gte: start, lte: end } },
      });

      const formatter = new Intl.DateTimeFormat("fa-IR", {
        month: "short",
        day: "numeric",
      });

      weeklyPosts.push({
        week: `${formatter.format(start)} - ${formatter.format(end)}`,
        count,
      });
    }

    // 📆 دریافت همه‌ی تاریخ‌های ثبت گزارش‌ها
    const monthlyDataFromDB = await prisma.formSubmission.findMany({
      select: { createdAt: true },
    });

    // آرایه‌ی نام ماه‌های شمسی
    const months = [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ];

    // 📊 گروه‌بندی گزارش‌ها بر اساس ماه شمسی
    const monthlyReports = months.map((monthName) => {
      const count = monthlyDataFromDB.filter((item) => {
        const persianMonth = new Intl.DateTimeFormat("fa-IR", {
          month: "long",
        }).format(new Date(item.createdAt));
        return persianMonth === monthName;
      }).length;

      return { month: monthName, count };
    });

    // 📦 پاسخ نهایی
    return new Response(
      JSON.stringify({
        postsCount,
        commentsCount,
        reportsCount,
        weeklyPosts,
        monthlyReports,
        logsCount,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("❌ Dashboard API Error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
