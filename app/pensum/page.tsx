import type { Metadata } from "next";
import "../alfa.css";
import "./pensum.css";

import { ScrollFX } from "@/components/alfa/scroll-fx";
import { Grain } from "@/components/alfa/grain";
import { SiteHeader } from "@/components/alfa/site-header";
import { SiteFooter } from "@/components/alfa/site-footer";
import { PensumView } from "@/components/alfa/pensum-view";
import { programs, statsFor } from "@/components/alfa/pensum-data";

export const metadata: Metadata = {
  title: "Pensum · CIA ALFA 552",
  description:
    "Malla curricular de los programas de CIA ALFA 552: asignaturas, ciclos, horas de teoría y práctica, y la licencia INAC a la que conduce cada carrera. Mantenimiento, aviónica, cabina, despacho y pilotos.",
};

// Aggregate figures across the certified programs (Pilotos is still in
// certification, so it carries no hours yet and is excluded from the totals).
const active = programs.filter((p) => !p.soon);
const totals = active.reduce(
  (acc, p) => {
    const s = statsFor(p);
    acc.asignaturas += s.asignaturas;
    acc.horasPractica += s.horasPractica;
    acc.horas += s.horasTotal;
    return acc;
  },
  { asignaturas: 0, horasPractica: 0, horas: 0 },
);
const practicaPct = Math.round((totals.horasPractica / totals.horas) * 100);

export default function PensumPage() {
  return (
    <div id="alfa-root" className="relative min-w-0 [overflow-x:clip]">
      <ScrollFX />
      <Grain />
      <SiteHeader />

      <main className="pt-16">
        {/* ---- Intro ------------------------------------------------------ */}
        <section id="sec-pensum-top" className="border-b border-[var(--hairline)]">
          <div className="alfa-container flex flex-col gap-6 pt-[clamp(3.5rem,7vw,6rem)] pb-[clamp(2.5rem,4vw,3.5rem)]">
            <span className="eyebrow">Pensum · Malla curricular 2026-2027</span>
            <h1
              data-reveal
              className="max-w-[20ch] text-[clamp(34px,4.6vw,64px)] font-extrabold leading-[1.0] tracking-[-0.035em]"
            >
              Lo que se aprende,{" "}
              <span className="text-[var(--accent-text)]">clase por clase.</span>
            </h1>
            <p className="max-w-[60ch] text-[16px] leading-relaxed text-[var(--lt)]">
              Cada programa es una ruta crítica de asignaturas, del aula al hangar
              y de ahí al examen del INAC. Elige una carrera para ver su resumen,
              su materia insignia y la malla completa, ciclo por ciclo.
            </p>

            {/* Aggregate figures (count up on view) */}
            <div className="mt-2 flex flex-wrap gap-x-10 gap-y-5 border-t border-[var(--hairline)] pt-6">
              <IntroStat count={active.length} label="PROGRAMAS CON MALLA" />
              <IntroStat count={totals.asignaturas} label="ASIGNATURAS" />
              <IntroStat
                count={totals.horasPractica}
                suffix=" H"
                label="EN PRÁCTICA REAL"
                gold
              />
              <IntroStat count={practicaPct} suffix="%" label="DEL PLAN ES PRÁCTICA" gold />
            </div>
          </div>
        </section>

        {/* ---- Pensum ---------------------------------------------------- */}
        <section
          id="sec-pensum"
          className="alfa-section pt-[clamp(2.5rem,5vw,4rem)]"
        >
          <div className="alfa-container" data-reveal>
            <PensumView />
          </div>
        </section>

        {/* ---- CTA ------------------------------------------------------- */}
        <section className="border-t border-[var(--hairline)]">
          <div className="alfa-container pb-[clamp(3.5rem,7vw,6rem)] pt-[clamp(3.5rem,6vw,5rem)]">
            <div className="flex flex-col gap-6 border border-[var(--hairline)] bg-[var(--surface)] p-6 md:flex-row md:items-center md:justify-between md:p-9">
              <div className="flex flex-col gap-3">
                <span className="mono text-[10px] tracking-[0.16em] text-[var(--accent-text)]">
                  ¿TE VES EN ESTA MALLA?
                </span>
                <p className="max-w-[54ch] text-[clamp(18px,2vw,24px)] font-semibold leading-snug tracking-[-0.015em]">
                  Admisión te arma un plan con las fechas de tu cohorte y los
                  requisitos de ingreso.
                </p>
              </div>
              <a
                href="/#sec-cta"
                className="alfa-cta alfa-cta--solid mono flex shrink-0 items-center gap-3 px-6 py-4 text-[12px] tracking-[0.12em]"
              >
                HABLAR CON ADMISIÓN
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function IntroStat({
  count,
  label,
  suffix,
  gold,
}: {
  count: number;
  label: string;
  suffix?: string;
  gold?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span
        data-count={String(count)}
        data-suffix={suffix ?? ""}
        className="mono text-[clamp(28px,3.4vw,40px)] leading-none tracking-[-0.02em]"
        style={{ color: gold ? "var(--accent-text)" : "var(--ink)" }}
      >
        {count}
        {suffix ?? ""}
      </span>
      <span className="mono text-[10px] tracking-[0.12em] text-[var(--mid)]">
        {label}
      </span>
    </div>
  );
}
