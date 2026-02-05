"use client";

import { Copy, Trash2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ResultPanelProps {
  text: string;
  onClear: () => void;
}

export default function ResultPanel({ text, onClear }: ResultPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-xl border shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h2 className="text-xl font-semibold">Extracted Text</h2>
        <div className="flex gap-2">
          <button
            onClick={onClear}
            className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
            title="Clear text"
            disabled={!text}
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 p-0 relative">
        <textarea
          className="w-full h-full p-6 bg-transparent border-0 resize-none focus:ring-0 text-base leading-relaxed text-foreground placeholder:text-muted-foreground/50"
          readOnly
          value={text}
          placeholder="Extracted text will appear here..."
        />
        
        {!text && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
             <div className="text-8xl font-bold text-muted-foreground select-none">OCR</div>
          </div>
        )}
      </div>

      <div className="p-4 border-t bg-muted/20">
        <button
          onClick={handleCopy}
          disabled={!text}
          className={cn(
            "w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200",
            "h-10 px-4",
            copied
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          {copied ? (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Copied to Clipboard
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Copy Text
            </>
          )}
        </button>
      </div>
    </div>
  );
}
