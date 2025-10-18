import React from "react";
import Header from "../(sections)/Header";
import Footer from "../(sections)/Footer";

export default function BlogLayout({ children }) {
  return (
    <>
      <Header blogPath />

      <div className=" mx-auto ">
        <div
          style={{ background: "var(--color-about-bg)" }}
          className=" rounded-md shadow-md p-8"
        >
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}
