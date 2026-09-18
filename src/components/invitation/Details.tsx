import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CalendarPlus, ChevronDown, Download, ExternalLink, MapPin, Shirt, Sparkles } from "lucide-react";
const mapPlate = "https://media.invitestory.in/ever-after-bloom/src/assets/map-plate.jpg";
const car = "https://media.invitestory.in/ever-after-bloom/src/assets/wedding-car.png";
import { invitation } from "@/content/invitation";
import { Ornament, Reveal, SectionTitle } from "./Reveal";

function getGoogleCalendarUrl() {
  // 28 January 2027, 4:00 PM IST (16:00 IST is 10:30 UTC)
  // End around 11:00 PM IST (23:00 IST is 17:30 UTC)
  const startUTC = "20270128T103000Z";
  const endUTC = "20270128T173000Z";
  const title = encodeURIComponent(`${invitation.couple.groom} & ${invitation.couple.bride} — Wedding`);
  const details = encodeURIComponent(
    `Wedding of ${invitation.couple.groom} & ${invitation.couple.bride}\n\n` +
      `• Holy Matrimony: 4:00 PM at St. Alphonsa’s Church, Vasant Kunj, New Delhi\n` +
      `• Reception & Dinner: 6:00 PM onwards at Cherish Ballroom, Rubicon Glasshouse\n\n` +
      `Dress Code: ${invitation.dressCode}\n\n` +
      `We look forward to celebrating this blessed occasion with you!`
  );
  const location = encodeURIComponent("St. Alphonsa's Church, Vasant Kunj, New Delhi");
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startUTC}/${endUTC}&details=${details}&location=${location}`;
}

function downloadIcs() {
  const icsLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Roshan & Indira Wedding//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:roshan-indira-wedding-20270128@invitingyou.top",
    "DTSTAMP:20260918T000000Z",
    "DTSTART:20270128T103000Z",
    "DTEND:20270128T173000Z",
    `SUMMARY:${invitation.couple.groom} & ${invitation.couple.bride} — Wedding`,
    `DESCRIPTION:Holy Matrimony at St. Alphonsa’s Church, Vasant Kunj (4:00 PM) followed by Wedding Reception at Cherish Ballroom, Rubicon Glasshouse (6:00 PM).`,
    `LOCATION:St. Alphonsa’s Church, Vasant Kunj, New Delhi`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsLines], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "roshan-indira-wedding.ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

const cards = [
  { icon: Sparkles, label: "The Day", title: invitation.dateLabel, subtitle: "Save this auspicious date" },
  {
    icon: MapPin,
    label: "Holy Matrimony",
    title: invitation.venue.name,
    subtitle: `${invitation.venue.address} · ${invitation.venue.time}`,
  },
  {
    icon: MapPin,
    label: "Wedding Reception",
    title: invitation.venue.receptionName,
    subtitle: `${invitation.venue.receptionAddress} · ${invitation.venue.receptionTime}`,
  },
  {
    icon: Shirt,
    label: "Dress Code",
    title: invitation.dressCode,
    subtitle: "Formal Elegance / Black Tie & Indian Chic",
  },
];

export function Details() {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendarMenuRef = useRef<HTMLDivElement>(null);

  const churchMaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    invitation.venue.mapsQuery,
  )}`;
  const receptionMaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    invitation.venue.receptionMapsQuery,
  )}`;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarMenuRef.current && !calendarMenuRef.current.contains(event.target as Node)) {
        setCalendarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section id="details" className="relative overflow-hidden px-5 py-24">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--peach) 26%, var(--ivory)) 0%, var(--cream) 45%, var(--ivory) 100%)",
        }}
      />
      <div className="mx-auto max-w-4xl">
        <SectionTitle eyebrow="Chapter Two" title="Where the story gathers" />
        <Ornament className="mt-8" />

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="plate paper-grain h-full rounded-[1.6rem] px-6 py-7"
              >
                <c.icon className="text-gold-deep" size={20} strokeWidth={1.4} />
                <p className="mt-4 font-sans text-[0.6rem] tracking-[0.36em] text-gold-deep uppercase">
                  {c.label}
                </p>
                <p className="mt-2 font-display text-xl leading-snug text-primary">{c.title}</p>
                <p className="mt-1 font-sans text-xs text-muted-foreground">{c.subtitle}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Action Buttons: Add to Calendar & Map Directions */}
        <Reveal delay={0.1} className="mt-8 flex flex-wrap justify-center gap-3">
          {/* Calendar Dropdown Container */}
          <div className="relative" ref={calendarMenuRef}>
            <motion.button
              type="button"
              onClick={() => setCalendarOpen((v) => !v)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-sans text-[0.66rem] tracking-[0.24em] text-primary-foreground uppercase shadow-md cursor-pointer"
              aria-expanded={calendarOpen}
            >
              <CalendarPlus size={15} strokeWidth={1.6} /> Add to Calendar
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${calendarOpen ? "rotate-180" : ""}`}
              />
            </motion.button>

            <AnimatePresence>
              {calendarOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 mt-2 z-30 w-64 rounded-2xl border border-gold/30 bg-white/95 p-2 shadow-2xl backdrop-blur-md"
                >
                  <a
                    href={getGoogleCalendarUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setCalendarOpen(false)}
                    className="flex items-center justify-between gap-2 rounded-xl px-4 py-2.5 text-xs text-primary font-sans hover:bg-gold/15 transition"
                  >
                    <span className="font-medium">Google Calendar</span>
                    <ExternalLink size={14} className="text-gold-deep" />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      downloadIcs();
                      setCalendarOpen(false);
                    }}
                    className="w-full flex items-center justify-between gap-2 rounded-xl px-4 py-2.5 text-xs text-primary font-sans hover:bg-gold/15 transition text-left cursor-pointer"
                  >
                    <span className="font-medium">Apple / Outlook (.ics)</span>
                    <Download size={14} className="text-gold-deep" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.a
            href={churchMaps}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="glass-plate inline-flex items-center gap-2 rounded-full px-6 py-3 font-sans text-[0.66rem] tracking-[0.24em] text-primary uppercase"
          >
            <MapPin size={15} strokeWidth={1.6} /> Directions to Church
          </motion.a>
          <motion.a
            href={receptionMaps}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="glass-plate inline-flex items-center gap-2 rounded-full px-6 py-3 font-sans text-[0.66rem] tracking-[0.24em] text-primary uppercase"
          >
            <MapPin size={15} strokeWidth={1.6} /> Directions to Reception
          </motion.a>
        </Reveal>

        {/* Illustrated map plate with the wedding car rolling in */}
        <Reveal delay={0.14} className="mt-12">
          <div className="plate relative overflow-hidden rounded-[2rem]">
            <img
              src={mapPlate}
              alt="Hand-painted illustrated wedding venue map with St. Alphonsa’s Church & Cherish Ballroom marked"
              loading="lazy"
              width={1280}
              height={1024}
              className="h-64 w-full object-cover sm:h-80"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(0deg, color-mix(in oklab, var(--cream) 55%, transparent), transparent 55%)",
              }}
            />
            <motion.img
              src={car}
              alt=""
              aria-hidden
              loading="lazy"
              width={1175}
              height={567}
              className="absolute bottom-2 left-0 w-40 sm:w-56"
              initial={{ x: -80, opacity: 0 }}
              whileInView={{ x: 24, opacity: 1 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
