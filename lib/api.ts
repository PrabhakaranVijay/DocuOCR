export async function uploadFile(
  file: File,
  model: string,
  language: string
) {
  const formData = new FormData();
  formData.append("file", file);
  // Send model/language even if not explicitly in schema, in case backend handles it manually
  formData.append("model", model);
  formData.append("language", language);

  const isPdf = file.type === "application/pdf";
  const endpoint = isPdf ? "/ocr/pdf" : "/ocr/image";

  const res = await fetch(`http://127.0.0.1:8001${endpoint}`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("OCR request failed");
  }

  return res.json(); // { text: "..." }
}
