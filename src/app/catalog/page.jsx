"use client";

import React, { useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { pages } from "@/lib/constants";
import Link from "next/link";
import {
  AiOutlineHome,
  AiOutlineZoomIn,
  AiOutlineZoomOut,
  AiOutlineFullscreen,
  AiOutlinePauseCircle,
  AiOutlinePlayCircle,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";

export default function CatalogPage() {
  const bookRef = useRef(null);

  const [zoom, setZoom] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // تشخیص سایز موبایل
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // پخش خودکار
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        if (bookRef.current) {
          bookRef.current.pageFlip().flipNext();
          playFlipSound();
        }
      }, 2500);
    } else clearInterval(interval);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      document.body.style.overflow = "hidden";
    } else {
      document.exitFullscreen();
      document.body.style.overflow = "auto";
    }
  };

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.1, 1.2));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.7));

  const handleNextPage = () => {
    if (bookRef.current) bookRef.current.pageFlip().flipNext();
  };
  const handlePrevPage = () => {
    if (bookRef.current) bookRef.current.pageFlip().flipPrev();
  };
  const handleFlip = (e) => setCurrentPage(e.data);

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50 p-4 overflow-x-hidden md:overflow-y-hidden">
      {/* ---------- نوار بالای صفحه ---------- */}
      <div className="w-full py-3 bg-gradient-to-b from-white/80 to-transparent backdrop-blur-md fixed top-0 left-0 z-50">
        <div className="flex justify-center items-center">
          <div className="text-center">
            <h1 className="font-orbitron font-black text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wider mb-1">
              صنایع ذوب فام سپند
            </h1>
            {!isMobile && (
              <>
                <div className="flex items-center justify-center space-x-2 md:space-x-4">
                  <div className="hidden md:block w-8 h-[2px] bg-gradient-to-r from-transparent via-orange-200 to-transparent"></div>
                  <p className="font-rajdhani text-[0.55rem] sm:text-[0.65rem] md:text-sm tracking-widest">
                    تولید کننده و تامین کننده مواد اولیه فولادی
                  </p>
                  <div className="hidden md:block w-8 h-[2px] bg-gradient-to-r from-transparent via-orange-200 to-transparent"></div>
                </div>
                <p className="font-rajdhani font-light text-[0.5rem] sm:text-[0.55rem] md:text-[0.65rem] mt-1 tracking-wider">
                  Ferrocrome Industries Co
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ---------- کتاب ---------- */}
      <div
        className="mt-28 md:mt-32 flex justify-center w-full max-w-[95vw] transition-transform duration-500 drop-shadow-2xl"
        style={{ transform: `scale(${zoom})` }}
      >
        <HTMLFlipBook
          width={isMobile ? 300 : 460}
          height={isMobile ? 500 : 600}
          minWidth={isMobile ? 250 : 350}
          maxWidth={700}
          minHeight={isMobile ? 400 : 400}
          maxHeight={900}
          maxShadowOpacity={0.3}
          showCover={true}
          mobileScrollSupport={true}
          usePortrait={isMobile}
          flippingTime={900}
          drawShadow={true}
          className="shadow-2xl rounded-xl bg-white border border-gray-100 cursor-pointer"
          ref={bookRef}
          onFlip={handleFlip}
          display={isMobile ? 1 : 2} // حالت یک صفحه‌ای روی موبایل
        >
          {pages.map((page, index) => (
            <div
              key={index}
              className="bg-white flex flex-col justify-between shadow-md rounded-xl overflow-hidden cursor-pointer"
            >
              <div className="flex-grow p-4 sm:p-6">{page.content}</div>
              <div className="text-center text-xs sm:text-sm p-2 bg-gray-50 text-gray-500">
                صفحه {index + 1}
              </div>
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      {/* ---------- نوار کنترل پایین ---------- */}
      <div className="fixed bottom-4 md:bottom-6 flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-4 bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg px-4 md:px-6 py-2 md:py-3 rounded-full z-50">
        <button
          onClick={handleNextPage}
          className="cursor-pointer text-gray-700 hover:text-blue-600 transition text-xl md:text-2xl"
        >
          <AiOutlineArrowRight />
        </button>

        <span className="text-gray-800 text-xs md:text-sm font-medium min-w-[40px] text-center">
          {currentPage + 1} / {pages.length}
        </span>

        <button
          onClick={handlePrevPage}
          handlePrevPage
          className="cursor-pointer text-gray-700 hover:text-blue-600 transition text-xl md:text-2xl"
        >
          <AiOutlineArrowLeft />
        </button>

        <div className="w-px h-5 bg-gray-300 mx-1 hidden md:block" />

        <button
          onClick={handleZoomOut}
          className="cursor-pointer text-gray-700 hover:text-blue-600 transition text-xl md:text-2xl"
        >
          <AiOutlineZoomOut />
        </button>
        <button
          onClick={handleZoomIn}
          className="cursor-pointer text-gray-700 hover:text-blue-600 transition text-xl md:text-2xl"
        >
          <AiOutlineZoomIn />
        </button>

        <div className="w-px h-5 bg-gray-300 mx-1 hidden md:block" />

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`cursor-pointer transition text-xl md:text-2xl ${
            isPlaying
              ? "text-green-600 hover:text-green-700"
              : "text-gray-700 hover:text-blue-600"
          }`}
        >
          {isPlaying ? <AiOutlinePauseCircle /> : <AiOutlinePlayCircle />}
        </button>

        <button
          onClick={toggleFullscreen}
          className="cursor-pointer text-gray-700 hover:text-blue-600 transition text-xl md:text-2xl"
        >
          <AiOutlineFullscreen />
        </button>

        <Link
          href="/"
          className="cursor-pointer text-blue-600 hover:text-blue-800 transition text-xl md:text-2xl"
        >
          <AiOutlineHome />
        </Link>
      </div>
    </div>
  );
}
