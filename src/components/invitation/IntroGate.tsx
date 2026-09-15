import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import churchSeal from "@/assets/church-seal.jpg";

type Stage = "seal" | "opening" | "done";

/**
 * The cover of the storybook: a wax-sealed envelope set in front of St. Alphonsa's Church.
 * Tapping the seal triggers an elegant golden light bloom transition into the invitation.
 */
export function IntroGate() {
  const [stage, setStage] = useState<Stage>("seal");
  const [fading, setFading] = useState(false);

  // Lock scrolling until the book is open.
  useEffect(() => {
    if (stage === "done") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [stage]);

  const open = () => {
    if (stage !== "seal") return;
    setStage("opening");
    window.setTimeout(() => {
      setFading(true);
      window.setTimeout(() => setStage("done"), 1200);
    }, 1200);
  };

  const finish = () => {
    if (fading) return;
    setFading(true);
    window.setTimeout(() => setStage("done"), 900);
  };

  if (stage === "done") return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-[var(--ivory)]"
      initial={{ opacity: 1 }}
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: fading ? "none" : "auto" }}
    >
      {/* The church sealed envelope plate */}
      <motion.button
        type="button"
        onClick={open}
        disabled={stage !== "seal"}
        aria-label="Tap the seal to open the invitation"
        className="absolute inset-0 h-full w-full cursor-pointer overflow-hidden"
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{
          opacity: 1,
          scale: stage === "opening" ? 1.08 : 1,
        }}
        transition={{
          opacity: { duration: 0.8 },
          scale: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
        }}
      >
        <img
          src={churchSeal}
          alt="Ivory wedding envelope with gold wax seal on marble pedestal before St. Alphonsa's Church"
          className="h-full w-full object-cover object-center"
        />

        {/* Breathing glow over the wax seal to invite the tap */}
        {stage === "seal" && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute top-[46%] left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--gold) 65%, transparent), transparent 70%)",
            }}
            animate={{ opacity: [0.35, 0.85, 0.35], scale: [0.9, 1.2, 0.9] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Radiant golden light burst on opening */}
        <AnimatePresence>
          {stage === "opening" && (
            <>
              {/* Expanding golden ring from seal */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-bright"
                initial={{ width: 40, height: 40, opacity: 1, scale: 0.8 }}
                animate={{ width: 800, height: 800, opacity: 0, scale: 2.5 }}
                transition={{ duration: 1.3, ease: "easeOut" }}
              />

              {/* Celestial golden bloom flood */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.9, 1] }}
                transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background:
                    "radial-gradient(circle at 50% 46%, rgba(255, 248, 230, 0.98) 0%, rgba(254, 243, 199, 0.85) 45%, rgba(253, 230, 138, 0.6) 75%, rgba(255, 255, 255, 0.95) 100%)",
                }}
              />
            </>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Skip */}
      <button
        type="button"
        onClick={finish}
        className="absolute right-5 bottom-6 z-10 rounded-full bg-[color-mix(in_oklab,var(--ivory)_75%,transparent)] px-4 py-2 font-sans text-[0.6rem] tracking-[0.28em] text-primary uppercase shadow-sm backdrop-blur transition hover:bg-white/90"
      >
        Skip
      </button>
    </motion.div>
  );
}

