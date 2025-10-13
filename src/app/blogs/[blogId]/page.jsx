import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BlogComments from "@/components/blogs/BlogComments";
import Link from "next/link";

export default async function BlogDetail({ params }) {
  const { blogId } = params;

  const blog = await prisma.blog.findUnique({
    where: { id: Number(blogId) },
    include: { comments: true },
  });

  if (!blog) return notFound();

  return (
    <div className=" min-h-screen">
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* بازگشت به همه مقالات */}
          <div className="flex justify-end mb-6 sm:mb-8">
            <Link
              href="/blogs"
              className="text-blue-600 hover:text-blue-800 text-sm sm:text-base flex items-center gap-1"
            >
              <span>بازگشت به همه مقالات</span>
              <span>←</span>
            </Link>
          </div>

          {/* عنوان */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
            {blog.title}
          </h1>

          {/* محتوا */}
          <article
            className="bg-white rounded-sm shadow-md p-6 sm:p-8 md:p-12 leading-relaxed text-gray-700 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </section>

      {/* Client Component برای دیدگاه‌ها */}
      <BlogComments blogId={blog.id} initialComments={blog.comments} />
    </div>
  );
}
