"use client";

// Interactive pensum / malla curricular for CIA ALFA 552 (/pensum).
// Three movements per program:
//   1. a bento summary (identity photo + derived stats + hour distribution),
//   2. a "materia insignia" editorial band,
//   3. the full malla, cycle by cycle, as a hairline ledger.
// A segmented selector swaps programs; Motion drives the sliding gold indicator,
// the staggered bento entrance (blur-in to mask the swap) and the cycle reveals.
// Everything degrades to static under prefers-reduced-motion.

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Lock } from "lucide-react";

import {
  programs,
  statsFor,
  TYPE_META,
  TYPE_ORDER,
  type CourseType,
  type PensumProgram,
} from "./pensum-data";
import { IMG } from "./images";

const EASE = [0.16, 1, 0.3, 1] as const;

// Neutral value ladder + the single gold reserved for hands-on practice.
const TYPE_COLOR: Record<CourseType, string> = {
  teorica: "var(--lt)",
  taller: "var(--mid)",
  simulador: "color-mix(in srgb, var(--mid) 55%, var(--bg))",
  practica: "var(--accent)",
  examen: "color-mix(in srgb, var(--lt) 45%, var(--bg))",
};

export function PensumView() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string>(programs[0].code);
  const program = programs.find((p) => p.code === active) ?? programs[0];

  return (
    <div className="flex flex-col">
      {/* ---- Program selector (sliding gold indicator) ------------------- */}
      <div
        role="tablist"
        aria-label="Programas"
        className="mono flex overflow-x-auto overscroll-x-contain border border-[var(--hairline)] bg-[var(--surface)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {programs.map((p) => {
          const on = p.code === active;
          return (
            <button
              key={p.code}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(p.code)}
              className="alfa-tap relative shrink-0 border-r border-[var(--hairline)] px-4 py-3 text-left outline-none last:border-r-0 md:px-6 md:py-4"
            >
              {on && (
                <motion.span
                  layoutId="pensum-prog-ind"
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 420, damping: 34 }
                  }
                  className="absolute inset-x-0 bottom-0 h-[2px] bg-[var(--accent)]"
                />
              )}
              <span className="flex items-center gap-2">
                <span
                  className="text-[11px] tracking-[0.1em]"
                  style={{ color: on ? "var(--accent-text)" : "var(--mid)" }}
                >
                  {p.code}
                </span>
                {p.soon && <Lock size={11} strokeWidth={1.75} className="text-[var(--mid)]" />}
              </span>
              <span
                className="mt-1 block text-[13px] tracking-[-0.01em] transition-colors md:text-[14px]"
                style={{
                  color: on ? "var(--ink)" : "var(--lt)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {p.short}
              </span>
            </button>
          );
        })}
      </div>

      {program.soon ? (
        <SoonPanel program={program} reduce={!!reduce} />
      ) : (
        <>
          <Bento program={program} reduce={!!reduce} />
          <OutcomeBand program={program} />
          <Insignia program={program} reduce={!!reduce} />
          <Malla program={program} reduce={!!reduce} />
        </>
      )}
    </div>
  );
}

