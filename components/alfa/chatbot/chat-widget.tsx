"use client";

// Global floating assistant for CIA ALFA 552.
// A fake (rule-based) chatbot that answers basic questions about programs,
// pensum, fechas de ingreso and cupos. Mounted once in the root layout so it
// rides above every route. Built on the shadcn base Message + MessageScroller
// primitives, restyled to the site's "cinematic aviation prestige" system
// (dark, single gold accent, sharp edges, IBM Plex Mono technical labels).
// Motion drives the launcher, the spring panel open/close, per-topic avatars
// and every message + chip entry.

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Plane,
  X,
  ArrowUp,
  Radio,
  LayoutGrid,
  Users,
  CalendarDays,
  ClipboardCheck,
  BookOpen,
  Clock,
  Building2,
  Phone,
  Wallet,
  ShieldCheck,
  Check,
  Info,
} from "lucide-react";

import { Message, MessageAvatar, MessageContent } from "@/components/ui/message";
import {
  MessageScroller,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import {
  getBotReply,
  GREETING,
  iconForChip,
  type BotIcon,
  type BotReply,
} from "./knowledge";

type IconCmp = React.ComponentType<{ className?: string; strokeWidth?: number }>;

// Data-layer icon ids resolved to real glyphs here (keeps knowledge.ts import-free).
const ICONS: Record<BotIcon, IconCmp> = {
  greeting: Radio,
  programas: LayoutGrid,
  cupos: Users,
  fechas: CalendarDays,
  requisitos: ClipboardCheck,
  pensum: BookOpen,
  duracion: Clock,
  modalidad: Building2,
  pilotos: Plane,
  contacto: Phone,
  costos: Wallet,
  inac: ShieldCheck,
  thanks: Check,
  info: Info,
};

type ChatMessage = {
  id: string;
  role: "user" | "bot";
  text: string;
  chips?: string[];
  icon?: BotIcon;
};

// Deterministic id generator (no Math.random / Date.now churn in render).
let seq = 0;
const nextId = () => `m${++seq}`;

const EASE = [0.16, 1, 0.3, 1] as const;
const SPRING = { type: "spring", stiffness: 320, damping: 30 } as const;

export function ChatWidget() {
  const reduce = useReducedMotion();
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: nextId(),
      role: "bot",
      text: GREETING.text,
      chips: GREETING.chips,
      icon: GREETING.icon,
    },
  ]);
  const [typing, setTyping] = React.useState(false);
  const [draft, setDraft] = React.useState("");
  const [unread, setUnread] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const timers = React.useRef<ReturnType<typeof setTimeout>[]>([]);

  // Clear any pending "typing" timers on unmount.
  React.useEffect(() => {
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  // Focus the input once the panel has animated in (DOM sync only).
  React.useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 240);
    return () => clearTimeout(t);
  }, [open]);

  const toggleOpen = React.useCallback(() => {
    setOpen((o) => {
      if (!o) setUnread(false);
      return !o;
    });
  }, []);

  const send = React.useCallback(
    (raw: string) => {
      const text = raw.trim();
      if (!text || typing) return;

      setMessages((m) => [...m, { id: nextId(), role: "user", text }]);
      setDraft("");
      setTyping(true);

      // Fake latency so the reply feels considered, not instant.
      const reply: BotReply = getBotReply(text);
      const delay = reduce ? 300 : 700 + Math.min(text.length * 12, 900);
      const t = setTimeout(() => {
        setTyping(false);
        setMessages((m) => [
          ...m,
          {
            id: nextId(),
            role: "bot",
            text: reply.text,
            chips: reply.chips,
            icon: reply.icon,
          },
        ]);
        if (!open) setUnread(true);
      }, delay);
      timers.current.push(t);
    },
    [typing, reduce, open],
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(draft);
  };

  return (
    <>
      {/* ---- Panel ------------------------------------------------------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="alfa-chat-panel"
            role="dialog"
            aria-label="Asistente CIA ALFA 552"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, y: 16, scale: 0.97, transition: { duration: 0.2, ease: EASE } }
            }
            transition={reduce ? { duration: 0.2 } : SPRING}
            style={{ transformOrigin: "bottom right" }}
            className="fixed bottom-[calc(1.25rem+3.75rem+0.75rem)] right-5 z-[71] flex h-[min(34rem,calc(100dvh-8rem))] w-[min(24rem,calc(100vw-2.5rem))] flex-col overflow-hidden border border-[var(--line)] bg-[var(--surface)] shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
          >
            <ChatHeader onClose={() => setOpen(false)} />

            <div className="min-h-0 flex-1">
              <MessageScrollerProvider autoScroll defaultScrollPosition="end">
                <MessageScroller className="h-full">
                  <MessageScrollerViewport className="px-4 py-4">
                    <MessageScrollerContent className="justify-end gap-4">
                      {messages.map((m) => (
                        <MessageScrollerItem
                          key={m.id}
                          messageId={m.id}
                          scrollAnchor={false}
                        >
                          <ChatBubble message={m} onChip={send} reduce={!!reduce} />
                        </MessageScrollerItem>
                      ))}

                      <AnimatePresence>
                        {typing && (
                          <MessageScrollerItem messageId="typing">
                            <TypingBubble reduce={!!reduce} />
                          </MessageScrollerItem>
                        )}
                      </AnimatePresence>
                    </MessageScrollerContent>
                  </MessageScrollerViewport>
                </MessageScroller>
              </MessageScrollerProvider>
            </div>

            {/* ---- Composer ---- */}
            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 border-t border-[var(--hairline)] bg-[var(--bg)] px-3 py-3"
            >
              <input
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Escribe tu pregunta..."
                aria-label="Escribe tu pregunta"
                className="min-w-0 flex-1 bg-transparent px-1 py-1.5 text-[15px] text-[var(--ink)] outline-none placeholder:text-[var(--mid)]"
              />
              <motion.button
                type="submit"
                aria-label="Enviar"
                disabled={!draft.trim() || typing}
                whileHover={reduce ? undefined : { scale: 1.06 }}
                whileTap={reduce ? undefined : { scale: 0.92 }}
                className="flex size-9 shrink-0 items-center justify-center border border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)] transition-opacity disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ArrowUp className="size-4" strokeWidth={2.25} />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- Launcher ---------------------------------------------------- */}
      <motion.button
        type="button"
        onClick={toggleOpen}
        aria-label={open ? "Cerrar asistente" : "Abrir asistente CIA ALFA 552"}
        aria-expanded={open}
        initial={reduce ? false : { opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
        whileHover={reduce ? undefined : { scale: 1.06 }}
        whileTap={reduce ? undefined : { scale: 0.94 }}
        className="fixed bottom-5 right-5 z-[72] flex size-[3.75rem] items-center justify-center border border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)] shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
      >
        {/* Idle radar ping while closed. */}
        {!reduce && !open && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 border border-[var(--accent)]"
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 2.4, ease: "easeOut", repeat: Infinity }}
          />
        )}

        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={reduce ? false : { rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex"
            >
              <X className="size-6" strokeWidth={2} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={reduce ? false : { rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex"
            >
              <Plane className="size-6 -rotate-45" strokeWidth={2} />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Unread mark when a reply lands while the panel is closed. */}
        {unread && !open && (
          <motion.span
            aria-hidden
            initial={reduce ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={SPRING}
            className="absolute -right-1 -top-1 size-3 border border-[var(--surface)] bg-[var(--ink)]"
          />
        )}
      </motion.button>
    </>
  );
}

// ---- Header ----------------------------------------------------------------

function ChatHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--hairline)] bg-[var(--bg)] px-4 py-3.5">
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center border border-[var(--line)] bg-[var(--surface-2)] text-[var(--accent-text)]">
          <Plane className="size-4 -rotate-45" strokeWidth={2} />
        </span>
        <div className="flex flex-col">
          <span className="text-[14px] font-semibold leading-tight tracking-tight text-[var(--ink)]">
            Asistente ALFA 552
          </span>
          <span className="mono flex items-center gap-1.5 text-[10px] tracking-[0.12em] text-[var(--mid)]">
            <span className="size-1.5 bg-[var(--accent)]" />
            EN LÍNEA · TORRE DE CONTROL
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="flex size-8 items-center justify-center text-[var(--mid)] transition-colors hover:text-[var(--ink)]"
      >
        <X className="size-5" strokeWidth={1.75} />
      </button>
    </div>
  );
}

