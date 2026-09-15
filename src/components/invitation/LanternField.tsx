import { motion, useReducedMotion } from "motion/react";
const lantern = "https://media.invitestory.in/ever-after-bloom/src/assets/lantern.png";

type Props = {
  count?: number;
  className?: string;
  /** Vertical travel in viewport heights. */
  travel?: number;
};

/** Warm paper lanterns rising on staggered, randomised loops. */
export function LanternField({ count = 9, className = "", travel = 1.15 }: Props) {
  const reduced = useReducedMotion();

  const lanterns = Array.from({ length: count }, (_, i) => {
    const seed = (i * 9301 + 49297) % 233280;
    const rand = seed / 233280;
    // Spread starting heights so the sky is already populated on first paint,
    // and give each lantern only as much climb as keeps it inside the frame.
    const start = (i * 23 + rand * 30) % 72;
    const climb = (100 - start + 18) * travel;
    return {
      left: 4 + ((i * 11.3 + rand * 17) % 90),
      size: 18 + rand * 44,
      start,
      climb,
      duration: 22 + rand * 18,
      drift: rand > 0.5 ? 22 : -18,
      opacity: 0.55 + rand * 0.45,
    };
  });


  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {lanterns.map((l, i) => (
        <motion.img
          key={i}
          src={lantern}
          alt=""
          loading="lazy"
          width={l.size}
          height={l.size * 1.3}
          className="absolute will-change-transform"
          style={{
            left: `${l.left}%`,
            width: l.size,
            bottom: `${l.start}%`,
            filter: "drop-shadow(0 0 14px color-mix(in oklab, var(--gold) 55%, transparent))",
            opacity: l.opacity,
          }}
          initial={false}
          animate={
            reduced
              ? { y: 0, x: 0 }
              : {
                  y: ["0vh", `-${l.climb}vh`],
                  x: [0, l.drift, -l.drift * 0.6, 0],
                  rotate: [0, 3, -2, 0],
                }
          }
          transition={
            reduced
              ? { duration: 0 }
              : {
                  duration: l.duration,
                  repeat: Infinity,
                  ease: "linear",
                  x: { duration: l.duration / 2, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 9, repeat: Infinity, ease: "easeInOut" },
                }
          }
        />
      ))}
    </div>
  );
}
