// Content for the CIA ALFA 552 landing — ported from the Claude Design source.

import { IMG } from "./images";

export type Program = {
  code: string;
  name: string;
  dur: string;
  mode: string;
  req: string;
  out: string;
  fig: string;
  img: string;
  soon: boolean;
};

export const programs: Program[] = [
  {
    code: "TMA-552",
    name: "Técnico de Mantenimiento Aeronáutico",
    dur: "30 MESES",
    mode: "Presencial · hangar y aula, turno mañana o tarde",
    req: "Secundaria completa · 17 años mín. · Examen de aptitud técnica",
    out: "Talleres OMAC, líneas aéreas, aviación general. Licencia TMA (INAC).",
    fig: "Célula y motores",
    img: IMG.turbine,
    soon: false,
  },
  {
    code: "TMD-552",
    name: "Aviónica e Instrumentos",
    dur: "24 MESES",
    mode: "Presencial · laboratorio de bancos de instrumentos",
    req: "Secundaria completa · 17 años mín. · Examen de aptitud técnica",
    out: "Aviónica de línea y taller. Licencia TMD (INAC).",
    fig: "Panel de instrumentos",
    img: IMG.cockpit,
    soon: false,
  },
  {
    code: "TCP-552",
    name: "Tripulante de Cabina",
    dur: "12 MESES",
    mode: "Presencial · aula y maqueta de cabina",
    req: "Secundaria completa · 18 años mín. · Aptitud psicofísica",
    out: "Tripulante de cabina en aerolíneas comerciales. Licencia TCP (INAC).",
    fig: "Cabina de pasajeros",
    img: IMG.cabinCrew,
    soon: false,
  },
  {
    code: "DV-552",
    name: "Despacho de Vuelo",
    dur: "12 MESES",
    mode: "Presencial + virtual síncrono",
    req: "Secundaria completa · Inglés básico · Entrevista",
    out: "Centros de control de operaciones (CCO) de aerolíneas. Licencia DV.",
    fig: "Plan de vuelo",
    img: IMG.planeBlueSky,
    soon: false,
  },
  {
    code: "PPA-552",
    name: "Formación de Pilotos",
    dur: "EN CERTIFICACIÓN",
    mode: "Programa en proceso de certificación ante el INAC",
    req: "Preinscripción abierta · lista de espera 2027",
    out: "Piloto privado y comercial. Apertura estimada 2027.",
    fig: "Fuselaje en plataforma",
    img: IMG.airlinerSky,
    soon: true,
  },
];

export type Value = { code: string; title: string; body: string };

export const values: Value[] = [
  {
    code: "V-01",
    title: "Seguridad Operacional como Dogma",
    body: "La seguridad no es solo una prioridad, es nuestro principio rector.",
  },
  {
    code: "V-02",
    title: "Excelencia Académica y Tecnológica",
    body: "Nos comprometemos con una formación de alto rendimiento.",
  },
  {
    code: "V-03",
    title: "Integridad y Disciplina Aeronáutica",
    body: "Un carácter inquebrantable basado en la honestidad, la transparencia y el respeto absoluto a la normativa.",
  },
  {
    code: "V-04",
    title: "Profesionalismo y Vocación de Servicio",
    body: "Una ética laboral ejemplar y una actitud de servicio de alta calidad.",
  },
  {
    code: "V-05",
    title: "Evolución e Innovación Continua",
    body: "La aviación es dinámica; nosotros también.",
  },
];

export type Cohort = {
  id: string;
  date: string;
  prog: string;
  seats: string;
  status: string;
  stColor: string;
  dateColor: string;
};

export const cohorts: Cohort[] = [
  { id: "C-26A", date: "09 MAR 26", prog: "TMA · TMD", seats: "0 / 24", status: "CERRADA", stColor: "var(--mid)", dateColor: "var(--mid)" },
  { id: "C-26B", date: "07 SEP 26", prog: "TMA · CÉLULA Y MOTORES", seats: "5 / 24", status: "ÚLTIMOS CUPOS", stColor: "var(--accent)", dateColor: "var(--ink)" },
  { id: "C-26C", date: "02 NOV 26", prog: "DV · DESPACHO DE VUELO", seats: "14 / 18", status: "ABIERTA", stColor: "var(--lt)", dateColor: "var(--ink)" },
  { id: "C-27A", date: "11 ENE 27", prog: "TMA · TMD", seats: "24 / 24", status: "ABIERTA", stColor: "var(--lt)", dateColor: "var(--ink)" },
  { id: "C-27B", date: "15 MAR 27", prog: "TMD · AVIÓNICA", seats: "20 / 20", status: "ABIERTA", stColor: "var(--lt)", dateColor: "var(--ink)" },
  { id: "C-27C", date: "JUL 27 (EST.)", prog: "PPA · PILOTOS, APERTURA", seats: "LISTA DE ESPERA", status: "PREINSCRIPCIÓN", stColor: "var(--accent)", dateColor: "var(--accent)" },
];

export type Post = { cat: string; date: string; title: string; lede: string; img: string };

export const posts: Post[] = [
  {
    cat: "MANTENIMIENTO",
    date: "12 AGO 2026",
    title: "Dentro del overhaul de un PT6A",
    lede: "Qué pasa cuando una turbina entra al taller: desmontaje, inspección boroscópica y los límites de tolerancia que deciden si vuela.",
    img: IMG.turbine,
  },
  {
    cat: "CERTIFICACIÓN",
    date: "28 JUL 2026",
    title: "Qué evalúa el INAC en el examen TMA",
    lede: "Estructura del examen de licencia, temarios normados y cómo preparamos a cada cohorte para rendirlo a la primera.",
    img: IMG.hangar,
  },
  {
    cat: "OPERACIONES",
    date: "10 JUL 2026",
    title: "Despacho de vuelo: el trabajo que no se ve",
    lede: "Combustible, peso y balance, meteorología. El despachador firma antes que el capitán. Así se forma ese criterio.",
    img: IMG.cockpit,
  },
];
