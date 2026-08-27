import type { Metadata } from "next";
import "../alfa.css";
import "./calendar-skin.css";

import { ScrollFX } from "@/components/alfa/scroll-fx";
import { Grain } from "@/components/alfa/grain";
import { SiteHeader } from "@/components/alfa/site-header";
import { SiteFooter } from "@/components/alfa/site-footer";
import { CourseCalendar } from "@/components/alfa/course-calendar";
import { events, CATEGORY_MAP } from "@/components/alfa/calendar-data";

const PAGE_TITLE = "Calendario académico";
const PAGE_DESCRIPTION =
  "Horarios de clases, inscripción, exámenes INAC y prácticas de simulador de CIA ALFA 552. Calendario interactivo por programa y modalidad.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/calendario",
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/calendario",
  },
};

// A few standout dates for the "fechas clave" band (static, from the data set).
const HIGHLIGHTS = ["ins-cierre", "rec-openhouse", "exm-tma"]
  .map((id) => events.find((e) => e.id === id))
  .filter((e): e is (typeof events)[number] => Boolean(e));

const MES3 = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
function fmtDay(iso: string) {
  const [, m, d] = iso.split("-");
  return `${d} ${MES3[parseInt(m, 10) - 1]}`;
}

export default function CalendarioPage() {
  return (
    <div id="alfa-root" className="relative min-w-0 [overflow-x:clip]">
      <ScrollFX />
      <Grain />
      <SiteHeader />

      <main className="pt-16">
        {/* ---- Intro ------------------------------------------------------ */}
        <section id="sec-cal-top" className="border-b border-[var(--hairline)]">
          <div className="alfa-container flex flex-col gap-6 pt-[clamp(3.5rem,7vw,6rem)] pb-[clamp(2.5rem,4vw,3.5rem)]">
            <span className="eyebrow">Calendario académico · 2026-2027</span>
            <h1
              data-reveal
              className="max-w-[20ch] text-[clamp(34px,4.6vw,64px)] font-extrabold leading-[1.0] tracking-[-0.035em]"
            >
              Tu operación empieza en la{" "}
              <span className="text-[var(--accent-text)]">pista de vuelo.</span>
            </h1>
            <p className="max-w-[58ch] text-[16px] leading-relaxed text-[var(--lt)]">
              Clases, días de inscripción, recorridos, exámenes INAC y prácticas de
              simulador de cada programa. Pasa el cursor sobre un evento para ver
              docente, cupos y modalidad.
            </p>
          </div>
        </section>

        {/* ---- Calendar -------------------------------------------------- */}
        <section id="sec-cal" className="alfa-section pt-[clamp(2.5rem,5vw,4rem)]">
          <div className="alfa-container" data-reveal>
            <CourseCalendar />
          </div>
        </section>

        {/* ---- Fechas clave + nota aula virtual -------------------------- */}
        <section className="border-t border-[var(--hairline)]">
          <div className="alfa-container flex flex-col gap-3 pt-[clamp(3.5rem,6vw,5rem)]">
            <span className="mono text-[13px] tracking-[0.08em] text-[var(--accent-text)]">
              Fechas clave
            </span>
            <h2
              data-reveal
              className="max-w-[20ch] text-[clamp(26px,3vw,40px)] font-bold leading-[1.06] tracking-[-0.03em]"
            >
              No pierdas el próximo despegue.
            </h2>
          </div>

          <div className="alfa-frame mt-[clamp(2rem,4vw,3rem)] grid border-t border-[var(--hairline)] md:grid-cols-3">
            {HIGHLIGHTS.map((e, i) => {
              const cat = CATEGORY_MAP[e.category];
              return (
                <div
                  key={e.id}
                  className={`flex flex-col gap-4 px-5 py-8 md:px-8 ${
                    i < HIGHLIGHTS.length - 1
                      ? "border-b md:border-b-0 md:border-r border-[var(--hairline)]"
                      : ""
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <span className="mono text-[28px] tracking-[-0.01em] text-[var(--ink)]">
                      {fmtDay(e.date)}
                    </span>
                    <span
                      className="mono border px-2 py-1 text-[9px] tracking-[0.14em]"
                      style={{
                        borderColor: cat.priority ? "var(--accent)" : "var(--line)",
                        color: cat.priority ? "var(--accent-text)" : "var(--mid)",
                      }}
                    >
                      {cat.code}
                    </span>
                  </div>
                  <div className="ml-0.5 h-6 w-px bg-[var(--mid)]" />
                  <div className="flex flex-col gap-2">
                    <span className="text-[16px] font-semibold leading-snug tracking-[-0.01em]">
                      {e.title}
                    </span>
                    <span className="mono text-[11px] tracking-[0.08em] text-[var(--mid)]">
                      {e.program || "ABIERTO A TODOS"} · {e.modalidad.toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="alfa-container pb-[clamp(3.5rem,7vw,6rem)] pt-[clamp(2.5rem,5vw,4rem)]">
            <div className="flex flex-col gap-3 border border-[var(--hairline)] bg-[var(--surface)] p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <div className="flex flex-col gap-2">
                <span className="mono text-[10px] tracking-[0.16em] text-[var(--accent-text)]">
                  AULA VIRTUAL · EN CONSTRUCCIÓN
                </span>
                <p className="max-w-[62ch] text-[14px] leading-relaxed text-[var(--lt)]">
                  Las clases marcadas como Aula Virtual o Híbrido tendrán acceso en
                  línea desde el propio calendario: material, transmisión en vivo y
                  registro de asistencia. Estamos construyendo esa sala.
                </p>
              </div>
              <a
                href="/#sec-cta"
                className="alfa-cta alfa-cta--ghost mono flex shrink-0 items-center gap-2 px-5 py-3 text-[11px] tracking-[0.14em]"
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
