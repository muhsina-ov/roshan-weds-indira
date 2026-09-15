import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";
const heroPalace = "https://media.invitestory.in/ever-after-bloom/src/assets/hero-palace.jpg";
const bougainvillea = "https://media.invitestory.in/ever-after-bloom/src/assets/bougainvillea.png";
import { LanternField } from "./LanternField";
import { Petals } from "./Petals";
import { invitation } from "@/content/invitation";

/** Chapter one: the palace at dawn, with the sky as the stage. */
export function Hero() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const skyY = useTransform(scrollY, [0, 900], [0, reduced ? 0 : 170]);
  const plateY = useTransform(scrollY, [0, 900], [0, reduced ? 0 : 70]);
  const titleY = useTransform(scrollY, [0, 600], [0, reduced ? 0 : -60]);
  const fade = useTransform(scrollY, [0, 520], [1, 0]);

  return (
    <section className="relative h-[100svh] min-h-[620px] w-full overflow-hidden">
      {/* Painted sky + palace plate */}
      <motion.div className="absolute inset-0" style={{ y: skyY, scale: 1.08 }}>
        <img
          src={heroPalace}
          alt="Watercolour illustration of a sandstone palace beneath a blush dawn sky"
          width={1024}
          height={1536}
          className="h-full w-full object-cover object-bottom"
        />
      </motion.div>

      {/* Soft haze so type always reads */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--lavender) 22%, transparent) 0%, transparent 34%, color-mix(in oklab, var(--cream) 18%, transparent) 78%, color-mix(in oklab, var(--ivory) 62%, transparent) 100%)",
        }}
      />

      <LanternField count={10} travel={1.1} />
      <Petals count={12} />

      {/* Drifting cloud veils */}
      {!reduced &&
        [0, 1].map((i) => (
          <motion.div
            key={i}
            aria-hidden
            className="pointer-events-none absolute h-40 w-[160%] rounded-full blur-3xl"
            style={{
              top: `${12 + i * 16}%`,
              left: "-30%",
              background: `color-mix(in oklab, var(--ivory) ${34 - i * 10}%, transparent)`,
            }}
            animate={{ x: ["-8%", "18%", "-8%"] }}
            transition={{ duration: 52 + i * 22, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

      {/* Birds */}
      {!reduced &&
        [0, 1, 2].map((i) => (
          <motion.svg
            key={i}
            aria-hidden
            viewBox="0 0 24 8"
            className="pointer-events-none absolute w-4 text-primary/40 sm:w-5"
            style={{ top: `${26 + i * 5}%` }}
            animate={{ x: ["-10vw", "112vw"], y: [0, -14, 6, 0] }}
            transition={{
              duration: 34 + i * 9,
              delay: i * 7,
              repeat: Infinity,
              ease: "linear",
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <path
              d="M1 5C4 1 7 1 10 5M14 5c3-4 6-4 9 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
          </motion.svg>
        ))}

      {/* Corner botanicals */}
      <motion.img
        src={bougainvillea}
        alt=""
        aria-hidden
        width={957}
        height={715}
        className="pointer-events-none absolute -top-6 -left-16 w-52 opacity-90 sm:w-72 md:w-80"
        style={{ y: plateY }}
        animate={reduced ? {} : { rotate: [0, 1.6, -1, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src={bougainvillea}
        alt=""
        aria-hidden
        width={957}
        height={715}
        className="pointer-events-none absolute -right-20 bottom-24 w-48 scale-x-[-1] opacity-85 sm:w-64 md:w-72"
        style={{ y: plateY }}
        animate={reduced ? {} : { rotate: [0, -1.4, 1, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Typography in the sky's negative space */}
      <motion.div
        className="relative z-10 flex h-full flex-col items-center px-6 pt-[13svh] text-center"
        style={{ y: titleY, opacity: fade }}
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="font-sans text-[0.62rem] tracking-[0.5em] text-primary/70 uppercase sm:text-xs"
        >
          {invitation.hero.kicker}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.5, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 text-4xl leading-[1.05] text-primary drop-shadow-[0_2px_18px_rgba(255,255,255,0.55)] sm:text-6xl md:text-7xl"
        >
          {invitation.couple.groom}
          <span className="mx-3 font-script text-3xl italic sm:text-4xl">&amp;</span>
          <br className="sm:hidden" />
          {invitation.couple.bride}
        </motion.h1>

        {/* Parents Honor */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.65 }}
          className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-sans text-[0.62rem] tracking-[0.24em] text-primary/80 uppercase sm:text-[0.72rem]"
        >
          <span>Son of {invitation.couple.groomParents}</span>
          <span className="font-script text-sm text-gold-deep italic lowercase">&amp;</span>
          <span>Daughter of {invitation.couple.brideParents}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="mt-4 h-px w-40 origin-center"
          style={{ background: "var(--gradient-gold)" }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.05 }}
          className="mt-3 font-script text-lg text-primary/85 italic sm:text-2xl"
        >
          {invitation.dateLabel}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.15 }}
          className="mt-1 font-sans text-[0.62rem] tracking-[0.22em] text-primary/65 uppercase sm:text-[0.7rem]"
        >
          St. Alphonsa’s Church · Cherish Ballroom, Rubicon Glasshouse
        </motion.p>

        <motion.a
          href="#details"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="glass-plate shimmer mt-9 rounded-full px-8 py-3 font-sans text-[0.7rem] tracking-[0.32em] uppercase"
        >
          <span className="gold-text shimmer font-semibold">{invitation.hero.eyebrow}</span>
        </motion.a>

        <motion.div
          className="mt-auto mb-8 text-primary/50"
          animate={reduced ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={22} />
        </motion.div>
      </motion.div>
    </section>
  );
}
