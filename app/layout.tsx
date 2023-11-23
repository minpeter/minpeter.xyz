import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "minpeter's blog",
  description: "minpeter's blog - a blog about development",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="kr"
      className="scrollbar-hide bg-neutral-900 text-white max-w-3xl mx-auto py-20 px-4"
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
