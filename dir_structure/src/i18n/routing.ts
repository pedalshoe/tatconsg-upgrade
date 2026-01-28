// src/i18n/routing.ts
export const routing = {
  locales: ["en", "fr"],
  defaultLocale: "en",
} as const;

export type Locale = (typeof routing.locales)[number];
