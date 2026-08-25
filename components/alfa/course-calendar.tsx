"use client";

// Interactive academic calendar for CIA ALFA 552 (/calendario).
// Schedule-X v4 under a fully custom aviation-gold skin, with:
//  - custom event chips that open image hover-cards (Radix HoverCard),
//  - a hand-built toolbar (view toggle + month nav) driven by the controls plugin,
//  - category filters, all wired through the events-service plugin,
//  - Framer Motion for the sliding view indicator, filter feedback and reveals.
// createCalendar runs client-only (inside the adapter's effect), so this is SSR-safe.

import "temporal-polyfill/global";
import { Temporal } from "temporal-polyfill";
import "@schedule-x/theme-default/dist/index.css";

import { useEffect, useMemo, useRef, useState } from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewMonthGrid,
  createViewWeek,
  createViewDay,
  type CalendarEventExternal,
  type CalendarType,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createCalendarControlsPlugin } from "@schedule-x/calendar-controls";
import { HoverCard } from "radix-ui";
import { motion, useReducedMotion } from "motion/react";
import {
  MapPin,
  Clock3,
  Users,
  Video,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { IMG } from "./images";
import {
  events as COURSE_EVENTS,
  CATEGORIES,
  CATEGORY_MAP,
  type CategoryId,
  type CourseEvent,
  CALENDAR_ANCHOR,
} from "./calendar-data";

type ViewId = "month-grid" | "week" | "day";
type SxEvent = CalendarEventExternal & { _alfa: CourseEvent };

const VIEWS: { id: ViewId; label: string }[] = [
  { id: "month-grid", label: "Mes" },
  { id: "week", label: "Semana" },
  { id: "day", label: "Día" },
];

const TZ = "America/Caracas";
const CARACAS = "es-VE";

// ---- date helpers (all output uppercased mono strings) ----------------------
const MONTHS = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];
const DAYS3 = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];

const pad = (n: number) => String(n).padStart(2, "0");
const toISO = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromISO = (iso: string) => new Date(`${iso}T00:00:00`);

function startOfWeekMonday(d: Date) {
  const c = new Date(d);
  const wd = (c.getDay() + 6) % 7; // 0 = Monday
  c.setDate(c.getDate() - wd);
  return c;
}