// ============================================================================
// Bento summary
// ============================================================================
function Bento({ program, reduce }: { program: PensumProgram; reduce: boolean }) {
  const s = statsFor(program);

  // Each tile enters with a short staggered blur-in when the program swaps.
  const tile = (i: number, className: string, children: React.ReactNode) => (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 10, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.05, ease: EASE }}
      className={`bg-[var(--bg)] ${className}`}
    >
      {children}
    </motion.div>
  );

  return (
    <div
      key={program.code}
      className="mt-px grid grid-cols-2 gap-px border border-t-0 border-[var(--hairline)] bg-[var(--hairline)] md:grid-cols-4 md:auto-rows-[172px]"
    >
      {/* Identity photo */}
      {tile(
        0,
        "relative col-span-2 min-h-[240px] overflow-hidden md:row-span-2 md:min-h-0",
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMG[program.img]}
            alt={program.name}
            loading="lazy"
            decoding="async"
            className="alfa-photo absolute inset-0"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_srgb,var(--bg)_88%,transparent),color-mix(in_srgb,var(--bg)_20%,transparent)_55%,transparent_88%)]" />
          <div className="relative flex h-full flex-col justify-between p-5 md:p-7">
            <div className="flex items-center justify-between">
              <span className="mono text-[11px] tracking-[0.12em] text-[var(--accent-text)]">
                {program.code}
              </span>
              <span className="mono border border-[var(--line)] px-2 py-1 text-[9px] tracking-[0.16em] text-[var(--lt)]">
                MALLA 2026
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="max-w-[16ch] text-[clamp(22px,2.4vw,30px)] font-bold leading-[1.05] tracking-[-0.02em]">
                {program.name}
              </h3>
              <span className="mono text-[11px] tracking-[0.08em] text-[var(--lt)]">
                {program.licencia}
              </span>
            </div>
          </div>
        </>,
      )}

      {/* Duración + ciclos */}
      {tile(
        1,
        "col-span-2 flex flex-col justify-between p-5 md:p-7",
        <>
          <span className="kicker">Duración</span>
          <div className="flex items-end justify-between gap-4">
            <div className="flex items-baseline gap-2">
              <span className="mono text-[clamp(40px,5vw,60px)] leading-[0.9] tracking-[-0.02em] text-[var(--ink)]">
                {program.meses}
              </span>
              <span className="mono text-[13px] tracking-[0.06em] text-[var(--mid)]">
                MESES
              </span>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex gap-1.5">
                {program.ciclos.map((c) => (
                  <span
                    key={c.n}
                    aria-hidden
                    className="h-6 w-[3px] bg-[var(--accent)]"
                  />
                ))}
              </div>
              <span className="mono text-[11px] tracking-[0.08em] text-[var(--mid)]">
                {s.ciclos} CICLOS
              </span>
            </div>
          </div>
        </>,
      )}

      {/* Horas totales */}
      {tile(
        2,
        "flex flex-col justify-between p-5 md:p-7",
        <>
          <span className="kicker">Horas</span>
          <div className="flex flex-col gap-1">
            <span className="mono text-[clamp(30px,3.4vw,42px)] leading-[0.9] tracking-[-0.02em] text-[var(--ink)]">
              {s.horasTotal}
            </span>
            <span className="mono text-[10px] tracking-[0.08em] text-[var(--mid)]">
              INSTRUCCIÓN
            </span>
          </div>
        </>,
      )}

      {/* Horas de práctica (gold) */}
      {tile(
        3,
        "flex flex-col justify-between p-5 md:p-7",
        <>
          <span className="kicker">Práctica</span>
          <div className="flex flex-col gap-1">
            <span className="mono text-[clamp(30px,3.4vw,42px)] leading-[0.9] tracking-[-0.02em] text-[var(--accent-text)]">
              {s.horasPractica}
            </span>
            <span className="mono text-[10px] tracking-[0.08em] text-[var(--mid)]">
              {s.practicaPct}% DEL PLAN
            </span>
          </div>
        </>,
      )}

      {/* Distribución horaria */}
      {tile(
        4,
        "col-span-2 flex flex-col justify-between gap-4 p-5 md:p-7",
        <>
          <span className="kicker">Distribución horaria</span>
          <div className="flex flex-col gap-3">
            <div className="flex h-2.5 w-full overflow-hidden">
              {s.porTipo
                .filter((t) => t.horas > 0)
                .map((t) => (
                  <span
                    key={t.type}
                    className="h-full"
                    style={{
                      width: `${(t.horas / s.horasTotal) * 100}%`,
                      background: TYPE_COLOR[t.type],
                    }}
                  />
                ))}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {s.porTipo
                .filter((t) => t.horas > 0)
                .map((t) => (
                  <span key={t.type} className="flex items-center gap-1.5">
                    <span
                      aria-hidden
                      className="inline-block size-2"
                      style={{ background: TYPE_COLOR[t.type] }}
                    />
                    <span className="mono text-[10px] tracking-[0.08em] text-[var(--lt)]">
                      {TYPE_META[t.type].label}
                    </span>
                    <span className="mono text-[10px] tracking-[0.08em] text-[var(--mid)]">
                      {t.horas}h
                    </span>
                  </span>
                ))}
            </div>
          </div>
        </>,
      )}

      {/* Unidades crédito */}
      {tile(
        5,
        "flex flex-col justify-between p-5 md:p-7",
        <>
          <span className="kicker">Créditos</span>
          <div className="flex flex-col gap-1">
            <span className="mono text-[clamp(30px,3.4vw,42px)] leading-[0.9] tracking-[-0.02em] text-[var(--ink)]">
              {s.uc}
            </span>
            <span className="mono text-[10px] tracking-[0.08em] text-[var(--mid)]">
              {s.asignaturas} ASIGNATURAS
            </span>
          </div>
        </>,
      )}

      {/* Equipo / campus */}
      {tile(
        6,
        "flex flex-col justify-between gap-3 p-5 md:p-7",
        <>
          <span className="kicker">Entrenas sobre</span>
          <div className="flex flex-col gap-2">
            <span className="text-[13px] font-medium leading-snug tracking-[-0.01em] text-[var(--lt)]">
              {program.equipo}
            </span>
            <span className="mono text-[10px] leading-relaxed tracking-[0.06em] text-[var(--mid)]">
              {program.campus}
            </span>
          </div>
        </>,
      )}
    </div>
  );
}

