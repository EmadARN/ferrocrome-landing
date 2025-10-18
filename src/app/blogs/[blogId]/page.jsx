import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BlogComments from "@/components/blogs/BlogComments";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi2";
export default async function BlogDetail({ params }) {
  const { blogId } = params;

  const blog = await prisma.blog.findUnique({
    where: { id: Number(blogId) },
    include: { comments: true },
  });

  if (!blog) return notFound();

  return (
    <div className=" min-h-screen pt-10">
      <section
        style={{ background: "var(--color-about-bg)" }}
        className=" py-16"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* بازگشت به همه مقالات */}
          <div className="flex justify-end mb-6 sm:mb-8">
            <Link
              href="/blogs"
              className="group text-blue-600 hover:text-blue-800 text-sm sm:text-base flex items-center gap-1 font-medium transition-colors"
            >
              <span className="relative">
                بازگشت به همه مقالات
                <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </span>
              <HiArrowLeft
                className="text-lg transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
          {/* عنوان */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
            {blog.title}
          </h1>

          {/* محتوا */}
          <article
            style={{
              backgroundColor: "var(--color-form-bg)!important",
              color: "var(--color-title-secondary)",
            }}
            className=" rounded-sm shadow-md p-6 sm:p-8 md:p-12 leading-relaxed text-gray-700 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </section>

      {/* Client Component برای دیدگاه‌ها */}
      <BlogComments blogId={blog.id} initialComments={blog.comments} />
    </div>
  );
}
