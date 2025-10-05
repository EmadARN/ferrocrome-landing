// services/api.js

export const sendCustomerRequest = async (data) => {
  const payload = {
    ...data,
    is_response: false,
  };

  try {
    const res = await fetch("http://192.168.1.129:8000/customer-request/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "خطا در ارسال درخواست");
    }

    return await res.json(); // یا res.text() بسته به API
  } catch (err) {
    throw err;
  }
};
