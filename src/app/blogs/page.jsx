"use client";

import AnimatedCard from "@/components/blogs/AnimatedCard";
import { getBlogs } from "@/services/api";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
    <section
      style={{
        background: "var(--color-about-bg)",
        color: "var(--color-text)",
      }}
      className=" mx-auto px-4 py-14 pb-20"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ color: "var(--color-title)" }}
        className="text-2xl md:text-4xl font-bold mb-4 text-center pb-6"
      >
        آخرین مقالات
      </motion.h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
    </section>
  );
};

export default Blogs;
