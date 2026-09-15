import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import coupleTogether from "@/assets/roshan-indira.jpg";
const dancing = "https://media.invitestory.in/ever-after-bloom/src/assets/scene-dancing.jpg";
const walking = "https://media.invitestory.in/ever-after-bloom/src/assets/scene-walking.jpg";
const balcony = "https://media.invitestory.in/ever-after-bloom/src/assets/scene-balcony.jpg";
const hands = "https://media.invitestory.in/ever-after-bloom/src/assets/scene-hands.jpg";
const couple = "https://media.invitestory.in/ever-after-bloom/src/assets/couple-lanterns.png";
import { Ornament, Reveal, SectionTitle } from "./Reveal";

const plates = [
  {
    src: coupleTogether,
    alt: "Roshan Roy and Indira Bakaeva at Cherish Ballroom, Rubicon Glasshouse",
    span: "sm:row-span-2",
    ratio: "aspect-[3/4]",
  },
  { src: dancing, alt: "Dancing beneath strings of warm chandeliers and lights", span: "", ratio: "aspect-square" },
  { src: hands, alt: "Two joined hands in love and faith", span: "", ratio: "aspect-square" },
  { src: balcony, alt: "A quiet moment together at golden hour", span: "sm:col-span-2", ratio: "aspect-[16/10]" },
];

export function Gallery() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);

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
        <SectionTitle eyebrow="Chapter Four" title="Painted moments" note="A few pages from the album" />
        <Ornament className="mt-8" />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {plates.map((p, i) => (
            <Reveal key={p.alt} delay={i * 0.06} className={p.span}>
              <motion.button
                type="button"
                onClick={() => setOpen(i)}
                whileHover={{ y: -6 }}
                animate={reduced ? {} : { y: [0, -4, 0] }}
                transition={{
                  y: { duration: 7 + i, repeat: Infinity, ease: "easeInOut" },
                }}
                className="plate group block h-full w-full overflow-hidden rounded-[1.8rem] p-2 text-left"
              >
                <div className="relative h-full overflow-hidden rounded-[1.4rem]">
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className={`${p.ratio} h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.05]`}
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
              </motion.button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <motion.img
            src={couple}
            alt="Illustration of the bride and groom looking up at rising lanterns"
            loading="lazy"
            width={556}
            height={908}
            className="w-40 sm:w-52"
            animate={reduced ? {} : { y: [0, -7, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </Reveal>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-primary/70 p-5 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.img
              src={plates[open]!.src}
              alt={plates[open]!.alt}
              className="max-h-[85vh] max-w-[92vw] w-auto h-auto rounded-[1.4rem] shadow-2xl object-contain"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
            <button
              type="button"
              aria-label="Close"
              className="absolute top-6 right-6 text-primary-foreground/90"
              onClick={() => setOpen(null)}
            >
              <X size={26} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
