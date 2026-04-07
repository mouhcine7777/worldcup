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

      <footer
        style={{
          background: "#0d1f0d",
          borderTop: "1px solid rgba(193,39,45,0.15)",
          padding: "clamp(32px,5vw,56px) clamp(20px,6vw,80px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative watermark */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: -20,
            right: -10,
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(100px,16vw,200px)",
            lineHeight: 1,
            color: "rgba(193,39,45,0.04)",
            textTransform: "uppercase",
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
            height: 1,
            background: "linear-gradient(90deg, #C1272D 0%, rgba(193,39,45,0.2) 55%, transparent 100%)",
            marginBottom: "clamp(28px,4vw,44px)",
          }}
        />

        {/* Main row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "clamp(24px,4vw,40px)",
            position: "relative",
            zIndex: 1,
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
              style={{ height: 32, width: "auto", objectFit: "contain", display: "block" }}
            />
            <span
              style={{
                display: "inline-block",
                width: 1,
                height: 24,
                background: "linear-gradient(180deg, transparent, rgba(193,39,45,0.45), transparent)",
                margin: "0 16px",
                flexShrink: 0,
              }}
            />
            <img
              src="/leonis.png"
              alt="Leonis Travel"
              style={{ height: 32, width: "auto", objectFit: "contain", display: "block" }}
            />
          </a>

          {/* Contact links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(16px,3vw,32px)",
              flexWrap: "wrap",
            }}
          >
            <a
              href={`mailto:${EMAIL}`}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C1272D")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
            >
              {EMAIL}
            </a>

            <a
              href={`https://wa.me/${WA}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                textDecoration: "none",
                transition: "color 0.2s",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#4caf50")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#4caf50",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: "rgba(255,255,255,0.05)",
            margin: "clamp(20px,3vw,32px) 0 clamp(16px,2vw,24px)",
            position: "relative",
            zIndex: 1,
          }}
        />

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
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
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.15)",
              margin: 0,
            }}
          >
            © {CURRENT_YEAR} Public Events × Leonis Travel. Tous droits réservés.
          </p>

          {/* Nav links */}
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            {["Accueil", "Aperçu", "Packages", "Hôtels"].map((label, i, arr) => (
              <span key={label} style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <a
                  href={`#${["hero","about","packages","hotels"][i]}`}
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 600,
                    fontSize: 9,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.18)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.18)")}
                >
                  {label}
                </a>
                {i < arr.length - 1 && (
                  <span
                    style={{
                      width: 1,
                      height: 10,
                      background: "rgba(193,39,45,0.2)",
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