import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Toaster } from "@/components/ui/toaster";
import { RootProvider } from "fumadocs-ui/provider";
import { ThemeProvider } from "@/components/theme-provider";

import { NuqsAdapter } from "nuqs/adapters/next";

import localFont from "next/font/local";

import { I18nProvider } from "fumadocs-ui/i18n";

import "./global.css";

import NewMetadata from "@/lib/metadata";

import Footer from "@/components/footer";
import { cn } from "@/lib/utils";

export const metadata = NewMetadata({
  title: "minpeter",
  description: "이 웹에서 가장 멋진 사이트가 될거야~",
});

// const FontSans = localFont({
//   variable: "--font-sans",
//   display: "swap",
//   src: [
//     {
//       path: "../../public/fonts/AritaBuri-Medium.woff2",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../../public/fonts/AritaBuri-SemiBold.woff2",
//       weight: "700",
//       style: "bold",
//     },
//   ],
// });

export default async function RootLayout({
  params,
  children,
}: {
  params: { lang: string };
  children: React.ReactNode;
}) {
  const { lang } = await params;
  return (
    <html
      lang={lang == "fr" ? "ko" : "en"}
      // className={cn("antialiased", FontSans.className)}
      suppressHydrationWarning
    >
      <body>
        <I18nProvider locale={lang}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <RootProvider>
              <NuqsAdapter>
                <main className="w-full mx-auto px-4 min-h-screen max-w-3xl py-12">
                  {children}
                </main>

                <Footer />
                <Toaster />
              </NuqsAdapter>
            </RootProvider>
          </ThemeProvider>
          <Analytics />
          <SpeedInsights />
          <GoogleAnalytics gaId="G-8L34G6HSJS" />{" "}
        </I18nProvider>
      </body>
    </html>
  );
}
