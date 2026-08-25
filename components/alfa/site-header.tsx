"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

// Homepage anchors are prefixed with "/" so the shared header also works from
// sub-routes like /calendario (navigate home, then scroll to the section).
const NAV = [
  { href: "/#sec-about", label: "ESCUELA" },
  { href: "/#sec-programs", label: "PROGRAMAS" },
  { href: "/pensum", label: "PENSUM" },
  { href: "/calendario", label: "CALENDARIO" },
  { href: "/#sec-blog", label: "BITÁCORA" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-[var(--hairline)] bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur-md">
      <div className="alfa-container flex h-full items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-[19px] font-extrabold tracking-tight">ALFA</span>
          <span className="mono text-[16px] text-[var(--accent-text)]">552</span>
        </Link>

        <nav className="alfa-hide-mobile flex items-center gap-6 lg:gap-7">
          {NAV.map((n) => {
            // Real routes (not homepage anchors) light up when their path matches.
            const active = n.href.startsWith("/#") ? false : pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className="alfa-navlink mono text-[11px] tracking-[0.12em]"
                style={active ? { color: "var(--accent-text)" } : undefined}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/#sec-cta"
            className="alfa-cta alfa-cta--solid mono flex items-center gap-2 px-4 py-2.5 text-[11px] tracking-[0.14em]"
          >
            ADMISIÓN
            <span aria-hidden>→</span>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
