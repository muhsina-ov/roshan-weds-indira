import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import coupleTogether from "@/assets/roshan-indira.jpg";
import { invitation } from "@/content/invitation";
import { Ornament, Reveal, SectionTitle } from "./Reveal";

export function Gallery() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <section className="relative overflow-hidden px-5 py-24">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, var(--ivory) 0%, color-mix(in oklab, var(--blush) 22%, var(--ivory)) 60%, var(--ivory) 100%)",
        }}
      />
      <div className="mx-auto max-w-4xl">
        <SectionTitle eyebrow="Chapter Four" title="Painted moments" note="A portrait of our love" />
        <Ornament className="mt-8" />

        <div className="mt-12 flex justify-center">
          <Reveal delay={0.06} className="w-full max-w-md">
            <motion.button
              type="button"
              onClick={() => setOpen(true)}
              whileHover={{ y: -6 }}
              animate={reduced ? {} : { y: [0, -4, 0] }}
              transition={{
                y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
              }}
              className="plate paper-grain group block w-full overflow-hidden rounded-[2rem] p-3 text-left shadow-xl"
            >
              <div className="relative overflow-hidden rounded-[1.6rem] border border-gold/30">
                <img
                  src={coupleTogether}
                  alt="Roshan Roy and Indira Bakaeva at Cherish Ballroom, Rubicon Glasshouse"
                  loading="lazy"
                  width={764}
                  height={1024}
                  className="h-auto w-full object-contain transition-transform duration-[1400ms] group-hover:scale-[1.03]"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 100%, color-mix(in oklab, var(--gold) 26%, transparent), transparent 60%)",
                  }}
                />
              </div>
              <div className="px-3 pt-4 pb-2 text-center">
                <p className="font-display text-lg text-primary sm:text-xl">
                  {invitation.couple.groom} &amp; {invitation.couple.bride}
                </p>
                <p className="mt-1 font-sans text-[0.62rem] tracking-[0.24em] text-gold-deep uppercase">
                  Cherish Ballroom · Rubicon Glasshouse
                </p>
              </div>
            </motion.button>
          </Reveal>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-primary/70 p-5 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.img
              src={coupleTogether}
              alt="Roshan Roy and Indira Bakaeva at Cherish Ballroom, Rubicon Glasshouse"
              className="max-h-[85vh] max-w-[92vw] w-auto h-auto rounded-[1.4rem] shadow-2xl object-contain"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
            <button
              type="button"
              aria-label="Close"
              className="absolute top-6 right-6 text-primary-foreground/90 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <X size={26} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
