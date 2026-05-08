"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const SEPT_DATES = [12, 16, 18, 23];
const OCT_DATES  = [3,  7, 10, 14];

export default function InfoSection() {
  const { ref, inView } = useInView();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Didact+Gothic&display=swap');

        .s-fade { opacity:0; transform:translateY(20px); transition:opacity .9s ease,transform .9s ease; }
        .s-fade.on { opacity:1; transform:translateY(0); }
        .s-slide-left { opacity:0; transform:translateX(-40px); transition:opacity 1s ease,transform 1s ease; }
        .s-slide-left.on { opacity:1; transform:translateX(0); }

        .dpill {
          width:48px; height:48px;
          display:flex; align-items:center; justify-content:center;
          background: #C9A84C;
          border: 1px solid #C9A84C;
          transition: all .25s ease; 
          cursor: default; 
          flex-shrink: 0;
        }
        .dpill:hover { 
          background: rgba(201,168,76,.7);
          border-color: #C9A84C;
          transform: scale(1.05);
        }
        .dpill-n {
          font-family:'Bebas Neue',sans-serif;
          font-size:1.2rem; 
          color: #0E0E29;
          font-weight: bold;
          letter-spacing:.04em; 
          transition: color .25s;
        }
        .dpill:hover .dpill-n { 
          color: #fff; 
        }

        @media(max-width:768px){
          .info-split { flex-direction:column !important; }
          .info-img   { height:260px !important; flex:none !important; }
          .info-section-desktop { height: auto !important; min-height: auto !important; }
        }
      `}</style>

      <section
        id="dates"
        ref={ref}
        className="info-section-desktop"
        style={{ 
          background:"#0E0E29", 
          width:"100%", 
          overflow:"hidden",
          height: "100vh",
          display: "flex",
          alignItems: "stretch"
        }}
      >
        <div className="info-split" style={{ display:"flex", width:"100%" }}>

          {/* ── LEFT — image, stretches to match right column height ── */}
          <div
            className={`info-img s-slide-left ${inView?"on":""}`}
            style={{ flex:"0 0 48%", position:"relative", overflow:"hidden" }}
          >
            <Image
              src="/ladefense.jpg"
              alt="Paris La Défense Arena"
              fill
              style={{ objectFit:"cover", objectPosition:"center 20%", filter:"brightness(.75) saturate(.9)" }}
            />
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, transparent 55%, #0E0E29 100%)" }}/>
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, #0E0E29 0%, transparent 25%)" }}/>
            <div className={`s-fade ${inView?"on":""}`} style={{ position:"absolute", bottom:"24px", left:"24px", transitionDelay:".6s" }}>
              <div style={{ fontFamily:"'Didact Gothic',sans-serif", fontSize:"9px", letterSpacing:".4em", textTransform:"uppercase", color:"rgba(255,255,255,.4)", marginBottom:"3px" }}>Lieu</div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.3rem", color:"#C9A84C", letterSpacing:".06em" }}>Défense Arena</div>
            </div>
          </div>

          {/* ── RIGHT — all content, drives the height ── */}
          <div style={{
            flex:1,
            padding:"clamp(28px,3.5vw,48px) clamp(20px,3.5vw,48px)",
            display:"flex", flexDirection:"column", justifyContent:"space-between", gap:"0",
          }}>

            {/* Label */}
            <div className={`s-fade ${inView?"on":""}`} style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"12px" }}>
              <div style={{ width:"28px", height:"1px", background:"#C9A84C" }}/>
              <span style={{ fontFamily:"'Didact Gothic',sans-serif", fontSize:"9px", letterSpacing:".4em", textTransform:"uppercase", color:"rgba(255,255,255,.35)" }}>Paris · 2026</span>
            </div>

            {/* Venue title — smaller */}
            <div>
              {[["Paris","#fff",".15s"],["La Défense","#C9A84C",".23s"],["Arena","#fff",".31s"]].map(([word,color,delay])=>(
                <div key={word as string} className={`s-fade ${inView?"on":""}`} style={{ transitionDelay: delay as string }}>
                  <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(1.8rem,3.5vw,3rem)", lineHeight:.9, color: color as string, letterSpacing:".04em", display:"block" }}>{word}</span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className={`s-fade ${inView?"on":""}`} style={{ width:"36px", height:"1px", background:"rgba(201,168,76,.35)", margin:"12px 0", transitionDelay:".4s" }}/>

            {/* Description — compact */}
            <p className={`s-fade ${inView?"on":""}`} style={{ transitionDelay:".46s", fontFamily:"'Didact Gothic',sans-serif", fontSize:"clamp(.78rem,1.1vw,.88rem)", lineHeight:1.75, color:"rgba(255,255,255,.45)", maxWidth:"340px", margin:"0 0 6px" }}>
              Céline Dion à Paris La Défense Arena pour une série de concerts en septembre et octobre 2026.
            </p>
            <p className={`s-fade ${inView?"on":""}`} style={{ transitionDelay:".52s", fontFamily:"'Didact Gothic',sans-serif", fontSize:"clamp(.78rem,1.1vw,.88rem)", lineHeight:1.75, color:"rgba(255,255,255,.45)", maxWidth:"340px", margin:0 }}>
              Un événement d'envergure dans une salle emblématique, au service d'une expérience live exceptionnelle.
            </p>

            {/* DATES */}
            <div className={`s-fade ${inView?"on":""}`} style={{ transitionDelay:".6s", borderTop:"1px solid rgba(201,168,76,.12)", marginTop:"16px", paddingTop:"14px" }}>
              <div style={{ fontFamily:"'Didact Gothic',sans-serif", fontSize:"9px", letterSpacing:".4em", textTransform:"uppercase", color:"#ffffff", marginBottom:"12px" }}>Les dates</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"clamp(12px,2vw,28px)" }}>
                {[["Septembre", SEPT_DATES, .64], ["Octobre", OCT_DATES, .84]].map(([label, dates, base]) => (
                  <div key={label as string}>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(.9rem,1.4vw,1.1rem)", color:"#ffffff", letterSpacing:".1em", marginBottom:"8px", display:"flex", alignItems:"center", gap:"8px" }}>
                      {label}
                      <div style={{ flex:1, height:"1px", background:"rgba(201,168,76,.15)", minWidth:"16px" }}/>
                    </div>
                    <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
                      {(dates as number[]).map((d,i)=>(
                        <div key={d} className={`dpill s-fade ${inView?"on":""}`} style={{ transitionDelay:`${(base as number)+i*.06}s` }}>
                          <span className="dpill-n">{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className={`s-fade ${inView?"on":""}`} style={{ transitionDelay:"1.1s", display:"flex", gap:"clamp(12px,2.5vw,32px)", marginTop:"16px", paddingTop:"14px", borderTop:"1px solid rgba(201,168,76,.08)" }}>
              {[["40 000","Spectateurs"],["10","Soirées"],["2","Mois"]].map(([n,l])=>(
                <div key={l}>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(1.3rem,2vw,1.8rem)", color:"#C9A84C", letterSpacing:".04em", lineHeight:1 }}>{n}</div>
                  <div style={{ fontFamily:"'Didact Gothic',sans-serif", fontSize:"9px", letterSpacing:".3em", textTransform:"uppercase", color:"rgba(255,255,255,.28)", marginTop:"4px" }}>{l}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}