// Fake (rule-based) knowledge engine for the ALFA 552 assistant.
// No network, no LLM: a small intent matcher over the site's real content
// (programas, cohortes/cupos, pensum, admisión). Everything it "answers" is
// derived from the same source files the page renders, so the bot never
// contradicts the site. Spanish, aviation register, zero em-dashes.

import { programs as landingPrograms, cohorts } from "@/components/alfa/data";
import { programs as pensumPrograms, statsFor } from "@/components/alfa/pensum-data";

/** Icon id for a reply's topic. Mapped to a lucide glyph in the widget so the
 *  data layer stays free of React/icon imports. */
export type BotIcon =
  | "greeting"
  | "programas"
  | "cupos"
  | "fechas"
  | "requisitos"
  | "pensum"
  | "duracion"
  | "modalidad"
  | "pilotos"
  | "contacto"
  | "costos"
  | "inac"
  | "thanks"
  | "info";

export type BotReply = {
  /** Body text. Supports line breaks via \n (rendered with whitespace-pre-line). */
  text: string;
  /** Optional follow-up quick questions offered under the reply. */
  chips?: string[];
  /** Topic icon, rendered as a small glyph on the reply. */
  icon?: BotIcon;
};

/** Map a quick-chip label to the icon of the intent it will trigger, so chips
 *  can show a relevant leading glyph without re-running the matcher. */
export function iconForChip(label: string): BotIcon {
  return getBotReply(label).icon ?? "info";
}

/** Lowercase + strip accents so "aviónica" and "avionica" both match. */
function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

const has = (q: string, ...words: string[]) => words.some((w) => q.includes(w));

// ---- Prebuilt answer fragments (derived from real data) --------------------

function answerProgramas(): BotReply {
  const lines = landingPrograms.map((p) => {
    const estado = p.soon ? "en certificación" : p.dur.toLowerCase();
    return `${p.code} · ${p.name} (${estado})`;
  });
  return {
    icon: "programas",
    text:
      "Formamos en cinco programas bajo las Regulaciones Aeronáuticas Venezolanas (INAC · CIAC 552):\n\n" +
      lines.join("\n") +
      "\n\n¿Sobre cuál quieres detalle?",
    chips: ["Requisitos de TMA-552", "Duración de cada programa", "Ver el pensum"],
  };
}

function answerCupos(): BotReply {
  const abiertas = cohorts.filter((c) => c.status !== "CERRADA");
  const lines = abiertas.map(
    (c) => `${c.date} · ${c.prog}: ${c.seats} (${c.status})`,
  );
  return {
    icon: "cupos",
    text:
      "Estado de cupos por cohorte (actualizado):\n\n" +
      lines.join("\n") +
      "\n\nLos cupos se asignan por orden de inscripción. ¿Quieres que un asesor te reserve uno?",
    chips: ["Fechas de ingreso", "Requisitos de admisión", "Hablar con un asesor"],
  };
}

function answerFechas(): BotReply {
  const proximas = cohorts.filter((c) => c.status !== "CERRADA");
  const lines = proximas.map((c) => `· ${c.date} · ${c.prog} (${c.status})`);
  return {
    icon: "fechas",
    text:
      "Próximas fechas de ingreso:\n\n" +
      lines.join("\n") +
      "\n\nCada cohorte abre inscripciones unas ocho semanas antes del inicio.",
    chips: ["¿Hay cupos disponibles?", "Requisitos de admisión"],
  };
}

function answerRequisitos(): BotReply {
  return {
    icon: "requisitos",
    text:
      "Requisitos generales de admisión:\n\n" +
      "· Educación media (secundaria) completa\n" +
      "· Edad mínima: 17 años (18 para Tripulante de Cabina)\n" +
      "· Examen de aptitud técnica o entrevista, según el programa\n" +
      "· Aptitud psicofísica para TCP-552\n\n" +
      "El detalle exacto depende del programa. ¿Cuál te interesa?",
    chips: ["Programas disponibles", "Fechas de ingreso", "Hablar con un asesor"],
  };
}

