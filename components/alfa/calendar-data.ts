// Placeholder academic calendar for CIA ALFA 552 — /calendario.
// Content is illustrative (marked placeholder) but structured for the real thing:
// classes, enrollment windows, guided tours, INAC exams and simulator labs.
// Dates are stored as plain strings and converted to Temporal in the client
// component, so this file stays framework-agnostic.

import { IMG } from "./images";

/** Category = "calendar" in Schedule-X terms. Single-accent system:
 *  gold is reserved for enrollment (the action that matters most); every other
 *  category rides the neutral value ladder and is told apart by its mono code. */
export type CategoryId =
  | "inscripcion"
  | "clase"
  | "simulador"
  | "examen"
  | "recorrido";

export type Category = {
  id: CategoryId;
  /** Full label for legend + hover card. */
  label: string;
  /** 3-letter mono code shown on the event chip. */
  code: string;
  /** true only for gold (priority/attention) categories. */
  priority: boolean;
};

export const CATEGORIES: Category[] = [
  { id: "inscripcion", label: "Inscripción", code: "INS", priority: true },
  { id: "clase", label: "Clase", code: "CLS", priority: false },
  { id: "simulador", label: "Simulador / Lab", code: "SIM", priority: false },
  { id: "examen", label: "Examen INAC", code: "EXM", priority: false },
  { id: "recorrido", label: "Recorrido", code: "REC", priority: false },
];

export const CATEGORY_MAP: Record<CategoryId, Category> = CATEGORIES.reduce(
  (acc, c) => ({ ...acc, [c.id]: c }),
  {} as Record<CategoryId, Category>,
);

export type Modalidad = "Presencial" | "Aula Virtual" | "Híbrido";

export type CourseEvent = {
  id: string;
  category: CategoryId;
  title: string;
  /** Program code shown as a technical tag, e.g. "TMA-552". Empty for open days. */
  program: string;
  /** ISO date "YYYY-MM-DD". */
  date: string;
  /** ISO end date for multi-day all-day ranges (inclusive). Defaults to date. */
  endDate?: string;
  /** "HH:mm" — present => timed event (shows in week/day grid). */
  start?: string;
  end?: string;
  docente: string;
  location: string;
  modalidad: Modalidad;
  /** Seats, e.g. "18 / 24". Enrollment/tour events use a status word instead. */
  cupos: string;
  img: keyof typeof IMG;
  desc: string;
};

// Anchor month: September 2026 (aligns with cohort C-26B, "07 SEP 26").
export const CALENDAR_ANCHOR = "2026-09-15";

