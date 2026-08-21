import { IMG } from "./images";

export function Hero() {
  return (
    <section
      id="sec-hero"
      className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden border-b border-[var(--hairline)]"
    >
      {/* Full-bleed aspirational photograph — the page's one full-colour moment */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMG.heroJet}
          alt="Jet ejecutivo al amanecer sobre la plataforma"
          fetchPriority="high"
          decoding="async"
          className="alfa-photo--warm alfa-hero-img"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, var(--bg) 6%, color-mix(in srgb, var(--bg) 86%, transparent) 30%, color-mix(in srgb, var(--bg) 45%, transparent) 58%, transparent 88%)",
          }}
        />
      </div>

      <div className="alfa-hero-content alfa-container relative z-10 w-full pb-[clamp(3.5rem,7vw,6rem)]">
        <p data-reveal className="eyebrow mb-6">
          Centro de Instrucción Aeronáutica · INAC CIAC 552
        </p>

        <h1
          data-reveal
          style={{ transitionDelay: "0.08s" }}
          className="max-w-[22ch] text-[clamp(38px,5.4vw,80px)] font-extrabold leading-[0.98] tracking-[-0.03em]"
        >
          Se entra con vocación.
          <br />
          Se sale con{" "}
          <span className="text-[var(--accent-text)]">licencia.</span>
        </h1>

        <p
          data-reveal
          style={{ transitionDelay: "0.16s" }}
          className="mt-7 max-w-[52ch] text-[16px] leading-relaxed text-[var(--lt)] md:text-[17px]"
        >
          Mantenimiento, aviónica, cabina y despacho bajo norma INAC. Pilotos, en
          camino. Horas reales de hangar desde el primer ciclo.
        </p>

        <div
          data-reveal
          style={{ transitionDelay: "0.24s" }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <a
            href="#sec-cta"
            className="alfa-cta alfa-cta--solid mono flex items-center gap-3 px-7 py-4 text-[13px] tracking-[0.12em]"
          >
            ADMISIÓN
            <span aria-hidden>→</span>
          </a>
          <a
            href="#sec-programs"
            className="alfa-cta alfa-cta--ghost mono flex items-center gap-3 px-7 py-4 text-[13px] tracking-[0.12em]"
          >
            VER PROGRAMAS
          </a>
        </div>
      </div>
    </section>
  );
}
