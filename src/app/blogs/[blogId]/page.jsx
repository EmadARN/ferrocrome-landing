import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BlogComments from "@/components/blogs/BlogComments";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi2";

export default async function BlogDetail({ params }) {
  const resolvedParams = await params;
  const { blogId } = resolvedParams;

  const blog = await prisma.blog.findUnique({
    where: { id: Number(blogId) },
    include: { comments: true },
  });

  if (!blog) return notFound();

  return (
    <div
      style={{ background: "var(--color-about-bg)" }}
      className="min-h-screen pt-20 pb-24 transition-colors duration-500"
    >
      <section className="relative py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* دکمه بازگشت */}
          <div className="flex justify-end mb-8">
            <Link
              href="/blogs"
              className="group text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm sm:text-base flex items-center gap-1 font-medium transition-colors"
            >
              <span className="relative">
                بازگشت به همه مقالات
                <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </span>
              <HiArrowLeft
                className="text-lg transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* عنوان */}
          <h1
            style={{ color: "var(--color-title-secondary)" }}
            className="text-4xl sm:text-5xl font-extrabold mb-8 text-center leading-tight 
   "
          >
            {blog.title}
          </h1>

          {/* جداکننده */}
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-10 rounded-full"></div>

          {/* محتوای بلاگ */}
          <article
            className="
    prose prose-lg max-w-none leading-relaxed
    rounded-2xl shadow-xl
    p-8 sm:p-10 md:p-12
    transition-all duration-300
    prose-invert
    prose-img:rounded-xl
    prose-th:text-center prose-td:text-center
    prose-table:border prose-table:border-gray-500
  "
            style={{
              background: "var(--color-form-bg)!important",
              color: "var(--color-text-article)",
            }}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </section>

      {/* بخش دیدگاه‌ها */}
      <div
        style={{
          background: "var(--color-form-bg)!important ",
        }}
        className="
    text-gray-800 dark:text-gray-100
   
    backdrop-blur-xl rounded-2xl shadow-lg 
    p-8 sm:p-10 transition-all duration-300
  "
      >
        <h2
          style={{ color: "var(--color-title-secondary)" }}
          className="text-2xl font-bold mb-6"
        >
          دیدگاه‌ها
        </h2>
        <BlogComments blogId={blog.id} initialComments={blog.comments} />
      </div>
    </div>
  );
}