export const events: CourseEvent[] = [
  // ---- Enrollment windows (gold, all-day, span several days) ---------------
  {
    id: "ins-c26b",
    category: "inscripcion",
    title: "Inscripción abierta · Cohorte C-26B",
    program: "TMA-552",
    date: "2026-09-01",
    endDate: "2026-09-05",
    docente: "Oficina de Admisión",
    location: "Campus Caracas + en línea",
    modalidad: "Híbrido",
    cupos: "5 cupos restantes",
    img: "hangar",
    desc: "Ventana de inscripción para la cohorte de septiembre de Célula y Motores. Entrega de recaudos y pago de arancel.",
  },
  {
    id: "ins-cierre",
    category: "inscripcion",
    title: "Cierre de inscripciones C-26B",
    program: "TMA-552",
    date: "2026-09-05",
    docente: "Oficina de Admisión",
    location: "Campus Caracas",
    modalidad: "Presencial",
    cupos: "Últimos cupos",
    img: "airlinerSky",
    desc: "Último día para formalizar la matrícula de la cohorte C-26B antes del inicio de clases.",
  },
  {
    id: "ins-dv",
    category: "inscripcion",
    title: "Preinscripción · Despacho de Vuelo",
    program: "DV-552",
    date: "2026-09-21",
    endDate: "2026-09-25",
    docente: "Oficina de Admisión",
    location: "En línea",
    modalidad: "Aula Virtual",
    cupos: "14 / 18",
    img: "planeBlueSky",
    desc: "Preinscripción para la cohorte C-26C de Despacho de Vuelo. Cupos limitados por sala de operaciones.",
  },

  // ---- Guided tours / open house (recorridos) ------------------------------
  {
    id: "rec-hangar",
    category: "recorrido",
    title: "Recorrido guiado · Hangar Escuela",
    program: "",
    date: "2026-09-12",
    start: "10:00",
    end: "12:00",
    docente: "Ing. Marisela Contreras",
    location: "Hangar Escuela · Maiquetía",
    modalidad: "Presencial",
    cupos: "22 / 30",
    img: "hangar",
    desc: "Visita a la línea de mantenimiento, bancos de instrumentos y aeronaves escuela. Abierto a aspirantes y familiares.",
  },
  {
    id: "rec-openhouse",
    category: "recorrido",
    title: "Jornada de puertas abiertas",
    program: "",
    date: "2026-09-27",
    start: "09:00",
    end: "13:00",
    docente: "Equipo académico",
    location: "Campus Caracas",
    modalidad: "Presencial",
    cupos: "Entrada libre",
    img: "cabinCrew",
    desc: "Charlas por programa, demostración de simulador y asesoría de admisión en un solo día.",
  },

  // ---- Representative teaching week: 7-11 Sep 2026 (week/day view) ----------
  {
    id: "cl-tma-mon",
    category: "clase",
    title: "Sistemas de Célula I",
    program: "TMA-552",
    date: "2026-09-07",
    start: "08:00",
    end: "10:30",
    docente: "Prof. Aníbal Rondón",
    location: "Aula 3 · Campus",
    modalidad: "Presencial",
    cupos: "24 / 24",
    img: "turbine",
    desc: "Estructuras primarias y secundarias, tolerancias de fabricante y criterios de inspección visual.",
  },
  {
    id: "cl-tmd-mon",
    category: "clase",
    title: "Fundamentos de Aviónica",
    program: "TMD-552",
    date: "2026-09-07",
    start: "13:30",
    end: "16:00",
    docente: "Prof. Yolanda Piñero",
    location: "Lab. Aviónica",
    modalidad: "Híbrido",
    cupos: "20 / 20",
    img: "cockpit",
    desc: "Arquitectura de instrumentos, buses de datos y principios de la cabina de cristal.",
  },
  {
    id: "cl-dv-tue",
    category: "clase",
    title: "Meteorología Aeronáutica",
    program: "DV-552",
    date: "2026-09-08",
    start: "09:00",
    end: "11:00",
    docente: "Lic. Gustavo Alcántara",
    location: "Aula Virtual",
    modalidad: "Aula Virtual",
    cupos: "16 / 18",
    img: "planeBlueSky",
    desc: "Lectura de METAR y TAF, cartas significativas y su impacto en el plan operacional de vuelo.",
  },
  {
    id: "cl-tma-tue",
    category: "clase",
    title: "Motores de Turbina I",
    program: "TMA-552",
    date: "2026-09-08",
    start: "14:00",
    end: "16:30",
    docente: "Ing. Fernando Uzcátegui",
    location: "Hangar Escuela",
    modalidad: "Presencial",
    cupos: "24 / 24",
    img: "turbine",
    desc: "Ciclo termodinámico, secciones del motor y parámetros de operación de una turbina PT6A.",
  },
  {
    id: "cl-tcp-wed",
    category: "clase",
    title: "Servicio y Seguridad de Cabina",
    program: "TCP-552",
    date: "2026-09-09",
    start: "08:30",
    end: "11:00",
    docente: "TCP Daniela Requena",
    location: "Maqueta de Cabina",
    modalidad: "Presencial",
    cupos: "18 / 22",
    img: "cabinCrew",
    desc: "Procedimientos de servicio a bordo y coordinación de la tripulación en operación normal.",
  },
  {
    id: "cl-tmd-wed",
    category: "clase",
    title: "Circuitos y Sistemas Eléctricos",
    program: "TMD-552",
    date: "2026-09-09",
    start: "13:30",
    end: "16:00",
    docente: "Prof. Yolanda Piñero",
    location: "Lab. Aviónica",
    modalidad: "Presencial",
    cupos: "20 / 20",
    img: "cockpit",
    desc: "Generación y distribución eléctrica, protecciones y lectura de diagramas de mazo.",
  },
  {
    id: "cl-tma-thu",
    category: "clase",
    title: "Regulaciones RAV 43",
    program: "TMA-552",
    date: "2026-09-10",
    start: "08:00",
    end: "10:00",
    docente: "Ing. Marisela Contreras",
    location: "Aula 3 · Campus",
    modalidad: "Híbrido",
    cupos: "24 / 24",
    img: "hangar",
    desc: "Registros de mantenimiento, aeronavegabilidad continuada y responsabilidad del técnico ante el INAC.",
  },
  {
    id: "cl-dv-fri",
    category: "clase",
    title: "Peso y Balance",
    program: "DV-552",
    date: "2026-09-11",
    start: "09:00",
    end: "11:30",
    docente: "Lic. Gustavo Alcántara",
    location: "Aula Virtual",
    modalidad: "Aula Virtual",
    cupos: "16 / 18",
    img: "planeBlueSky",
    desc: "Cálculo de centro de gravedad, límites operacionales y hoja de carga de despacho.",
  },

  // ---- Simulator / lab sessions --------------------------------------------
  {
    id: "sim-dv-fri",
    category: "simulador",
    title: "Sala de Despacho · Simulación CCO",
    program: "DV-552",
    date: "2026-09-11",
    start: "14:00",
    end: "17:00",
    docente: "Lic. Gustavo Alcántara",
    location: "Sim Bay · Sala de Operaciones",
    modalidad: "Presencial",
    cupos: "12 / 12",
    img: "cockpit",
    desc: "Ejercicio integrado de centro de control de operaciones: planificación de un turno completo de vuelos.",
  },
  {
    id: "sim-tmd",
    category: "simulador",
    title: "Banco de Instrumentos · Práctica",
    program: "TMD-552",
    date: "2026-09-18",
    start: "13:00",
    end: "16:00",
    docente: "Prof. Yolanda Piñero",
    location: "Lab. Aviónica",
    modalidad: "Presencial",
    cupos: "10 / 20",
    img: "cockpit",
    desc: "Calibración y verificación funcional de instrumentos sobre banco de pruebas certificado.",
  },

  // ---- Exams (INAC) --------------------------------------------------------
  {
    id: "exm-tma",
    category: "examen",
    title: "Examen de Licencia TMA · INAC",
    program: "TMA-552",
    date: "2026-09-24",
    start: "08:00",
    end: "12:00",
    docente: "Evaluador INAC",
    location: "Aula Examen · Campus",
    modalidad: "Presencial",
    cupos: "24 inscritos",
    img: "turbine",
    desc: "Evaluación teórica normada para optar a la licencia de Técnico de Mantenimiento Aeronáutico.",
  },
  {
    id: "exm-dv",
    category: "examen",
    title: "Evaluación parcial · Despacho",
    program: "DV-552",
    date: "2026-09-16",
    start: "09:00",
    end: "11:00",
    docente: "Lic. Gustavo Alcántara",
    location: "Aula Virtual",
    modalidad: "Aula Virtual",
    cupos: "16 inscritos",
    img: "planeBlueSky",
    desc: "Corte parcial de meteorología y planificación de vuelo del módulo en curso.",
  },

  // ---- A couple in adjacent weeks so the month view breathes ---------------
  {
    id: "cl-tma-w4",
    category: "clase",
    title: "Sistemas Hidráulicos",
    program: "TMA-552",
    date: "2026-09-22",
    start: "08:00",
    end: "10:30",
    docente: "Ing. Fernando Uzcátegui",
    location: "Hangar Escuela",
    modalidad: "Presencial",
    cupos: "24 / 24",
    img: "turbine",
    desc: "Principios de sistemas hidráulicos, actuadores y detección de fallas en línea.",
  },
  {
    id: "rec-charla",
    category: "recorrido",
    title: "Charla vocacional · Ser TMA",
    program: "",
    date: "2026-09-19",
    start: "16:00",
    end: "17:30",
    docente: "Egresados CIA ALFA 552",
    location: "Auditorio · Campus",
    modalidad: "Híbrido",
    cupos: "Entrada libre",
    img: "cabinCrew",
    desc: "Egresados cuentan cómo es la carrera técnica y el paso del aula al hangar.",
  },
];
