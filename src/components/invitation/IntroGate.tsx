import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import heroChurch from "@/assets/hero-church.jpg";
import bougainvillea from "@/assets/bougainvillea.png";
import { Petals } from "./Petals";
import { invitation } from "@/content/invitation";

type Stage = "seal" | "opening" | "done";

/** Play a delicate golden chime when opening the royal invitation. */
function playGoldenChime() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const now = ctx.currentTime;

    // Harmonic bells (F# and C# golden chord)
    const freqs = [554.37, 830.61, 1108.73, 1661.22];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.12 / (idx + 1), now + idx * 0.08 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 2.0);
    });
  } catch {
    // AudioContext blocked or unsupported - continue silently
  }
}

/**
 * The grand opening of the wedding storybook:
 * An ivory wax-sealed invitation envelope set in the sunlit courtyard of St. Alphonsa's Church.
 * Tapping the seal breaks the gold wax, flips open the 3D flap, glides the wedding letter upward,
 * and dissolves into Chapter One.
 */
export function IntroGate() {
  const [stage, setStage] = useState<Stage>("seal");
  const [fading, setFading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lock scrolling until the invitation is fully open
  useEffect(() => {
    if (stage === "done") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [stage]);

  const handleOpen = () => {
    if (stage !== "seal") return;
    setStage("opening");
    playGoldenChime();

    // Sequence timing:
    // 0s - 0.6s: Seal burst & flap flips up 180°
    // 0.6s - 1.8s: Letter card glides out of envelope
    // 2.0s - 3.2s: Letter zooms forward into golden dawn bloom
    // 3.2s: Fade into site
    window.setTimeout(() => {
      setFading(true);
      window.setTimeout(() => {
        setStage("done");
      }, 1200);
    }, 3200);
  };

  const handleSkip = () => {
    if (fading) return;
    setFading(true);
    window.setTimeout(() => setStage("done"), 700);
  };

  if (stage === "done") return null;

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#faf7f2] select-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: fading ? "none" : "auto" }}
    >
      {/* ── Church Background ─────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroChurch}
          alt="St. Alphonsa's Church, Bharananganam"
          className="h-full w-full object-cover object-center scale-105 filter brightness-[0.98] contrast-[1.02]"
        />

        {/* Soft morning haze overlay */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(254, 248, 240, 0.3) 0%, rgba(255, 252, 247, 0.15) 30%, rgba(253, 246, 238, 0.65) 75%, rgba(250, 244, 235, 0.95) 100%)",
          }}
        />

        {/* Drifting petals in church garden */}
        <Petals count={16} />

        {/* Framing Bougainvillea Blossoms */}
        <img
          src={bougainvillea}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -top-10 -left-12 w-64 md:w-88 opacity-90 rotate-12"
        />
        <img
          src={bougainvillea}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -top-12 -right-12 w-64 md:w-88 opacity-85 -scale-x-100"
        />
      </div>

      {/* ── Classical Marble Pedestal ──────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[140vw] max-w-[900px] h-[35vh] opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 50% 100%, rgba(255, 253, 249, 0.95) 0%, rgba(246, 240, 230, 0.85) 45%, rgba(235, 224, 206, 0.4) 75%, transparent 100%)",
        }}
      />

      {/* ── Envelope & Letter Stage ────────────────────────────── */}
      <div className="relative z-20 flex flex-col items-center justify-center">
        {/* Envelope Container */}
        <div
          className="relative w-[326px] sm:w-[390px] md:w-[430px] h-[218px] sm:h-[260px] md:h-[285px] cursor-pointer"
          onClick={stage === "seal" ? handleOpen : undefined}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleOpen();
          }}
          aria-label="Tap the wax seal to open the wedding invitation"
        >
          {/* Ground drop shadow beneath envelope */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 w-[92%] h-12 rounded-[50%] blur-xl"
            style={{
              background: "radial-gradient(ellipse, rgba(82, 57, 30, 0.35) 0%, transparent 70%)",
            }}
          />

          {/* 1. Envelope Back Base */}
          <div
            className="absolute inset-0 rounded-lg overflow-hidden border border-[#e8ded0] shadow-2xl"
            style={{
              background:
                "linear-gradient(135deg, #fbf8f2 0%, #f7f1e6 50%, #f0e6d4 100%)",
            }}
          >
            {/* Interior gold lining / damask watermark */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  "radial-gradient(circle at center, #c49a45 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            />
          </div>

          {/* 2. The Letter Card (Slides UP out of the envelope) */}
          <motion.div
            className="absolute left-[4%] right-[4%] top-[3%] bottom-[3%] rounded-md bg-[#fffefc] border border-amber-300/60 shadow-lg flex flex-col items-center justify-between p-4 sm:p-5 text-center overflow-hidden"
            initial={false}
            animate={
              stage === "opening"
                ? {
                    y: [-4, -170, -35],
                    scale: [1, 1.04, 1.2],
                    zIndex: 25,
                    boxShadow:
                      "0 25px 50px -12px rgba(82, 57, 30, 0.38), 0 0 40px rgba(245, 208, 126, 0.4)",
                  }
                : {
                    y: 0,
                    scale: 0.98,
                    zIndex: 5,
                  }
            }
            transition={{
              duration: 2.7,
              times: [0, 0.5, 1],
              ease: [0.22, 1, 0.36, 1],
              delay: stage === "opening" ? 0.45 : 0,
            }}
            style={{
              backgroundImage:
                "linear-gradient(to bottom, #ffffff, #fefcf9 60%, #faf5ec)",
            }}
          >
            {/* Ornate Gold Filigree Border */}
            <div className="pointer-events-none absolute inset-1.5 sm:inset-2 border border-amber-300/50 rounded-sm" />
            <div className="pointer-events-none absolute inset-2.5 sm:inset-3 border border-amber-200/40 rounded-sm" />

            {/* Top Crest: Cross & Florals */}
            <div className="flex flex-col items-center pt-0.5 sm:pt-1">
              <span className="font-serif text-amber-600/80 text-base sm:text-lg leading-none">
                ✝
              </span>
              <span className="text-[8px] sm:text-[9.5px] font-sans tracking-[0.28em] text-primary/70 uppercase mt-0.5">
                The Wedding Invitation
              </span>
            </div>

            {/* Couple Names */}
            <div className="my-auto py-1">
              <p className="font-serif italic text-lg sm:text-2xl text-primary font-medium tracking-wide">
                {invitation.couple.groom}
              </p>
              <span className="block font-serif italic text-xs sm:text-sm text-amber-700/80 my-0.5">
                and
              </span>
              <p className="font-serif italic text-lg sm:text-2xl text-primary font-medium tracking-wide">
                {invitation.couple.bride}
              </p>
            </div>

            {/* Venue & Date */}
            <div className="pb-1 sm:pb-1.5 flex flex-col items-center">
              <span className="text-[8px] sm:text-[9.5px] font-sans tracking-[0.22em] text-primary/80 uppercase font-semibold">
                {invitation.venue.name}
              </span>
              <span className="text-[7.5px] sm:text-[9px] font-sans tracking-[0.16em] text-primary/65 uppercase mt-0.5">
                {invitation.dateLabel}
              </span>
            </div>
          </motion.div>

          {/* 3. Envelope Front Pocket (Left, Right, Bottom Flaps) */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{ filter: "drop-shadow(0 -2px 6px rgba(100, 75, 45, 0.08))" }}
          >
            {/* Bottom Flap */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 430 285"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="pocketBottom" x1="50%" y1="100%" x2="50%" y2="0%">
                  <stop offset="0%" stopColor="#ede2d0" />
                  <stop offset="100%" stopColor="#fbf7ef" />
                </linearGradient>
                <linearGradient id="pocketSide" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f5ebe0" />
                  <stop offset="100%" stopColor="#ede0ce" />
                </linearGradient>
              </defs>

              {/* Left Flap */}
              <polygon
                points="0,0 215,146 0,285"
                fill="url(#pocketSide)"
                stroke="#e2d4c0"
                strokeWidth="0.75"
              />

              {/* Right Flap */}
              <polygon
                points="430,0 215,146 430,285"
                fill="url(#pocketSide)"
                stroke="#e2d4c0"
                strokeWidth="0.75"
              />

              {/* Bottom Flap (Overlaps sides) */}
              <polygon
                points="0,285 215,130 430,285"
                fill="url(#pocketBottom)"
                stroke="#ded0ba"
                strokeWidth="0.75"
              />
            </svg>
          </div>

          {/* 4. Envelope Top Flap (3D Flip Animation) */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[56%] pointer-events-none z-20"
            style={{
              transformOrigin: "top center",
              transformStyle: "preserve-3d",
              perspective: 1000,
            }}
            initial={false}
            animate={{
              rotateX: stage === "opening" ? 180 : 0,
              zIndex: stage === "opening" ? 4 : 20,
            }}
            transition={{
              duration: 0.85,
              ease: [0.25, 1, 0.35, 1],
            }}
          >
            <svg
              className="h-full w-full"
              viewBox="0 0 430 160"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="topFlapGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#fdfbf8" />
                  <stop offset="85%" stopColor="#f4ebdc" />
                  <stop offset="100%" stopColor="#e8dcbe" />
                </linearGradient>
              </defs>
              <polygon
                points="0,0 430,0 215,160"
                fill="url(#topFlapGrad)"
                stroke="#ded0ba"
                strokeWidth="0.75"
              />
            </svg>
          </motion.div>

          {/* 5. The Royal Gold Wax Seal */}
          <AnimatePresence>
            {stage === "seal" && (
              <motion.div
                className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center cursor-pointer"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{
                  scale: 1.5,
                  opacity: 0,
                  transition: { duration: 0.45, ease: "easeOut" },
                }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
              >
                {/* Breathing golden aura */}
                <motion.span
                  aria-hidden
                  className="absolute -inset-4 rounded-full blur-xl pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(245, 197, 85, 0.75) 0%, rgba(217, 154, 43, 0.25) 55%, transparent 75%)",
                  }}
                  animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.55, 0.95, 0.55],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Wax Seal Body */}
                <div
                  className="relative h-15 w-15 sm:h-17 sm:w-17 rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(110,65,15,0.45),inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-3px_5px_rgba(95,50,5,0.6)]"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 30%, #ffd978 0%, #d49f37 40%, #a8731b 75%, #7e520c 100%)",
                    border: "1.5px solid #ffea9f",
                  }}
                >
                  {/* Outer Wax Irregular Rim Emulation */}
                  <div className="absolute inset-1 rounded-full border border-amber-100/50 shadow-inner flex flex-col items-center justify-center">
                    {/* Monogram / Cross Crest */}
                    <span className="font-serif text-amber-950 font-bold text-xs sm:text-sm drop-shadow-[0_1px_1px_rgba(255,235,170,0.85)] tracking-wider">
                      R & I
                    </span>
                    <span className="text-[7px] text-amber-900/90 leading-none drop-shadow-[0_1px_1px_rgba(255,235,170,0.8)]">
                      ✝
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Golden Shockwave ring when tapped */}
          <AnimatePresence>
            {stage === "opening" && (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-amber-300"
                initial={{ width: 30, height: 30, opacity: 1, scale: 0.6 }}
                animate={{ width: 650, height: 650, opacity: 0, scale: 2.2 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* ── Tap Prompt ────────────────────────────────────────── */}
        <AnimatePresence>
          {stage === "seal" && (
            <motion.div
              className="mt-7 flex flex-col items-center text-center cursor-pointer pointer-events-auto"
              onClick={handleOpen}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6, transition: { duration: 0.3 } }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-amber-700/50" />
                <p className="font-sans text-[0.65rem] sm:text-[0.72rem] tracking-[0.32em] text-primary/85 uppercase font-medium drop-shadow-sm">
                  Tap the seal to open
                </p>
                <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-amber-700/50" />
              </div>
              <p className="mt-1 text-[0.6rem] font-serif italic text-primary/70">
                St. Alphonsa's Forane Church, Bharananganam
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Celestial Golden Morning Bloom ────────────────────── */}
      <AnimatePresence>
        {stage === "opening" && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0.95] }}
            transition={{
              duration: 2.6,
              times: [0, 0.6, 1],
              ease: [0.22, 1, 0.36, 1],
              delay: 0.5,
            }}
            style={{
              background:
                "radial-gradient(circle at 50% 46%, rgba(255, 250, 240, 0.98) 0%, rgba(254, 243, 215, 0.88) 40%, rgba(253, 230, 160, 0.65) 75%, rgba(255, 255, 255, 0.96) 100%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Skip Button ────────────────────────────────────────── */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute right-5 bottom-6 z-40 rounded-full bg-white/75 px-4 py-2 font-sans text-[0.6rem] tracking-[0.28em] text-primary uppercase shadow-sm backdrop-blur transition hover:bg-white hover:shadow-md"
      >
        Skip
      </button>
    </motion.div>
  );
}