function answerPensum(): BotReply {
  const tma = pensumPrograms.find((p) => p.code === "TMA-552");
  let detalle = "";
  if (tma) {
    const s = statsFor(tma);
    detalle =
      `Por ejemplo, ${tma.code} tiene ${s.asignaturas} asignaturas en ${s.ciclos} ciclos, ` +
      `${s.horasTotal} horas totales y ${s.practicaPct}% de práctica en hangar.\n\n`;
  }
  return {
    icon: "pensum",
    text:
      "El pensum completo (malla curricular por ciclos, horas de teoría y práctica, y unidades crédito) está en la sección Pensum.\n\n" +
      detalle +
      "Ábrela en /pensum para ver cada programa a detalle.",
    chips: ["Duración de cada programa", "Requisitos de admisión"],
  };
}

function answerDuracion(): BotReply {
  const lines = landingPrograms.map(
    (p) => `${p.code} · ${p.soon ? "en certificación" : p.dur.toLowerCase()}`,
  );
  return {
    icon: "duracion",
    text: "Duración de cada programa:\n\n" + lines.join("\n"),
    chips: ["¿Cuál es presencial?", "Ver el pensum"],
  };
}

function answerModalidad(): BotReply {
  const lines = landingPrograms.map((p) => `${p.code} · ${p.mode}`);
  return {
    icon: "modalidad",
    text: "Modalidad de cada programa:\n\n" + lines.join("\n"),
    chips: ["Fechas de ingreso", "Requisitos de admisión"],
  };
}

function answerPilotos(): BotReply {
  return {
    icon: "pilotos",
    text:
      "El programa de formación de pilotos (PPA-552) está en proceso de certificación ante el INAC. " +
      "La apertura estimada es 2027 y la lista de espera ya está abierta. Podemos anotarte para avisarte apenas se certifique.",
    chips: ["Preinscribirme para pilotos", "Otros programas disponibles"],
  };
}

function answerContacto(): BotReply {
  return {
    icon: "contacto",
    text:
      "Puedes escribirnos por WhatsApp o dejar tus datos en el checklist de admisión al final de la página. " +
      "Un asesor te contacta en menos de 48 horas con requisitos, costos y fechas de examen. Estamos en Caracas, Venezuela.",
    chips: ["Requisitos de admisión", "Fechas de ingreso"],
  };
}

function answerCostos(): BotReply {
  return {
    icon: "costos",
    text:
      "Los costos varían por programa y se ajustan cada cohorte, así que preferimos dártelos exactos y al día. " +
      "Déjanos tus datos en el checklist de admisión o escríbenos por WhatsApp y un asesor te envía el plan de pago del programa que elijas.",
    chips: ["Programas disponibles", "Hablar con un asesor"],
  };
}

function answerInac(): BotReply {
  return {
    icon: "inac",
    text:
      "CIA ALFA 552 es un Centro de Instrucción Aeronáutica certificado por el INAC (Instituto Nacional de Aeronáutica Civil) bajo el código CIAC 552, " +
      "fundado en 2011 y con más de 1.240 egresados. Todas nuestras licencias son emitidas conforme a las Regulaciones Aeronáuticas Venezolanas.",
    chips: ["Programas disponibles", "Ver el pensum"],
  };
}

/** Try to detect a specific program mentioned by code or keyword. */
function answerProgramaEspecifico(q: string): BotReply | null {
  const map: { keys: string[]; code: string }[] = [
    { keys: ["tma", "mantenimiento", "motor", "turbina", "celula"], code: "TMA-552" },
    { keys: ["tmd", "avionica", "instrumento", "electric"], code: "TMD-552" },
    { keys: ["tcp", "cabina", "tripulante", "azafat", "aeromoza"], code: "TCP-552" },
    { keys: ["dv", "despacho", "despachador"], code: "DV-552" },
  ];
  for (const m of map) {
    if (has(q, ...m.keys)) {
      const p = landingPrograms.find((x) => x.code === m.code);
      if (!p) continue;
      return {
        icon: m.code === "PPA-552" ? "pilotos" : "programas",
        text:
          `${p.code} · ${p.name}\n\n` +
          `· Duración: ${p.dur.toLowerCase()}\n` +
          `· Modalidad: ${p.mode}\n` +
          `· Requisitos: ${p.req}\n` +
          `· Salida profesional: ${p.out}`,
        chips: ["¿Hay cupos disponibles?", "Fechas de ingreso", "Ver el pensum"],
      };
    }
  }
  return null;
}