// ---- Message bubble --------------------------------------------------------

function ChatBubble({
  message,
  onChip,
  reduce,
}: {
  message: ChatMessage;
  onChip: (text: string) => void;
  reduce: boolean;
}) {
  const isUser = message.role === "user";
  const TopicIcon = message.icon ? ICONS[message.icon] : Plane;

  return (
    <Message align={isUser ? "end" : "start"}>
      {/* Assistant carries a per-topic glyph; the user's own messages don't. */}
      {!isUser && (
        <MessageAvatar className="size-8 self-end rounded-none border border-[var(--line)] bg-[var(--surface-2)] text-[var(--accent-text)]">
          <TopicIcon className="size-4" strokeWidth={1.75} />
        </MessageAvatar>
      )}

      <MessageContent className={isUser ? "items-end" : "items-start"}>
        <motion.div
          initial={
            reduce ? false : { opacity: 0, x: isUser ? 10 : -10, y: 6 }
          }
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className={
            isUser
              ? "w-fit max-w-[85%] whitespace-pre-line border border-[var(--accent)] bg-[var(--accent)] px-3.5 py-2.5 text-[14.5px] leading-relaxed text-[var(--accent-ink)]"
              : "w-fit max-w-[92%] whitespace-pre-line border border-[var(--line)] bg-[var(--surface-2)] px-3.5 py-2.5 text-[14.5px] leading-relaxed text-[var(--lt)]"
          }
        >
          {message.text}
        </motion.div>

        {message.chips && message.chips.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {message.chips.map((chip, i) => {
              const ChipIcon = ICONS[iconForChip(chip)];
              return (
                <motion.button
                  key={chip}
                  type="button"
                  onClick={() => onChip(chip)}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: EASE,
                    delay: reduce ? 0 : 0.05 + i * 0.05,
                  }}
                  whileHover={reduce ? undefined : { y: -2 }}
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                  className="mono group/chip flex items-center gap-1.5 border border-[var(--line)] bg-transparent px-2.5 py-1.5 text-left text-[11px] tracking-[0.04em] text-[var(--mid)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent-text)]"
                >
                  <ChipIcon
                    className="size-3.5 shrink-0 text-[var(--mid)] transition-colors group-hover/chip:text-[var(--accent-text)]"
                    strokeWidth={1.75}
                  />
                  {chip}
                </motion.button>
              );
            })}
          </div>
        )}
      </MessageContent>
    </Message>
  );
}

// ---- Typing indicator ------------------------------------------------------

function TypingBubble({ reduce }: { reduce: boolean }) {
  return (
    <Message align="start">
      <MessageAvatar className="size-8 self-end rounded-none border border-[var(--line)] bg-[var(--surface-2)] text-[var(--accent-text)]">
        <Radio className="size-4" strokeWidth={1.75} />
      </MessageAvatar>
      <MessageContent>
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -10, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="flex w-fit items-center gap-1.5 border border-[var(--line)] bg-[var(--surface-2)] px-3.5 py-3"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="size-1.5 bg-[var(--mid)]"
              animate={reduce ? undefined : { opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
              transition={{
                duration: 0.9,
                ease: "easeInOut",
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </motion.div>
      </MessageContent>
    </Message>
  );
}
