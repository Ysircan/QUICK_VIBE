import type { NavKey } from "./Navbar";

export const NAV_ITEMS: { key: NavKey; label: string; href: string }[] = [
  { key: "home", label: "Home", href: "/" },
  { key: "yellowpages", label: "Yellow Pages", href: "/yellowpages" },
  { key: "learn", label: "Learn", href: "/learn" },
  { key: "contact", label: "Contact", href: "/contact" },
];
