import { motion } from "motion/react";
import type { ReactNode } from "react";
const flourish = "https://media.invitestory.in/ever-after-bloom/src/assets/gold-flourish.png";

/** Scroll-reveal wrapper used by every section so the page turns like pages. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Ornament({ className = "" }: { className?: string }) {
  return (
    <Reveal className={`flex justify-center ${className}`} y={12}>
      <img
        src={flourish}
        alt=""
        aria-hidden
        loading="lazy"
        width={888}
        height={124}
        className="h-auto w-40 opacity-80 sm:w-52"
      />
    </Reveal>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  note,
}: {
  eyebrow?: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="text-center">
      {eyebrow ? (
        <Reveal y={14}>
          <p className="font-sans text-[0.68rem] tracking-[0.42em] text-gold-deep uppercase">
            {eyebrow}
          </p>
        </Reveal>
      ) : null}
      <Reveal delay={0.08}>
        <h2 className="mt-4 text-3xl leading-tight text-primary sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {note ? (
        <Reveal delay={0.16}>
          <p className="mx-auto mt-4 max-w-md font-script text-lg text-muted-foreground italic sm:text-xl">
            {note}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
