export async function sendCustomerRequest(formData) {
  try {
    const res = await fetch("/api/form", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("❌ خطا در پاسخ API:", errText);
      throw new Error(`خطا در ارسال فرم: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("❌ خطا در ارسال درخواست:", err);
    throw err;
  }
}

export async function sendBlogRequest(blogData) {
  try {
    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogData),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("❌ خطا در ارسال بلاگ:", errText);
      throw new Error(`خطا در ارسال بلاگ: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("❌ خطا در ارسال بلاگ:", err);
    throw err;
  }
}

// دریافت تمام بلاگ‌ها
export async function getBlogs() {
  try {
    const res = await fetch("/api/blogs", { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`خطا در دریافت بلاگ‌ها: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("❌ خطا در دریافت بلاگ‌ها:", err);
    return [];
  }
}

// ارسال کامنت جدید برای یک بلاگ
export async function commentBlog(blogId, author, text) {
  try {
    const res = await fetch(`/api/blogs/${blogId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "comment", author, text }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("❌ خطا در ثبت کامنت:", errText);
      throw new Error(`خطا در ثبت کامنت: ${res.status}`);
    }

    return await res.json(); // کامنت ایجاد شده
  } catch (err) {
    console.error("❌ خطا در ارسال کامنت:", err);
    throw err;
  }
}

// دریافت یک بلاگ با کامنت‌ها و لایک
export async function getBlog(blogId) {
  try {
    const res = await fetch(`/api/blogs/${blogId}`, { cache: "no-store" });
    if (!res.ok) {
      const errText = await res.text();
      console.error("❌ خطا در دریافت بلاگ:", errText);
      throw new Error(`خطا در دریافت بلاگ: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("❌ خطا در دریافت بلاگ:", err);
    return null;
  }
}
