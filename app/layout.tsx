import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";

import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";

import localFont from "next/font/local";
import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import NewMetadata from "@/lib/metadata";

export const metadata = NewMetadata({
  title: "minpeter",
  description: "이 웹에서 가장 멋진 사이트가 될거야~",
});

const FontSans = localFont({
  variable: "--font-sans",
  display: "swap",
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
          <main className="w-full mx-auto px-4 min-h-screen max-w-3xl py-12">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
      <GoogleAnalytics gaId="G-8L34G6HSJS" />
    </html>
  );
}
