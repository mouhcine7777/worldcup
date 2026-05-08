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

const OFFERS = [
  { id:"cat3",  label:"Catégorie 3",     price:550,  tag:null,        desc:"Accès standard, vue dégagée sur la scène." },
  { id:"cat2",  label:"Catégorie 2",     price:675,  tag:null,        desc:"Placement privilégié avec excellente visibilité." },
  { id:"cat1",  label:"Catégorie 1",     price:790,  tag:null,        desc:"Meilleur emplacement en salle, expérience premium." },
  { id:"carre", label:"Carré Or",        price:1025, tag:"Populaire", desc:"Zone dorée au plus près de la scène." },
  { id:"vip",   label:"Hospitality VIP", price:2000, tag:"VIP",       desc:"Accueil VIP, restauration et placement exclusif." },
  { id:"loge",  label:"Loge Privée",     price:2750, tag:"Exclusif",  desc:"Loge privée avec service dédié pour votre groupe." },
];

const SEPT_DATES = ["12 Septembre","16 Septembre","18 Septembre","23 Septembre"];
const OCT_DATES  = ["3 Octobre","7 Octobre","10 Octobre","14 Octobre"];

type Offer = typeof OFFERS[number];
interface FormData {
  firstName:string; lastName:string; email:string;
  phone:string; date:string; quantity:number; message:string;
}

