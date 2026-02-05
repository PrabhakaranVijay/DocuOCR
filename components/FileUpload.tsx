"use client";

import { useState, useRef } from "react";
import { Upload, File, X, Check, Image as ImageIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  onExtract: () => void;
  isExtracting: boolean;
  model: string;
  setModel: (model: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const LANGUAGES = [
  { value: "eng", label: "English" },
  { value: "hin", label: "Hindi" },
  { value: "tam", label: "Tamil" },
  { value: "tel", label: "Telugu" },
  { value: "kan", label: "Kannada" },
  { value: "deu", label: "German" },
  { value: "jpn", label: "Japanese" },
];

const MODELS = [
  { value: "tesseract", label: "Tesseract OCR" },
  { value: "azure", label: "Azure AI (Coming Soon)", disabled: true },
  { value: "google", label: "Google Vision (Coming Soon)", disabled: true },
];

export default function FileUpload({ 
  onFileSelect, 
  onExtract, 
  isExtracting,
  model,
  setModel,
  language,
  setLanguage
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setFile(file);
    onFileSelect(file);
  };

  const removeFile = () => {
    setFile(null);
    onFileSelect(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-card rounded-xl border shadow-sm">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Input Document</h2>
        <p className="text-sm text-muted-foreground">
          Upload an image or PDF to extract text.
        </p>
      </div>

      {/* File Drop Zone */}
      <div
        className={cn(
          "relative flex flex-col items-center justify-center w-full h-64 rounded-lg border-2 border-dashed transition-colors",
          dragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50",
          file ? "border-primary/50 bg-accent/50" : ""
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          onChange={handleChange}
          accept="image/png, image/jpeg, application/pdf"
          disabled={isExtracting}
        />

        {file ? (
          <div className="flex flex-col items-center gap-4 p-4 text-center z-10">
            {file.type.startsWith("image/") ? (
              <div className="relative w-32 h-32 rounded-lg overflow-hidden border shadow-sm">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center w-20 h-20 rounded-lg bg-primary/10 text-primary">
                <File className="w-10 h-10" />
              </div>
            )}
            <div className="flex flex-col items-center">
              <p className="font-medium truncate max-w-[200px]">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                removeFile();
              }}
              className="absolute top-2 right-2 p-1 rounded-full bg-background/80 hover:bg-destructive hover:text-destructive-foreground transition-colors border shadow-sm"
              disabled={isExtracting}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-center text-muted-foreground z-10">
            <div className="p-4 rounded-full bg-primary/10 text-primary mb-2">
              <Upload className="w-6 h-6" />
            </div>
            <p className="font-medium text-foreground">
              Click to upload or drag and drop
            </p>
            <p className="text-xs">PNG, JPG or PDF (max 10MB)</p>
          </div>
        )}
      </div>

      {/* Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">OCR Model</label>
          <div className="relative">
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full h-10 px-3 py-2 rounded-md border bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
              disabled={isExtracting}
            >
              {MODELS.map((m) => (
                <option key={m.value} value={m.value} disabled={m.disabled}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Language</label>
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full h-10 px-3 py-2 rounded-md border bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
              disabled={isExtracting}
            >
              <option value="auto">Auto-detect</option>
              {LANGUAGES.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onExtract}
        disabled={!file || isExtracting}
        className={cn(
          "w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          "h-11 px-8 py-2",
          "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
      >
        {isExtracting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Extracting Text...
          </>
        ) : (
          <>
            <Check className="mr-2 h-4 w-4" />
            Start Extraction
          </>
        )}
      </button>
    </div>
  );
}
