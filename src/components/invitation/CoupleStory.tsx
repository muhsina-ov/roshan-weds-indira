import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import coupleSunset from "@/assets/couple-sunset-golden.png";
import coupleBwStudio from "@/assets/couple-studio-sitting.png";
import { invitation } from "@/content/invitation";
import { Ornament, Reveal, SectionTitle } from "./Reveal";

const couplePortraits = [
  {
    id: "sunset",
    label: "Sunset Romance",
    caption: "Golden hour serenade",
    src: coupleSunset,
    alt: "Roshan Roy and Indira Bakaeva in golden sunset embrace",
  },
  {
    id: "studio",
    label: "Studio Elegance",
    caption: "Timeless studio portrait",
    src: coupleBwStudio,
    alt: "Roshan Roy and Indira Bakaeva classic black and white studio portrait",
  },
];

export function CoupleStory() {
  const { story } = invitation;
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const currentPhoto = couplePortraits[selectedPhotoIndex];

  return (
    <section className="relative overflow-hidden px-5 py-24 sm:py-28">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, var(--ivory) 0%, color-mix(in oklab, var(--blush) 26%, var(--ivory)) 50%, var(--ivory) 100%)",
        }}
      />
      <div className="mx-auto max-w-5xl">
        <SectionTitle eyebrow="Chapter One" title={story.title} note={story.subtitle} />
        <Ornament className="mt-8" />

        {/* Grand Couple Portrait & Story Showcase */}
        <Reveal delay={0.1} className="mt-12">
          <div className="plate paper-grain relative overflow-hidden rounded-[2.2rem] p-5 sm:p-8 md:p-10">
            <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
              
              {/* Couple Portraits Showcase with Switcher */}
              <div className="flex flex-col items-center justify-center lg:col-span-6 space-y-4">
                {/* Photo Selector Switch */}
                <div className="flex items-center gap-1.5 rounded-full bg-primary/10 p-1 backdrop-blur-xs border border-gold/30 shadow-xs">
                  {couplePortraits.map((p, idx) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPhotoIndex(idx)}
                      className={`relative px-4 py-1.5 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                        selectedPhotoIndex === idx
                          ? "bg-white text-primary font-semibold shadow-sm border border-gold/40"
                          : "text-primary/70 hover:text-primary"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {/* Main Portrait Frame */}
                <div className="relative w-full flex justify-center overflow-hidden rounded-[1.8rem] border border-gold/30 shadow-2xl bg-black/5">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentPhoto.id}
                      src={currentPhoto.src}
                      alt={currentPhoto.alt}
                      loading="lazy"
                      width={824}
                      height={1024}
                      className="h-auto w-full max-h-[75vh] object-contain rounded-[1.8rem]"
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </AnimatePresence>
                </div>

                {/* Thumbnail Previews & Caption */}
                <div className="flex items-center justify-between w-full px-2">
                  <span className="font-script text-sm text-primary/80 italic">
                    {currentPhoto.caption}
                  </span>
                  <div className="flex items-center gap-2">
                    {couplePortraits.map((p, idx) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedPhotoIndex(idx)}
                        aria-label={`View ${p.label}`}
                        className={`h-12 w-10 overflow-hidden rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                          selectedPhotoIndex === idx
                            ? "border-gold scale-105 shadow-md ring-2 ring-gold/40"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={p.src}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Couple Profiles & Family Honors */}
              <div className="space-y-6 lg:col-span-6">
                <div className="text-center lg:text-left">
                  <p className="font-sans text-[0.62rem] tracking-[0.4em] text-gold-deep uppercase">
                    Together in Love
                  </p>
                  <h3 className="mt-2 font-display text-3xl text-primary sm:text-4xl">
                    {invitation.couple.groom} &amp; {invitation.couple.bride}
                  </h3>
                  <p className="mt-1 font-script text-xl text-primary/80 italic">
                    Two lives united in love, faith, and family
                  </p>
                </div>

                {/* Groom Profile */}
                <div className="rounded-2xl border border-primary/15 bg-white/60 p-5 shadow-xs backdrop-blur-xs">
                  <div className="flex items-baseline justify-between border-b border-primary/10 pb-2">
                    <h4 className="font-display text-2xl text-primary">{story.groom.name}</h4>
                    <span className="font-sans text-[0.6rem] tracking-[0.3em] text-gold-deep uppercase">
                      {story.groom.role}
                    </span>
                  </div>
                  <p className="mt-2 font-script text-sm text-primary/85 italic">
                    {story.groom.parentage}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {story.groom.text}
                  </p>
                </div>

                {/* Bride Profile */}
                <div className="rounded-2xl border border-primary/15 bg-white/60 p-5 shadow-xs backdrop-blur-xs">
                  <div className="flex items-baseline justify-between border-b border-primary/10 pb-2">
                    <h4 className="font-display text-2xl text-primary">{story.bride.name}</h4>
                    <span className="font-sans text-[0.6rem] tracking-[0.3em] text-gold-deep uppercase">
                      {story.bride.role}
                    </span>
                  </div>
                  <p className="mt-2 font-script text-sm text-primary/85 italic">
                    {story.bride.parentage}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {story.bride.text}
                  </p>
                </div>

                {/* Auspicious Venue Note */}
                <div className="rounded-2xl border border-primary/10 bg-primary/5 p-4 text-center lg:text-left">
                  <p className="font-sans text-[0.62rem] font-semibold tracking-[0.24em] text-gold-deep uppercase">
                    The Wedding Celebrations
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-primary/80">
                    Holy Matrimony at St. Alphonsa’s Church, Vasant Kunj · Reception at Cherish Ballroom, Rubicon Glasshouse
                  </p>
                </div>
              </div>

            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
