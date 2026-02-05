
check api url in api.ts file

-----------------------

# DocuOCR - Intelligent Document Extraction

DocuOCR is a modern, production-ready web application for extracting text from images and PDFs. It features a clean, responsive UI built with Next.js and Tailwind CSS, and connects to a backend for powerful OCR capabilities.

![DocuOCR Screenshot](./public/screenshot.png) <!-- Replace with actual screenshot if available -->

## Features

- **📄 Multi-Format Support**: Drag & drop support for images (PNG, JPG) and PDF documents.
- **🌍 Multilingual OCR**: Support for multiple languages including English, Hindi, Tamil, Telugu, Kannada, German, and Japanese.
- **🤖 Model Selection**: Choose between different OCR models (Default: Tesseract).
- **🌓 Dark/Light Mode**: Fully integrated theme switching for a comfortable reading experience.
- **📱 Responsive Design**: Standard mobile-first layout that looks great on all devices.
- **⚡ Real-time Extraction**: Instant file processing with loading states and previews.
- **📋 Smart Results**: One-click copy to clipboard and clear functionality.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theme**: [Next-themes](https://github.com/pacocoursey/next-themes)
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A running instance of the OCR Backend service (Python/FastAPI)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ocr-web.git
   cd ocr-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open the app**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Connection

This frontend expects a backend service running at `http://127.0.0.1:8000`. 
The API should support the following endpoints:

- `POST /ocr/image` - For image files
- `POST /ocr/pdf` - For PDF files

Both endpoints accept `multipart/form-data` with:
- `file`: The document to process
- `model`: (Optional) OCR model identifier
- `language`: (Optional) ISO 639-2 language code (e.g., `eng`, `hin`)

## Folder Structure

```
/app
  ├── /globals.css      # Global styles & Tailwind config
  ├── /layout.tsx       # Root layout & providers
  └── /page.tsx         # Main application page
/components
  ├── /FileUpload.tsx   # Drag & drop input & settings
  ├── /ResultPanel.tsx  # Output display & actions
  ├── /Header.tsx       # Sticky header & navigation
  └── /Footer.tsx       # Site footer
/lib
  ├── /api.ts           # API client functions
  └── /utils.ts         # Utility helpers (cn, etc.)
```

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
