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
    background: "rgba(0,0,0,0.03)",
    border: "1px solid rgba(0,0,0,0.1)",
    padding: "10px 12px",
    fontFamily: "'Barlow', sans-serif",
    fontSize: 13,
    color: "#111",
    outline: "none",
    transition: "border-color .15s ease",
    borderRadius: 0,
    appearance: "none",
    WebkitAppearance: "none",
  };

  const labelStyle = {
    display: "block",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 600,
    fontSize: 9,
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    color: "rgba(0,0,0,0.28)",
    marginBottom: 6,
  };

  const fieldFocus = (e) => (e.target.style.borderColor = "#C1272D");
  const fieldBlur = (e) => (e.target.style.borderColor = "rgba(0,0,0,0.1)");

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;900&family=Barlow:wght@300;400&display=swap"
        rel="stylesheet"
      />

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
          backgroundColor: "rgba(13,31,13,0.82)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          opacity: closing ? 0 : 1,
          transition: "opacity .3s ease",
        }}
      >
        {/* Modal */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 920,
            maxHeight: "92vh",
            overflowY: "auto",
            background: "#F7F4F0",
            border: "1px solid rgba(0,0,0,0.08)",
            opacity: closing ? 0 : 1,
            transform: closing ? "scale(0.97)" : "scale(1)",
            transition: "opacity .3s ease, transform .3s ease",
          }}
        >
          {/* Top red accent */}
          <div style={{ height: 3, background: "#C1272D" }} />

          {/* Close */}
          <button
            onClick={handleClose}
            aria-label="Fermer"
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 10,
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              border: "1px solid rgba(0,0,0,0.12)",
              cursor: "pointer",
              color: "rgba(0,0,0,0.35)",
              transition: "border-color .15s, color .15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C1272D"; e.currentTarget.style.color = "#C1272D"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)"; e.currentTarget.style.color = "rgba(0,0,0,0.35)"; }}
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M2 2l10 10M12 2L2 12" />
            </svg>
          </button>

          {submitted ? (
            /* Success */
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "72px 32px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  background: "rgba(193,39,45,0.08)",
                  border: "1px solid rgba(193,39,45,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <svg width="22" height="22" viewBox="0 0 28 28" fill="none" stroke="#C1272D" strokeWidth="2.2">
                  <path d="M6 14l6 6L22 8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 900,
                  fontSize: 28,
                  textTransform: "uppercase",
                  letterSpacing: "-0.01em",
                  color: "#111",
                  margin: "0 0 8px",
                }}
              >
                Demande envoyée
              </h3>
              <p
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 300,
                  fontSize: 13,
                  color: "rgba(0,0,0,0.45)",
                  maxWidth: 300,
                  lineHeight: 1.7,
                  margin: "0 0 28px",
                }}
              >
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
                  color: "#C1272D",
                  background: "transparent",
                  border: "1px solid rgba(193,39,45,0.3)",
                  cursor: "pointer",
                  padding: "11px 24px",
                  transition: "background .15s, border-color .15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(193,39,45,0.06)"; e.currentTarget.style.borderColor = "#C1272D"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(193,39,45,0.3)"; }}
              >
                Fermer
              </button>
            </div>
          ) : (
            /* Form */
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "row" }}
              className="booking-form-layout"
            >
              {/* Left — branding panel */}
              <div
                style={{
                  width: 260,
                  flexShrink: 0,
                  background: "#0d1f0d",
                  padding: "36px 28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                    <div style={{ width: 20, height: 1, background: "#C1272D" }} />
                    <span
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 600,
                        fontSize: 9,
                        letterSpacing: "0.28em",
                        textTransform: "uppercase",
                        color: "#C1272D",
                      }}
                    >
                      World Cup 2026
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 900,
                      fontSize: "clamp(26px,3vw,36px)",
                      lineHeight: 0.92,
                      textTransform: "uppercase",
                      letterSpacing: "-0.01em",
                      color: "#fff",
                      margin: "0 0 14px",
                    }}
                  >
                    Réservez<br />
                    <span style={{ color: "#C1272D" }}>votre place</span>
                  </h3>

                  <p
                    style={{
                      fontFamily: "'Barlow', sans-serif",
                      fontWeight: 300,
                      fontSize: 12,
                      lineHeight: 1.75,
                      color: "rgba(255,255,255,0.38)",
                    }}
                  >
                    Remplissez le formulaire. Notre équipe vous recontactera sous 24h pour confirmer votre réservation.
                  </p>
                </div>

                <div
                  style={{
                    marginTop: 32,
                    paddingTop: 20,
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 600,
                      fontSize: 9,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.2)",
                      lineHeight: 1.8,
                    }}
                  >
                    Public Events × Leonis Travel<br />
                    Casablanca — Maroc
                  </p>
                </div>
              </div>

              {/* Right — fields */}
              <div
                style={{
                  flex: 1,
                  padding: "36px 32px",
                  background: "#F7F4F0",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px 20px",
                    marginBottom: 16,
                  }}
                  className="booking-fields-grid"
                >
                  {/* Nom */}
                  <div>
                    <label style={labelStyle}>Nom *</label>
                    <input
                      name="nom" required value={form.nom}
                      onChange={handleChange} onFocus={fieldFocus} onBlur={fieldBlur}
                      style={inputStyle} placeholder="El Amrani"
                    />
                  </div>

                  {/* Prénom */}
                  <div>
                    <label style={labelStyle}>Prénom *</label>
                    <input
                      name="prenom" required value={form.prenom}
                      onChange={handleChange} onFocus={fieldFocus} onBlur={fieldBlur}
                      style={inputStyle} placeholder="Yassine"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input
                      name="email" type="email" required value={form.email}
                      onChange={handleChange} onFocus={fieldFocus} onBlur={fieldBlur}
                      style={inputStyle} placeholder="yassine@email.com"
                    />
                  </div>

                  {/* Téléphone */}
                  <div>
                    <label style={labelStyle}>Téléphone *</label>
                    <input
                      name="telephone" type="tel" required value={form.telephone}
                      onChange={handleChange} onFocus={fieldFocus} onBlur={fieldBlur}
                      style={inputStyle} placeholder="+212 6XX XXX XXX"
                    />
                  </div>

                  {/* Ville */}
                  <div>
                    <label style={labelStyle}>Ville</label>
                    <input
                      name="ville" value={form.ville}
                      onChange={handleChange} onFocus={fieldFocus} onBlur={fieldBlur}
                      style={inputStyle} placeholder="Casablanca"
                    />
                  </div>

                  {/* Personnes */}
                  <div>
                    <label style={labelStyle}>Personnes</label>
                    <div style={{ position: "relative" }}>
                      <select
                        name="personnes" value={form.personnes}
                        onChange={handleChange} onFocus={fieldFocus} onBlur={fieldBlur}
                        style={{ ...inputStyle, paddingRight: 32, cursor: "pointer" }}
                      >
                        {[1,2,3,4,5,6,7,8].map((n) => (
                          <option key={n} value={n}>{n} {n === 1 ? "personne" : "personnes"}</option>
                        ))}
                      </select>
                      <svg style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="1.6" strokeLinecap="round"><path d="M3 5l4 4 4-4"/></svg>
                    </div>
                  </div>

                  {/* Package */}
                  <div>
                    <label style={labelStyle}>Package</label>
                    <div style={{ position: "relative" }}>
                      <select
                        name="package" value={form.package}
                        onChange={handleChange} onFocus={fieldFocus} onBlur={fieldBlur}
                        style={{ ...inputStyle, paddingRight: 32, cursor: "pointer" }}
                      >
                        <option value="">Choisir un package</option>
                        <option value="Package 1 — Brésil vs Maroc (New York)">Package 1 — Brésil vs Maroc</option>
                        <option value="Package 2 — 2 Matchs Maroc (NY + Boston)">Package 2 — 2 Matchs Maroc</option>
                      </select>
                      <svg style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="1.6" strokeLinecap="round"><path d="M3 5l4 4 4-4"/></svg>
                    </div>
                  </div>

                  {/* Catégorie */}
                  <div>
                    <label style={labelStyle}>Catégorie</label>
                    <div style={{ position: "relative" }}>
                      <select
                        name="categorie" value={form.categorie}
                        onChange={handleChange} onFocus={fieldFocus} onBlur={fieldBlur}
                        style={{ ...inputStyle, paddingRight: 32, cursor: "pointer" }}
                      >
                        <option value="">Choisir une catégorie</option>
                        <option value="Corner / Goal">Corner / Goal</option>
                        <option value="Sup Longside">Sup Longside</option>
                      </select>
                      <svg style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="1.6" strokeLinecap="round"><path d="M3 5l4 4 4-4"/></svg>
                    </div>
                  </div>

                  {/* Message — full width */}
                  <div style={{ gridColumn: "span 2" }}>
                    <label style={labelStyle}>Message</label>
                    <textarea
                      name="message" value={form.message} rows={3}
                      onChange={handleChange} onFocus={fieldFocus} onBlur={fieldBlur}
                      style={{ ...inputStyle, resize: "none" }}
                      placeholder="Précisions, nombre de chambres, demandes spéciales..."
                    />
                  </div>
                </div>

                {/* Submit row */}
                <div
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
                  <p
                    style={{
                      fontFamily: "'Barlow', sans-serif",
                      fontWeight: 300,
                      fontSize: 10,
                      color: "rgba(0,0,0,0.28)",
                      maxWidth: 280,
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe.
                  </p>
                  <button
                    type="submit"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 900,
                      fontSize: 10,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "#fff",
                      background: "#C1272D",
                      border: "none",
                      cursor: "pointer",
                      padding: "13px 28px",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      flexShrink: 0,
                      transition: "background .15s ease, transform .15s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#a8222a"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#C1272D"; e.currentTarget.style.transform = "translateY(0)"; }}
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

      <style>{`
        @media (max-width: 640px) {
          .booking-form-layout { flex-direction: column !important; }
          .booking-form-layout > div:first-child { width: 100% !important; }
          .booking-fields-grid { grid-template-columns: 1fr !important; }
          .booking-fields-grid > div:last-child { grid-column: span 1 !important; }
        }
      `}</style>
    </>
  );
}