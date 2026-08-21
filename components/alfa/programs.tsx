"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { programs } from "./data";

export function Programs() {
  // `open` mirrors the original default (first program expanded); `hover`
  // drives the sticky figure independently of what is expanded.
  const [open, setOpen] = useState<string>(programs[0].code);
  const [hover, setHover] = useState<number>(-1);

  const openIndex = programs.findIndex((p) => p.code === open);
  const figIndex = hover >= 0 ? hover : openIndex >= 0 ? openIndex : 0;
  const fig = programs[figIndex] ?? programs[0];

  return (
    <section
      id="sec-programs"
      className="border-b border-[var(--hairline)]"
    >
      <div className="alfa-container pt-[clamp(4.5rem,8vw,7rem)]">
        <span className="mono text-[13px] tracking-[0.08em] text-[var(--accent-text)]">
          Programas
        </span>
        <h2
          data-reveal
          className="mt-5 max-w-[18ch] text-[clamp(30px,3.4vw,46px)] font-bold leading-[1.04] tracking-[-0.03em]"
        >
          Cinco líneas de formación, una sola norma.
        </h2>
      </div>

      <div className="alfa-frame mt-[clamp(2.5rem,5vw,4rem)] grid md:grid-cols-[1fr_380px]">
        {/* Sticky media — desktop right, mobile on top */}
        <div className="order-1 md:order-2 md:border-l md:border-[var(--hairline)]">
          <div className="md:sticky md:top-16 md:h-[calc(100vh-4rem)]">
            <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-auto md:h-[calc(100%-58px)]">
              {programs.map((p, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={p.code}
                  src={p.img}
                  alt={`${p.name}, ${p.fig}`}
                  loading="lazy"
                  decoding="async"
                  className="alfa-photo absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ opacity: i === figIndex ? 1 : 0 }}
                />
              ))}
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_srgb,var(--bg)_55%,transparent),transparent_45%)]" />
            </div>
            <div className="flex items-center justify-between border-t border-[var(--hairline)] px-6 py-5">
              <span className="mono text-[11px] tracking-[0.1em] text-[var(--mid)]">
                FIG. {fig.code}
              </span>
              <span className="mono text-[11px] tracking-[0.1em] text-[var(--lt)]">
                {fig.fig}
              </span>
            </div>
          </div>
        </div>

        {/* Accordion */}
        <div className="order-2 md:order-1">
          <Accordion type="single" collapsible value={open} onValueChange={setOpen}>
            {programs.map((p, i) => {
              const isOpen = open === p.code;
              return (
                <AccordionItem
                  key={p.code}
                  value={p.code}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(-1)}
                  className="alfa-prog relative border-b border-[var(--hairline)] transition-colors"
                  style={{ background: isOpen ? "var(--surface)" : "transparent" }}
                >
                  {p.soon && (
                    <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(45deg,var(--accent)_0_1px,transparent_1px_11px)] opacity-[0.08]" />
                  )}
                  <AccordionTrigger className="grid w-full grid-cols-[64px_1fr_auto] items-baseline gap-4 rounded-none border-none px-5 py-7 hover:no-underline md:grid-cols-[110px_1fr_120px_32px] md:px-8 md:py-8 **:data-[slot=accordion-trigger-icon]:hidden">
                    <span
                      className={`mono text-[12px] md:text-[13px] ${
                        p.soon ? "text-[var(--accent-text)]" : "text-[var(--mid)]"
                      }`}
                    >
                      {p.code}
                    </span>
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[clamp(19px,2.2vw,30px)] font-semibold leading-[1.12] tracking-[-0.02em]">
                      {p.name}
                      {p.soon && (
                        <span className="mono border border-[var(--accent)] px-2 py-1 text-[10px] tracking-[0.14em] text-[var(--accent-text)]">
                          PRÓXIMAMENTE
                        </span>
                      )}
                    </span>
                    <span className="mono hidden text-right text-[11px] tracking-[0.08em] text-[var(--mid)] md:block">
                      {p.dur}
                    </span>
                    <span
                      className="mono hidden text-right text-[18px] text-[var(--mid)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:inline-block"
                      style={{ transform: `rotate(${isOpen ? 45 : 0}deg)` }}
                      aria-hidden
                    >
                      +
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="p-0">
                    <div className="grid gap-6 px-5 pb-8 md:grid-cols-3 md:gap-8 md:pl-[142px] md:pr-8">
                      <span className="mono text-[11px] tracking-[0.08em] text-[var(--mid)] md:hidden">
                        {p.dur}
                      </span>
                      <Field label="MODALIDAD" value={p.mode} />
                      <Field label="REQUISITOS DE INGRESO" value={p.req} />
                      <Field label="SALIDA PROFESIONAL" value={p.out} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="mono text-[10px] tracking-[0.14em] text-[var(--mid)]">
        {label}
      </span>
      <span className="text-[14px] leading-relaxed text-[var(--lt)]">{value}</span>
    </div>
  );
}
