import { values } from "./data";

export function Values() {
  return (
    <section className="border-b border-[var(--hairline)]">
      <div className="alfa-frame grid md:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col gap-5 px-5 py-16 md:border-r md:border-[var(--hairline)] md:px-12 md:py-24">
          <div className="md:sticky md:top-28">
            <span className="mono text-[13px] tracking-[0.08em] text-[var(--accent-text)]">
              Brújula estratégica
            </span>
            <h2
              data-reveal
              className="mt-5 max-w-[16ch] text-[clamp(30px,3.4vw,46px)] font-bold leading-[1.04] tracking-[-0.03em]"
            >
              Los cinco valores que no se negocian.
            </h2>
          </div>
        </div>

        <ul className="flex flex-col">
          {values.map((v, i) => (
            <li
              key={v.code}
              data-reveal
              style={{ transitionDelay: `${i * 0.06}s` }}
              className={`grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 px-5 py-7 md:grid-cols-[72px_1fr] md:px-12 md:py-9 ${
                i < values.length - 1 ? "border-b border-[var(--hairline)]" : ""
              }`}
            >
              <span className="mono text-[13px] text-[var(--accent-text)]">
                {v.code}
              </span>
              <div className="flex flex-col gap-2.5">
                <span className="text-[clamp(18px,1.8vw,22px)] font-semibold leading-tight tracking-[-0.01em]">
                  {v.title}
                </span>
                <span className="max-w-[52ch] text-[14px] leading-relaxed text-[var(--lt)]">
                  {v.body}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
