// src/i18n/routing.ts
export const routing = {
  locales: ["en-LR", "en-SL", "en-US", "fr-FR"],
  defaultLocale: "en-LR",
} as const;

export type Locale = (typeof routing.locales)[number];
