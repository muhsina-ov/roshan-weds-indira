import { motion } from "motion/react";
import bride from "@/assets/portrait-bride-indira.jpg";
import groom from "@/assets/portrait-groom-roshan.jpg";
import coupleTogether from "@/assets/roshan-indira.jpg";
import { invitation } from "@/content/invitation";
import { Ornament, Reveal, SectionTitle } from "./Reveal";

function PortraitCard({
  src,
  alt,
  name,
  role,
  parentage,
  text,
  flip,
}: {
  src: string;
  alt: string;
  name: string;
  role: string;
  parentage: string;
  text: string;
  flip?: boolean;
}) {
  return (
    <Reveal delay={flip ? 0.12 : 0} className="group">
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
        className="plate paper-grain h-full overflow-hidden rounded-[2rem]"
      >
        <div className="relative overflow-hidden">
          <motion.img
            src={src}
            alt={alt}
            loading="lazy"
            width={1024}
            height={1024}
            className="aspect-square w-full object-cover"
            initial={{ scale: 1.06 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(circle at 50% 70%, color-mix(in oklab, var(--gold) 22%, transparent), transparent 65%)",
            }}
          />
        </div>
        <div className="px-6 pt-6 pb-8 text-center">
          <p className="font-sans text-[0.62rem] tracking-[0.4em] text-gold-deep uppercase">
            {role}
          </p>
          <h3 className="mt-2 text-2xl text-primary sm:text-3xl">{name}</h3>
          <p className="mt-1 font-script text-base text-primary/80 italic">
            {parentage}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{text}</p>
        </div>
      </motion.article>
    </Reveal>
  );
}

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
        <div className="mt-12 grid gap-8 sm:grid-cols-2 sm:gap-10">
          <PortraitCard
            src={groom}
            alt="Illustrated portrait of the groom Roshan Roy"
            {...story.groom}
          />
          <PortraitCard
            src={bride}
            alt="Illustrated portrait of the bride Indira Bakaeva"
            flip
            {...story.bride}
          />
        </div>

        {/* Centerpiece Couple Showcase */}
        <Reveal delay={0.16} className="mt-12">
          <div className="plate paper-grain relative overflow-hidden rounded-[2.2rem] p-5 sm:p-8">
            <div className="grid items-center gap-8 md:grid-cols-12">
              <div className="relative overflow-hidden rounded-[1.8rem] shadow-xl md:col-span-6 lg:col-span-5">
                <motion.img
                  src={coupleTogether}
                  alt="Roshan Roy and Indira Bakaeva together at Cherish Ballroom"
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-700 hover:scale-105"
                  initial={{ scale: 1.04 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                />
              </div>
              <div className="text-center md:col-span-6 md:text-left lg:col-span-7">
                <p className="font-sans text-[0.62rem] tracking-[0.4em] text-gold-deep uppercase">
                  Together in Love &amp; Devotion
                </p>
                <h3 className="mt-2 font-display text-3xl text-primary sm:text-4xl">
                  {invitation.couple.groom} &amp; {invitation.couple.bride}
                </h3>
                <p className="mt-2 font-script text-xl text-primary/85 italic">
                  Two hearts blessed by the love of their families
                </p>
                <div className="mt-6 space-y-3 rounded-2xl border border-primary/15 bg-white/50 p-4 text-left backdrop-blur-xs">
                  <div>
                    <span className="block font-sans text-[0.6rem] font-semibold tracking-[0.2em] text-gold-deep uppercase">
                      Groom's Parents
                    </span>
                    <span className="font-display text-base text-primary">
                      {invitation.couple.groomParents}
                    </span>
                  </div>
                  <div className="border-t border-primary/10 pt-2">
                    <span className="block font-sans text-[0.6rem] font-semibold tracking-[0.2em] text-gold-deep uppercase">
                      Bride's Parents
                    </span>
                    <span className="font-display text-base text-primary">
                      {invitation.couple.brideParents}
                    </span>
                  </div>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                  With the blessings of our parents, we invite you to join us as we celebrate our Holy Matrimony at St. Alphonsa’s Church followed by an evening of joy and dinner at Cherish Ballroom, Rubicon Glasshouse.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
