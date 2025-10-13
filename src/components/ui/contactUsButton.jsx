"use client";
import { useState, useEffect } from "react";

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = (event) => {
    if (
      event &&
      event.target !== event.currentTarget &&
      !event.target.classList.contains("close-btn")
    ) {
      return;
    }
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        document.body.style.overflow = "auto";
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      <button className="contact-btn" onClick={openModal}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
        تماس با ما
      </button>

      {isOpen && (
        <div
          className="modal-overlay active"
          id="modalOverlay"
          onClick={closeModal}
        >
          <div
            className="modal"
            style={{
              backgroundColor: "var(--color-modal-bg)",
              borderColor: "var(--color-modal-border)",
              color: "var(--color-modal-text)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <button className="close-btn" onClick={closeModal}>
                &times;
              </button>
              <h2 className="modal-title">اطلاعات تماس</h2>
            </div>

            <div className="modal-content">
              {/* Head Office Section */}
              <div className="contact-section">
                <h3 className="section-title">
                  <svg className="section-icon" viewBox="0 0 24 24">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                  دفتر مرکزی
                </h3>

                <div className="contact-item">
                  <svg className="item-icon" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <span className="contact-text">
                    آدرس دفتر مرکزی: تهران، خیابان ولیعصر، پلاک ۱۲۳
                  </span>
                </div>

                <div className="contact-item">
                  <svg className="item-icon" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  <span className="contact-text">تلفن دفتر: ۰۲۱-۸۸۷۷۶۶۵۵</span>
                </div>

                <div className="contact-item">
                  <svg className="item-icon" viewBox="0 0 24 24">
                    <path d="M17 4h3c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2h-3V4zM5 4h9v16H5c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  </svg>
                  <span className="contact-text">
                    شماره همراه: ۰۹۱۲-۳۴۵-۶۷۸۹
                  </span>
                </div>

                <div className="contact-item">
                  <svg className="item-icon" viewBox="0 0 24 24">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                    <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                  </svg>
                  <span className="contact-text">
                    ساعت کاری: ۹:۰۰ صبح - ۵:۰۰ عصر
                  </span>
                </div>
              </div>

              {/* Factory & Online Section */}
              <div className="contact-section">
                <h3 className="section-title">
                  <svg className="section-icon" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  کارخانه و ارتباط آنلاین
                </h3>

                <div className="contact-item">
                  <svg className="item-icon" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <span className="contact-text">
                    آدرس کارخانه: اصفهان، شهرک صنعتی، خیابان صنایع فلزی
                  </span>
                </div>

                <div className="contact-item">
                  <svg className="item-icon" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  <span className="contact-text">
                    ایمیل:{" "}
                    <a
                      href="mailto:info@ferrochrome.ir"
                      className="contact-link"
                      style={{ color: "var(--color-modal-link)" }}
                    >
                      info@ferrochrome.ir
                    </a>
                  </span>
                </div>

                <div className="contact-item">
                  <svg className="item-icon" viewBox="0 0 24 24">
                    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2z" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  <span className="contact-text">
                    اینستاگرام:{" "}
                    <a
                      href="https://instagram.com/ferrochrome_industry"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-link"
                      style={{ color: "var(--color-modal-link)" }}
                    >
                      @ferrochrome_industry
                    </a>
                  </span>
                </div>

                {/* Telegram */}
                <div className="contact-item">
                  <svg className="item-icon" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 8l-2.8 2.8c-.2.2-.5.3-.7.2-.2-.1-.3-.3-.3-.5v-1.5L14 10c-.2-.2-.5-.3-.7-.2-.2.1-.3.3-.3.5v2l-1.5-.5-2-2L16.5 10z" />
                  </svg>
                  <span className="contact-text">
                    تلگرام:{" "}
                    <a
                      href="https://t.me/ferrochrome"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-link"
                      style={{ color: "var(--color-modal-link)" }}
                    >
                      @ferrochrome
                    </a>
                  </span>
                </div>

                {/* WhatsApp */}
                <div className="contact-item">
                  <svg className="item-icon" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.66.41 3.23 1.14 4.62L2 22l5.38-1.14C8.77 21.59 10.34 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5 14c-.3.9-1.1 1.8-2.3 2.2-1.2.4-2.6.5-4 .1-1.4-.4-2.5-1.2-3.3-2.4C7.6 15.3 7 14.2 7 13s.6-2.3 1.7-3.1L9 10l1.1-.3c.2-.1.3-.2.5-.2l.8.2c.2.1.3.2.4.4l.6 1c.1.1.1.3.2.4l.2 1c.1.3.1.6.1.9 0 .3 0 .6-.1.9z" />
                  </svg>
                  <span className="contact-text">
                    واتس‌اپ:{" "}
                    <a
                      href="https://wa.me/989123456789"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-link"
                      style={{ color: "var(--color-modal-link)" }}
                    >
                      09123456789
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