export default function PricingSection() {
  const { ref, inView } = useInView();
  const [selected, setSelected]   = useState<Offer|null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    firstName:"", lastName:"", email:"", phone:"", date:"", quantity:1, message:"",
  });

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name==="quantity" ? Math.max(1, Number(value)) : value }));
  };

  const closeModal = () => {
    setSelected(null); setSubmitted(false);
    setForm({ firstName:"", lastName:"", email:"", phone:"", date:"", quantity:1, message:"" });
  };

  const total = selected ? selected.price * form.quantity : 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Didact+Gothic&display=swap');

        .p-fade { opacity:0; transform:translateY(20px); transition:opacity .9s ease,transform .9s ease; }
        .p-fade.on { opacity:1; transform:translateY(0); }
        .p-slide-right { opacity:0; transform:translateX(40px); transition:opacity 1s ease,transform 1s ease; }
        .p-slide-right.on { opacity:1; transform:translateX(0); }

        .ticket-row {
          display:flex; align-items:center;
          padding:14px 0;
          border-bottom:1px solid rgba(201,168,76,.12);
          cursor:pointer;
          transition:background .25s;
          gap:14px; position:relative;
        }
        .ticket-row:first-of-type { border-top:1px solid rgba(201,168,76,.12); }
        .ticket-row:hover { background:transparent; }
        .ticket-row:hover .t-name { color:#C9A84C; }
        .ticket-row:hover .t-cta { background:#C9A84C; color:#0a0a1a; border-color:#C9A84C; }

        .t-num {
          font-family:'Bebas Neue',sans-serif; font-size:.8rem;
          color:rgba(201,168,76,.35); letter-spacing:.08em;
          flex:0 0 22px; text-align:center;
        }
        .t-divider { width:1px; height:24px; flex-shrink:0; background:rgba(201,168,76,.2); }
        .t-info { flex:1; min-width:0; }
        .t-name {
          font-family:'Bebas Neue',sans-serif;
          font-size:clamp(1rem,1.8vw,1.3rem);
          color:#0E0E29; letter-spacing:.06em; display:block;
          transition:color .25s;
        }
        .t-desc {
          font-family:'Didact Gothic',sans-serif;
          font-size:.75rem; color:rgba(14,14,41,.4);
          display:block; margin-top:1px;
        }
        .t-tag {
          font-family:'Didact Gothic',sans-serif; font-size:8px;
          letter-spacing:.3em; text-transform:uppercase;
          padding:3px 8px; border:1px solid #C9A84C; color:#C9A84C;
          flex-shrink:0; white-space:nowrap;
        }
        .t-price {
          font-family:'Bebas Neue',sans-serif;
          font-size:clamp(1.1rem,1.8vw,1.5rem);
          color:#C9A84C; letter-spacing:.04em;
          flex:0 0 auto; white-space:nowrap;
        }
        .t-cta {
          font-family:'Didact Gothic',sans-serif; font-size:8px;
          letter-spacing:.3em; text-transform:uppercase;
          color:#0a0a1a; flex-shrink:0;
          background:#C9A84C; border:1px solid #C9A84C;
          padding:8px 16px; white-space:nowrap;
          transition:all .25s;
        }
        .ticket-row:hover .t-cta { background:#0E0E29; color:#C9A84C; border-color:#0E0E29; }

        /* mobile */
        @media(max-width:768px){
          .pricing-split { flex-direction:column-reverse !important; }
          .pricing-img   { height:240px !important; flex:none !important; }
          .pricing-left  { justify-content:flex-start !important; gap:12px !important; }
          .t-desc        { display:none; }
          .t-tag         { display:none; }
          .t-cta { background:#C9A84C; color:#0a0a1a; border-color:#C9A84C; padding:8px 14px; }

          /* Very subtle overlays on mobile — just a whisper of fade */
          .img-overlay-left { background: linear-gradient(to left, transparent 80%, rgba(242,233,226,.10) 100%) !important; }
          .img-overlay-bottom { background: linear-gradient(to top, rgba(242,233,226,.10) 0%, transparent 40%) !important; }
          .pricing-img-el { object-position: center 80% !important; }
        }
        @media(min-width:769px){
          .pricing-split { min-height:100vh; }
        }

        /* MODAL */
        .modal-overlay {
          position:fixed; inset:0; z-index:1000;
          background:rgba(5,5,20,.8); backdrop-filter:blur(10px);
          display:flex; align-items:center; justify-content:center;
          padding:16px; animation:mfade .25s ease;
        }
        @keyframes mfade { from{opacity:0} to{opacity:1} }

        .modal {
          background:#0E0E29; border:1px solid rgba(201,168,76,.2);
          width:100%; max-width:860px; max-height:92vh;
          display:flex; position:relative;
          animation:mup .35s cubic-bezier(.16,1,.3,1);
          overflow:hidden;
        }
        @keyframes mup { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }

        @media(max-width:620px){
          .modal { flex-direction:column; overflow-y:auto; }
        }

        .modal-left {
          flex:0 0 240px; background:rgba(201,168,76,.05);
          border-right:1px solid rgba(201,168,76,.12);
          padding:32px 24px; display:flex; flex-direction:column; justify-content:space-between;
        }
        @media(max-width:620px){
          .modal-left { flex:none; border-right:none; border-bottom:1px solid rgba(201,168,76,.12); padding:24px 20px; }
        }

        .modal-right { flex:1; overflow-y:auto; padding:32px 28px; }
        @media(max-width:620px){ .modal-right { padding:20px; } }
        .modal-right::-webkit-scrollbar { width:3px; }
        .modal-right::-webkit-scrollbar-thumb { background:rgba(201,168,76,.3); }

        .f-label {
          font-family:'Didact Gothic',sans-serif; font-size:9px;
          letter-spacing:.35em; text-transform:uppercase;
          color:rgba(255,255,255,.38); display:block; margin-bottom:7px;
        }
        .f-input {
          width:100%; background:rgba(255,255,255,.04);
          border:1px solid rgba(255,255,255,.1); color:#fff;
          padding:11px 13px; font-family:'Didact Gothic',sans-serif;
          font-size:.85rem; outline:none; transition:border-color .2s;
          box-sizing:border-box; appearance:none; -webkit-appearance:none;
        }
        .f-input:focus { border-color:#C9A84C; }
        .f-input option { background:#0E0E29; }
        .f-input::placeholder { color:rgba(255,255,255,.18); }
        textarea.f-input { resize:none; }

        .f-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        @media(max-width:480px){ .f-row { grid-template-columns:1fr; } }

        .submit-btn {
          width:100%; padding:15px; background:#C9A84C; color:#0a0a1a;
          border:none; cursor:pointer; font-family:'Bebas Neue',sans-serif;
          font-size:1rem; letter-spacing:.25em; transition:background .2s;
        }
        .submit-btn:hover { background:#dfc070; }

        .close-btn {
          position:absolute; top:12px; right:16px;
          background:none; border:none; cursor:pointer;
          color:rgba(255,255,255,.3); font-size:1.1rem;
          transition:color .2s; z-index:10;
        }
        .close-btn:hover { color:#fff; }
      `}</style>

      {/* ── SECTION ── */}
      <section
      id="prices"
        ref={ref}
        style={{ background:"#F2E9E2", width:"100%", overflow:"hidden" }}
      >
        <div className="pricing-split" style={{ display:"flex" }}>

          {/* ── LEFT — content ── */}
          <div className="pricing-left" style={{
            flex:1,
            padding:"clamp(28px,3.5vw,48px) clamp(20px,3.5vw,48px)",
            display:"flex", flexDirection:"column", justifyContent:"space-between",
          }}>

            {/* Label */}
            <div className={`p-fade ${inView?"on":""}`} style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"12px" }}>
              <div style={{ width:"28px", height:"1px", background:"#C9A84C" }}/>
              <span style={{ fontFamily:"'Didact Gothic',sans-serif", fontSize:"9px", letterSpacing:".4em", textTransform:"uppercase", color:"rgba(14,14,41,.4)" }}>Billetterie · 2026</span>
            </div>

            {/* Title */}
            <div>
              {[["Choisissez Votre","#0E0E29",".15s"],["Offre","#C9A84C",".31s"]].map(([word,color,delay])=>(
                <div key={word as string} className={`p-fade ${inView?"on":""}`} style={{ transitionDelay: delay as string }}>
                  <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(1.8rem,3.5vw,3rem)", lineHeight:.9, color: color as string, letterSpacing:".04em", display:"block" }}>{word}</span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className={`p-fade ${inView?"on":""}`} style={{ width:"36px", height:"1px", background:"rgba(201,168,76,.5)", margin:"12px 0", transitionDelay:".4s" }}/>

            {/* Description */}
            <p className={`p-fade ${inView?"on":""}`} style={{ transitionDelay:".46s", fontFamily:"'Didact Gothic',sans-serif", fontSize:"clamp(.78rem,1.1vw,.88rem)", lineHeight:1.75, color:"rgba(14,14,41,.55)", maxWidth:"340px", margin:0 }}>
              Tarifs saison 2026, susceptibles de changement. Cliquez sur une offre pour réserver votre place.
            </p>

            {/* Ticket rows */}
            <div className={`p-fade ${inView?"on":""}`} style={{ transitionDelay:".55s", marginTop:"16px" }}>
              {OFFERS.map((offer, i) => (
                <div
                  key={offer.id}
                  className={`ticket-row p-fade ${inView?"on":""}`}
                  style={{ transitionDelay:`${.6+i*.07}s` }}
                  onClick={() => setSelected(offer)}
                >
                  <span className="t-num">{String(i+1).padStart(2,"0")}</span>
                  <div className="t-divider"/>
                  <div className="t-info">
                    <span className="t-name">{offer.label}</span>
                    <span className="t-desc">{offer.desc}</span>
                  </div>
                  {offer.tag && <span className="t-tag">{offer.tag}</span>}
                  <span className="t-price">{offer.price.toLocaleString("fr-FR")} €</span>
                  <span className="t-cta">Réserver</span>
                </div>
              ))}
            </div>

            {/* Note */}
            <div className={`p-fade ${inView?"on":""}`} style={{ transitionDelay:"1.1s", display:"flex", alignItems:"center", gap:"10px", marginTop:"14px" }}>
              <div style={{ width:"20px", height:"1px", background:"rgba(201,168,76,.4)" }}/>
              <span style={{ fontFamily:"'Didact Gothic',sans-serif", fontSize:"9px", letterSpacing:".3em", textTransform:"uppercase", color:"rgba(14,14,41,.3)" }}>
                Demandes groupe · contact@publicevents.ma
              </span>
            </div>

          </div>

          {/* ── RIGHT — image ── */}
          <div
            className={`pricing-img p-slide-right ${inView?"on":""}`}
            style={{ flex:"0 0 48%", position:"relative", overflow:"hidden" }}
          >
            <Image
              src="/celine3.jpg"
              alt="Céline Dion"
              fill
              style={{ objectFit:"cover", objectPosition:"center 10%", filter:"brightness(.8) saturate(.9)" }}
              className="pricing-img-el"
            />
            {/* feather left into cream */}
            <div className="img-overlay-left" style={{ position:"absolute", inset:0, background:"linear-gradient(to left, transparent 55%, #F2E9E2 100%)" }}/>
            {/* feather bottom */}
            <div className="img-overlay-bottom" style={{ position:"absolute", inset:0, background:"linear-gradient(to top, #F2E9E2 0%, transparent 25%)" }}/>

            {/* floating badge */}
            <div className={`p-fade ${inView?"on":""}`} style={{ position:"absolute", bottom:"24px", right:"24px", textAlign:"right", transitionDelay:".6s" }}>
              <div style={{ fontFamily:"'Didact Gothic',sans-serif", fontSize:"9px", letterSpacing:".4em", textTransform:"uppercase", color:"rgba(14,14,41,.45)", marginBottom:"3px" }}>À partir de</div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.6rem", color:"#C9A84C", letterSpacing:".06em" }}>550 €</div>
            </div>
          </div>

        </div>
      </section>

      {/* ── MODAL ── */}
      {selected && (
        <div className="modal-overlay" onClick={(e) => { if (e.target===e.currentTarget) closeModal(); }}>
          <div className="modal">
            <button className="close-btn" onClick={closeModal}>✕</button>
            {!submitted ? (
              <>
                <div className="modal-left">
                  <div>
                    <div style={{ fontFamily:"'Didact Gothic',sans-serif", fontSize:"9px", letterSpacing:".4em", textTransform:"uppercase", color:"rgba(255,255,255,.28)", marginBottom:"12px" }}>Votre sélection</div>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(1.2rem,2vw,1.6rem)", color:"#fff", letterSpacing:".04em", lineHeight:.95, marginBottom:"4px" }}>{selected.label}</div>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(1.5rem,2.5vw,2rem)", color:"#C9A84C", letterSpacing:".04em" }}>
                      {selected.price.toLocaleString("fr-FR")} €
                    </div>
                    <div style={{ fontFamily:"'Didact Gothic',sans-serif", fontSize:".76rem", color:"rgba(255,255,255,.3)", lineHeight:1.65, marginTop:"8px" }}>{selected.desc}</div>
                    <div style={{ width:"100%", height:"1px", background:"rgba(201,168,76,.12)", margin:"16px 0" }}/>
                    <div style={{ fontFamily:"'Didact Gothic',sans-serif", fontSize:"9px", letterSpacing:".3em", textTransform:"uppercase", color:"rgba(255,255,255,.28)", marginBottom:"4px" }}>Total estimé</div>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(1.6rem,2.8vw,2.4rem)", color:"#C9A84C", letterSpacing:".04em" }}>
                      {total.toLocaleString("fr-FR")} €
                    </div>
                    <div style={{ fontFamily:"'Didact Gothic',sans-serif", fontSize:".72rem", color:"rgba(255,255,255,.22)", marginTop:"3px" }}>
                      {form.quantity} billet{form.quantity>1?"s":""}
                    </div>
                  </div>
                  <div style={{ fontFamily:"'Didact Gothic',sans-serif", fontSize:".72rem", color:"rgba(255,255,255,.18)", lineHeight:1.65, marginTop:"20px" }}>
                    Notre équipe vous contactera sous 24h pour confirmer.
                  </div>
                </div>
                <div className="modal-right">
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(1rem,1.8vw,1.4rem)", color:"#fff", letterSpacing:".06em", marginBottom:"20px" }}>
                    Informations de réservation
                  </div>
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
                    <div className="f-row">
                      <div><label className="f-label">Prénom</label><input className="f-input" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Jean" required /></div>
                      <div><label className="f-label">Nom</label><input className="f-input" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Dupont" required /></div>
                    </div>
                    <div className="f-row">
                      <div><label className="f-label">Email</label><input className="f-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="jean@example.com" required /></div>
                      <div><label className="f-label">Téléphone</label><input className="f-input" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+33 6 00 00 00" /></div>
                    </div>
                    <div className="f-row">
                      <div>
                        <label className="f-label">Date du concert</label>
                        <select className="f-input" name="date" value={form.date} onChange={handleChange} required>
                          <option value="" disabled>Choisir une date</option>
                          <optgroup label="Septembre 2026">{SEPT_DATES.map(d=><option key={d} value={d}>{d}</option>)}</optgroup>
                          <optgroup label="Octobre 2026">{OCT_DATES.map(d=><option key={d} value={d}>{d}</option>)}</optgroup>
                        </select>
                      </div>
                      <div><label className="f-label">Nombre de billets</label><input className="f-input" type="number" name="quantity" min={1} max={20} value={form.quantity} onChange={handleChange} required /></div>
                    </div>
                    <div><label className="f-label">Message (optionnel)</label><textarea className="f-input" name="message" value={form.message} onChange={handleChange} placeholder="Demande spéciale, accessibilité..." rows={3} /></div>
                    <button type="submit" className="submit-btn">Envoyer la demande</button>
                    <p style={{ fontFamily:"'Didact Gothic',sans-serif", fontSize:".72rem", color:"rgba(255,255,255,.2)", textAlign:"center", margin:0 }}>
                      Tarifs susceptibles de changement · contact@publicevents.ma
                    </p>
                  </form>
                </div>
              </>
            ) : (
              <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"clamp(32px,6vw,60px) clamp(20px,4vw,40px)" }}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"3rem", color:"#C9A84C", lineHeight:1 }}>✓</div>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(1.3rem,3vw,2rem)", color:"#fff", letterSpacing:".04em", marginTop:"12px" }}>Demande envoyée</div>
                <p style={{ fontFamily:"'Didact Gothic',sans-serif", fontSize:".85rem", color:"rgba(255,255,255,.42)", lineHeight:1.75, margin:"14px 0 28px", maxWidth:"320px" }}>
                  Merci {form.firstName} ! Votre demande pour <strong style={{ color:"#C9A84C" }}>{selected.label}</strong> le {form.date} a bien été reçue. Nous vous contacterons à <strong style={{ color:"rgba(255,255,255,.65)" }}>{form.email}</strong> sous 24h.
                </p>
                <button className="submit-btn" style={{ maxWidth:"200px" }} onClick={closeModal}>Fermer</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}