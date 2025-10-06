// services/api.js
export const sendCustomerRequest = async (formData) => {
  console.log(formData)
  try {
    const res = await fetch("http://192.168.1.95:8000/customer-request/", {
      method: "POST",
      body: formData,
    });
    console.log("res",res)

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "خطا در ارسال درخواست");
    }

    return await res.json();
  } catch (err) {
    throw err;
  }
};
