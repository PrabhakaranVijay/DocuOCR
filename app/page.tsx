"use client";

import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import ResultPanel from "@/components/ResultPanel";
import { uploadFile } from "@/lib/api";

export default function Home() {
  const [extractedText, setExtractedText] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [model, setModel] = useState("tesseract");
  const [language, setLanguage] = useState("eng");

  const handleExtract = async () => {
    if (!file) return;
    
    setIsExtracting(true);
    setExtractedText("");

    try {
      const result = await uploadFile(file, model, language);
      setExtractedText(result.text || "No text found.");
    } catch (error) {
      console.error("Extraction failed:", error);
      setExtractedText("Error: Failed to extract text. Please ensure the backend server is running.");
    } finally {
      setIsExtracting(false);
    }
  };

  const handleFileSelect = (selectedFile: File | null) => {
    setFile(selectedFile);
    if (!selectedFile) {
      setExtractedText("");
    }
  };

  const handleClear = () => {
    setExtractedText("");
  };

  return (
    <div className="container px-4 md:px-6 py-6 md:py-10 mx-auto max-w-7xl">
      <div className="flex flex-col space-y-4 mb-8 text-center md:text-left">
        <h1 className="text-3xl font-bold tracking-tighter md:text-4xl text-foreground">
          Transform Documents into Text
        </h1>
        <p className="mx-auto md:mx-0 max-w-[700px] text-muted-foreground md:text-xl">
          Upload any image or PDF and instantly extract text using our advanced OCR technology. Supports multiple languages and formats.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[600px] items-stretch">
        <section className="h-full">
          <FileUpload
            onFileSelect={handleFileSelect}
            onExtract={handleExtract}
            isExtracting={isExtracting}
            model={model}
            setModel={setModel}
            language={language}
            setLanguage={setLanguage}
          />
        </section>
        <section className="h-full">
          <ResultPanel text={extractedText} onClear={handleClear} />
        </section>
      </div>
    </div>
  );
}
