import { prisma } from "@/lib/prisma";
import { startOfWeek, endOfWeek, subWeeks } from "date-fns";

export async function GET() {
  try {
    const postsCount = await prisma.blog.count();
    const commentsCount = await prisma.comment.count();
    const reportsCount = await prisma.formSubmission.count();

    // چهار هفته اخیر با تاریخ شمسی
    const weeklyPosts = [];
    for (let i = 3; i >= 0; i--) {
      const start = startOfWeek(subWeeks(new Date(), i), { weekStartsOn: 6 }); // شنبه شروع هفته
      const end = endOfWeek(subWeeks(new Date(), i), { weekStartsOn: 6 });

      const count = await prisma.blog.count({
        where: { createdAt: { gte: start, lte: end } },
      });

      weeklyPosts.push({
        week: `${start.toLocaleDateString("fa-IR")} - ${end.toLocaleDateString(
          "fa-IR"
        )}`,
        count,
      });
    }

    // همه ماه‌های سال
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

    // گزارش‌ها بر اساس ماه
    const monthlyDataFromDB = await prisma.formSubmission.findMany({
      select: { createdAt: true },
    });

    const monthlyReports = months.map((monthName, i) => {
      const count = monthlyDataFromDB.filter(
        (d) => new Date(d.createdAt).getMonth() === i
      ).length;
      return { month: monthName, count };
    });

    return new Response(
      JSON.stringify({
        postsCount,
        commentsCount,
        reportsCount,
        weeklyPosts,
        monthlyReports,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
