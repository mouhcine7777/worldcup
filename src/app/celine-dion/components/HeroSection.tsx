"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Didact+Gothic&display=swap');

        .hero-title-line {
          overflow: hidden;
          padding-bottom: 0.15em;
          margin-bottom: -0.15em;
        }
        .hero-title-inner {
          display: block;
          transform: translateY(110%);
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
          padding-top: 0.1em;
        }
        .hero-title-inner.visible {
          transform: translateY(0);
        }
        .fade-up {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .cta-primary {
          position: relative;
          overflow: hidden;
          background: #C9A84C;
          color: #080808;
          border: none;
          cursor: pointer;
          padding: 16px 40px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 15px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          transition: color 0.4s ease;
          text-decoration: none;
          display: inline-block;
        }
        .cta-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #fff;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1);
        }
        .cta-primary:hover::after {
          transform: scaleX(1);
        }
        .cta-primary:hover { color: #080808; }
        .cta-primary span {
          position: relative;
          z-index: 1;
        }
        .cta-secondary {
          background: transparent;
          color: rgba(255,255,255,0.7);
          border: 1px solid rgba(255,255,255,0.25);
          cursor: pointer;
          padding: 16px 40px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 15px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          transition: border-color 0.3s ease, color 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }
        .cta-secondary:hover {
          border-color: #C9A84C;
          color: #C9A84C;
        }
        @keyframes pulse-line {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes scroll-caret {
          0% { transform: translateY(-100%); opacity: 0; }
          40% { opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }

        @media(max-width: 768px) {
          .hero-bg-img { object-position: 70% top !important; }
        }
      `}</style>

      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100svh",
          overflow: "hidden",
          background: "#0E0E29",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: mounted ? "scale(1)" : "scale(1.06)",
            transition: "transform 2.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <Image
            src="/celine-bg.jpg"
            alt="Céline Dion"
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "center top" }}
            className="hero-bg-img"
          />
        </div>

        {/* Gradient overlays */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(14,14,41,0.15) 0%, rgba(14,14,41,0.05) 30%, rgba(14,14,41,0.5) 65%, rgba(14,14,41,0.98) 100%)" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, rgba(14,14,41,0.65) 0%, transparent 55%)" }} />

        {/* Top nav */}
        <nav
          className={`fade-up ${mounted ? "visible" : ""}`}
          style={{ position:"absolute", top:0, left:0, right:0, padding:"32px 48px", display:"flex", alignItems:"center", justifyContent:"space-between", zIndex:10, transitionDelay:"0.2s" }}
        >
          <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
            <div style={{ width:"28px", height:"1px", background:"rgba(201,168,76,0.5)" }} />
            <span style={{ fontFamily:"'Didact Gothic', sans-serif", fontSize:"10px", letterSpacing:"0.4em", textTransform:"uppercase", color:"rgba(255,255,255,0.45)" }}>Paris · 2026</span>
          </div>
          <span style={{ fontFamily:"'Didact Gothic', sans-serif", fontSize:"10px", letterSpacing:"0.4em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)" }}>Défense Arena</span>
        </nav>

        {/* Main content */}
        <div
          style={{ position:"relative", zIndex:10, width:"100%", padding:"clamp(32px, 5vw, 72px) clamp(24px, 6vw, 80px)", paddingBottom:"clamp(48px, 7vw, 96px)", display:"flex", flexDirection:"column" }}
        >
          {/* Label */}
          <div className={`fade-up ${mounted ? "visible" : ""}`} style={{ marginBottom:"16px", transitionDelay:"0.3s", display:"flex", alignItems:"center", gap:"14px" }}>
            <div style={{ width:"40px", height:"1px", background:"#C9A84C", animation: mounted ? "pulse-line 3s ease-in-out infinite" : "none" }} />
            <span style={{ fontFamily:"'Didact Gothic', sans-serif", fontSize:"10px", letterSpacing:"0.45em", textTransform:"uppercase", color:"rgba(255,255,255,0.4)" }}>Série de concerts</span>
          </div>

          {/* Title */}
          <div style={{ marginBottom:"4px" }}>
            <div className="hero-title-line">
              <span className={`hero-title-inner ${mounted ? "visible" : ""}`} style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:"clamp(3rem, 8vw, 8rem)", lineHeight:0.9, color:"#C9A84C", letterSpacing:"0.05em", transitionDelay:"0.5s" }}>
                Céline
              </span>
            </div>
            <div className="hero-title-line">
              <span className={`hero-title-inner ${mounted ? "visible" : ""}`} style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:"clamp(3rem, 8vw, 8rem)", lineHeight:0.9, color:"#C9A84C", letterSpacing:"0.05em", transitionDelay:"0.65s" }}>
                Dion
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className={`fade-up ${mounted ? "visible" : ""}`} style={{ margin:"28px 0", height:"1px", width:"clamp(200px, 35vw, 480px)", background:"linear-gradient(90deg, rgba(201,168,76,0.6) 0%, rgba(201,168,76,0.05) 100%)", transitionDelay:"0.9s" }} />

          {/* Bottom row */}
          <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:"clamp(24px, 4vw, 56px)" }}>

            <div className={`fade-up ${mounted ? "visible" : ""}`} style={{ transitionDelay:"1s" }}>
              <div style={{ fontFamily:"'Didact Gothic', sans-serif", fontSize:"10px", letterSpacing:"0.4em", textTransform:"uppercase", color:"rgba(255,255,255,0.35)", marginBottom:"8px" }}>Dates</div>
              <div style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:"clamp(1.4rem, 3vw, 2rem)", color:"rgba(255,255,255,0.85)", letterSpacing:"0.06em" }}>Sep — Oct 2026</div>
            </div>

            <div className={`fade-up ${mounted ? "visible" : ""}`} style={{ width:"1px", height:"48px", background:"rgba(201,168,76,0.2)", transitionDelay:"1.05s" }} />

            <div className={`fade-up ${mounted ? "visible" : ""}`} style={{ transitionDelay:"1.1s" }}>
              <div style={{ fontFamily:"'Didact Gothic', sans-serif", fontSize:"10px", letterSpacing:"0.4em", textTransform:"uppercase", color:"rgba(255,255,255,0.35)", marginBottom:"8px" }}>Représentations</div>
              <div style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:"clamp(1.4rem, 3vw, 2rem)", color:"rgba(255,255,255,0.85)", letterSpacing:"0.06em" }}>10 soirées</div>
            </div>

            <div className={`fade-up ${mounted ? "visible" : ""}`} style={{ width:"1px", height:"48px", background:"rgba(201,168,76,0.2)", transitionDelay:"1.15s" }} />

            <div className={`fade-up ${mounted ? "visible" : ""}`} style={{ transitionDelay:"1.2s" }}>
              <div style={{ fontFamily:"'Didact Gothic', sans-serif", fontSize:"10px", letterSpacing:"0.4em", textTransform:"uppercase", color:"rgba(255,255,255,0.35)", marginBottom:"8px" }}>À partir de</div>
              <div style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:"clamp(1.4rem, 3vw, 2rem)", color:"#C9A84C", letterSpacing:"0.06em" }}>550 €</div>
            </div>

            {/* CTAs */}
            <div className={`fade-up ${mounted ? "visible" : ""}`} style={{ display:"flex", gap:"12px", flexWrap:"wrap", transitionDelay:"1.35s", marginLeft:"auto" }}>
              <a
                href="#prices"
                className="cta-primary"
                onClick={(e) => { e.preventDefault(); scrollTo("prices"); }}
              >
                <span>Réserver</span>
              </a>
              <a
                href="#dates"
                className="cta-secondary"
                onClick={(e) => { e.preventDefault(); scrollTo("dates"); }}
              >
                Voir les dates
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`fade-up ${mounted ? "visible" : ""}`} style={{ position:"absolute", right:"40px", bottom:"40px", display:"flex", flexDirection:"column", alignItems:"center", gap:"10px", zIndex:10, transitionDelay:"1.8s" }}>
          <span style={{ fontFamily:"'Didact Gothic', sans-serif", fontSize:"9px", letterSpacing:"0.4em", textTransform:"uppercase", color:"rgba(255,255,255,0.2)", writingMode:"vertical-rl", marginBottom:"4px" }}>Scroll</span>
          <div style={{ width:"1px", height:"56px", background:"rgba(201,168,76,0.15)", overflow:"hidden", position:"relative" }}>
            <div style={{ position:"absolute", width:"100%", height:"50%", background:"#C9A84C", animation:"scroll-caret 2s ease-in-out infinite" }} />
          </div>
        </div>
      </section>
    </>
  );
}