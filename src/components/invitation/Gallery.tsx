import { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import coupleBwStudio from "@/assets/couple-studio-sitting.png";
import coupleSunset from "@/assets/couple-sunset-golden.png";
import coupleBallroom from "@/assets/couple-ballroom-reception.jpg";
import { invitation } from "@/content/invitation";
import { Ornament, Reveal, SectionTitle } from "./Reveal";

interface PhotoItem {
  src: string;
  title: string;
  tag: string;
  description: string;
}

const photos: PhotoItem[] = [
  {
    src: coupleBallroom,
    title: "Ballroom Celebration",
    tag: "Reception Gala",
    description: "Radiant together beneath the ballroom chandeliers, surrounded by love and festive celebration.",
  },
  {
    src: coupleSunset,
    title: "Golden Hour Promise",
    tag: "Romantic Serenade",
    description: "Lost in each other's eyes as the sunset blankets the horizon in warm golden light.",
  },
  {
    src: coupleBwStudio,
    title: "Timeless Elegance",
    tag: "Studio Portrait",
    description: "Sitting side by side, united in poise and timeless grace.",
  },
];

export function Gallery() {
  const reduced = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev !== null ? (prev === 0 ? photos.length - 1 : prev - 1) : null));
      }
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev !== null ? (prev === photos.length - 1 ? 0 : prev + 1) : null));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

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
      <div className="mx-auto max-w-5xl">
        <SectionTitle eyebrow="Chapter Four" title="Painted moments" note="Portraits of our love" />
        <Ornament className="mt-8" />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, index) => (
            <Reveal key={photo.src} delay={index * 0.1} className="w-full">
              <motion.button
                type="button"
                onClick={() => setSelectedIndex(index)}
                whileHover={{ y: -6 }}
                animate={reduced ? {} : { y: [0, -3, 0] }}
                transition={{
                  y: { duration: 6 + index * 2, repeat: Infinity, ease: "easeInOut" },
                }}
                className="plate paper-grain group block w-full overflow-hidden rounded-[2rem] p-3.5 text-left shadow-xl cursor-pointer"
                aria-label={`View full portrait: ${photo.title}`}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.6rem] border border-gold/30 bg-neutral-900/5">
                  <img
                    src={photo.src}
                    alt={`${invitation.couple.groom} & ${invitation.couple.bride} - ${photo.title}`}
                    loading="lazy"
                    className="h-full w-full object-cover object-center transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex items-end justify-center pb-4"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(30, 20, 10, 0.6) 0%, transparent 60%)",
                    }}
                  >
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 text-[0.62rem] font-sans tracking-[0.2em] text-primary uppercase shadow-md backdrop-blur">
                      <Maximize2 size={12} /> View Portrait
                    </span>
                  </div>
                </div>
                <div className="px-3 pt-4 pb-2">
                  <div className="flex items-center justify-between">
                    <p className="font-display text-lg text-primary sm:text-xl">
                      {photo.title}
                    </p>
                    <span className="font-sans text-[0.58rem] tracking-[0.2em] text-gold-deep uppercase font-medium">
                      {photo.tag}
                    </span>
                  </div>
                  <p className="mt-1 font-sans text-xs text-muted-foreground leading-relaxed">
                    {photo.description}
                  </p>
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            <div
              className="relative max-h-[90vh] max-w-2xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                aria-label="Close"
                className="absolute -top-12 right-0 sm:right-0 text-white/90 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
                onClick={() => setSelectedIndex(null)}
              >
                <X size={24} />
              </button>

              {/* Prev / Next Navigation */}
              <button
                type="button"
                aria-label="Previous portrait"
                className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 z-10 text-white/90 hover:text-white p-2.5 rounded-full bg-black/40 hover:bg-black/60 transition backdrop-blur-xs cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex((prev) => (prev !== null ? (prev === 0 ? photos.length - 1 : prev - 1) : null));
                }}
              >
                <ChevronLeft size={24} />
              </button>

              <button
                type="button"
                aria-label="Next portrait"
                className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 z-10 text-white/90 hover:text-white p-2.5 rounded-full bg-black/40 hover:bg-black/60 transition backdrop-blur-xs cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex((prev) => (prev !== null ? (prev === photos.length - 1 ? 0 : prev + 1) : null));
                }}
              >
                <ChevronRight size={24} />
              </button>

              {/* Photo Display */}
              <motion.div
                key={selectedIndex}
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-[1.5rem] border border-white/20 shadow-2xl bg-black max-h-[75vh]"
              >
                <img
                  src={photos[selectedIndex].src}
                  alt={photos[selectedIndex].title}
                  className="max-h-[75vh] w-auto h-auto object-contain select-none"
                />
              </motion.div>

              {/* Photo Caption */}
              <div className="mt-3 text-center text-white/90">
                <p className="font-display text-lg text-white">
                  {photos[selectedIndex].title}
                </p>
                <p className="text-xs text-white/70 mt-0.5">
                  {invitation.couple.groom} &amp; {invitation.couple.bride} · {photos[selectedIndex].tag}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
