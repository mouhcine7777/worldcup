"use client";
import { useState, useEffect, useRef } from "react";

const GOLD = "text-[#e8c96b]";
const GOLD_BG = "bg-[#e8c96b]";
const GOLD_BORDER = "border-[#e8c96b]/30";

const PACKAGES = [
  {
    id: 1,
    badge: "Disponible",
    featured: false,
    city: "New York",
    matchup: "Brésil vs Maroc",
    dates: "12 – 16 juin 2026",
    duration: "5 jours · 4 nuits",
    includes: [
      "The Gallivant Times Square ★★★★",
      "1 billet inclus",
      "Transferts complets",
      "Petit-déjeuner chaque matin",
    ],
    matches: [
      { date: "13 juin · 18:00", teams: "Brésil vs Maroc", stadium: "MetLife Stadium" },
    ],
    seats: [
      { label: "Corner / Goal", price: 2990 },
      { label: "Sup Longside", price: 3740 },
    ],
    emailSubject: "Réservation Package 1 — Brésil vs Maroc",
    emailBody: "Bonjour, je souhaite réserver le Package 1 (Brésil vs Maroc, New York). Merci de me contacter.",
    waText: "Bonjour, je suis intéressé par le Package 1 (Brésil vs Maroc, New York)",
  },
  {
    id: 2,
    badge: "Le Plus Populaire",
    featured: true,
    city: "NY + Boston",
    matchup: "2 Matchs du Maroc",
    dates: "12 – 20 juin 2026",
    duration: "9 jours · 8 nuits",
    includes: [
      "Gallivant NY + Omni Boston Seaport ★★★★",
      "2 billets inclus",
      "Transferts NY & Boston",
      "Petit-déjeuner chaque matin",
    ],
    matches: [
      { date: "13 juin · 18:00", teams: "Brésil vs Maroc", stadium: "MetLife, New York" },
      { date: "19 juin · 18:00", teams: "Écosse vs Maroc", stadium: "Gillette, Boston" },
    ],
    seats: [
      { label: "Corner / Goal", price: 3690 },
      { label: "Sup Longside", price: 4640 },
    ],
    emailSubject: "Réservation Package 2 — 2 Matchs Maroc",
    emailBody: "Bonjour, je souhaite réserver le Package 2 (2 Matchs Maroc, NY + Boston). Merci de me contacter.",
    waText: "Bonjour, je suis intéressé par le Package 2 (2 Matchs Maroc, NY + Boston)",
  },
];

const EMAIL = "contact@leonistravelmaroc.com";
const WA = "212600000000";

const IconHotel = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="#e8c96b" strokeWidth="1.4">
    <rect x="1" y="4" width="12" height="9" rx="1" />
    <path d="M4 13V8h6v5" />
    <path d="M1 4V2.5A1.5 1.5 0 0 1 2.5 1h9A1.5 1.5 0 0 1 13 2.5V4" />
  </svg>
);
const IconTicket = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="#e8c96b" strokeWidth="1.4">
    <rect x="1" y="3" width="12" height="8" rx="1" />
    <line x1="5" y1="3" x2="5" y2="11" strokeDasharray="2 2" />
  </svg>
);
const IconTransfer = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="#e8c96b" strokeWidth="1.4">
    <rect x="1" y="5" width="12" height="5" rx="1" />
    <circle cx="3.5" cy="10.5" r="1.5" />
    <circle cx="10.5" cy="10.5" r="1.5" />
    <path d="M1 5l2-3h6l2 3" />
  </svg>
);
const IconBreakfast = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="#e8c96b" strokeWidth="1.4">
    <path d="M3 3v4a4 4 0 0 0 8 0V3" />
    <line x1="7" y1="11" x2="7" y2="13" />
    <line x1="4" y1="13" x2="10" y2="13" />
    <path d="M11 3c1 0 2 .5 2 2s-1 2-2 2" />
  </svg>
);

const ICONS = [<IconHotel />, <IconTicket />, <IconTransfer />, <IconBreakfast />];

