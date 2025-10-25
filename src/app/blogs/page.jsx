"use client";

import AnimatedCard from "@/components/blogs/AnimatedCard";
import { getBlogs } from "@/services/api";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { usePathname } from "next/navigation";
import "swiper/css";
import "swiper/css/navigation";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const pathname = usePathname();
  const isBlogPage = pathname === "/blogs";

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
      className="mx-auto px-4 py-30 "
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

      {isBlogPage ? (
        <div className="grid  gap-12 container m-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
      ) : (
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3000 }}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {blogs.map((blog) => (
              <SwiperSlide key={blog.id}>
                <AnimatedCard
                  title={blog.title}
                  summary={blog.summary}
                  createdAt={blog.createdAt}
                  image={blog.image}
                  href={`/blogs/${blog.id}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* دکمه‌های ناوبری */}
          <div className="flex justify-between absolute top-1/3 left-0 right-0 transform -translate-y-1/2 z-10 px-2 pointer-events-none">
            <div className="swiper-button-prev-custom pointer-events-auto bg-[#00000050] text-white rounded-md p-2 md:p-3 shadow-lg transition duration-300 cursor-pointer">
              ❮
            </div>
            <div className="swiper-button-next-custom pointer-events-auto bg-[#00000050] text-white rounded-md p-2 md:p-3 shadow-lg transition duration-300 cursor-pointer">
              ❯
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blogs;
