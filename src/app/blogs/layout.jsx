import React from "react";
import Header from "../(sections)/Header";
import Footer from "../(sections)/Footer";

export default function BlogLayout({ children }) {
  return (
    <>
      <Header blogPath />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-md shadow-md p-8">{children}</div>
        </div>
      </div>
      <Footer />
    </>
  );
}
