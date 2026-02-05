import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4 md:px-6 mx-auto">
        <p className="text-sm text-muted-foreground text-center md:text-left">
          &copy; {new Date().getFullYear()} DocuOCR. All rights reserved.
        </p>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <Link href="#" className="hover:underline hover:text-foreground transition-colors">
            Terms & Conditions
          </Link>
          <Link href="#" className="hover:underline hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
