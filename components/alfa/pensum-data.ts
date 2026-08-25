// Pensum / malla curricular for CIA ALFA 552 (/pensum).
// Illustrative but structured for the real thing: each program is broken into
// cycles (ciclos), each cycle into subjects (asignaturas) with theory + shop
// hours, credit units (UC) and a pedagogical type. Totals and the theory/shop
// distribution are DERIVED from the courses in the view, so this file stays the
// single source of truth. Gold is reserved for hands-on practice (the hours in
// the hangar), matching the single-chroma system of the rest of the site.

import { IMG } from "./images";

/** Pedagogical nature of a subject. Drives its neutral-ladder tone; only
 *  `practica` rides the gold accent (the hours that matter most). */
export type CourseType =
  | "teorica"
  | "taller"
  | "simulador"
  | "practica"
  | "examen";

export type PensumCourse = {
  code: string;
  name: string;
  /** Classroom hours. */
  teoria: number;
  /** Shop / hangar / lab hours. */
  practica: number;
  /** Unidades crédito. */
  uc: number;
  type: CourseType;
  /** Signature subject of the program (shown with a gold marker). */
  insignia?: boolean;
};

export type Cycle = {
  /** Two-digit ordinal, e.g. "01". */
  n: string;
  name: string;
  /** Month span, e.g. "Meses 1-6". */
  meses: string;
  /** One line on what the cycle builds. */
  foco: string;
  courses: PensumCourse[];
};

export type PensumProgram = {
  code: string;
  name: string;
  /** Short label for the selector, e.g. "Mantenimiento". */
  short: string;
  /** One-line professional outcome. */
  salida: string;
  licencia: string;
  duracion: string;
  /** Number of months as an integer, for the bento count. */
  meses: number;
  modalidad: string;
  turnos: string;
  /** Signature equipment / platform the program trains on. */
  equipo: string;
  campus: string;
  img: keyof typeof IMG;
  /** Editorial "materia insignia" band. */
  insignia: {
    courseCode: string;
    title: string;
    body: string;
    img: keyof typeof IMG;
  };
  ciclos: Cycle[];
  /** Program not yet certified: shows a waitlist panel instead of a malla. */
  soon?: boolean;
};

export const TYPE_META: Record<
  CourseType,
  { label: string; code: string; priority: boolean }
> = {
  teorica: { label: "Teoría", code: "TEO", priority: false },
  taller: { label: "Taller", code: "TAL", priority: false },
  simulador: { label: "Simulador", code: "SIM", priority: false },
  practica: { label: "Práctica", code: "PRA", priority: true },
  examen: { label: "Examen INAC", code: "EXM", priority: false },
};

/** Ordered for the distribution bar + legend. */
export const TYPE_ORDER: CourseType[] = [
  "teorica",
  "taller",
  "simulador",
  "practica",
  "examen",
];

