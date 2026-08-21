const STATS = [
  { label: "FUNDACIÓN", value: "2011" },
  { label: "TÉCNICOS EGRESADOS", value: "1 240+" },
  { label: "CERTIFICACIÓN", value: "INAC · CIAC 552" },
  { label: "BASE DE OPERACIONES", value: "CARACAS · VE" },
];

export function StatStrip() {
  return (
    <section className="border-b border-[var(--hairline)] bg-[var(--surface)]">
      <div className="alfa-frame grid grid-cols-2 md:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-col gap-2 px-5 py-7 md:px-8 md:py-8 ${
              i < STATS.length - 1 ? "border-[var(--hairline)]" : ""
            } ${i < STATS.length - 1 ? "md:border-r" : ""} ${
              i % 2 === 0 ? "border-r" : ""
            } ${i < 2 ? "border-b md:border-b-0" : ""}`}
          >
            <span className="mono text-[10px] tracking-[0.16em] text-[var(--mid)]">
              {s.label}
            </span>
            <span className="mono text-[20px] text-[var(--ink)] md:text-[22px]">
              {s.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
