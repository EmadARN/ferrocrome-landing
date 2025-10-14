"use client";

import AnimatedCard from "@/components/blogs/AnimatedCard";
import { getBlogs } from "@/services/api";
import React, { useEffect, useState } from "react";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const data = await getBlogs();
        setBlogs(
          Array.isArray(data.blogs)
            ? data.blogs
            : Array.isArray(data)
            ? data
            : []
        );
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setBlogs([]);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <main className="flex-1 w-full px-4 py-14">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          آخرین مقالات
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
          {blogs.map((blog) => (
            <AnimatedCard
              key={blog.id}
              title={blog.title}
              summary={blog.summary}
              createdAt={blog.createdAt}
              image={blog.image}
              href={`/blogs/${blog.id}`}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Blogs;
