import { motion, useReducedMotion } from "motion/react";

/** Drifting flower petals, painted as soft ellipses so they cost nothing. */
export function Petals({ count = 14, className = "" }: { count?: number; className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return null;

  const petals = Array.from({ length: count }, (_, i) => {
    const rand = ((i * 7919) % 997) / 997;
    return {
      left: (i * 13.7 + rand * 9) % 100,
      size: 6 + rand * 9,
      duration: 13 + rand * 12,
      delay: -rand * 20,
      sway: 30 + rand * 50,
      hue: rand > 0.6 ? "var(--rose)" : rand > 0.3 ? "var(--blush)" : "var(--peach)",
    };
  });

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {petals.map((p, i) => (
        <motion.span
          key={i}
          className="absolute block will-change-transform"
          style={{
            left: `${p.left}%`,
            top: "-6%",
            width: p.size,
            height: p.size * 0.62,
            borderRadius: "60% 40% 55% 45% / 60% 55% 45% 40%",
            background: `color-mix(in oklab, ${p.hue} 75%, transparent)`,
          }}
          animate={{
            y: ["0vh", "112vh"],
            x: [0, p.sway, -p.sway * 0.7, 0],
            rotate: [0, 220, 380],
            opacity: [0, 0.85, 0.85, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
            x: { duration: p.duration / 2.4, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: p.duration, repeat: Infinity, ease: "linear" },
            opacity: { duration: p.duration, repeat: Infinity, times: [0, 0.12, 0.85, 1] },
          }}
        />
      ))}
    </div>
  );
}
