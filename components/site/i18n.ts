// components/site/i18n.ts
import type { Locale } from "./LocaleProvider";

export const I18N = {
  en: {
    nav_home: "Home",
    nav_yellowpages: "Yellow Pages",
    nav_learn: "Learn",
    nav_contact: "Contact",
    nav_menu: "Menu",
    nav_language: "Language",
    nav_tagline: "Deploy-first learning",
    brand: "Quick",
  },
  zh: {
    nav_home: "主页",
    nav_yellowpages: "黄页",
    nav_learn: "学习",
    nav_contact: "联系我",
    nav_menu: "菜单",
    nav_language: "语言",
    nav_tagline: "先部署，再学习",
    brand: "Quick",
  },
} as const;

export type I18nKey = keyof (typeof I18N)["en"];

export function t(locale: Locale, key: I18nKey) {
  return I18N[locale][key] ?? I18N.en[key];
}
