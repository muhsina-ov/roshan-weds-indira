import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { invitation } from "@/content/invitation";
import { LanternField } from "./LanternField";
import { SectionTitle } from "./Reveal";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  const text = String(value).padStart(2, "0");
  return (
    <div className="glass-plate flex min-w-[4.6rem] flex-col items-center rounded-2xl px-3 py-4 sm:min-w-[6rem] sm:px-5 sm:py-6">
      <div className="relative h-9 overflow-hidden sm:h-12">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            initial={{ y: 22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -22, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="block font-display text-3xl text-primary tabular-nums sm:text-4xl"
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 font-sans text-[0.55rem] tracking-[0.3em] text-gold-deep uppercase sm:text-[0.62rem]">
        {label}
      </span>
    </div>
  );
}

export function Countdown() {
  const target = new Date(invitation.dateISO).getTime();
  // Start from a stable value so SSR and the first client render agree.
  const [left, setLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setLeft(diff(target));
    const id = setInterval(() => setLeft(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);


  return (
    <section className="relative overflow-hidden px-5 py-20">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, var(--ivory) 0%, color-mix(in oklab, var(--lavender) 30%, var(--ivory)) 55%, color-mix(in oklab, var(--peach) 26%, var(--ivory)) 100%)",
        }}
      />
      <LanternField count={6} className="opacity-70" travel={1.1} />

      <div className="relative mx-auto max-w-3xl">
        <SectionTitle eyebrow="The Waiting" title="Until the gates open" />
        <div className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
          <Unit value={left.days} label="Days" />
          <Unit value={left.hours} label="Hours" />
          <Unit value={left.minutes} label="Minutes" />
          <Unit value={left.seconds} label="Seconds" />
        </div>
        <p className="mt-8 text-center font-script text-lg text-muted-foreground italic">
          {invitation.dateLabel}
        </p>
      </div>
    </section>
  );
}
