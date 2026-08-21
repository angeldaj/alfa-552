const COLS = [
  {
    label: "SEDES",
    body: (
      <>
        Campus Caracas, sede principal
        <br />
        Hangar escuela, Aeropuerto Int. Simón Bolívar, Maiquetía
        <br />
        Aula anexa, Caracas
      </>
    ),
  },
  {
    label: "CONTACTO",
    body: (
      <>
        <a className="hover:text-[var(--accent-text)]" href="mailto:admision@alfa552.edu">
          admision@alfa552.edu
        </a>
        <br />
        +58 212 555 0552 · WhatsApp
        <br />
        LUN-SÁB · 08:00-18:00
      </>
    ),
  },
  {
    label: "CERTIFICACIONES",
    mono: true,
    body: (
      <>
        INAC · CIAC N.º 552
        <br />
        CENTRO DE INSTRUCCIÓN · RAV 141
        <br />
        RIF J-29536018-5
      </>
    ),
  },
];

const SOCIAL = ["INSTAGRAM", "LINKEDIN", "YOUTUBE"];

export function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-[var(--bg)]">
      <div className="alfa-frame grid md:grid-cols-4">
        {COLS.map((c, i) => (
          <div
            key={c.label}
            className={`flex flex-col gap-4 px-5 py-12 md:px-8 ${
              i < 3 ? "border-b md:border-b-0 md:border-r border-[var(--hairline)]" : ""
            }`}
          >
            <div className="mono text-[10px] tracking-[0.16em] text-[var(--mid)]">
              {c.label}
            </div>
            <div
              className={`text-[14px] leading-[1.7] text-[var(--lt)] ${
                c.mono ? "mono text-[12px] leading-[2]" : ""
              }`}
            >
              {c.body}
            </div>
          </div>
        ))}
        <div className="flex flex-col gap-4 px-5 py-12 md:px-8">
          <div className="mono text-[10px] tracking-[0.16em] text-[var(--mid)]">
            REDES
          </div>
          <div className="mono flex flex-col gap-2 text-[12px]">
            {SOCIAL.map((s) => (
              <a key={s} href="#sec-hero" className="text-[var(--lt)] hover:text-[var(--accent-text)]">
                {s} ↗
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="alfa-container border-y border-[var(--hairline)] py-4">
        <span className="mono text-[10px] tracking-[0.12em] text-[var(--mid)]">
          © 2026 CIA ALFA 552. RIF J-29536018-5. Todos los derechos reservados.
        </span>
      </div>

      <div
        aria-hidden
        className="alfa-container overflow-hidden"
        style={{ height: "0.62em", fontSize: "clamp(70px,13vw,220px)" }}
      >
        <div
          style={{
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 0.78,
            whiteSpace: "nowrap",
            color: "var(--surface)",
            WebkitTextStroke: "1px var(--line)",
          }}
        >
          ALFA<span className="mono font-normal">552</span>
        </div>
      </div>
    </footer>
  );
}
