// components/navbar/navItems.ts
import type { NavKey } from "./Navbar";

export const NAV_ITEMS: { key: NavKey; href: string }[] = [
  { key: "home", href: "/" },
  { key: "yellowpages", href: "/yellowpages" },
  { key: "learn", href: "/learn" },
  { key: "contact", href: "/contact" },
];
