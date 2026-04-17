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

  useEffect(() => {
    if (preselectedPackage) {
      setForm((f) => ({
        ...f,
        package: preselectedPackage.package || "",
        categorie: preselectedPackage.categorie || "",
      }));
    }
  }, [preselectedPackage]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setSubmitted(false);
      setClosing(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => { setClosing(false); onClose(); }, 300);
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) handleClose();
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Nouvelle réservation — ${form.package || "Package World Cup 2026"}`);
    const body = encodeURIComponent(
      `Nouvelle demande de réservation\n\n` +
      `Nom : ${form.nom}\nPrénom : ${form.prenom}\nEmail : ${form.email}\n` +
      `Téléphone : ${form.telephone}\nVille : ${form.ville}\nPackage : ${form.package}\n` +
      `Catégorie : ${form.categorie}\nNombre de personnes : ${form.personnes}\nMessage : ${form.message || "—"}\n`
    );
    window.open(`mailto:${EMAIL_TO}?subject=${subject}&body=${body}`, "_self");
    setSubmitted(true);
  };

  if (!isOpen) return null;

  const inputStyle = {
    width: "100%",
    background: "#f9f9f9",
    border: "1px solid rgba(0,0,0,0.1)",
    padding: "10px 12px",
    fontFamily: "'Barlow', sans-serif",
    fontSize: 13,
    color: "#111",
    outline: "none",
    transition: "border-color .15s ease",
    borderRadius: 8,
    appearance: "none",
    WebkitAppearance: "none",
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 600,
    fontSize: 9,
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    color: "rgba(0,0,0,0.4)",
    marginBottom: 6,
  };

  const fieldFocus = (e) => (e.target.style.borderColor = "#8B0000");
  const fieldBlur = (e) => (e.target.style.borderColor = "rgba(0,0,0,0.1)");

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;900&family=Barlow:wght@300;400&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .booking-input::placeholder { color: rgba(0,0,0,0.25); }
        .booking-input option { background: #fff; color: #111; }
        @media (max-width: 640px) {
          .booking-form-layout { flex-direction: column !important; }
          .booking-form-layout > div:first-child { width: 100% !important; padding: 28px 20px !important; }
          .booking-fields-grid { grid-template-columns: 1fr !important; }
          .booking-fields-grid > div:last-child { grid-column: span 1 !important; }
          .submit-row { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>

      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={handleOverlayClick}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
          backgroundColor: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          opacity: closing ? 0 : 1,
          transition: "opacity .3s ease",
        }}
      >
        {/* Modal */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 860,
            maxHeight: "92vh",
            overflowY: "auto",
            background: "#ffffff",
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: 16,
            opacity: closing ? 0 : 1,
            transform: closing ? "scale(0.97) translateY(12px)" : "scale(1) translateY(0)",
            transition: "opacity .3s ease, transform .3s ease",
          }}
        >
          {/* Top red accent */}
          <div style={{
            height: 3,
            background: "linear-gradient(90deg, #8B0000 0%, rgba(139,0,0,0.3) 60%, transparent 100%)",
            borderRadius: "16px 16px 0 0",
          }} />

          {/* Close */}
          <button
            onClick={handleClose}
            aria-label="Fermer"
            style={{
              position: "absolute",
              top: 18,
              right: 18,
              zIndex: 10,
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.05)",
              border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: 999,
              cursor: "pointer",
              color: "rgba(0,0,0,0.35)",
              transition: "border-color .15s, color .15s, background .15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,0,0,0.25)";
              e.currentTarget.style.color = "#111";
              e.currentTarget.style.background = "rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)";
              e.currentTarget.style.color = "rgba(0,0,0,0.35)";
              e.currentTarget.style.background = "rgba(0,0,0,0.05)";
            }}
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M2 2l10 10M12 2L2 12" />
            </svg>
          </button>

          {submitted ? (
            /* Success */
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "72px 32px",
              textAlign: "center",
            }}>
              <div style={{
                width: 56,
                height: 56,
                background: "rgba(139,0,0,0.08)",
                border: "1px solid rgba(139,0,0,0.25)",
                borderRadius: 999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
              }}>
                <svg width="22" height="22" viewBox="0 0 28 28" fill="none" stroke="#8B0000" strokeWidth="2.2">
                  <path d="M6 14l6 6L22 8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 900,
                fontSize: 28,
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
                color: "#111",
                margin: "0 0 10px",
              }}>
                Demande envoyée
              </h3>
              <p style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 300,
                fontSize: 14,
                color: "rgba(0,0,0,0.45)",
                maxWidth: 300,
                lineHeight: 1.75,
                margin: "0 0 28px",
              }}>
                Notre équipe vous contactera sous 24h pour finaliser votre réservation.
              </p>
              <button
                onClick={handleClose}
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 900,
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#fff",
                  background: "#8B0000",
                  border: "none",
                  borderRadius: 999,
                  cursor: "pointer",
                  padding: "12px 28px",
                  transition: "background .15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#6a0000")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#8B0000")}
              >
                Fermer
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "row" }}
              className="booking-form-layout"
            >
              {/* Left branding panel */}
              <div style={{
                width: 240,
                flexShrink: 0,
                background: "#8B0000",
                borderRight: "1px solid rgba(0,0,0,0.06)",
                padding: "36px 28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: "0 0 0 16px",
              }}>
                <div>
                  {/* Ticket icon */}
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <line x1="8" y1="5" x2="8" y2="19" strokeDasharray="3 3" />
                    </svg>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <div style={{ width: 18, height: 1, background: "rgba(255,255,255,0.4)" }} />
                    <span style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 600,
                      fontSize: 9,
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.7)",
                    }}>
                      World Cup 2026
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(22px, 2.5vw, 30px)",
                    lineHeight: 1.1,
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                    color: "#fff",
                    margin: "0 0 14px",
                  }}>
                    Réservez<br />
                    <span style={{ color: "rgba(255,255,255,0.6)" }}>votre place</span>
                  </h3>

                  <p style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontWeight: 300,
                    fontSize: 12,
                    lineHeight: 1.75,
                    color: "rgba(255,255,255,0.55)",
                  }}>
                    Remplissez le formulaire. Notre équipe vous recontactera sous 24h pour confirmer votre réservation.
                  </p>
                </div>

                <div style={{
                  marginTop: 32,
                  paddingTop: 20,
                  borderTop: "1px solid rgba(255,255,255,0.15)",
                }}>
                  <p style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 600,
                    fontSize: 9,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.35)",
                    lineHeight: 1.8,
                  }}>
                    Public Events × Leonis Travel<br />
                    Casablanca — Maroc
                  </p>
                </div>
              </div>

              {/* Right fields */}
              <div style={{ flex: 1, padding: "32px 28px", minWidth: 0, background: "#fff", borderRadius: "0 0 16px 0" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "14px 18px",
                    marginBottom: 14,
                  }}
                  className="booking-fields-grid"
                >
                  {[
                    { name: "nom", label: "Nom *", required: true, placeholder: "El Amrani", type: "text" },
                    { name: "prenom", label: "Prénom *", required: true, placeholder: "Yassine", type: "text" },
                    { name: "email", label: "Email *", required: true, placeholder: "yassine@email.com", type: "email" },
                    { name: "telephone", label: "Téléphone *", required: true, placeholder: "+212 6XX XXX XXX", type: "tel" },
                    { name: "ville", label: "Ville", required: false, placeholder: "Casablanca", type: "text" },
                  ].map((f) => (
                    <div key={f.name}>
                      <label style={labelStyle}>{f.label}</label>
                      <input
                        name={f.name}
                        type={f.type}
                        required={f.required}
                        value={form[f.name]}
                        onChange={handleChange}
                        onFocus={fieldFocus}
                        onBlur={fieldBlur}
                        placeholder={f.placeholder}
                        className="booking-input"
                        style={inputStyle}
                      />
                    </div>
                  ))}

                  {/* Personnes */}
                  <div>
                    <label style={labelStyle}>Personnes</label>
                    <div style={{ position: "relative" }}>
                      <select
                        name="personnes"
                        value={form.personnes}
                        onChange={handleChange}
                        onFocus={fieldFocus}
                        onBlur={fieldBlur}
                        className="booking-input"
                        style={{ ...inputStyle, paddingRight: 32, cursor: "pointer" }}
                      >
                        {[1,2,3,4,5,6,7,8].map((n) => (
                          <option key={n} value={n}>{n} {n === 1 ? "personne" : "personnes"}</option>
                        ))}
                      </select>
                      <svg style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1.6" strokeLinecap="round"><path d="M3 5l4 4 4-4"/></svg>
                    </div>
                  </div>

                  {/* Package */}
                  <div>
                    <label style={labelStyle}>Package</label>
                    <div style={{ position: "relative" }}>
                      <select
                        name="package"
                        value={form.package}
                        onChange={handleChange}
                        onFocus={fieldFocus}
                        onBlur={fieldBlur}
                        className="booking-input"
                        style={{ ...inputStyle, paddingRight: 32, cursor: "pointer" }}
                      >
                        <option value="">Choisir un package</option>
                        <option value="Package 1 — Brésil vs Maroc (New York)">Package 1 — Brésil vs Maroc</option>
                        <option value="Package 2 — 2 Matchs Maroc (NY + Boston)">Package 2 — 2 Matchs Maroc</option>
                      </select>
                      <svg style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1.6" strokeLinecap="round"><path d="M3 5l4 4 4-4"/></svg>
                    </div>
                  </div>

                  {/* Catégorie */}
                  <div>
                    <label style={labelStyle}>Catégorie</label>
                    <div style={{ position: "relative" }}>
                      <select
                        name="categorie"
                        value={form.categorie}
                        onChange={handleChange}
                        onFocus={fieldFocus}
                        onBlur={fieldBlur}
                        className="booking-input"
                        style={{ ...inputStyle, paddingRight: 32, cursor: "pointer" }}
                      >
                        <option value="">Choisir une catégorie</option>
                        <option value="Corner / Goal">Corner / Goal</option>
                        <option value="Sup Longside">Sup Longside</option>
                      </select>
                      <svg style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1.6" strokeLinecap="round"><path d="M3 5l4 4 4-4"/></svg>
                    </div>
                  </div>

                  {/* Message */}
                  <div style={{ gridColumn: "span 2" }}>
                    <label style={labelStyle}>Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      rows={3}
                      onChange={handleChange}
                      onFocus={fieldFocus}
                      onBlur={fieldBlur}
                      placeholder="Précisions, demandes spéciales..."
                      className="booking-input"
                      style={{ ...inputStyle, resize: "none" }}
                    />
                  </div>
                </div>

                {/* Submit row */}
                <div
                  className="submit-row"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    flexWrap: "wrap",
                    paddingTop: 16,
                    borderTop: "1px solid rgba(0,0,0,0.07)",
                  }}
                >
                  <p style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontWeight: 300,
                    fontSize: 10,
                    color: "rgba(0,0,0,0.3)",
                    maxWidth: 260,
                    lineHeight: 1.6,
                    margin: 0,
                  }}>
                    En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe.
                  </p>
                  <button
                    type="submit"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 900,
                      fontSize: 10,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#fff",
                      background: "#8B0000",
                      border: "none",
                      borderRadius: 999,
                      cursor: "pointer",
                      padding: "13px 28px",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      flexShrink: 0,
                      transition: "background .15s ease, transform .15s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#6a0000"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#8B0000"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    Envoyer ma demande
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6h8M7 3l3 3-3 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}