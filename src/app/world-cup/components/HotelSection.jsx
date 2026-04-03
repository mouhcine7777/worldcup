"use client";

import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

const HOTELS = [
  {
    city: "New York",
    citySub: "Métropole Mondiale",
    name: "The Gallivant Times Square",
    stars: 4,
    address: "234 W 48th St, New York, NY 10036",
    stadium: "MetLife Stadium",
    distance: "~30 min du stade",
    match: "Brésil vs Maroc · 13 juin",
    nights: "4 nuits",
    img: "/thegallivant.webp",
    imgAlt: "The Gallivant Times Square Hotel",
    accentColor: "#C9A84C",
    perks: [
      "Au cœur de Times Square",
      "Accès Broadway & 5th Avenue",
      "Design urbain & ambiance dynamique",
      "Transferts hôtel–stade inclus",
    ],
    description:
      "Niché au cœur de Times Square, The Gallivant capture l'énergie iconique de New York et l'intensité lumineuse de Broadway. Un établissement moderne, connecté et tourné vers l'expérience new-yorkaise.",
  },
  {
    city: "Boston",
    citySub: "La Ville Historique",
    name: "Omni Boston Hotel at the Seaport",
    stars: 4,
    address: "450 Summer St, Boston, MA 02210",
    stadium: "Gillette Stadium",
    distance: "~35 min du stade",
    match: "Écosse vs Maroc · 19 juin",
    nights: "4 nuits",
    img: "/omni.jpeg",
    imgAlt: "Omni Boston Hotel at the Seaport",
    accentColor: "#C9A84C",
    perks: [
      "Port District — vue sur la baie",
      "Architecture vitrée emblématique",
      "Luxe urbain & innovation",
      "Accès rapide aux sites de la ville",
    ],
    description:
      "L'Omni Boston Hotel at the Seaport incarne l'élégance contemporaine et l'énergie créative de Boston. Un hôtel haut de gamme au design moderne plongeant ses hôtes dans un luxe urbain mêlant innovation, confort et culture locale.",
  },
];

const StarIcon = () => (
  <svg viewBox="0 0 12 12" width="11" height="11" fill="#C9A84C">
    <polygon points="6,1 7.5,4.5 11,4.8 8.5,7 9.3,10.5 6,8.7 2.7,10.5 3.5,7 1,4.8 4.5,4.5" />
  </svg>
);

const IconLocation = () => (
  <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="#C9A84C" strokeWidth="1.5">
    <path d="M8 2C5.8 2 4 3.8 4 6c0 3.5 4 8 4 8s4-4.5 4-8c0-2.2-1.8-4-4-4z" />
    <circle cx="8" cy="6" r="1.5" />
  </svg>
);

const IconStadium = () => (
  <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="#C9A84C" strokeWidth="1.5">
    <ellipse cx="8" cy="8" rx="6" ry="4" />
    <ellipse cx="8" cy="8" rx="3" ry="2" />
    <line x1="2" y1="8" x2="14" y2="8" />
  </svg>
);

const IconCalendar = () => (
  <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="#C9A84C" strokeWidth="1.5">
    <rect x="2" y="3" width="12" height="10" rx="1" />
    <line x1="2" y1="6" x2="14" y2="6" />
    <line x1="5" y1="1" x2="5" y2="4" />
    <line x1="11" y1="1" x2="11" y2="4" />
  </svg>
);

