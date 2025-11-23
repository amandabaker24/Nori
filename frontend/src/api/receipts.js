const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export async function uploadReceipt(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/receipt/`, {
    method: "POST",
    body: formData,
  });

  return await res.json();
}
