"use client";

const EMAIL = "contact@leonistravelmaroc.com";
const WA = "212600000000";
const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;900&family=Barlow:wght@300;400&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .footer-link {
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-link:hover { color: #fff; }
        .footer-nav-link {
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-nav-link:hover { color: rgba(255,255,255,0.7); }
        @media (max-width: 640px) {
          .footer-main { flex-direction: column !important; align-items: flex-start !important; }
          .footer-bottom { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
          .footer-nav { flex-wrap: wrap !important; }
        }
      `}</style>

      <footer
        style={{
          background: "#0d0d0d",
          padding: "clamp(32px, 5vw, 56px) clamp(20px, 6vw, 80px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Watermark */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: -20,
            right: -10,
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(100px, 16vw, 200px)",
            lineHeight: 1,
            color: "rgba(255,255,255,0.025)",
            userSelect: "none",
            letterSpacing: "-0.04em",
            pointerEvents: "none",
          }}
        >
          2026
        </div>

        {/* Top red accent line */}
        <div
          style={{
            height: 2,
            background: "linear-gradient(90deg, #b91c1c 0%, rgba(185,28,28,0.3) 55%, transparent 100%)",
            marginBottom: "clamp(28px, 4vw, 44px)",
            borderRadius: 999,
          }}
        />

        {/* Main row — logos + contact */}
        <div
          className="footer-main"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "clamp(24px, 4vw, 40px)",
            position: "relative",
            zIndex: 1,
            marginBottom: "clamp(20px, 3vw, 36px)",
          }}
        >
          {/* Logos */}
          <a
            href="#hero"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <img
              src="/pe.png"
              alt="Public Events"
              style={{ height: 34, width: "auto", objectFit: "contain", display: "block" }}
            />
            <span
              style={{
                display: "inline-block",
                width: 1,
                height: 24,
                background: "rgba(255,255,255,0.1)",
                margin: "0 16px",
                flexShrink: 0,
              }}
            />
            <img
              src="/leonis.png"
              alt="Leonis Travel"
              style={{ height: 34, width: "auto", objectFit: "contain", display: "block" }}
            />
          </a>

          {/* Contact */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(16px, 3vw, 32px)",
              flexWrap: "wrap",
            }}
          >
            <a href={`mailto:${EMAIL}`} className="footer-link">
              {EMAIL}
            </a>

            <a
              href={`https://wa.me/${WA}`}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
              style={{ display: "flex", alignItems: "center", gap: 7 }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#ef4444",
                  boxShadow: "0 0 6px rgba(239,68,68,0.6)",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              WhatsApp
            </a>

            {/* Red CTA */}
            <a
              href="#packages"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 900,
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#fff",
                background: "#b91c1c",
                textDecoration: "none",
                padding: "10px 20px",
                borderRadius: 999,
                transition: "background 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#991b1b")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#b91c1c")}
            >
              Réserver ma place
            </a>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: "rgba(255,255,255,0.06)",
            margin: "0 0 clamp(16px, 2vw, 24px)",
            position: "relative",
            zIndex: 1,
          }}
        />

        {/* Bottom row */}
        <div
          className="footer-bottom"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            position: "relative",
            zIndex: 1,
          }}
        >
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 300,
              fontSize: 10,
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.15)",
              margin: 0,
            }}
          >
            © {CURRENT_YEAR} Public Events × Leonis Travel. Tous droits réservés.
          </p>

          {/* Nav links */}
          <div
            className="footer-nav"
            style={{ display: "flex", alignItems: "center", gap: 20 }}
          >
            {[
              { label: "Accueil", href: "#hero" },
              { label: "Aperçu", href: "#about" },
              { label: "Packages", href: "#packages" },
              { label: "Hôtels", href: "#hotels" },
            ].map(({ label, href }, i, arr) => (
              <span key={label} style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <a href={href} className="footer-nav-link">{label}</a>
                {i < arr.length - 1 && (
                  <span
                    style={{
                      width: 1,
                      height: 10,
                      background: "rgba(255,255,255,0.1)",
                      display: "inline-block",
                    }}
                  />
                )}
              </span>
            ))}
          </div>

          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 300,
              fontSize: 10,
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.1)",
              margin: 0,
            }}
          >
            FIFA World Cup 2026™ · Lions de l'Atlas
          </p>
        </div>
      </footer>
    </>
  );
}