import {routing} from "@/src/i18n/routing";
import createNextIntlMiddleware from "next-intl/middleware";

export default createNextIntlMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