function HotelCard({ hotel, index, visible }) {
  const isEven = index % 2 === 0;

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(40px)",
        transition: `opacity .8s ease ${index * 0.2}s, transform .8s ease ${index * 0.2}s`,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: 480,
        position: "relative",
        overflow: "hidden",
      }}
      className="hotel-card-grid"
    >
      {/* IMAGE SIDE */}
      <div
        style={{
          order: isEven ? 0 : 1,
          position: "relative",
          overflow: "hidden",
          minHeight: 360,
        }}
        className="hotel-img-side"
      >
        <img
          src={hotel.img}
          alt={hotel.imgAlt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.7s ease",
            filter: "brightness(0.75)",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.04)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        />

        {/* City overlay badge */}
        <div
          style={{
            position: "absolute",
            top: 28,
            [isEven ? "left" : "right"]: 28,
            display: "flex",
            flexDirection: "column",
            alignItems: isEven ? "flex-start" : "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 4,
            }}
          >
            {!isEven && <div style={{ width: 28, height: 1, background: "#C9A84C" }} />}
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#C9A84C",
              }}
            >
              {hotel.citySub}
            </span>
            {isEven && <div style={{ width: 28, height: 1, background: "#C9A84C" }} />}
          </div>
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(38px, 5vw, 60px)",
              color: "#fff",
              lineHeight: 1,
              textShadow: "0 2px 20px rgba(0,0,0,0.6)",
            }}
          >
            {hotel.city}
          </span>
        </div>

        {/* Bottom match tag */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "20px 24px",
            background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <IconCalendar />
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.75)",
            }}
          >
            {hotel.match}
          </span>
          <span
            style={{
              marginLeft: "auto",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C9A84C",
              background: "rgba(201,168,76,0.15)",
              border: "1px solid rgba(201,168,76,0.3)",
              padding: "3px 10px",
            }}
          >
            {hotel.nights}
          </span>
        </div>
      </div>

      {/* CONTENT SIDE */}
      <div
        style={{
          order: isEven ? 1 : 0,
          background: "#F5F1EB",
          padding: "clamp(32px, 4vw, 56px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background number watermark */}
        <div
          style={{
            position: "absolute",
            bottom: -20,
            [isEven ? "right" : "left"]: -10,
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 160,
            color: "rgba(201,168,76,0.08)",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Stars */}
        <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
          {Array.from({ length: hotel.stars }).map((_, i) => (
            <StarIcon key={i} />
          ))}
        </div>

        {/* Hotel name */}
        <h3
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(24px, 3vw, 38px)",
            color: "#111",
            lineHeight: 1.05,
            margin: "0 0 6px",
          }}
        >
          {hotel.name}
        </h3>

        {/* Address */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 20,
          }}
        >
          <IconLocation />
          <span
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 12,
              color: "rgba(0,0,0,0.35)",
              fontWeight: 300,
            }}
          >
            {hotel.address}
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: "linear-gradient(90deg, #C9A84C, rgba(201,168,76,0.1))",
            marginBottom: 20,
            width: 60,
          }}
        />

        {/* Description */}
        <p
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: 13,
            fontWeight: 300,
            lineHeight: 1.8,
            color: "rgba(0,0,0,0.5)",
            margin: "0 0 24px",
          }}
        >
          {hotel.description}
        </p>

        {/* Perks */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {hotel.perks.map((perk, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 5,
                  height: 5,
                  background: "#C9A84C",
                  flexShrink: 0,
                  transform: "rotate(45deg)",
                }}
              />
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(0,0,0,0.55)",
                }}
              >
                {perk}
              </span>
            </div>
          ))}
        </div>

        {/* Stadium pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 16px",
            border: "1px solid rgba(201,168,76,0.2)",
            background: "rgba(201,168,76,0.06)",
            alignSelf: "flex-start",
          }}
        >
          <IconStadium />
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(0,0,0,0.5)",
            }}
          >
            {hotel.stadium}
          </span>
          <span
            style={{
              width: 1,
              height: 12,
              background: "rgba(201,168,76,0.3)",
            }}
          />
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: "#C9A84C",
            }}
          >
            {hotel.distance}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function HotelsSection() {
  const [ref, visible] = useInView();

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;500;600;700&family=Barlow:wght@300;400&display=swap"
        rel="stylesheet"
      />

      <section
        id="hotels"
        ref={ref}
        style={{
          background: "#F5F1EB",
          padding: "clamp(48px, 7vw, 96px) 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient glow top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "70%",
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)",
          }}
        />

        {/* HEADER */}
        <div
          style={{
            padding: "0 clamp(20px, 7vw, 96px)",
            marginBottom: "clamp(36px, 5vw, 60px)",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: "opacity .7s ease, transform .7s ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <div style={{ width: 32, height: 1, background: "#C9A84C" }} />
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "#C9A84C",
              }}
            >
              Villes d'Accueil · Hôtels 4★
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(42px, 7vw, 80px)",
                color: "#111",
                lineHeight: 0.95,
                margin: 0,
              }}
            >
              Vos Hôtels{" "}
              <span style={{ color: "#C9A84C" }}>d'Exception</span>
            </h2>

            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "clamp(13px, 1.3vw, 15px)",
                fontWeight: 300,
                lineHeight: 1.8,
                color: "#888",
                maxWidth: 340,
                margin: 0,
              }}
            >
              Deux établissements 4★ soigneusement sélectionnés à New York et
              Boston — au plus proche des stades et de l'énergie de la ville.
            </p>
          </div>
        </div>

        {/* HOTEL CARDS — stacked, full bleed */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {HOTELS.map((hotel, i) => (
            <HotelCard key={hotel.city} hotel={hotel} index={i} visible={visible} />
          ))}
        </div>

        {/* BOTTOM NOTE */}
        <div
          style={{
            padding: "clamp(24px, 3vw, 40px) clamp(20px, 7vw, 96px) 0",
            borderTop: "1px solid rgba(0,0,0,0.08)",
            marginTop: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            opacity: visible ? 1 : 0,
            transition: "opacity .7s ease .6s",
          }}
        >
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 10,
              fontWeight: 300,
              color: "rgba(0,0,0,0.3)",
              lineHeight: 1.7,
              maxWidth: 560,
              margin: 0,
            }}
          >
            * L'hôtel mentionné est susceptible d'être remplacé par un établissement de standing similaire ou
            supérieur, en fonction des disponibilités au moment de la réservation.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {["New York", "Boston"].map((city, i) => (
              <span key={city} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(0,0,0,0.3)",
                  }}
                >
                  {city}
                </span>
                {i < 1 && (
                  <span style={{ width: 1, height: 10, background: "rgba(201,168,76,0.3)" }} />
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Responsive styles */}
        <style>{`
          @media (max-width: 768px) {
            .hotel-card-grid {
              grid-template-columns: 1fr !important;
            }
            .hotel-img-side {
              order: 0 !important;
              min-height: 260px !important;
            }
          }
        `}</style>
      </section>
    </>
  );
}