// ============================================================================
// Outcome band
// ============================================================================
function OutcomeBand({ program }: { program: PensumProgram }) {
  return (
    <div className="flex flex-col gap-6 border border-t-0 border-[var(--hairline)] bg-[var(--surface)] p-6 md:flex-row md:items-center md:justify-between md:p-9">
      <div className="flex flex-col gap-3">
        <span className="mono text-[10px] tracking-[0.16em] text-[var(--accent-text)]">
          AL COMPLETAR LA MALLA
        </span>
        <div className="flex flex-col gap-2">
          <span className="text-[clamp(22px,2.6vw,32px)] font-bold leading-[1.05] tracking-[-0.02em]">
            Egresas con {program.licencia}.
          </span>
          <span className="max-w-[46ch] text-[14px] leading-relaxed text-[var(--lt)]">
            {program.salida}
          </span>
        </div>
      </div>
      <a
        href="/calendario"
        className="alfa-cta alfa-cta--ghost mono flex shrink-0 items-center gap-2 px-5 py-3 text-[11px] tracking-[0.14em]"
      >
        VER FECHAS DE INGRESO
        <ArrowRight size={14} strokeWidth={1.75} aria-hidden />
      </a>
    </div>
  );
}

// ============================================================================
// Materia insignia (editorial split)
// ============================================================================
function Insignia({ program, reduce }: { program: PensumProgram; reduce: boolean }) {
  const ins = program.insignia;
  return (
    <motion.div
      key={`ins-${program.code}`}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="mt-[clamp(3rem,6vw,5rem)] grid overflow-hidden border border-[var(--hairline)] md:grid-cols-2"
    >
      <div className="relative order-2 min-h-[260px] overflow-hidden md:order-1 md:min-h-[420px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMG[ins.img]}
          alt={ins.title}
          loading="lazy"
          decoding="async"
          className="alfa-photo absolute inset-0"
        />
        <span className="mono absolute left-4 top-4 border border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_55%,transparent)] px-2 py-1 text-[9px] tracking-[0.16em] text-[var(--lt)] backdrop-blur-sm">
          {ins.courseCode}
        </span>
      </div>
      <div className="order-1 flex flex-col justify-center gap-5 border-b border-[var(--hairline)] p-7 md:order-2 md:border-b-0 md:border-l md:p-11">
        <span className="mono text-[10px] tracking-[0.18em] text-[var(--accent-text)]">
          MATERIA INSIGNIA
        </span>
        <h3 className="max-w-[18ch] text-[clamp(24px,2.8vw,36px)] font-bold leading-[1.06] tracking-[-0.025em]">
          {ins.title}
        </h3>
        <p className="max-w-[52ch] text-[15px] leading-relaxed text-[var(--lt)]">
          {ins.body}
        </p>
      </div>
    </motion.div>
  );
}