export const programs: PensumProgram[] = [
  // ==========================================================================
  {
    code: "TMA-552",
    name: "Técnico de Mantenimiento Aeronáutico",
    short: "Mantenimiento",
    salida: "Talleres OMAC, líneas aéreas y aviación general.",
    licencia: "Licencia TMA · INAC",
    duracion: "30 meses",
    meses: 30,
    modalidad: "Presencial · hangar y aula",
    turnos: "Mañana o tarde",
    equipo: "Turbina PT6A · King Air · banco de sistemas",
    campus: "Hangar Escuela · Maiquetía",
    img: "turbine",
    insignia: {
      courseCode: "TMA-502",
      title: "Overhaul mayor de una turbina PT6A",
      body: "El corte que define la carrera. Desmontaje, inspección boroscópica, medición de tolerancias y el criterio para decidir si una sección vuela o se retira. Se practica sobre motor real, con la documentación del fabricante abierta.",
      img: "hangar",
    },
    ciclos: [
      {
        n: "01",
        name: "Fundamentos aeronáuticos",
        meses: "Meses 1-6",
        foco: "La base física, matemática y normativa que sostiene todo lo demás.",
        courses: [
          { code: "TMA-101", name: "Matemática aplicada a la aviación", teoria: 64, practica: 16, uc: 4, type: "teorica" },
          { code: "TMA-102", name: "Física de vuelo", teoria: 56, practica: 24, uc: 4, type: "teorica" },
          { code: "TMA-103", name: "Dibujo técnico y planos", teoria: 32, practica: 48, uc: 3, type: "taller" },
          { code: "TMA-104", name: "Inglés técnico aeronáutico I", teoria: 48, practica: 16, uc: 3, type: "teorica" },
          { code: "TMA-105", name: "Ciencia de materiales aeronáuticos", teoria: 40, practica: 40, uc: 4, type: "taller" },
          { code: "TMA-106", name: "Seguridad operacional y factores humanos", teoria: 48, practica: 0, uc: 3, type: "teorica" },
        ],
      },
      {
        n: "02",
        name: "Aeronave y estructuras",
        meses: "Meses 7-12",
        foco: "La célula por dentro: cómo está hecha, cómo se inspecciona, cómo se cuida.",
        courses: [
          { code: "TMA-201", name: "Estructuras de aeronaves", teoria: 48, practica: 64, uc: 5, type: "taller" },
          { code: "TMA-202", name: "Sistemas hidráulicos y neumáticos", teoria: 40, practica: 56, uc: 4, type: "taller" },
          { code: "TMA-203", name: "Corrosión y ensayos no destructivos", teoria: 32, practica: 64, uc: 4, type: "taller" },
          { code: "TMA-204", name: "Herramientas y prácticas de taller", teoria: 16, practica: 80, uc: 4, type: "practica" },
          { code: "TMA-205", name: "Regulaciones RAV 43 y 65", teoria: 56, practica: 0, uc: 3, type: "teorica" },
          { code: "TMA-206", name: "Inglés técnico aeronáutico II", teoria: 32, practica: 24, uc: 2, type: "teorica" },
        ],
      },
      {
        n: "03",
        name: "Plantas de poder",
        meses: "Meses 13-18",
        foco: "Del pistón a la turbina. El corazón de la aeronave y sus parámetros.",
        courses: [
          { code: "TMA-301", name: "Motores alternativos de pistón", teoria: 48, practica: 72, uc: 5, type: "taller" },
          { code: "TMA-302", name: "Motores de turbina", teoria: 56, practica: 72, uc: 6, type: "taller", insignia: true },
          { code: "TMA-303", name: "Sistemas de combustible y lubricación", teoria: 40, practica: 48, uc: 4, type: "taller" },
          { code: "TMA-304", name: "Hélices y sistemas de paso", teoria: 32, practica: 40, uc: 3, type: "taller" },
          { code: "TMA-305", name: "Instrumentos de motor", teoria: 32, practica: 40, uc: 3, type: "taller" },
        ],
      },
      {
        n: "04",
        name: "Sistemas y aviónica",
        meses: "Meses 19-24",
        foco: "Electricidad, aviónica y el arte de provocar y hallar una falla.",
        courses: [
          { code: "TMA-401", name: "Sistemas eléctricos de aeronave", teoria: 48, practica: 64, uc: 5, type: "taller" },
          { code: "TMA-402", name: "Aviónica y cabina de cristal", teoria: 40, practica: 48, uc: 4, type: "taller" },
          { code: "TMA-403", name: "Sistemas de hielo, lluvia y presión", teoria: 32, practica: 40, uc: 3, type: "taller" },
          { code: "TMA-404", name: "Peso, balance y rigging", teoria: 24, practica: 56, uc: 3, type: "practica" },
          { code: "TMA-405", name: "Simulación de fallas en banco", teoria: 16, practica: 64, uc: 3, type: "simulador" },
          { code: "TMA-406", name: "Registros y aeronavegabilidad continuada", teoria: 48, practica: 16, uc: 3, type: "teorica" },
        ],
      },
      {
        n: "05",
        name: "Línea y licenciamiento",
        meses: "Meses 25-30",
        foco: "Del aula al hangar de verdad, y de ahí al examen del INAC.",
        courses: [
          { code: "TMA-501", name: "Mantenimiento en línea", teoria: 24, practica: 96, uc: 5, type: "practica" },
          { code: "TMA-502", name: "Mantenimiento mayor y overhaul", teoria: 24, practica: 96, uc: 5, type: "practica", insignia: true },
          { code: "TMA-503", name: "Práctica profesional en hangar", teoria: 0, practica: 160, uc: 6, type: "practica", insignia: true },
          { code: "TMA-504", name: "Preparación para el examen de licencia", teoria: 40, practica: 40, uc: 3, type: "examen" },
          { code: "TMA-505", name: "Evaluación de licencia TMA · INAC", teoria: 8, practica: 0, uc: 2, type: "examen" },
        ],
      },
    ],
  },

  // ==========================================================================
  {
    code: "TMD-552",
    name: "Aviónica e Instrumentos",
    short: "Aviónica",
    salida: "Aviónica de línea y de taller certificado.",
    licencia: "Licencia TMD · INAC",
    duracion: "24 meses",
    meses: 24,
    modalidad: "Presencial · laboratorio de bancos",
    turnos: "Mañana o tarde",
    equipo: "Banco de instrumentos · glass cockpit · radar",
    campus: "Laboratorio de Aviónica · Campus Caracas",
    img: "cockpit",
    insignia: {
      courseCode: "TMD-305",
      title: "De la aguja al vidrio: la cabina de cristal",
      body: "El salto que vive la aviación hoy. Arquitectura de las pantallas, buses de datos, degradación controlada y qué hacer cuando la información en cabina no coincide. Se trabaja sobre un banco de glass cockpit funcional.",
      img: "cockpit",
    },
    ciclos: [
      {
        n: "01",
        name: "Fundamentos eléctricos",
        meses: "Meses 1-6",
        foco: "Del electrón al diagrama. La base que separa al aviónico del electricista.",
        courses: [
          { code: "TMD-101", name: "Matemática y física aplicada", teoria: 56, practica: 24, uc: 4, type: "teorica" },
          { code: "TMD-102", name: "Electricidad y electrónica básica", teoria: 40, practica: 56, uc: 5, type: "taller" },
          { code: "TMD-103", name: "Dibujo y diagramas eléctricos", teoria: 24, practica: 40, uc: 3, type: "taller" },
          { code: "TMD-104", name: "Inglés técnico aeronáutico I", teoria: 48, practica: 16, uc: 3, type: "teorica" },
          { code: "TMD-105", name: "Regulaciones RAV y factores humanos", teoria: 48, practica: 0, uc: 3, type: "teorica" },
        ],
      },
      {
        n: "02",
        name: "Sistemas eléctricos",
        meses: "Meses 7-12",
        foco: "Generación, distribución e instrumentos sobre banco de pruebas.",
        courses: [
          { code: "TMD-201", name: "Sistemas eléctricos de aeronave", teoria: 48, practica: 64, uc: 5, type: "taller" },
          { code: "TMD-202", name: "Electrónica digital y microprocesadores", teoria: 40, practica: 48, uc: 4, type: "taller" },
          { code: "TMD-203", name: "Instrumentos de vuelo y motor", teoria: 40, practica: 48, uc: 4, type: "taller" },
          { code: "TMD-204", name: "Banco de instrumentos · práctica", teoria: 16, practica: 72, uc: 4, type: "practica" },
          { code: "TMD-205", name: "Inglés técnico aeronáutico II", teoria: 32, practica: 24, uc: 2, type: "teorica" },
        ],
      },
      {
        n: "03",
        name: "Comunicación y navegación",
        meses: "Meses 13-18",
        foco: "Todo lo que la aeronave usa para hablar, verse y encontrar su ruta.",
        courses: [
          { code: "TMD-301", name: "Sistemas de comunicación (COM)", teoria: 40, practica: 48, uc: 4, type: "taller" },
          { code: "TMD-302", name: "Sistemas de navegación (NAV)", teoria: 40, practica: 48, uc: 4, type: "taller" },
          { code: "TMD-303", name: "Radar y sistemas de vigilancia", teoria: 32, practica: 40, uc: 3, type: "taller" },
          { code: "TMD-304", name: "Piloto automático y control de vuelo", teoria: 32, practica: 48, uc: 4, type: "taller" },
          { code: "TMD-305", name: "Cabina de cristal (glass cockpit)", teoria: 24, practica: 56, uc: 4, type: "taller", insignia: true },
        ],
      },
      {
        n: "04",
        name: "Integración y licencia",
        meses: "Meses 19-24",
        foco: "Diagnóstico integral, taller real y examen del INAC.",
        courses: [
          { code: "TMD-401", name: "Diagnóstico y localización de fallas", teoria: 24, practica: 72, uc: 5, type: "practica", insignia: true },
          { code: "TMD-402", name: "Simulación de sistemas integrados", teoria: 16, practica: 64, uc: 3, type: "simulador" },
          { code: "TMD-403", name: "Práctica profesional en taller aviónico", teoria: 0, practica: 140, uc: 6, type: "practica", insignia: true },
          { code: "TMD-404", name: "Registros y aeronavegabilidad aviónica", teoria: 40, practica: 16, uc: 3, type: "teorica" },
          { code: "TMD-405", name: "Evaluación de licencia TMD · INAC", teoria: 8, practica: 0, uc: 2, type: "examen" },
        ],
      },
    ],
  },

  // ==========================================================================
  {
    code: "TCP-552",
    name: "Tripulante de Cabina",
    short: "Cabina",
    salida: "Tripulante de cabina en aerolíneas comerciales.",
    licencia: "Licencia TCP · INAC",
    duracion: "12 meses",
    meses: 12,
    modalidad: "Presencial · aula y maqueta de cabina",
    turnos: "Mañana o tarde",
    equipo: "Maqueta de cabina · toboganes · equipo de emergencia",
    campus: "Campus Caracas",
    img: "cabinCrew",
    insignia: {
      courseCode: "TCP-204",
      title: "Noventa segundos: supervivencia y evacuación",
      body: "El estándar que la industria no negocia. Evacuación completa de la aeronave en menos de noventa segundos, con humo, oscuridad y pasajeros que no colaboran. Se entrena hasta que deja de pensarse y empieza a reaccionarse.",
      img: "cabinCrew",
    },
    ciclos: [
      {
        n: "01",
        name: "Fundamentos del servicio",
        meses: "Meses 1-4",
        foco: "La cara visible de la aerolínea: trato, idioma e imagen.",
        courses: [
          { code: "TCP-101", name: "Introducción a la aviación comercial", teoria: 40, practica: 8, uc: 3, type: "teorica" },
          { code: "TCP-102", name: "Servicio y atención a bordo", teoria: 32, practica: 40, uc: 3, type: "taller" },
          { code: "TCP-103", name: "Inglés para tripulación I", teoria: 48, practica: 16, uc: 3, type: "teorica" },
          { code: "TCP-104", name: "Protocolo, imagen y comunicación", teoria: 24, practica: 24, uc: 2, type: "taller" },
          { code: "TCP-105", name: "Psicología del pasajero", teoria: 32, practica: 8, uc: 2, type: "teorica" },
        ],
      },
      {
        n: "02",
        name: "Seguridad y emergencias",
        meses: "Meses 5-8",
        foco: "Lo que de verdad justifica la tripulación: que todos bajen del avión.",
        courses: [
          { code: "TCP-201", name: "Seguridad de cabina y procedimientos", teoria: 40, practica: 48, uc: 4, type: "taller" },
          { code: "TCP-202", name: "Primeros auxilios aeronáuticos", teoria: 32, practica: 40, uc: 3, type: "taller" },
          { code: "TCP-203", name: "Mercancías peligrosas (DGR)", teoria: 32, practica: 8, uc: 2, type: "teorica" },
          { code: "TCP-204", name: "Supervivencia y evacuación", teoria: 16, practica: 56, uc: 3, type: "practica", insignia: true },
          { code: "TCP-205", name: "Extinción de incendios y humo", teoria: 16, practica: 40, uc: 3, type: "simulador" },
        ],
      },
      {
        n: "03",
        name: "Operación y licencia",
        meses: "Meses 9-12",
        foco: "La maqueta, la aerolínea real y el examen del INAC.",
        courses: [
          { code: "TCP-301", name: "Maqueta de cabina · práctica integrada", teoria: 8, practica: 72, uc: 4, type: "simulador", insignia: true },
          { code: "TCP-302", name: "CRM y coordinación de tripulación", teoria: 32, practica: 24, uc: 3, type: "teorica" },
          { code: "TCP-303", name: "Inglés para tripulación II", teoria: 32, practica: 24, uc: 2, type: "teorica" },
          { code: "TCP-304", name: "Práctica profesional en aerolínea", teoria: 0, practica: 120, uc: 5, type: "practica", insignia: true },
          { code: "TCP-305", name: "Evaluación de licencia TCP · INAC", teoria: 8, practica: 0, uc: 2, type: "examen" },
        ],
      },
    ],
  },

  // ==========================================================================
  {
    code: "DV-552",
    name: "Despacho de Vuelo",
    short: "Despacho",
    salida: "Centros de control de operaciones (CCO) de aerolíneas.",
    licencia: "Licencia DV · INAC",
    duracion: "12 meses",
    meses: 12,
    modalidad: "Presencial + virtual síncrono",
    turnos: "Mañana",
    equipo: "Sala de operaciones · software de planificación",
    campus: "Sala de Operaciones · Campus Caracas",
    img: "planeBlueSky",
    insignia: {
      courseCode: "DV-301",
      title: "El turno completo en el centro de operaciones",
      body: "El despachador firma el vuelo antes que el capitán. Aquí se planifica un turno entero de operación: combustible, rutas, meteorología y las decisiones que se toman cuando el plan se rompe a mitad de la jornada.",
      img: "cockpit",
    },
    ciclos: [
      {
        n: "01",
        name: "Bases operacionales",
        meses: "Meses 1-4",
        foco: "El lenguaje del despacho: clima, navegación, norma e idioma.",
        courses: [
          { code: "DV-101", name: "Introducción al despacho de vuelo", teoria: 40, practica: 8, uc: 3, type: "teorica" },
          { code: "DV-102", name: "Meteorología aeronáutica", teoria: 56, practica: 24, uc: 4, type: "teorica" },
          { code: "DV-103", name: "Navegación aérea", teoria: 48, practica: 24, uc: 4, type: "teorica" },
          { code: "DV-104", name: "Inglés aeronáutico OACI nivel 4", teoria: 48, practica: 32, uc: 4, type: "teorica" },
          { code: "DV-105", name: "Reglamentación y documentación de vuelo", teoria: 40, practica: 8, uc: 3, type: "teorica" },
        ],
      },
      {
        n: "02",
        name: "Planificación",
        meses: "Meses 5-8",
        foco: "La matemática del despacho: performance, peso, ruta y combustible.",
        courses: [
          { code: "DV-201", name: "Performance de aeronaves", teoria: 40, practica: 40, uc: 4, type: "taller" },
          { code: "DV-202", name: "Peso y balance operacional", teoria: 32, practica: 48, uc: 4, type: "taller" },
          { code: "DV-203", name: "Planificación de ruta y combustible", teoria: 32, practica: 56, uc: 4, type: "taller", insignia: true },
          { code: "DV-204", name: "Comunicaciones y servicios ATS", teoria: 32, practica: 24, uc: 3, type: "teorica" },
          { code: "DV-205", name: "Mercancías peligrosas (DGR)", teoria: 32, practica: 8, uc: 2, type: "teorica" },
        ],
      },
      {
        n: "03",
        name: "Sala de operaciones",
        meses: "Meses 9-12",
        foco: "Todo junto, en tiempo real, bajo presión, y el examen del INAC.",
        courses: [
          { code: "DV-301", name: "Centro de control de operaciones (CCO)", teoria: 24, practica: 72, uc: 5, type: "simulador", insignia: true },
          { code: "DV-302", name: "Gestión de irregularidades y contingencias", teoria: 24, practica: 40, uc: 3, type: "simulador" },
          { code: "DV-303", name: "Simulación integrada de turno", teoria: 8, practica: 72, uc: 4, type: "simulador", insignia: true },
          { code: "DV-304", name: "Evaluación de licencia DV · INAC", teoria: 8, practica: 0, uc: 2, type: "examen" },
        ],
      },
    ],
  },

  // ==========================================================================
  {
    code: "PPA-552",
    name: "Formación de Pilotos",
    short: "Pilotos",
    salida: "Piloto privado y comercial. Apertura estimada 2027.",
    licencia: "Licencia PPA · en certificación",
    duracion: "En certificación",
    meses: 0,
    modalidad: "Programa en proceso de certificación ante el INAC",
    turnos: "Por definir",
    equipo: "Flota escuela · simulador de vuelo",
    campus: "Por definir",
    img: "airlinerSky",
    insignia: {
      courseCode: "PPA-552",
      title: "La malla se publica al certificar",
      body: "El programa de pilotos está en proceso de certificación ante el INAC. La malla completa, con horas de vuelo y simulador, se publica en cuanto obtengamos la aprobación. La lista de espera 2027 ya está abierta.",
      img: "airlinerSky",
    },
    ciclos: [],
    soon: true,
  },
];

