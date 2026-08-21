import { posts } from "./data";

export function Blog() {
  const [lead, ...rest] = posts;

  return (
    <section id="sec-blog" className="border-b border-[var(--hairline)]">
      <div className="alfa-container flex flex-col gap-4 pt-[clamp(4.5rem,8vw,7rem)]">
        <span className="mono text-[13px] tracking-[0.08em] text-[var(--accent-text)]">
          Bitácora
        </span>
        <h2
          data-reveal
          className="max-w-[18ch] text-[clamp(30px,3.4vw,46px)] font-bold leading-[1.04] tracking-[-0.03em]"
        >
          Notas de operación.
        </h2>
      </div>

      <div className="alfa-frame mt-[clamp(2.5rem,5vw,4rem)] border-t border-[var(--hairline)]">
        {/* Featured */}
        <a
          href="#sec-blog"
          className="alfa-post grid border-b border-[var(--hairline)] md:grid-cols-2"
        >
          <div className="order-1 aspect-[16/10] overflow-hidden md:order-2 md:aspect-auto md:border-l md:border-[var(--hairline)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lead.img}
              alt={lead.title}
              loading="lazy"
              decoding="async"
              className="alfa-photo"
            />
          </div>
          <div className="order-2 flex flex-col gap-5 px-5 py-10 md:order-1 md:justify-center md:px-12 md:py-16">
            <div className="mono flex justify-between text-[10px] tracking-[0.14em] text-[var(--mid)]">
              <span className="text-[var(--accent-text)]">{lead.cat}</span>
              <span>{lead.date}</span>
            </div>
            <h3 className="max-w-[20ch] text-[clamp(24px,2.6vw,38px)] font-semibold leading-[1.12] tracking-[-0.02em]">
              {lead.title}
            </h3>
            <p className="max-w-[54ch] text-[15px] leading-relaxed text-[var(--lt)]">
              {lead.lede}
            </p>
            <span className="mono mt-2 text-[11px] tracking-[0.12em] text-[var(--lt)]">
              LEER →
            </span>
          </div>
        </a>

        {/* Secondary */}
        <div className="grid md:grid-cols-2">
          {rest.map((a, i) => (
            <a
              key={a.title}
              href="#sec-blog"
              className={`alfa-post flex flex-col gap-5 px-5 py-10 md:px-12 md:py-14 ${
                i === 0 ? "border-b md:border-b-0 md:border-r border-[var(--hairline)]" : ""
              }`}
            >
              <div className="aspect-[16/9] overflow-hidden border border-[var(--hairline)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={a.img}
                  alt={a.title}
                  loading="lazy"
                  decoding="async"
                  className="alfa-photo"
                />
              </div>
              <div className="mono flex justify-between text-[10px] tracking-[0.14em] text-[var(--mid)]">
                <span className="text-[var(--accent-text)]">{a.cat}</span>
                <span>{a.date}</span>
              </div>
              <h3 className="max-w-[22ch] text-[22px] font-semibold leading-[1.16] tracking-[-0.02em]">
                {a.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-[var(--lt)]">
                {a.lede}
              </p>
              <span className="mono mt-auto text-[11px] tracking-[0.12em] text-[var(--lt)]">
                LEER →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
