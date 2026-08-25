// Fixed film-grain overlay, shared by every page.
//
// It deliberately does NOT use mix-blend-mode. Blending a fixed, full-viewport
// layer against content that scrolls underneath forces the browser to
// re-rasterize the whole viewport on every scroll frame (the blended result
// depends on the moving backdrop), which tanks scroll FPS. A plain translucent
// noise layer, promoted to its own compositor layer with translateZ(0), is
// composited once and simply stays put while the page scrolls beneath it.
//
// Per-theme opacity is tuned in alfa.css via the [data-grain] selector.

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function Grain() {
  return (
    <div
      data-grain
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 60,
        opacity: 0.05,
        transform: "translateZ(0)",
        backgroundImage: GRAIN,
      }}
    />
  );
}
