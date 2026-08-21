import { cohorts } from "./data";

export function Cohorts() {
  return (
    <section id="sec-cal" className="border-b border-[var(--hairline)]">
      <div className="alfa-container flex flex-col gap-4 pt-[clamp(4.5rem,8vw,7rem)]">
        <span className="mono text-[13px] tracking-[0.08em] text-[var(--accent-text)]">
          Cohortes
        </span>
        <h2
          data-reveal
          className="max-w-[18ch] text-[clamp(30px,3.4vw,46px)] font-bold leading-[1.04] tracking-[-0.03em]"
        >
          Calendario de ingreso, pista 2026-2027.
        </h2>
      </div>

      <div className="mt-14 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="relative w-max px-[clamp(1.25rem,5vw,3rem)] pb-24">
          {/* runway centreline */}
          <div className="absolute inset-x-0 top-[86px] border-t-2 border-dashed border-[var(--mid)] opacity-40" />
          <div className="flex gap-16 md:gap-24">
            {cohorts.map((c) => (
              <div key={c.id} className="flex w-[240px] flex-col gap-4">
                <div className="mono text-[11px] tracking-[0.12em] text-[var(--mid)]">
                  {c.id}
                </div>
                <div className="mono text-[24px]" style={{ color: c.dateColor }}>
                  {c.date}
                </div>
                <div className="ml-0.5 h-8 w-px bg-[var(--mid)]" />
                <div className="flex flex-col gap-3 border border-[var(--hairline)] bg-[var(--surface)] p-4">
                  <div className="text-[15px] font-semibold tracking-[-0.01em]">
                    {c.prog}
                  </div>
                  <div className="mono text-[11px] text-[var(--mid)]">
                    CUPOS {c.seats}
                  </div>
                  <div
                    className="mono self-start border px-2 py-1 text-[10px] tracking-[0.14em]"
                    style={{ color: c.stColor, borderColor: c.stColor }}
                  >
                    {c.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
