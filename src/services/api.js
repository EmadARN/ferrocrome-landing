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