function useInView() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.06 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function PackageCard({ pkg, visible, delay }) {
  const [seat, setSeat] = useState(0);
  const price = pkg.seats[seat].price;
  const emailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(pkg.emailSubject)}&body=${encodeURIComponent(pkg.emailBody)}`;
  const waHref = `https://wa.me/${WA}?text=${encodeURIComponent(pkg.waText)}`;

  return (
    <div
      className={`flex flex-col rounded-2xl overflow-hidden border transition-all duration-700 ease-out
        bg-gradient-to-b from-[#1c1c2e] to-[#12121f]
        ${pkg.featured ? "border-[#e8c96b]/35" : "border-white/8"}
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"}
      `}
      style={{ transitionDelay: `${delay}s` }}
    >
      {/* Top bar */}
      <div
        className={`h-1 ${pkg.featured
          ? "bg-gradient-to-r from-[#e8c96b] via-[#f0a940] to-[#e8c96b]"
          : "bg-gradient-to-r from-[#e8c96b]/50 to-transparent"
        }`}
      />

      {/* Header */}
      <div className="px-7 pt-6 pb-5">
        <span
          className={`inline-flex items-center gap-1.5 mb-4 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-[.28em] uppercase border
            ${pkg.featured
              ? "bg-[#e8c96b] text-[#12121f] border-[#e8c96b]"
              : "bg-[#e8c96b]/12 text-[#e8c96b] border-[#e8c96b]/30"
            }`}
        >
          {pkg.featured && <span className="w-1.5 h-1.5 rounded-full bg-[#12121f]" />}
          {pkg.badge}
        </span>
        <h3 className="font-['Bebas_Neue'] text-[clamp(36px,4.5vw,54px)] text-white leading-none mb-1">
          {pkg.city}
        </h3>
        <p className="text-sm font-semibold tracking-[.14em] uppercase text-[#e8c96b] mb-1">
          {pkg.matchup}
        </p>
        <p className="text-xs text-white/30 tracking-wide">
          {pkg.dates} · {pkg.duration}
        </p>
      </div>

      <div className="mx-7 h-px bg-white/6" />

      {/* Includes */}
      <div className="px-7 py-4">
        {pkg.includes.map((text, i) => (
          <div key={i} className="flex items-center gap-2.5 py-1.5">
            <div className="w-6 h-6 flex items-center justify-center border border-[#e8c96b]/20 rounded-md shrink-0">
              {ICONS[i]}
            </div>
            <span className="text-[13px] text-white/60">{text}</span>
          </div>
        ))}
      </div>

      <div className="mx-7 h-px bg-white/6" />

      {/* Matches */}
      <div className="px-7 py-4">
        <p className="text-[10px] font-bold tracking-[.25em] uppercase text-white/25 mb-2.5">Matchs</p>
        <div className="flex flex-col gap-2">
          {pkg.matches.map((m, i) => (
            <div key={i} className="flex items-center gap-2 flex-wrap bg-white/6 rounded-lg px-3 py-2">
              <span className="text-[11px] font-bold tracking-[.18em] uppercase text-[#e8c96b] bg-[#e8c96b]/12 px-2 py-0.5 rounded">
                {m.date}
              </span>
              <span className="text-[13px] font-semibold tracking-wide text-white/85">{m.teams}</span>
              <span className="text-[11px] text-white/35 ml-auto">{m.stadium}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-7 h-px bg-white/6" />

      {/* Seat selector */}
      <div className="px-7 py-4">
        <p className="text-[10px] font-bold tracking-[.25em] uppercase text-white/25 mb-2.5">Catégorie</p>
        <div className="flex gap-2 flex-wrap">
          {pkg.seats.map((s, i) => (
            <button
              key={i}
              onClick={() => setSeat(i)}
              className={`flex flex-col gap-0.5 text-left px-3.5 py-2 rounded-lg border text-[11px] font-bold tracking-[.15em] uppercase transition-all duration-200
                ${seat === i
                  ? "border-[#e8c96b]/70 bg-[#e8c96b]/12 text-[#e8c96b]"
                  : "border-white/10 text-white/35 hover:border-white/25 hover:text-white/60"
                }`}
            >
              {s.label}
              <strong className="text-[15px] tracking-normal font-bold">
                {s.price.toLocaleString("fr-FR")} €
              </strong>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto px-7 pt-5 pb-6 border-t border-white/6 flex items-end justify-between gap-3 flex-wrap">
        <div>
          <p className="text-[10px] tracking-[.2em] uppercase text-white/25 mb-1">À partir de</p>
          <p className="font-['Bebas_Neue'] text-[clamp(40px,5vw,56px)] text-[#e8c96b] leading-none">
            {price.toLocaleString("fr-FR")} €
          </p>
          <p className="text-[10px] tracking-[.1em] uppercase text-white/25 mt-1">
            TTC / personne · Vols non inclus
          </p>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <a
            href={emailHref}
            className="text-[11px] font-bold tracking-[.22em] uppercase px-5 py-3 rounded-xl bg-[#e8c96b] text-[#12121f] hover:bg-[#d4b05a] transition-colors"
          >
            Réserver maintenant
          </a>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-semibold tracking-[.2em] uppercase px-4 py-2 rounded-lg border border-white/12 text-white/40 hover:text-white/70 hover:border-white/25 transition-all"
          >
            WhatsApp →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PackagesSection() {
  const [ref, visible] = useInView();

  return (
    <section id="packages" ref={ref} className="relative bg-[#0d0d1a] px-[clamp(20px,6vw,80px)] py-[clamp(48px,7vw,96px)] overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(232,201,107,0.1),transparent)] pointer-events-none" />

      {/* Header */}
      <div
        className={`relative z-10 mb-[clamp(32px,5vw,56px)] transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-0.5 bg-[#e8c96b] rounded" />
          <span className="text-[10px] font-bold tracking-[.32em] uppercase text-[#e8c96b]">
            Packages Officiels · Lions de l'Atlas · Coupe du Monde 2026
          </span>
        </div>
        <h2 className="font-['Bebas_Neue'] text-[clamp(44px,7vw,84px)] text-white leading-[.95] mb-3">
          Choisissez votre<br />
          <span className="text-[#e8c96b]">aventure</span>
        </h2>
        <p className="text-[clamp(13px,1.4vw,15px)] font-light leading-relaxed text-white/40 max-w-md">
          Deux formules tout-inclus pour vivre la Coupe du Monde avec les Lions de l'Atlas — billets, hôtel 4★ et transferts.
        </p>
      </div>

      {/* Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5">
        {PACKAGES.map((pkg, i) => (
          <PackageCard key={pkg.id} pkg={pkg} visible={visible} delay={0.15 + i * 0.15} />
        ))}
      </div>

      {/* Bottom strip */}
      <div
        className={`relative z-10 mt-10 pt-7 border-t border-white/6 flex items-center justify-between flex-wrap gap-4 transition-opacity duration-700 delay-500 ${visible ? "opacity-100" : "opacity-0"}`}
      >
        <div>
          <p className="text-sm font-light text-white/30 mb-1">Besoin d'un accompagnement personnalisé ?</p>
          <p className="text-sm text-white/60">
            <strong className="font-medium text-white/85">Public Events × Leonis Travel</strong> — votre équipe dédiée à Casablanca
          </p>
        </div>
        <a
          href={`mailto:${EMAIL}?subject=${encodeURIComponent("Demande d'information — World Cup 26 Package Maroc")}`}
          className="text-[11px] font-bold tracking-[.22em] uppercase px-6 py-3 rounded-xl border border-[#e8c96b]/35 text-[#e8c96b] hover:bg-[#e8c96b]/10 transition-colors"
        >
          Demander un devis →
        </a>
      </div>

      {/* Disclaimer */}
      <p className="relative z-10 mt-4 text-[10px] font-light text-white/18 leading-relaxed">
        * L'hôtel mentionné est susceptible d'être remplacé par un établissement de standing similaire ou supérieur. Prix TTC par personne. Vols non inclus.
      </p>
    </section>
  );
}