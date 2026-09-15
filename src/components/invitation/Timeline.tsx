import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
const garden = "https://media.invitestory.in/ever-after-bloom/src/assets/garden-courtyard.jpg";
import { invitation } from "@/content/invitation";
import { Reveal, SectionTitle } from "./Reveal";

/** Illustrated chapters, stitched together by a vine that draws itself. */
export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 55%"],
  });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative overflow-hidden px-5 py-24">
      <img
        src={garden}
        alt=""
        aria-hidden
        loading="lazy"
        width={1536}
        height={1024}
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, var(--ivory) 0%, color-mix(in oklab, var(--ivory) 74%, transparent) 30%, color-mix(in oklab, var(--ivory) 74%, transparent) 70%, var(--ivory) 100%)",
        }}
      />

      <div className="mx-auto max-w-2xl">
        <SectionTitle eyebrow="Chapter Three" title="How it happened" note="Four pages, briefly" />

        <div ref={ref} className="relative mt-14 pl-12 sm:pl-16">
          {/* Animated vine */}
          <svg
            aria-hidden
            className="absolute top-0 left-3 h-full w-8 sm:left-5"
            viewBox="0 0 40 1000"
            preserveAspectRatio="none"
            fill="none"
          >
            <motion.path
              d="M20 0 C34 120, 6 220, 20 340 C34 460, 6 560, 20 680 C34 800, 6 900, 20 1000"
              stroke="var(--olive)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.65"
              style={{ pathLength: draw }}
            />
            {[110, 300, 500, 700, 880].map((y, i) => (
              <motion.ellipse
                key={y}
                cx={i % 2 ? 30 : 10}
                cy={y}
                rx="9"
                ry="4.5"
                fill="var(--sage)"
                opacity="0.7"
                transform={`rotate(${i % 2 ? 24 : -24} ${i % 2 ? 30 : 10} ${y})`}
                style={{ scale: draw }}
              />
            ))}
          </svg>

          <ol className="space-y-10">
            {invitation.chapters.map((c, i) => (
              <li key={c.no}>
                <Reveal delay={i * 0.05}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="plate paper-grain relative rounded-[1.6rem] px-6 py-6"
                  >
                    <span
                      className="absolute -left-[3.15rem] top-7 flex h-8 w-8 items-center justify-center rounded-full font-display text-xs text-primary-foreground sm:-left-[4.2rem]"
                      style={{ background: "var(--gradient-gold)" }}
                    >
                      {c.no}
                    </span>
                    <p className="font-sans text-[0.58rem] tracking-[0.34em] text-gold-deep uppercase">
                      {c.when}
                    </p>
                    <h3 className="mt-2 text-xl text-primary sm:text-2xl">{c.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
                  </motion.div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
