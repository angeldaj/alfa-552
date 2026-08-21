import { ThemeToggle } from "./theme-toggle";

const NAV = [
  { href: "#sec-about", label: "ESCUELA" },
  { href: "#sec-programs", label: "PROGRAMAS" },
  { href: "#sec-cal", label: "COHORTES" },
  { href: "#sec-blog", label: "BITÁCORA" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-[var(--hairline)] bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur-md">
      <div className="alfa-container flex h-full items-center justify-between">
        <a href="#sec-hero" className="flex items-baseline gap-2">
          <span className="text-[19px] font-extrabold tracking-tight">ALFA</span>
          <span className="mono text-[16px] text-[var(--accent-text)]">552</span>
        </a>

        <nav className="alfa-hide-mobile flex items-center gap-8">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="alfa-navlink mono text-[11px] tracking-[0.12em]"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#sec-cta"
            className="alfa-cta alfa-cta--solid mono flex items-center gap-2 px-4 py-2.5 text-[11px] tracking-[0.14em]"
          >
            ADMISIÓN
            <span aria-hidden>→</span>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
