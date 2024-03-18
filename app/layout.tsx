import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/styles/globals.css";
import "@/styles/mdx.css";
import { Toaster } from "@/components/ui/toaster";

import localFont from "next/font/local";
import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "minpeter",
  description: "minpeter's blog - a blog about development",
};

const FontSans = localFont({
  variable: "--font-sans",
  display: "fallback",
  src: [
    {
      path: "../public/fonts/AritaBuri-Medium.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/AritaBuri-SemiBold.woff2",
      weight: "700",
      style: "bold",
    },
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kr">
      <body className={cn("antialiased", FontSans.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="container min-h-screen max-w-3xl py-12">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
