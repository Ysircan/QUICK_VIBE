"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Locale = "en" | "zh";

type Ctx = {
  locale: Locale;
  setLocale: (v: Locale) => void;
};

const LocaleContext = createContext<Ctx | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = (localStorage.getItem("quick_locale") as Locale | null) ?? null;
    if (saved === "en" || saved === "zh") setLocaleState(saved);
  }, []);

  const setLocale = (v: Locale) => {
    setLocaleState(v);
    localStorage.setItem("quick_locale", v);
    // 可选：让浏览器语义正确
    document.documentElement.lang = v === "zh" ? "zh-CN" : "en";
  };

  const value = useMemo(() => ({ locale, setLocale }), [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside <LocaleProvider />");
  return ctx;
}