function rangeLabel(view: ViewId, iso: string): string {
  const d = fromISO(iso);
  if (view === "month-grid") {
    return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`.toUpperCase();
  }
  if (view === "day") {
    return `${DAYS3[d.getDay()]} ${pad(d.getDate())} ${MONTHS[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`.toUpperCase();
  }
  const mon = startOfWeekMonday(d);
  const sun = new Date(mon);
  sun.setDate(mon.getDate() + 6);
  const sameMonth = mon.getMonth() === sun.getMonth();
  const left = sameMonth ? pad(mon.getDate()) : `${pad(mon.getDate())} ${MONTHS[mon.getMonth()].slice(0, 3)}`;
  const right = `${pad(sun.getDate())} ${MONTHS[sun.getMonth()].slice(0, 3)}`;
  return `${left} A ${right} ${sun.getFullYear()}`.toUpperCase();
}

// ---- Schedule-X calendars (colors barely surface since chips are custom, but
//      set them anyway so agenda / "+more" stays on-brand). Gold only for
//      enrollment; every other category rides the neutral ladder. -----------
const CALENDARS: Record<CategoryId, CalendarType> = {
  inscripcion: {
    colorName: "inscripcion",
    darkColors: { main: "#e8b647", container: "#2a2410", onContainer: "#edbe52" },
    lightColors: { main: "#8a6410", container: "#f3e6c2", onContainer: "#5a430b" },
  },
  clase: {
    colorName: "clase",
    darkColors: { main: "#c3c7cd", container: "#191c21", onContainer: "#f4f5f6" },
    lightColors: { main: "#3d4046", container: "#e8e8e3", onContainer: "#0c0d0f" },
  },
  simulador: {
    colorName: "simulador",
    darkColors: { main: "#838994", container: "#151719", onContainer: "#c3c7cd" },
    lightColors: { main: "#6a6e74", container: "#e8e8e3", onContainer: "#3d4046" },
  },
  examen: {
    colorName: "examen",
    darkColors: { main: "#c3c7cd", container: "#121417", onContainer: "#c3c7cd" },
    lightColors: { main: "#3d4046", container: "#f1f1ed", onContainer: "#3d4046" },
  },
  recorrido: {
    colorName: "recorrido",
    darkColors: { main: "#838994", container: "#161a1f", onContainer: "#c3c7cd" },
    lightColors: { main: "#6a6e74", container: "#eceae0", onContainer: "#3d4046" },
  },
};

function toSxEvent(e: CourseEvent): SxEvent {
  const timed = Boolean(e.start && e.end);
  return {
    id: e.id,
    title: e.title,
    calendarId: e.category,
    location: e.location,
    description: e.desc,
    start: timed
      ? Temporal.ZonedDateTime.from(`${e.date}T${e.start}:00[${TZ}]`)
      : Temporal.PlainDate.from(e.date),
    end: timed
      ? Temporal.ZonedDateTime.from(`${e.date}T${e.end}:00[${TZ}]`)
      : Temporal.PlainDate.from(e.endDate ?? e.date),
    _alfa: e,
  };
}

// ============================================================================
export function CourseCalendar() {
  const reduce = useReducedMotion();
  const [view, setView] = useState<ViewId>("month-grid");
  const [anchorISO, setAnchorISO] = useState<string>(CALENDAR_ANCHOR);
  const [hidden, setHidden] = useState<CategoryId[]>([]);

  const eventsService = useState(() => createEventsServicePlugin())[0];
  const controls = useState(() => createCalendarControlsPlugin())[0];

  const allSx = useMemo(() => COURSE_EVENTS.map(toSxEvent), []);

  const initialTheme =
    typeof document !== "undefined"
      ? document.documentElement.getAttribute("data-theme")
      : "dark";

  const calendar = useCalendarApp(
    {
      views: [createViewMonthGrid(), createViewWeek(), createViewDay()],
      defaultView: "month-grid",
      selectedDate: Temporal.PlainDate.from(CALENDAR_ANCHOR),
      timezone: TZ,
      locale: CARACAS,
      firstDayOfWeek: 1,
      isDark: initialTheme !== "light",
      calendars: CALENDARS,
      events: allSx,
      monthGridOptions: { nEventsPerDay: 3 },
      callbacks: {
        onSelectedDateUpdate: (date) => setAnchorISO(date.toString()),
      },
    },
    [eventsService, controls],
  );

  // Keep the Schedule-X theme in lockstep with the site theme toggle.
  useEffect(() => {
    if (!calendar) return;
    const root = document.documentElement;
    const sync = () =>
      calendar.setTheme(root.getAttribute("data-theme") === "light" ? "light" : "dark");
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, [calendar]);

  // Apply category filters through the events-service.
  useEffect(() => {
    if (!calendar) return;
    try {
      eventsService.set(allSx.filter((e) => !hidden.includes(e.calendarId as CategoryId)));
    } catch {
      /* plugin not ready yet; initial config already holds the full set */
    }
  }, [calendar, hidden, allSx, eventsService]);

  const changeView = (v: ViewId) => {
    setView(v);
    controls.setView(v);
  };

  const shift = (dir: 1 | -1) => {
    const d = fromISO(anchorISO);
    if (view === "month-grid") d.setMonth(d.getMonth() + dir);
    else if (view === "week") d.setDate(d.getDate() + 7 * dir);
    else d.setDate(d.getDate() + dir);
    const iso = toISO(d);
    setAnchorISO(iso);
    controls.setDate(Temporal.PlainDate.from(iso));
  };

  const goToday = () => {
    const iso = toISO(new Date());
    setAnchorISO(iso);
    controls.setDate(Temporal.PlainDate.from(iso));
  };

  const toggleCategory = (id: CategoryId) =>
    setHidden((h) => (h.includes(id) ? h.filter((x) => x !== id) : [...h, id]));

  const counts = useMemo(() => {
    const m = {} as Record<CategoryId, number>;
    for (const c of CATEGORIES) m[c.id] = 0;
    for (const e of COURSE_EVENTS) m[e.category] += 1;
    return m;
  }, []);
  const visibleCount = COURSE_EVENTS.filter((e) => !hidden.includes(e.category)).length;

  const spring = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 420, damping: 34 };

  return (
    <div>
      {/* ---- Toolbar ---------------------------------------------------- */}
      <div className="flex flex-col gap-5 border border-b-0 border-[var(--hairline)] bg-[var(--surface)] px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="flex items-center gap-4">
          <div className="flex">
            <button
              type="button"
              onClick={() => shift(-1)}
              aria-label="Anterior"
              className="grid size-9 place-items-center border border-[var(--line)] text-[var(--lt)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent-text)] active:translate-y-px"
            >
              <ChevronLeft size={16} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => shift(1)}
              aria-label="Siguiente"
              className="grid size-9 place-items-center border border-l-0 border-[var(--line)] text-[var(--lt)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent-text)] active:translate-y-px"
            >
              <ChevronRight size={16} strokeWidth={1.5} />
            </button>
          </div>
          <button
            type="button"
            onClick={goToday}
            className="mono border border-[var(--line)] px-3 py-2 text-[10px] tracking-[0.14em] text-[var(--lt)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent-text)] active:translate-y-px"
          >
            HOY
          </button>
          <span className="mono min-w-[9ch] text-[15px] tracking-[0.02em] text-[var(--ink)] md:text-[17px]">
            {rangeLabel(view, anchorISO)}
          </span>
        </div>

        {/* View toggle with a sliding gold indicator (layoutId) */}
        <div className="flex self-start border border-[var(--line)] md:self-auto">
          {VIEWS.map((v) => {
            const active = view === v.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => changeView(v.id)}
                aria-pressed={active}
                className="relative px-4 py-2 outline-none"
              >
                {active && (
                  <motion.span
                    layoutId="alfa-view-ind"
                    transition={spring}
                    className="absolute inset-0 bg-[var(--accent)]"
                  />
                )}
                <span
                  className="mono relative z-10 text-[10px] tracking-[0.16em] transition-colors"
                  style={{ color: active ? "var(--accent-ink)" : "var(--lt)" }}
                >
                  {v.label.toUpperCase()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ---- Category filters ------------------------------------------ */}
      <div className="flex flex-wrap items-center gap-2 border border-b-0 border-[var(--hairline)] bg-[var(--bg)] px-4 py-3 md:px-6">
        {CATEGORIES.map((c) => {
          const off = hidden.includes(c.id);
          const gold = c.priority;
          return (
            <motion.button
              key={c.id}
              type="button"
              onClick={() => toggleCategory(c.id)}
              whileTap={reduce ? undefined : { scale: 0.96 }}
              animate={{ opacity: off ? 0.4 : 1 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              aria-pressed={!off}
              className="mono flex items-center gap-2 border px-2.5 py-1.5 text-[10px] tracking-[0.12em] transition-colors"
              style={{
                borderColor: off
                  ? "var(--hairline)"
                  : gold
                    ? "var(--accent)"
                    : "var(--line)",
                color: off ? "var(--mid)" : gold ? "var(--accent-text)" : "var(--lt)",
              }}
            >
              <span
                aria-hidden
                className="inline-block size-1.5"
                style={{
                  background: gold ? "var(--accent)" : "var(--mid)",
                  opacity: off ? 0.4 : 1,
                }}
              />
              {c.code}
              <span className="text-[var(--mid)]">{c.label.toUpperCase()}</span>
              <span style={{ color: gold && !off ? "var(--accent-text)" : "var(--mid)" }}>
                {counts[c.id]}
              </span>
            </motion.button>
          );
        })}
        <span className="mono ml-auto hidden text-[10px] tracking-[0.12em] text-[var(--mid)] sm:inline">
          <motion.span
            key={visibleCount}
            initial={reduce ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-[var(--ink)]"
          >
            {visibleCount}
          </motion.span>{" "}
          EVENTOS VISIBLES
        </span>
      </div>

      {/* ---- Calendar surface ------------------------------------------ */}
      <div className="alfa-cal">
        {calendar ? (
          <ScheduleXCalendar
            calendarApp={calendar}
            customComponents={{
              monthGridEvent: Chip,
              dateGridEvent: Chip,
              timeGridEvent: TimeBlock,
            }}
          />
        ) : (
          <div className="alfa-cal-skeleton" aria-hidden />
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Event chips (wrapped in an image hover-card)
// ============================================================================

function timeText(e: CourseEvent) {
  return e.start && e.end ? `${e.start}` : "TODO EL DÍA";
}

/** Compact chip for month grid + all-day (date grid) rows. */
function Chip({ calendarEvent }: { calendarEvent: SxEvent }) {
  const e = calendarEvent._alfa;
  const cat = CATEGORY_MAP[e.category];
  const gold = cat.priority;
  return (
    <EventHover event={e}>
      <button
        type="button"
        className="alfa-chip group/chip flex w-full items-center gap-1.5 border px-1.5 py-1 text-left outline-none transition-colors focus-visible:border-[var(--accent)]"
        style={{
          background: gold ? "var(--accent)" : "var(--surface-2)",
          borderColor: gold ? "var(--accent)" : "var(--hairline)",
          color: gold ? "var(--accent-ink)" : "var(--ink)",
        }}
      >
        <span
          className="mono shrink-0 text-[9px] tracking-[0.08em]"
          style={{ color: gold ? "var(--accent-ink)" : "var(--mid)" }}
        >
          {e.start ?? cat.code}
        </span>
        <span className="truncate text-[11px] font-medium leading-tight">{e.title}</span>
      </button>
    </EventHover>
  );
}

/** Filled block for week / day time grid. */
function TimeBlock({ calendarEvent }: { calendarEvent: SxEvent }) {
  const e = calendarEvent._alfa;
  const cat = CATEGORY_MAP[e.category];
  const gold = cat.priority;
  return (
    <EventHover event={e}>
      <button
        type="button"
        className="flex h-full w-full flex-col gap-0.5 overflow-hidden border px-2 py-1 text-left outline-none transition-colors focus-visible:border-[var(--accent)]"
        style={{
          background: gold
            ? "color-mix(in srgb, var(--accent) 20%, var(--surface))"
            : "var(--surface-2)",
          borderColor: gold ? "var(--accent)" : "var(--hairline)",
          color: "var(--ink)",
        }}
      >
        <span className="mono text-[9px] tracking-[0.08em] text-[var(--mid)]">
          {e.start}–{e.end} · {cat.code}
        </span>
        <span className="truncate text-[12px] font-semibold leading-tight">{e.title}</span>
        <span className="mono truncate text-[9px] tracking-[0.06em] text-[var(--mid)]">
          {e.location}
        </span>
      </button>
    </EventHover>
  );
}

// ============================================================================
// Hover card (Radix HoverCard, origin-aware CSS reveal in calendar-skin.css)
// ============================================================================

function EventHover({ event, children }: { event: CourseEvent; children: React.ReactNode }) {
  const virtual = event.modalidad !== "Presencial";
  const cat = CATEGORY_MAP[event.category];
  return (
    <HoverCard.Root openDelay={120} closeDelay={90}>
      <HoverCard.Trigger asChild>{children}</HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          side="top"
          align="center"
          sideOffset={8}
          collisionPadding={14}
          className="alfa-hovercard z-[70] w-[300px] border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]"
        >
          {/* Image */}
          <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[var(--hairline)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={IMG[event.img]}
              alt={event.title}
              loading="lazy"
              decoding="async"
              className="alfa-photo"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_srgb,var(--surface)_75%,transparent),transparent_55%)]" />
            <span
              className="mono absolute left-2 top-2 border px-1.5 py-0.5 text-[9px] tracking-[0.14em]"
              style={{
                background: "color-mix(in srgb, var(--bg) 55%, transparent)",
                borderColor: cat.priority ? "var(--accent)" : "var(--line)",
                color: cat.priority ? "var(--accent-text)" : "var(--lt)",
                backdropFilter: "blur(4px)",
              }}
            >
              {cat.code} · {cat.label.toUpperCase()}
            </span>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-3 p-4">
            <div className="flex flex-col gap-1.5">
              {event.program && (
                <span className="mono text-[10px] tracking-[0.14em] text-[var(--accent-text)]">
                  {event.program}
                </span>
              )}
              <h3 className="text-[15px] font-semibold leading-snug tracking-[-0.01em]">
                {event.title}
              </h3>
            </div>

            <div className="flex flex-col gap-2 border-t border-[var(--hairline)] pt-3">
              <Meta icon={<Clock3 size={13} strokeWidth={1.5} />}>
                {event.start && event.end
                  ? `${event.start} a ${event.end}`
                  : "Todo el día"}
              </Meta>
              <Meta icon={<MapPin size={13} strokeWidth={1.5} />}>{event.location}</Meta>
              <Meta icon={<Users size={13} strokeWidth={1.5} />}>
                {event.docente} · {event.cupos}
              </Meta>
            </div>

            {/* Modalidad + aula virtual hook */}
            <div className="flex items-center justify-between gap-2 border-t border-[var(--hairline)] pt-3">
              <span
                className="mono border px-2 py-1 text-[9px] tracking-[0.12em]"
                style={{
                  borderColor: virtual ? "var(--accent)" : "var(--line)",
                  color: virtual ? "var(--accent-text)" : "var(--mid)",
                }}
              >
                {event.modalidad.toUpperCase()}
              </span>
              {virtual ? (
                <button
                  type="button"
                  disabled
                  title="Aula virtual próximamente"
                  className="mono flex cursor-not-allowed items-center gap-1.5 border border-[var(--line)] px-2.5 py-1 text-[9px] tracking-[0.12em] text-[var(--mid)] opacity-70"
                >
                  <Video size={12} strokeWidth={1.5} />
                  ENTRAR AL AULA
                  <span className="text-[var(--accent-text)]">· PRONTO</span>
                </button>
              ) : (
                <span className="mono text-[9px] tracking-[0.12em] text-[var(--mid)]">
                  {timeText(event)}
                </span>
              )}
            </div>

            <p className="text-[12px] leading-relaxed text-[var(--lt)]">{event.desc}</p>
          </div>
          <HoverCard.Arrow className="fill-[var(--line)]" width={12} height={6} />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}

function Meta({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-[12px] text-[var(--lt)]">
      <span className="mt-0.5 shrink-0 text-[var(--mid)]">{icon}</span>
      <span className="leading-snug">{children}</span>
    </div>
  );
}
