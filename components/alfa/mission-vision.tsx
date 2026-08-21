import { IMG } from "./images";

export function MissionVision() {
  return (
    <section id="sec-mv" className="border-b border-[var(--hairline)]">
      {/* Misión — photograph behind, copy anchored left */}
      <Panel
        image={IMG.wingClouds}
        alt="Ala de una aeronave sobre un mar de nubes al amanecer"
        align="left"
        label="Misión"
      >
        Formar profesionales de élite (pilotos, tripulantes de cabina,
        despachadores de vuelo y técnicos de mantenimiento aeronáutico) mediante
        una instrucción rigurosa que trasciende los estándares de las Regulaciones
        Aeronáuticas Venezolanas. Nuestro compromiso es forjar expertos proactivos
        y éticos, capaces de liderar{" "}
        <span className="text-[var(--accent-text)]">la seguridad operacional</span>{" "}
        con precisión técnica, garantizando la integridad de cada vuelo y la
        excelencia en el servicio de la aviación civil.
      </Panel>

      {/* Visión — mirrored: photograph behind, copy anchored right */}
      <Panel
        image={IMG.planeSunset}
        alt="Aeronave en vuelo entre nubes teñidas por el atardecer"
        align="right"
        label="Visión"
        divider
      >
        Convertirnos en el{" "}
        <span className="text-[var(--accent-text)]">estándar de oro</span> de la
        instrucción aeronáutica venezolana, siendo reconocidos por la industria
        como el centro donde nace la excelencia. Nuestra visión es liderar el
        desarrollo del talento humano con calidad insuperable, transformando el
        cumplimiento normativo en una cultura de seguridad y profesionalismo sin
        precedentes.
      </Panel>
    </section>
  );
}

function Panel({
  image,
  alt,
  align,
  label,
  divider,
  children,
}: {
  image: string;
  alt: string;
  align: "left" | "right";
  label: string;
  divider?: boolean;
  children: React.ReactNode;
}) {
  const left = align === "left";
  const scrim = left
    ? "linear-gradient(90deg, var(--bg) 6%, color-mix(in srgb, var(--bg) 84%, transparent) 46%, color-mix(in srgb, var(--bg) 34%, transparent) 100%)"
    : "linear-gradient(270deg, var(--bg) 6%, color-mix(in srgb, var(--bg) 84%, transparent) 46%, color-mix(in srgb, var(--bg) 34%, transparent) 100%)";

  return (
    <div
      className={`relative overflow-hidden ${divider ? "border-t border-[var(--hairline)]" : ""}`}
    >
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="alfa-photo alfa-kenburns"
        />
        <div className="absolute inset-0" style={{ background: scrim }} />
      </div>

      <div
        className={`alfa-container relative z-10 flex min-h-[82vh] flex-col justify-center gap-6 py-[clamp(5rem,10vw,9rem)] ${
          left ? "items-start text-left" : "items-end text-right"
        }`}
      >
        <div
          data-reveal
          className={`flex items-center gap-3 ${left ? "" : "flex-row-reverse"}`}
        >
          <span className="h-px w-8 bg-[var(--accent)]" />
          <span className="mono text-[13px] tracking-[0.08em] text-[var(--accent-text)]">
            {label}
          </span>
        </div>
        <p
          data-reveal="mask"
          style={{ transitionDelay: "0.1s", textWrap: "pretty" }}
          className="max-w-[52ch] text-[clamp(22px,2.6vw,38px)] font-semibold leading-[1.34] tracking-[-0.02em]"
        >
          {children}
        </p>
      </div>
    </div>
  );
}
