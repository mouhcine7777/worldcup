"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Didact+Gothic&display=swap');
        .footer-link {
          font-family:'Didact Gothic',sans-serif;
          font-size:9px; letter-spacing:.35em; text-transform:uppercase;
          color:rgba(255,255,255,.25); text-decoration:none;
          transition:color .2s;
        }
        .footer-link:hover { color:rgba(255,255,255,.6); }
      `}</style>

      <footer style={{
        background:"#0E0E29",
        borderTop:"1px solid rgba(201,168,76,.12)",
        padding:"32px clamp(20px,5vw,60px)",
        display:"flex", flexWrap:"wrap",
        alignItems:"center", justifyContent:"space-between",
        gap:"24px",
      }}>

        {/* Logos */}
        <div style={{ display:"flex", alignItems:"center", gap:"28px" }}>
          <div style={{ position:"relative", width:"120px", height:"36px", opacity:.8 }}>
            <Image src="/logo.png" alt="Public Events" fill style={{ objectFit:"contain", objectPosition:"left center" }} />
          </div>
          <div style={{ width:"1px", height:"28px", background:"rgba(201,168,76,.2)", flexShrink:0 }}/>
          <div style={{ position:"relative", width:"100px", height:"36px", opacity:.8 }}>
            <Image src="/leonis.png" alt="Leonis Travel" fill style={{ objectFit:"contain", objectPosition:"left center" }} />
          </div>
        </div>

        {/* Center */}
        <div style={{ textAlign:"center" }}>
          <div style={{
            fontFamily:"'Bebas Neue',sans-serif",
            fontSize:"clamp(.85rem,1.5vw,1rem)",
            color:"rgba(255,255,255,.2)", letterSpacing:".2em",
          }}>
            Céline Dion · Paris · 2026
          </div>
        </div>

        {/* Right */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:"8px" }}>
          <a href="mailto:contact@publicevents.ma" className="footer-link">
            contact@publicevents.ma
          </a>
          <span style={{
            fontFamily:"'Didact Gothic',sans-serif", fontSize:"9px",
            letterSpacing:".25em", color:"rgba(255,255,255,.15)",
          }}>
            © 2026 · Tous droits réservés
          </span>
        </div>

      </footer>
    </>
  );
}