export const PROGRAM_MAP: Record<string, PensumProgram> = programs.reduce(
  (acc, p) => ({ ...acc, [p.code]: p }),
  {} as Record<string, PensumProgram>,
);

// ---- Aggregate helpers (used by both the server page and the client view) ---
export type ProgramStats = {
  horasTeoria: number;
  horasPractica: number;
  horasTotal: number;
  uc: number;
  asignaturas: number;
  ciclos: number;
  practicaPct: number;
  /** Hours per type, in TYPE_ORDER, for the distribution bar. */
  porTipo: { type: CourseType; horas: number }[];
};

export function statsFor(p: PensumProgram): ProgramStats {
  let horasTeoria = 0;
  let horasPractica = 0;
  let uc = 0;
  let asignaturas = 0;
  const tipo = { teorica: 0, taller: 0, simulador: 0, practica: 0, examen: 0 };
  for (const c of p.ciclos) {
    for (const s of c.courses) {
      horasTeoria += s.teoria;
      horasPractica += s.practica;
      uc += s.uc;
      asignaturas += 1;
      tipo[s.type] += s.teoria + s.practica;
    }
  }
  const horasTotal = horasTeoria + horasPractica;
  return {
    horasTeoria,
    horasPractica,
    horasTotal,
    uc,
    asignaturas,
    ciclos: p.ciclos.length,
    practicaPct: horasTotal ? Math.round((horasPractica / horasTotal) * 100) : 0,
    porTipo: TYPE_ORDER.map((type) => ({ type, horas: tipo[type] })),
  };
}
