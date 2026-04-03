"use client";
import { useState, useEffect, useRef } from "react";

const EMAIL_TO = "contact@leonistravelmaroc.com";

export default function BookingFormPopup({ isOpen, onClose, preselectedPackage }) {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    ville: "",
    package: "",
    categorie: "",
    personnes: "1",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [closing, setClosing] = useState(false);
  const overlayRef = useRef(null);

  // Sync preselected package
  useEffect(() => {
    if (preselectedPackage) {
      setForm((f) => ({
        ...f,
        package: preselectedPackage.package || "",
        categorie: preselectedPackage.categorie || "",
      }));
    }
  }, [preselectedPackage]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setSubmitted(false);
      setClosing(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 300);
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) handleClose();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build mailto with form data
    const subject = encodeURIComponent(
      `Nouvelle réservation — ${form.package || "Package World Cup 2026"}`
    );
    const body = encodeURIComponent(
      `Nouvelle demande de réservation\n\n` +
      `Nom : ${form.nom}\n` +
      `Prénom : ${form.prenom}\n` +
      `Email : ${form.email}\n` +
      `Téléphone : ${form.telephone}\n` +
      `Ville : ${form.ville}\n` +
      `Package : ${form.package}\n` +
      `Catégorie : ${form.categorie}\n` +
      `Nombre de personnes : ${form.personnes}\n` +
      `Message : ${form.message || "—"}\n`
    );

    window.open(`mailto:${EMAIL_TO}?subject=${subject}&body=${body}`, "_self");
    setSubmitted(true);
  };

  if (!isOpen) return null;

  const animClass = closing
    ? "opacity-0 scale-[0.97]"
    : "opacity-100 scale-100";

  const overlayAnim = closing ? "opacity-0" : "opacity-100";

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 transition-opacity duration-300 ${overlayAnim}`}
      style={{ backgroundColor: "rgba(6,6,18,0.85)", backdropFilter: "blur(8px)" }}
    >
      <div
        className={`relative w-full max-w-[920px] max-h-[92vh] overflow-y-auto rounded-2xl border border-[#e8c96b]/20 bg-gradient-to-br from-[#161628] to-[#0e0e1c] shadow-2xl transition-all duration-300 ease-out ${animClass}`}
      >
        {/* Gold top line */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#e8c96b] to-transparent" />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all"
          aria-label="Fermer"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M2 2l10 10M12 2L2 12" />
          </svg>
        </button>

        {submitted ? (
          /* ── Success state ── */
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-14 h-14 rounded-full bg-[#e8c96b]/15 flex items-center justify-center mb-5">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#e8c96b" strokeWidth="2.2">
                <path d="M6 14l6 6L22 8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="font-['Bebas_Neue'] text-3xl text-white mb-2">Demande envoyée</h3>
            <p className="text-sm text-white/40 max-w-xs mb-6">
              Notre équipe vous contactera sous 24h pour finaliser votre réservation.
            </p>
            <button
              onClick={handleClose}
              className="text-[11px] font-bold tracking-[.22em] uppercase px-6 py-3 rounded-xl border border-[#e8c96b]/35 text-[#e8c96b] hover:bg-[#e8c96b]/10 transition-colors"
            >
              Fermer
            </button>
          </div>
        ) : (
          /* ── Form — landscape layout ── */
          <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row">
            {/* Left side — branding */}
            <div className="lg:w-[280px] shrink-0 px-6 py-6 lg:py-8 lg:px-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/6">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-6 h-[2px] bg-[#e8c96b] rounded" />
                  <span className="text-[9px] font-bold tracking-[.3em] uppercase text-[#e8c96b]">
                    World Cup 2026
                  </span>
                </div>
                <h3 className="font-['Bebas_Neue'] text-[clamp(28px,4vw,38px)] text-white leading-[.95] mb-2">
                  Réservez<br />
                  <span className="text-[#e8c96b]">votre place</span>
                </h3>
                <p className="text-xs text-white/30 leading-relaxed">
                  Remplissez le formulaire ci-dessous. Notre équipe dédiée vous recontactera pour confirmer votre réservation.
                </p>
              </div>
              <div className="hidden lg:block mt-8">
                <p className="text-[10px] text-white/20 leading-relaxed">
                  Public Events × Leonis Travel<br />
                  Casablanca — Maroc
                </p>
              </div>
            </div>

            {/* Right side — fields */}
            <div className="flex-1 px-6 py-5 lg:py-7 lg:px-8">
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {/* Nom */}
                <div className="col-span-1">
                  <label className="block text-[9px] font-bold tracking-[.25em] uppercase text-white/25 mb-1">Nom *</label>
                  <input
                    name="nom"
                    required
                    value={form.nom}
                    onChange={handleChange}
                    className="w-full bg-white/[0.04] border border-white/8 rounded-lg px-3 py-2 text-[13px] text-white placeholder-white/20 outline-none focus:border-[#e8c96b]/40 transition-colors"
                    placeholder="El Amrani"
                  />
                </div>

                {/* Prénom */}
                <div className="col-span-1">
                  <label className="block text-[9px] font-bold tracking-[.25em] uppercase text-white/25 mb-1">Prénom *</label>
                  <input
                    name="prenom"
                    required
                    value={form.prenom}
                    onChange={handleChange}
                    className="w-full bg-white/[0.04] border border-white/8 rounded-lg px-3 py-2 text-[13px] text-white placeholder-white/20 outline-none focus:border-[#e8c96b]/40 transition-colors"
                    placeholder="Yassine"
                  />
                </div>

                {/* Email */}
                <div className="col-span-1">
                  <label className="block text-[9px] font-bold tracking-[.25em] uppercase text-white/25 mb-1">Email *</label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-white/[0.04] border border-white/8 rounded-lg px-3 py-2 text-[13px] text-white placeholder-white/20 outline-none focus:border-[#e8c96b]/40 transition-colors"
                    placeholder="yassine@email.com"
                  />
                </div>

                {/* Téléphone */}
                <div className="col-span-1">
                  <label className="block text-[9px] font-bold tracking-[.25em] uppercase text-white/25 mb-1">Téléphone *</label>
                  <input
                    name="telephone"
                    type="tel"
                    required
                    value={form.telephone}
                    onChange={handleChange}
                    className="w-full bg-white/[0.04] border border-white/8 rounded-lg px-3 py-2 text-[13px] text-white placeholder-white/20 outline-none focus:border-[#e8c96b]/40 transition-colors"
                    placeholder="+212 6XX XXX XXX"
                  />
                </div>

                {/* Ville */}
                <div className="col-span-1">
                  <label className="block text-[9px] font-bold tracking-[.25em] uppercase text-white/25 mb-1">Ville</label>
                  <input
                    name="ville"
                    value={form.ville}
                    onChange={handleChange}
                    className="w-full bg-white/[0.04] border border-white/8 rounded-lg px-3 py-2 text-[13px] text-white placeholder-white/20 outline-none focus:border-[#e8c96b]/40 transition-colors"
                    placeholder="Casablanca"
                  />
                </div>

                {/* Nombre de personnes */}
                <div className="col-span-1">
                  <label className="block text-[9px] font-bold tracking-[.25em] uppercase text-white/25 mb-1">Personnes</label>
                  <div className="relative">
                    <select
                      name="personnes"
                      value={form.personnes}
                      onChange={handleChange}
                      className="w-full bg-white/[0.04] border border-white/8 rounded-lg px-3 pr-9 py-2 text-[13px] text-white outline-none focus:border-[#e8c96b]/40 transition-colors appearance-none cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n} className="bg-[#1c1c2e] text-white">
                          {n} {n === 1 ? "personne" : "personnes"}
                        </option>
                      ))}
                    </select>
                    <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#e8c96b]/50" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5l4 4 4-4"/></svg>
                  </div>
                </div>

                {/* Package */}
                <div className="col-span-1">
                  <label className="block text-[9px] font-bold tracking-[.25em] uppercase text-white/25 mb-1">Package</label>
                  <div className="relative">
                    <select
                      name="package"
                      value={form.package}
                      onChange={handleChange}
                      className="w-full bg-white/[0.04] border border-white/8 rounded-lg px-3 pr-9 py-2 text-[13px] text-white outline-none focus:border-[#e8c96b]/40 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[#1c1c2e] text-white/40">Choisir un package</option>
                      <option value="Package 1 — Brésil vs Maroc (New York)" className="bg-[#1c1c2e] text-white">Package 1 — Brésil vs Maroc</option>
                      <option value="Package 2 — 2 Matchs Maroc (NY + Boston)" className="bg-[#1c1c2e] text-white">Package 2 — 2 Matchs Maroc</option>
                    </select>
                    <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#e8c96b]/50" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5l4 4 4-4"/></svg>
                  </div>
                </div>

                {/* Catégorie */}
                <div className="col-span-1">
                  <label className="block text-[9px] font-bold tracking-[.25em] uppercase text-white/25 mb-1">Catégorie</label>
                  <div className="relative">
                    <select
                      name="categorie"
                      value={form.categorie}
                      onChange={handleChange}
                      className="w-full bg-white/[0.04] border border-white/8 rounded-lg px-3 pr-9 py-2 text-[13px] text-white outline-none focus:border-[#e8c96b]/40 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[#1c1c2e] text-white/40">Choisir une catégorie</option>
                      <option value="Corner / Goal" className="bg-[#1c1c2e] text-white">Corner / Goal</option>
                      <option value="Sup Longside" className="bg-[#1c1c2e] text-white">Sup Longside</option>
                    </select>
                    <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#e8c96b]/50" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5l4 4 4-4"/></svg>
                  </div>
                </div>

                {/* Message — full width */}
                <div className="col-span-2">
                  <label className="block text-[9px] font-bold tracking-[.25em] uppercase text-white/25 mb-1">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={2}
                    className="w-full bg-white/[0.04] border border-white/8 rounded-lg px-3 py-2 text-[13px] text-white placeholder-white/20 outline-none focus:border-[#e8c96b]/40 transition-colors resize-none"
                    placeholder="Précisions, nombre de chambres, demandes spéciales..."
                  />
                </div>
              </div>

              {/* Submit row */}
              <div className="flex items-center justify-between mt-5 gap-4 flex-wrap">
                <p className="text-[10px] text-white/18 leading-relaxed max-w-[280px]">
                  En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe.
                </p>
                <button
                  type="submit"
                  className="text-[11px] font-bold tracking-[.22em] uppercase px-7 py-3 rounded-xl bg-[#e8c96b] text-[#12121f] hover:bg-[#d4b05a] transition-colors shrink-0"
                >
                  Envoyer ma demande
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}