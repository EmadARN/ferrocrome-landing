import React from "react";
import { motion } from "framer-motion";
const BlogsNavigation = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-red-500 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
              Nexus
            </div>
            <div className="hidden md:block text-gray-400">|</div>
            <div className="hidden md:block text-gray-600 font-medium">
              Editorial Blog
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <button
              onClick={toggleView}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <span>{view === "listing" ? "All Blogs" : "Blog Detail"}</span>
            </button>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default BlogsNavigation;
