# Modern Indian Fairytale — An Animated Wedding Storybook

## Reading the reference artwork

**Composition & hierarchy.** The frame is vertical and divided into three bands: an enormous pastel sky (top 55%), a low sandstone palace horizon (middle 25%), and a warm marble foreground with the car (bottom 20%). The sky's emptiness is the point — it is the stage where lanterns rise and where the lettering lives. Attention travels lantern → lettering → palace → couple → car, a diagonal descent from wonder to intimacy.

**Illustration style.** Gouache/watercolor: visible brush edges, soft bleed in clouds, dry-brush texture on stone, saturated flat-ish shapes with hand-painted shading rather than gradients. Botanicals (bougainvillea) are drawn with far more detail than the architecture — the eye is pulled to the corners and then released inward.

**Color harmony.** Blush rose to peach to lavender in the sky, sandstone terracotta for the palace, olive/sage foliage, magenta-pink florals as the only high-saturation accent, and warm amber lantern glow as the single light source. Deep-green lettering grounds the pastel field.

**Atmosphere, light, depth.** Golden-hour backlight; the palace is slightly desaturated and hazed, the foreground is crisper — classic aerial perspective. Lanterns are scaled by distance (large near, tiny far), which is what creates the sense of vast height.

**Emotion.** Nostalgia and anticipation, not spectacle. The couple is small, turned away from us, looking up — we watch them wish rather than pose. That restraint is the artwork's real magic.

**What I take, what I change.** I keep the layered horizon, the low-saturation-with-one-warm-accent lighting logic, corner botanical framing, lantern scale-as-depth, and the sky-as-negative-space typography. I discard the specific palace, car, couple, and lettering entirely and reinterpret them as original illustrations in a consistent hand-painted style. The static poster becomes a scroll-driven book: each section is a new painted plate, and the lanterns become the connective thread that rises from the hero all the way to the footer.

## Experience structure (single scrolling page, mobile-first)

1. **Hero — 100vh** Painted palace courtyard at dawn. Parallax sky, drifting clouds, lanterns rising on staggered loops, petals falling, birds crossing, soft glowing serif title arched in the sky's negative space, "Save the Date" CTA with gold-foil shimmer.
2. **The Couple** Editorial two-column-on-desktop / stacked-on-mobile watercolor portrait cards with painted paper texture and staggered scroll reveal.
3. **Countdown** Glassmorphic panels with soft gold borders, animated flip digits, lantern bokeh behind.
4. **Wedding Details** Four painted cards — Date, Time, Venue, Dress Code — plus Add to Calendar (.ics download) and Get Directions (maps link), and an illustrated map plate.
5. **Story Timeline** Illustrated chapters connected by a floral vine that draws itself as you scroll (SVG path-length animation).
6. **Gallery** Magazine/asymmetric layout, watercolor frames, gentle float and hover glow, lightbox.
7. **Footer** Painted sunset, lanterns rising off-screen, subtle aurora glow, handwritten closing blessing, "Made with love".

Guest wishes are omitted per your answer. All names, dates, venue and story copy ship as elegant, clearly-marked placeholder text (a fictional couple and date) in one `src/content/invitation.ts` file so any of it can be swapped in seconds without touching components.

## Illustration pack

Every asset generated to one style brief: *Indian gouache-and-watercolor storybook plate, hand-painted texture, golden-hour backlight, pastel blush/peach/lavender sky with sandstone and sage, no photorealism, no flat vector.*

**Backgrounds (JPG):** dawn sky, dusk sky, watercolor cloud band, palace courtyard, royal garden, marble floor, painted hills, water reflection.
**Architecture (in-scene + standalone PNG):** original domed palace facade, royal gate, arch, balcony, fountain, garden wall.
**Decorative (transparent PNG):** lantern (3 variants), petals sheet, bougainvillea branch (2), lotus, hanging floral vine, butterfly (2), bird flock, leaf sprigs, gold flourishes, cloud wisps, sparkle sheet, light ray, bokeh.
**Vehicle:** an original vintage open-top wedding car, different silhouette, colour and framing from the reference.
**Couple:** original bride and groom, six plates — holding hands, watching lanterns, walking, dancing, seated, portrait pair.
**Environment:** trees, bushes, stone path, marble texture, garden flowers, string lighting.
**UI textures:** watercolor paper, gold foil, canvas grain, floral border, decorative separators.

Each asset is generated with its own written prompt, and the full prompt list plus filenames ships as `ASSETS.md` (the asset manifest) alongside `ANIMATIONS.md` (motion specs: durations, easings, loop offsets, parallax depths).

## Motion design

Framer Motion throughout: lantern loops with randomized offsets, cloud drift, petal fall, vine draw-on, tree sway, soft hero zoom, shimmer sweeps on gold type, scroll-linked parallax on three depth layers, scroll-reveal on every card, hover glow. Everything respects `prefers-reduced-motion`, animations are transform/opacity only, and off-screen loops pause so scrolling holds 60 FPS.

## Ideas that go beyond the original poster

- **Tap a lantern to release a wish** — it rises with a small burst of sparkles and a whispered blessing appears.
- **Sky that follows the reader** — the sky palette shifts dawn → noon → dusk as you scroll, so the story literally passes through a day.
- **Turning-page section transitions** with a paper-grain wipe.
- **Ambient sitar/shehnai loop** behind a small, clearly-labelled, default-off toggle.
- **Petal cursor/touch trail** on interaction.
- **Share card** so WhatsApp and Instagram previews show a painted plate rather than a screenshot.

## Technical notes

React 19 + TanStack Start (the project's fixed router), Tailwind v4 tokens in `src/styles.css` (full palette + serif/display font pairing loaded via `<link>` in `__root.tsx`), Framer Motion, shadcn UI primitives, Lucide icons. Aurora used subtly in hero sky and footer only, behind a client-only boundary. Single route at `/` with SEO head metadata and og:image; reusable components under `src/components/invitation/`. Images lazy-loaded with width/height set, decorative PNGs served through Lovable Assets CDN, hero plate preloaded.
