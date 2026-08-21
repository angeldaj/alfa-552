"use client";

import { useEffect } from "react";

const EASE = "cubic-bezier(0.16,1,0.3,1)";

/**
 * Scroll-driven enhancements layered on the server-rendered markup:
 * IntersectionObserver reveals and the digit count-up. Hero parallax is
 * handled purely in CSS (scroll-driven animation) — no scroll listeners here.
 */
export function ScrollFX() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- Reveals -----------------------------------------------------------
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.setAttribute("data-revealed", "");
          io.unobserve(e.target);
        }),
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    // --- Count-up ----------------------------------------------------------
    const roll = (el: HTMLElement) => {
      const target = el.dataset.count ?? "";
      const suffix = el.dataset.suffix || "";
      if (reduced) {
        el.textContent = target + suffix;
        return;
      }
      el.textContent = "";
      const digits: [HTMLElement, number][] = [];
      target.split("").forEach((ch, i) => {
        const n = parseInt(ch, 10);
        if (Number.isNaN(n)) {
          const lit = document.createElement("span");
          lit.textContent = ch;
          el.appendChild(lit);
          return;
        }
        const outer = document.createElement("span");
        outer.style.cssText =
          "display:inline-block;height:1.1em;overflow:hidden;vertical-align:bottom";
        const col = document.createElement("span");
        col.style.cssText =
          "display:flex;flex-direction:column;transform:translateY(0);transition:transform 1.4s " +
          EASE +
          " " +
          i * 90 +
          "ms";
        for (let d = 0; d <= 9; d++) {
          const s = document.createElement("span");
          s.style.cssText = "display:block;height:1.1em;line-height:1.1em";
          s.textContent = String(d);
          col.appendChild(s);
        }
        outer.appendChild(col);
        el.appendChild(outer);
        digits.push([col, n]);
      });
      const suf = document.createElement("span");
      suf.textContent = suffix;
      el.appendChild(suf);
      requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          digits.forEach(([col, d]) => {
            col.style.transform = "translateY(-" + d * 1.1 + "em)";
          }),
        ),
      );
    };
    const cio = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          roll(e.target as HTMLElement);
          cio.unobserve(e.target);
        }),
      { threshold: 0.6 },
    );
    document.querySelectorAll("[data-count]").forEach((el) => cio.observe(el));

    return () => {
      io.disconnect();
      cio.disconnect();
    };
  }, []);

  return null;
}
