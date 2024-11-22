import { createI18nMiddleware } from "fumadocs-core/i18n";
import { i18n } from "@/lib/i18n";

export default createI18nMiddleware(i18n);

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|Lickitung.gltf|studio_small_03_1k.hdr|fonts).*)",
  ],
};