// ---- Public API ------------------------------------------------------------

export const GREETING: BotReply = {
  icon: "greeting",
  text:
    "Torre de control ALFA 552 a la escucha. Soy el asistente de la escuela y puedo orientarte sobre programas, pensum, fechas de ingreso y cupos. ¿Qué necesitas saber?",
  chips: [
    "¿Qué programas ofrecen?",
    "¿Hay cupos disponibles?",
    "Fechas de ingreso",
    "Requisitos de admisión",
  ],
};

export function getBotReply(input: string): BotReply {
  const q = norm(input);

  if (!q) return GREETING;

  // Greetings
  if (has(q, "hola", "buenas", "buenos dias", "buenas tardes", "saludos", "hey"))
    return GREETING;

  if (has(q, "gracias", "genial", "perfecto", "ok"))
    return {
      icon: "thanks",
      text: "A la orden. Si quieres, un asesor puede continuar contigo con datos exactos y al día. ¿Te interesa?",
      chips: ["Hablar con un asesor", "Ver más programas"],
    };

  // Cupos / disponibilidad
  if (has(q, "cupo", "cupos", "disponib", "vacante", "lugar", "puesto", "quedan"))
    return answerCupos();

  // Fechas / ingreso / cohortes
  if (has(q, "fecha", "ingreso", "inicio", "empiez", "comienz", "cohorte", "cuando", "inscrip"))
    return answerFechas();

  // Requisitos / admisión
  if (has(q, "requisit", "admis", "necesito", "hace falta", "pedir", "aptitud"))
    return answerRequisitos();

  // Pensum / malla / materias
  if (has(q, "pensum", "malla", "materia", "asignatura", "curricul", "credito", "horas", "plan de estudio"))
    return answerPensum();

  // Duración
  if (has(q, "duracion", "dura", "cuanto tiempo", "meses", "anos", "años", "cuanto tarda"))
    return answerDuracion();

  // Modalidad
  if (has(q, "modalidad", "presencial", "virtual", "online", "a distancia", "horario", "turno"))
    return answerModalidad();

  // Costos
  if (has(q, "costo", "precio", "cuesta", "pago", "mensualidad", "arancel", "cuanto vale"))
    return answerCostos();

  // Pilotos
  if (has(q, "piloto", "ppa", "volar", "licencia de piloto"))
    return answerPilotos();

  // INAC / certificación
  if (has(q, "inac", "certific", "aval", "reconoc", "licencia", "titulo", "egresad", "quienes son"))
    return answerInac();

  // Contacto / ubicación
  if (has(q, "contact", "asesor", "whatsapp", "telefono", "correo", "ubicacion", "donde", "direccion", "sede", "campus"))
    return answerContacto();

  // Specific program by name/code
  const prog = answerProgramaEspecifico(q);
  if (prog) return prog;

  // Programas (general)
  if (has(q, "programa", "carrera", "curso", "estudiar", "ofrecen", "opciones", "que puedo"))
    return answerProgramas();

  // Fallback
  return {
    icon: "info",
    text:
      "Todavía no tengo eso a mano, pero puedo ayudarte con programas, pensum, fechas de ingreso, cupos y requisitos. " +
      "Si es algo más específico, un asesor de admisión lo resuelve contigo.",
    chips: [
      "¿Qué programas ofrecen?",
      "¿Hay cupos disponibles?",
      "Requisitos de admisión",
      "Hablar con un asesor",
    ],
  };
}
