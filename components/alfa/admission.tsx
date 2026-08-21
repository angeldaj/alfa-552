"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const inputClass =
  "h-auto rounded-none border-0 bg-transparent px-0 py-1 text-[15px] text-[var(--ink)] shadow-none focus-visible:ring-0 dark:bg-transparent placeholder:text-[var(--mid)]";

export function Admission() {
  const [f1, setF1] = useState(false);
  const [f2, setF2] = useState(false);
  const [f3, setF3] = useState(false);
  const [f4, setF4] = useState(false);
  const [sent, setSent] = useState(false);

  const all = f1 && f2 && f3 && f4;
  const stat = (ok: boolean) => (ok ? "● CONFIRMADO" : "○ PENDIENTE");

  return (
    <section id="sec-cta" className="border-b border-[var(--hairline)]">
      <div className="alfa-frame grid md:grid-cols-2">
        <div className="flex flex-col justify-center gap-7 px-5 py-[clamp(4.5rem,8vw,7rem)] md:border-r md:border-[var(--hairline)] md:px-12">
        <span className="eyebrow">Admisión · Checklist prevuelo</span>
        <h2
          data-reveal
          className="text-[clamp(40px,5vw,72px)] font-extrabold leading-[0.98] tracking-[-0.035em]"
        >
          Autorizado para{" "}
          <span className="text-[var(--accent-text)]">despegar.</span>
        </h2>
        <p className="max-w-[44ch] text-[16px] leading-relaxed text-[var(--lt)]">
          Completa la lista y un asesor de admisión te contacta en menos de 48
          horas con requisitos, costos y fechas de examen.
        </p>
      </div>

        <div className="flex flex-col justify-center px-5 py-[clamp(4.5rem,8vw,7rem)] md:px-12">
        <div className="flex flex-col">
          <Row n="01" status={stat(f1)} ok={f1}>
            <Label htmlFor="f-name" className="mono text-[10px] tracking-[0.14em] text-[var(--mid)]">
              NOMBRE COMPLETO
            </Label>
            <Input
              id="f-name"
              className={inputClass}
              placeholder="APELLIDOS, NOMBRES"
              onChange={(e) => setF1(e.target.value.trim().length > 2)}
            />
          </Row>

          <Row n="02" status={stat(f2)} ok={f2}>
            <Label htmlFor="f-mail" className="mono text-[10px] tracking-[0.14em] text-[var(--mid)]">
              CORREO ELECTRÓNICO
            </Label>
            <Input
              id="f-mail"
              type="email"
              className={inputClass}
              placeholder="NOMBRE@DOMINIO.COM"
              onChange={(e) => setF2(/.+@.+\..+/.test(e.target.value))}
            />
          </Row>

          <Row n="03" status={stat(f3)} ok={f3}>
            <Label htmlFor="f-tel" className="mono text-[10px] tracking-[0.14em] text-[var(--mid)]">
              TELÉFONO / WHATSAPP
            </Label>
            <Input
              id="f-tel"
              type="tel"
              className={inputClass}
              placeholder="+58 000 000 0000"
              onChange={(e) => setF3(e.target.value.replace(/\D/g, "").length >= 7)}
            />
          </Row>

          <Row n="04" status={stat(f4)} ok={f4}>
            <Label htmlFor="f-prog" className="mono text-[10px] tracking-[0.14em] text-[var(--mid)]">
              PROGRAMA DE INTERÉS
            </Label>
            <Select onValueChange={(v) => setF4(!!v)}>
              <SelectTrigger
                id="f-prog"
                className="h-auto w-full rounded-none border-0 bg-transparent px-0 py-1 text-sm text-[var(--ink)] shadow-none focus-visible:ring-0 dark:bg-transparent data-placeholder:text-[var(--mid)]"
              >
                <SelectValue placeholder="SELECCIONAR PROGRAMA" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)]"
              >
                <SelectItem value="TMA">TMA-552 · MANTENIMIENTO AERONÁUTICO</SelectItem>
                <SelectItem value="TMD">TMD-552 · AVIÓNICA E INSTRUMENTOS</SelectItem>
                <SelectItem value="TCP">TCP-552 · TRIPULANTE DE CABINA</SelectItem>
                <SelectItem value="DV">DV-552 · DESPACHO DE VUELO</SelectItem>
                <SelectItem value="PPA">PPA-552 · PILOTO (LISTA DE ESPERA)</SelectItem>
              </SelectContent>
            </Select>
          </Row>

          <Button
            type="button"
            onClick={() => {
              if (all) setSent(true);
            }}
            className="alfa-submit mono mt-8 flex h-auto items-center justify-between rounded-none px-6 py-5 text-[13px] tracking-[0.14em]"
            style={{
              border: `1px solid ${all || sent ? "var(--accent)" : "var(--line)"}`,
              background: sent ? "var(--accent)" : "transparent",
              color: sent ? "var(--accent-ink)" : "var(--ink)",
              transition:
                "background 0.5s cubic-bezier(0.16,1,0.3,1),color 0.5s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <span>
              {sent
                ? "RECIBIDO · TE CONTACTAMOS EN 48 H"
                : all
                  ? "CHECKLIST COMPLETO · ENVIAR"
                  : "ENVIAR SOLICITUD"}
            </span>
            <span aria-hidden>→</span>
          </Button>

          <a
            href="https://wa.me/580000000000"
            target="_blank"
            rel="noopener"
            className="alfa-cta alfa-cta--ghost mono mt-4 flex items-center justify-between px-6 py-4 text-[12px] tracking-[0.14em] text-[var(--lt)]"
          >
            <span>O ESCRÍBENOS POR WHATSAPP</span>
            <span aria-hidden>↗</span>
          </a>
        </div>
        </div>
      </div>
    </section>
  );
}

function Row({
  n,
  status,
  ok,
  children,
}: {
  n: string;
  status: string;
  ok: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-4 border-b border-[var(--hairline)] py-4 transition-colors focus-within:border-[var(--accent)]">
      <span className="mono text-[12px] text-[var(--mid)]">{n}</span>
      <div className="flex flex-col gap-1.5">{children}</div>
      <span
        className="mono text-right text-[10px] tracking-[0.12em]"
        style={{ color: ok ? "var(--accent-text)" : "var(--mid)" }}
      >
        {status}
      </span>
    </div>
  );
}
