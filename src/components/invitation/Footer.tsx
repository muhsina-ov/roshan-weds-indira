import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Heart } from "lucide-react";
const sunset = "https://media.invitestory.in/ever-after-bloom/src/assets/sunset-sky.jpg";
const lanternImg = "https://media.invitestory.in/ever-after-bloom/src/assets/lantern.png";
import { invitation } from "@/content/invitation";
import { LanternField } from "./LanternField";
import { Ornament } from "./Reveal";

const blessings = [
  "May your evenings always be unhurried.",
  "May the tea be hot and the arguments short.",
  "May you keep choosing each other.",
  "May your house be loud with the right people.",
  "May the monsoon always find you together.",
];

/** A soft aurora wash — pure CSS, no canvas, cheap on mobile. */
function AuroraGlow() {
  const reduced = useReducedMotion();
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute h-[70%] w-[70%] rounded-full blur-[90px]"
          style={{
            left: `${i * 26 - 10}%`,
            top: `${8 + i * 12}%`,
            background: [
              "color-mix(in oklab, var(--lavender) 55%, transparent)",
              "color-mix(in oklab, var(--peach) 50%, transparent)",
              "color-mix(in oklab, var(--skyblue) 48%, transparent)",
            ][i],
            mixBlendMode: "screen",
            opacity: 0.55,
          }}
          animate={reduced ? {} : { x: [0, 40, -30, 0], y: [0, -26, 18, 0] }}
          transition={{ duration: 30 + i * 11, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function Footer() {
  const [released, setReleased] = useState<{ id: number; text: string; left: number }[]>([]);

  const release = () => {
    const id = Date.now();
    setReleased((prev) => [
      ...prev,
      {
        id,
        text: blessings[Math.floor(Math.random() * blessings.length)]!,
        left: 18 + Math.random() * 64,
      },
    ]);
    setTimeout(() => setReleased((prev) => prev.filter((r) => r.id !== id)), 7000);
  };

  return (
    <footer className="relative overflow-hidden pt-28 pb-14">
      <img
        src={sunset}
        alt=""
        aria-hidden
        loading="lazy"
        width={1920}
        height={1024}
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--ivory) 0%, color-mix(in oklab, var(--ivory) 40%, transparent) 26%, color-mix(in oklab, var(--lavender) 30%, transparent) 100%)",
        }}
      />
      <AuroraGlow />
      <LanternField count={7} travel={1.05} className="opacity-90" />

      {/* Released wish lanterns */}
      <AnimatePresence>
        {released.map((r) => (
          <motion.div
            key={r.id}
            className="pointer-events-none absolute bottom-10 z-10 flex w-40 flex-col items-center text-center"
            style={{ left: `${r.left}%` }}
            initial={{ y: 0, opacity: 0, scale: 0.7 }}
            animate={{ y: -520, opacity: [0, 1, 1, 0], scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 7, ease: "easeOut" }}
          >
            <img
              src={lanternImg}
              alt=""
              width={580}
              height={751}
              className="w-10 drop-shadow-[0_0_18px_color-mix(in_oklab,var(--gold)_65%,transparent)]"
            />
            <span className="mt-2 font-script text-sm text-primary italic">{r.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="relative z-20 mx-auto max-w-xl px-6 text-center">
        <Ornament />
        <h2 className="mt-8 font-script text-3xl leading-snug text-primary italic sm:text-4xl">
          {invitation.footer.line1}
          <br />
          {invitation.footer.line2}
        </h2>

        <motion.button
          type="button"
          onClick={release}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          className="glass-plate mt-10 rounded-full px-7 py-3 font-sans text-[0.64rem] tracking-[0.3em] text-primary uppercase"
        >
          Release a wish lantern
        </motion.button>

        <p className="mt-12 font-display text-lg text-primary">{invitation.footer.signoff}</p>
        <p className="mt-3 font-sans text-[0.6rem] tracking-[0.34em] text-primary/60 uppercase">
          {invitation.dateLabel}
        </p>

        <p className="mt-10 inline-flex items-center gap-2 font-sans text-[0.6rem] tracking-[0.3em] text-primary/55 uppercase">
          Made with <Heart size={11} className="fill-rose text-rose" /> for our people
        </p>
      </div>
    </footer>
  );
}