// ============================================================================
// Malla curricular (hairline ledger)
// ============================================================================
function Malla({ program, reduce }: { program: PensumProgram; reduce: boolean }) {
  const s = statsFor(program);
  return (
    <div className="mt-[clamp(3.5rem,7vw,6rem)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2 className="text-[clamp(24px,3vw,38px)] font-bold leading-[1.05] tracking-[-0.03em]">
          Malla curricular.
        </h2>
        {/* Type legend */}
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {TYPE_ORDER.map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <span
                aria-hidden
                className="inline-block size-2"
                style={{ background: TYPE_COLOR[t] }}
              />
              <span className="mono text-[10px] tracking-[0.1em] text-[var(--mid)]">
                {TYPE_META[t].label}
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="mt-[clamp(2rem,4vw,3rem)] flex flex-col">
        {program.ciclos.map((cycle, ci) => (
          <motion.section
            key={cycle.n}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.6, delay: reduce ? 0 : Math.min(ci * 0.04, 0.16), ease: EASE }}
            className="grid gap-6 border-t border-[var(--hairline)] py-[clamp(2rem,4vw,3rem)] md:grid-cols-[220px_1fr] md:gap-10"
          >
            {/* Cycle meta */}
            <div className="flex gap-4 md:flex-col md:gap-5">
              <span className="mono text-[clamp(30px,3vw,40px)] leading-none tracking-[-0.02em] text-[var(--accent-text)]">
                {cycle.n}
              </span>
              <div className="flex flex-col gap-2 md:gap-3">
                <div className="h-px w-8 bg-[var(--accent)] md:h-8 md:w-px" />
                <h4 className="text-[16px] font-semibold leading-snug tracking-[-0.01em]">
                  {cycle.name}
                </h4>
                <span className="mono text-[11px] tracking-[0.08em] text-[var(--mid)]">
                  {cycle.meses}
                </span>
                <p className="max-w-[32ch] text-[13px] leading-relaxed text-[var(--lt)]">
                  {cycle.foco}
                </p>
              </div>
            </div>

            {/* Courses */}
            <div className="grid gap-px border border-[var(--hairline)] bg-[var(--hairline)] sm:grid-cols-2">
              {cycle.courses.map((c) => (
                <div
                  key={c.code}
                  className="alfa-course group flex flex-col gap-2.5 bg-[var(--bg)] p-4 md:p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2">
                      <span
                        aria-hidden
                        className="inline-block size-2 shrink-0"
                        style={{ background: TYPE_COLOR[c.type] }}
                      />
                      <span className="mono text-[11px] tracking-[0.08em] text-[var(--mid)] transition-colors group-hover:text-[var(--accent-text)]">
                        {c.code}
                      </span>
                    </span>
                    <span className="mono text-[10px] tracking-[0.1em] text-[var(--mid)]">
                      {TYPE_META[c.type].code}
                    </span>
                  </div>
                  <span className="flex items-start gap-1.5 text-[14px] font-semibold leading-snug tracking-[-0.01em]">
                    {c.name}
                    {c.insignia && (
                      <span
                        aria-label="Materia insignia"
                        title="Materia insignia"
                        className="mt-1 inline-block size-1.5 shrink-0 bg-[var(--accent)]"
                      />
                    )}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="mono text-[10px] tracking-[0.06em] text-[var(--mid)]">
                      {c.teoria}h teoría
                    </span>
                    <span className="mono text-[10px] tracking-[0.06em] text-[var(--accent-text)]">
                      {c.practica}h práctica
                    </span>
                    <span className="mono ml-auto text-[10px] tracking-[0.06em] text-[var(--lt)]">
                      {c.uc} UC
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      {/* Totals footer */}
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-[var(--hairline)] py-6">
        <span className="mono text-[11px] tracking-[0.12em] text-[var(--accent-text)]">
          {program.code}
        </span>
        <Total label="ASIGNATURAS" value={s.asignaturas} />
        <Total label="CICLOS" value={s.ciclos} />
        <Total label="HORAS" value={s.horasTotal} />
        <Total label="UNIDADES CRÉDITO" value={s.uc} />
        <Total label="PRÁCTICA" value={`${s.practicaPct}%`} gold />
      </div>
    </div>
  );
}

function Total({
  label,
  value,
  gold,
}: {
  label: string;
  value: number | string;
  gold?: boolean;
}) {
  return (
    <span className="flex items-baseline gap-2">
      <span
        className="mono text-[18px] tracking-[-0.01em]"
        style={{ color: gold ? "var(--accent-text)" : "var(--ink)" }}
      >
        {value}
      </span>
      <span className="mono text-[10px] tracking-[0.1em] text-[var(--mid)]">
        {label}
      </span>
    </span>
  );
}

// ============================================================================
// Coming-soon panel (Pilotos, in certification)
// ============================================================================
function SoonPanel({ program, reduce }: { program: PensumProgram; reduce: boolean }) {
  return (
    <motion.div
      key={program.code}
      initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.55, ease: EASE }}
      className="mt-px grid overflow-hidden border border-t-0 border-[var(--hairline)] md:grid-cols-2"
    >
      <div className="relative order-2 min-h-[280px] overflow-hidden md:order-1 md:min-h-[440px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMG[program.img]}
          alt={program.name}
          loading="lazy"
          decoding="async"
          className="alfa-photo absolute inset-0"
        />
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(45deg,var(--accent)_0_1px,transparent_1px_13px)] opacity-[0.07]" />
        <span className="mono absolute left-4 top-4 flex items-center gap-1.5 border border-[var(--accent)] bg-[color-mix(in_srgb,var(--bg)_55%,transparent)] px-2 py-1 text-[9px] tracking-[0.16em] text-[var(--accent-text)] backdrop-blur-sm">
          <Lock size={10} strokeWidth={2} />
          EN CERTIFICACIÓN
        </span>
      </div>
      <div className="order-1 flex flex-col justify-center gap-5 border-b border-[var(--hairline)] p-7 md:order-2 md:border-b-0 md:border-l md:p-11">
        <span className="mono text-[11px] tracking-[0.12em] text-[var(--accent-text)]">
          {program.code}
        </span>
        <h3 className="max-w-[16ch] text-[clamp(26px,3vw,40px)] font-bold leading-[1.04] tracking-[-0.025em]">
          {program.insignia.title}
        </h3>
        <p className="max-w-[52ch] text-[15px] leading-relaxed text-[var(--lt)]">
          {program.insignia.body}
        </p>
        <a
          href="/#sec-cta"
          className="alfa-cta alfa-cta--solid mono mt-1 flex w-fit items-center gap-3 px-6 py-3.5 text-[12px] tracking-[0.12em]"
        >
          ENTRAR A LA LISTA DE ESPERA
          <ArrowRight size={15} strokeWidth={1.75} aria-hidden />
        </a>
      </div>
    </motion.div>
  );
}
