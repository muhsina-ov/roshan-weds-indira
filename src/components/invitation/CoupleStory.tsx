import { motion } from "motion/react";
import coupleTogether from "@/assets/roshan-indira.jpg";
import { invitation } from "@/content/invitation";
import { Ornament, Reveal, SectionTitle } from "./Reveal";

export function CoupleStory() {
  const { story } = invitation;

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

        {/* Grand Full-Length Uncropped Couple Portrait & Story Showcase */}
        <Reveal delay={0.1} className="mt-12">
          <div className="plate paper-grain relative overflow-hidden rounded-[2.2rem] p-5 sm:p-8 md:p-10">
            <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
              
              {/* Full Uncropped Couple Illustration */}
              <div className="flex justify-center lg:col-span-6">
                <div className="relative overflow-hidden rounded-[1.8rem] border border-gold/30 shadow-2xl bg-black/5">
                  <motion.img
                    src={coupleTogether}
                    alt="Full portrait of Roshan Roy and Indira Bakaeva at Cherish Ballroom, Rubicon Glasshouse"
                    loading="lazy"
                    width={764}
                    height={1024}
                    className="h-auto w-full max-h-[85vh] object-contain rounded-[1.8rem]"
                    initial={{ scale: 1.02 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  />
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
                    Holy Matrimony at St. Alphonsa’s Church · Reception at Cherish Ballroom, Rubicon Glasshouse
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
