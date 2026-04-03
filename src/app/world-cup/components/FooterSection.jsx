"use client";

const EMAIL = "contact@leonistravelmaroc.com";
const WA = "212600000000";

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@500;600;700&family=Barlow:wght@300;400&display=swap"
        rel="stylesheet"
      />

      <footer
        style={{
          background: "#080810",
          borderTop: "1px solid rgba(201,168,76,0.12)",
          padding: "clamp(32px,5vw,56px) clamp(20px,6vw,80px)",
        }}
      >
        {/* Top gold line */}
        <div
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, #C9A84C 0%, rgba(201,168,76,0.2) 50%, transparent 100%)",
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
          }}
        >
          {/* Logos */}
          <a
            href="#hero"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 0,
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
                background:
                  "linear-gradient(180deg, transparent, rgba(201,168,76,0.45), transparent)",
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
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#C9A84C")}
              onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.35)")}
            >
              {EMAIL}
            </a>

            <a
              href={`https://wa.me/${WA}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#C9A84C")}
              onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.35)")}
            >
              WhatsApp →
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            marginTop: "clamp(20px,3vw,32px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 10,
              fontWeight: 300,
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.15)",
              margin: 0,
            }}
          >
            © {CURRENT_YEAR} Public Events × Leonis Travel. Tous droits réservés.
          </p>

          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 10,
              fontWeight: 300,
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.12)",
              margin: 0,
              textAlign: "right",
            }}
          >
            FIFA World Cup 2026™ · Lions de l'Atlas
          </p>
        </div>
      </footer>
    </>
  );
}