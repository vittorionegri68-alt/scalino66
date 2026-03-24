import { useState, useEffect, useRef } from "react";
import { config } from "./config.js";
import { contactInfo } from "./contact_info.js";

// ── Design Tokens — Italian Heritage ─────────────────────────────────────────
const C = {
  bg:       "#FDF6E3",
  bg2:      "#F5EDD0",
  bg3:      "#EDE0C0",
  text:     "#2C1810",
  textMid:  "#5C4033",
  textSoft: "#9C7B6A",
  primary:  "#6B2D2D",
  secondary:"#D9A066",
  accent:   "#A77B5F",
  border:   "rgba(107,45,45,0.15)",
  cardBg:   "#FFFDF5",
  shadow:   "0 4px 24px rgba(44,24,16,0.1)",
};

// ── Unsplash images — Cesena / Italian historic architecture ─────────────────
const HERO_1 = "/hero_1.jpg";
const HERO_2    = "/hero_2.jpg";
const ROOMS = [
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=75",
  "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=75",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=75",
  "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=75",
  "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=75",
  "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=75",
];
const LIFESTYLE = [
  "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=75",
  "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800&q=75",
  "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=75",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=75",
];

// ── Scroll reveal ─────────────────────────────────────────────────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
      ...style,
    }}>{children}</div>
  );
}

// ── Ornamental divider ────────────────────────────────────────────────────────
function OrnDivider({ color = C.secondary }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "1.5rem 0" }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${color})` }} />
      <div style={{ width: 6, height: 6, background: color, transform: "rotate(45deg)" }} />
      <div style={{ width: 4, height: 4, border: `1px solid ${color}`, transform: "rotate(45deg)" }} />
      <div style={{ width: 6, height: 6, background: color, transform: "rotate(45deg)" }} />
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${color}, transparent)` }} />
    </div>
  );
}

// ── Section label ─────────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.85rem" }}>
      <div style={{ width: 24, height: 1, background: C.secondary }} />
      <span style={{ fontSize: "0.62rem", letterSpacing: "0.28em", color: C.secondary, textTransform: "uppercase", fontFamily: "'Lora',serif" }}>
        {children}
      </span>
      <div style={{ width: 24, height: 1, background: C.secondary }} />
    </div>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    ["L'Appartamento", "#appartamento"],
    ["L'Esperienza", "#esperienza"],
    ["Posizione", "#posizione"],
    ["Recensioni", "#recensioni"],
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      background: scrolled ? "rgba(253,246,227,0.97)" : "rgba(253,246,227,0.88)",
      backdropFilter: "blur(10px)",
      borderBottom: `1px solid ${scrolled ? C.border : "rgba(107,45,45,0.06)"}`,
      transition: "all 0.4s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: "'Playfair Display',serif" }}>
          <div style={{ fontSize: "1.15rem", color: C.primary, fontWeight: 700, letterSpacing: "0.04em", lineHeight: 1.1 }}>SCALINO 66</div>
          <div style={{ fontSize: "0.58rem", color: C.textSoft, letterSpacing: "0.2em", textTransform: "uppercase" }}>Centro Storico · Cesena</div>
        </div>

        <div style={{ display: "flex", gap: "2.25rem", alignItems: "center" }} className="desk-nav">
          {links.map(([l, h]) => (
            <a key={l} href={h} style={{ color: C.textMid, textDecoration: "none", fontSize: "0.75rem", letterSpacing: "0.1em", fontFamily: "'Lora',serif", fontStyle: "italic", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = C.primary}
              onMouseLeave={e => e.target.style.color = C.textMid}>
              {l}
            </a>
          ))}
          <a href={config.airbnbUrl} target="_blank" rel="noopener noreferrer"
            style={{ background: C.primary, color: C.bg, padding: "0.55rem 1.4rem", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'Lora',serif", border: `1px solid ${C.primary}`, transition: "all 0.25s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.primary; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.primary; e.currentTarget.style.color = C.bg; }}>
            Prenota
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="burger"
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", flexDirection: "column", gap: 5, padding: "0.5rem" }}>
          {[0,1,2].map(i => <div key={i} style={{ width: 22, height: 1.5, background: C.primary }} />)}
        </button>
      </div>

      {open && (
        <div style={{ background: C.bg, borderTop: `1px solid ${C.border}`, padding: "1.25rem 2rem 1.75rem" }}>
          {links.map(([l, h]) => (
            <a key={l} href={h} onClick={() => setOpen(false)}
              style={{ display: "block", color: C.textMid, textDecoration: "none", padding: "0.7rem 0", fontFamily: "'Lora',serif", fontStyle: "italic", fontSize: "1rem", borderBottom: `1px solid ${C.border}` }}>
              {l}
            </a>
          ))}
          <a href={config.airbnbUrl} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-block", marginTop: "1.25rem", background: C.primary, color: C.bg, padding: "0.7rem 1.75rem", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'Lora',serif" }}>
            Prenota su Airbnb
          </a>
        </div>
      )}
      <style>{`@media(max-width:768px){.desk-nav{display:none!important}.burger{display:flex!important}}`}</style>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [slide, setSlide] = useState(0);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % 2), 6000);
    return () => clearInterval(t);
  }, []);

  const slides = [HERO_1, HERO_2];

  return (
    <section style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: C.bg }}>
      {slides.map((src, i) => (
  <img key={i} src={src} alt="" style={{
    position: "absolute", inset: 0,
    width: "100%", height: "100%",
    objectFit: "cover", objectPosition: "center",
    opacity: slide === i ? 0.90 : 0,
    transition: "opacity 1.5s ease",
    pointerEvents: "none",
  }} />
))}
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(160deg, ${C.bg} 15%, rgba(253,246,227,0.7) 100%)`, pointerEvents: "none" }} />

      <div style={{ position: "absolute", top: 40, right: 40, width: 200, height: 200, border: `1px solid rgba(107,45,45,0.12)`, transform: "rotate(15deg)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 60, right: 60, width: 150, height: 150, border: `1px solid rgba(217,160,102,0.18)`, transform: "rotate(15deg)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "0 2rem", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "8rem", paddingBottom: "5rem" }}>
        <div style={{ maxWidth: 700 }}>
          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)", transition: "all 0.7s ease 0.1s" }}>
            <SectionLabel>Cesena · Emilia-Romagna · Centro Storico</SectionLabel>
          </div>

          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(24px)", transition: "all 0.9s ease 0.25s" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(3.2rem,7vw,6.5rem)", fontWeight: 700, color: C.primary, lineHeight: 0.95, letterSpacing: "-0.02em", marginBottom: "0.15em" }}>
              Scalino
            </div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(3.2rem,7vw,6.5rem)", fontWeight: 400, color: C.secondary, lineHeight: 0.95, fontStyle: "italic", letterSpacing: "-0.01em", marginBottom: "1rem" }}>
              sessantasei.
            </div>
          </div>

          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 0.9s ease 0.42s" }}>
            <OrnDivider />
            <p style={{ fontFamily: "'Lora',serif", fontSize: "clamp(1rem,2vw,1.2rem)", color: C.textMid, lineHeight: 1.85, fontStyle: "italic", maxWidth: 520, margin: "1rem 0 2rem" }}>
              Sessantasei scalini separano la strada dal tuo rifugio nel cuore medievale di Cesena.
              Un bilocale ristrutturato dove storia e comfort si incontrano.
            </p>
          </div>

          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 0.9s ease 0.58s", display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <a href={config.airbnbUrl} target="_blank" rel="noopener noreferrer"
              style={{ background: C.primary, color: C.bg, padding: "1rem 2.25rem", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'Lora',serif", boxShadow: `0 6px 24px rgba(107,45,45,0.22)`, transition: "all 0.3s", border: `1px solid ${C.primary}` }}
              onMouseEnter={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.primary; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.primary; e.currentTarget.style.color = C.bg; e.currentTarget.style.transform = "translateY(0)"; }}>
              Prenota su Airbnb ↗
            </a>
            <a href="#appartamento"
              style={{ color: C.textMid, textDecoration: "none", fontSize: "0.78rem", letterSpacing: "0.1em", fontFamily: "'Lora',serif", fontStyle: "italic", borderBottom: `1px solid ${C.border}`, paddingBottom: "2px", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = C.primary}
              onMouseLeave={e => e.target.style.color = C.textMid}>
              Scopri l'appartamento
            </a>
          </div>

          <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.9s ease 0.75s", display: "flex", gap: "2.5rem", marginTop: "3rem", paddingTop: "2rem", borderTop: `1px solid ${C.border}`, flexWrap: "wrap" }}>
            {[["★ 5,0", "Rating Airbnb"], ["13", "Recensioni"], ["2", "Ospiti max"], ["66", "Scalini verso casa"]].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", color: C.primary, fontWeight: 700 }}>{v}</div>
                <div style={{ fontSize: "0.62rem", color: C.textSoft, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'Lora',serif", marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: `linear-gradient(to bottom, transparent, ${C.bg2})`, pointerEvents: "none" }} />
    </section>
  );
}

// ── Apartment ─────────────────────────────────────────────────────────────────
function Apartment() {
  const [active, setActive] = useState(0);
  const amenities = [
    { icon: "❄️", title: "Aria condizionata", desc: "In ogni stanza per il massimo comfort" },
    { icon: "📶", title: "WiFi fibra", desc: "Connessione veloce, ideale per lo smart working" },
    { icon: "👨‍🍳", title: "Cucina completa", desc: "Forno, lavatrice, macchinetta, ingredienti base" },
    { icon: "🔐", title: "Self check-in", desc: "Smart lock — arrivi quando vuoi" },
    { icon: "🐾", title: "Animali ammessi", desc: "I tuoi compagni a quattro zampe sono benvenuti" },
    { icon: "🌇", title: "Vista sul centro", desc: "Terzo piano con veduta sul centro storico" },
  ];

  return (
    <section id="appartamento" style={{ background: C.bg2, padding: "8rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <SectionLabel>Il Rifugio</SectionLabel>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4.5vw,3.8rem)", color: C.primary, fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.02em" }}>
              Un bilocale ristrutturato<br /><span style={{ color: C.secondary, fontStyle: "italic" }}>nel cuore medievale.</span>
            </h2>
            <OrnDivider />
            <p style={{ fontFamily: "'Lora',serif", fontSize: "1rem", color: C.textMid, lineHeight: 1.85, maxWidth: 620, margin: "0 auto", fontStyle: "italic" }}>
              Al terzo piano di un palazzo storico cesenate, Scalino 66 e un appartamento luminoso e appena ristrutturato.
              Cucina attrezzata, aria condizionata, lavatrice — tutto il necessario per un soggiorno senza pensieri.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }} className="apt-grid">
          <Reveal>
            <div>
              <div style={{ overflow: "hidden", boxShadow: `0 16px 50px rgba(44,24,16,0.14)`, marginBottom: "0.5rem" }}>
                <img src={ROOMS[active]} alt="Scalino 66" loading="lazy"
                  style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block", transition: "transform 0.6s ease" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: "0.3rem" }}>
                {ROOMS.map((src, i) => (
                  <div key={i} onClick={() => setActive(i)}
                    style={{ overflow: "hidden", cursor: "pointer", border: active === i ? `2px solid ${C.primary}` : "2px solid transparent", transition: "border 0.2s" }}>
                    <img src={src} alt="" loading="lazy" style={{ width: "100%", aspectRatio: "1", objectFit: "cover", display: "block", filter: active === i ? "none" : "brightness(0.65) saturate(0.7)", transition: "filter 0.2s" }} />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "2.25rem" }}>
                {amenities.map(({ icon, title, desc }) => (
                  <div key={title} style={{ background: C.cardBg, padding: "1rem", border: `1px solid ${C.border}`, transition: "all 0.25s", cursor: "default" }}
                    onMouseEnter={e => { e.currentTarget.style.background = C.bg3; e.currentTarget.style.borderColor = C.secondary; }}
                    onMouseLeave={e => { e.currentTarget.style.background = C.cardBg; e.currentTarget.style.borderColor = C.border; }}>
                    <div style={{ fontSize: "1.2rem", marginBottom: "0.4rem" }}>{icon}</div>
                    <div style={{ fontFamily: "'Lora',serif", fontSize: "0.82rem", color: C.primary, fontWeight: 700, marginBottom: "0.2rem" }}>{title}</div>
                    <div style={{ fontFamily: "'Lora',serif", fontSize: "0.72rem", color: C.textSoft, lineHeight: 1.5 }}>{desc}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: C.cardBg, border: `1px solid ${C.border}`, padding: "1.5rem", marginBottom: "1.75rem" }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.secondary, marginBottom: "0.75rem" }}>Il nome ha una storia</div>
                <p style={{ fontFamily: "'Lora',serif", fontSize: "0.9rem", color: C.textMid, lineHeight: 1.8, fontStyle: "italic", margin: 0 }}>
                  "Scalino 66 prende il nome dai sessantasei gradini che separano la strada dall'appartamento.
                  Ogni passo verso l'alto e un passo verso il cuore autentico di Cesena."
                </p>
              </div>

              <a href={config.airbnbUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: C.primary, color: C.bg, padding: "0.95rem 2rem", fontSize: "0.76rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'Lora',serif", boxShadow: `0 4px 18px rgba(107,45,45,0.2)`, transition: "all 0.25s", border: `1px solid ${C.primary}` }}
                onMouseEnter={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.primary; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = C.primary; e.currentTarget.style.color = C.bg; e.currentTarget.style.transform = "translateY(0)"; }}>
                Verifica disponibilita su Airbnb ↗
              </a>
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`@media(max-width:768px){.apt-grid{grid-template-columns:1fr!important;gap:2.5rem!important}}`}</style>
    </section>
  );
}

// ── Experience / Lifestyle ────────────────────────────────────────────────────
function Experience() {
  return (
    <section id="esperienza" style={{ background: C.bg, padding: "8rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
            <SectionLabel>L'Esperienza</SectionLabel>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4.5vw,3.8rem)", color: C.primary, fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
              Vivere Cesena<br /><span style={{ color: C.secondary, fontStyle: "italic" }}>come un romagnolo.</span>
            </h2>
            <OrnDivider />
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.5rem", marginBottom: "5rem" }} className="life-grid">
          {[
            { img: LIFESTYLE[0], title: "Storia a portata di mano", desc: "La Biblioteca Malatestiana UNESCO, la Rocca, il Teatro Verdi — capolavori raggiungibili a piedi dal tuo appartamento." },
            { img: LIFESTYLE[1], title: "La piazza come salotto", desc: "Piazza del Popolo con la Fontana Masini e il Palazzo Comunale — mercati settimanali ed eventi durante tutto l'anno." },
            { img: LIFESTYLE[2], title: "Cucina romagnola autentica", desc: "Piadina, passatelli, tagliatelle al ragu. Osterie e trattorie nel centro storico a due passi da casa." },
            { img: LIFESTYLE[3], title: "Base ideale per esplorare", desc: "Bertinoro a 15 min, il mare a 30 min, San Marino a 35 min. La Romagna a portata di auto." },
          ].map(({ img, title, desc }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div style={{ position: "relative", overflow: "hidden", boxShadow: C.shadow }}>
                <img src={img} alt={title} loading="lazy"
                  style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover", display: "block", transition: "transform 0.7s ease" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(44,24,16,0.75) 0%, transparent 55%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem" }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.05rem", color: "#FDF6E3", fontWeight: 700, marginBottom: "0.35rem" }}>{title}</div>
                  <div style={{ fontFamily: "'Lora',serif", fontSize: "0.78rem", color: "rgba(253,246,227,0.8)", lineHeight: 1.65, fontStyle: "italic" }}>{desc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0", background: C.border, border: `1px solid ${C.border}` }} className="dist-grid">
            {[
              ["15 min", "da Bertinoro"],
              ["30 min", "dalla Riviera"],
              ["35 min", "da San Marino"],
              ["1 km", "dalla Rocca"],
            ].map(([v, l]) => (
              <div key={l} style={{ background: C.cardBg, padding: "1.75rem", textAlign: "center", borderRight: `1px solid ${C.border}` }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", color: C.primary, fontWeight: 700 }}>{v}</div>
                <div style={{ fontFamily: "'Lora',serif", fontSize: "0.7rem", color: C.textSoft, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4, fontStyle: "italic" }}>{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <style>{`@media(max-width:768px){.life-grid{grid-template-columns:1fr!important}.dist-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
    </section>
  );
}

// ── How It Works ──────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { n: "I",   t: "Scegli le date",      b: "Controlla la disponibilita su Airbnb. Calendario sempre aggiornato, prenotazione sicura." },
    { n: "II",  t: "Ricevi conferma",     b: "Entro pochi minuti ricevi tutte le informazioni di accesso e i consigli locali." },
    { n: "III", t: "Sali i 66 scalini",   b: "Self check-in con smartlock. Nessuna reception, nessuna attesa. Arrivi quando vuoi." },
    { n: "IV",  t: "Vivi Cesena",         b: "L'appartamento e tuo. Esplora, mangia, lavora, rilassati — a casa nel centro storico." },
  ];

  return (
    <section style={{ background: C.bg2, padding: "8rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
            <SectionLabel>Come Funziona</SectionLabel>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3.5rem)", color: C.primary, fontWeight: 700, letterSpacing: "-0.02em" }}>
              Semplice come<br /><span style={{ color: C.secondary, fontStyle: "italic" }}>salire una scala.</span>
            </h2>
            <OrnDivider />
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0", border: `1px solid ${C.border}` }} className="steps-grid">
          {steps.map(({ n, t, b }, i) => (
            <Reveal key={n} delay={i * 80}>
              <div style={{ padding: "2.5rem 1.75rem", borderRight: i < 3 ? `1px solid ${C.border}` : "none", background: C.cardBg, height: "100%", boxSizing: "border-box", transition: "background 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.background = C.bg3}
                onMouseLeave={e => e.currentTarget.style.background = C.cardBg}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", color: C.secondary, fontWeight: 700, marginBottom: "1.25rem", fontStyle: "italic" }}>{n}.</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", color: C.primary, fontWeight: 700, marginBottom: "0.75rem" }}>{t}</div>
                <div style={{ fontFamily: "'Lora',serif", fontSize: "0.83rem", color: C.textMid, lineHeight: 1.8, fontStyle: "italic" }}>{b}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.steps-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────
function Testimonials() {
  const reviews = [
    { q: "Appartamento bellissimo e molto pulito, tutto quello che e stato descritto nell'annuncio e verificato. La posizione e davvero ottima per visitare il centro storico.", name: "Marco", origin: "Milano" },
    { q: "Tutto perfetto. L'appartamento e esattamente come nelle foto. Zona centralissima, molto comoda. Anna e stata super disponibile.", name: "Giulia", origin: "Roma" },
    { q: "Posto carino, comodo, buona posizione in pieno centro. L'host e stata disponibile e precisa. Torneremo sicuramente.", name: "Luca", origin: "Venezia" },
    { q: "Appartamento accogliente e funzionale. La cucina e ben attrezzata e il letto e molto comodo. Ottima base per visitare la Romagna.", name: "Sophie", origin: "Parigi" },
  ];

  return (
    <section id="recensioni" style={{ background: C.bg, padding: "8rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <SectionLabel>Parola degli ospiti</SectionLabel>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3.5rem)", color: C.primary, fontWeight: 700, letterSpacing: "-0.02em" }}>
              Cosa dicono<br /><span style={{ color: C.secondary, fontStyle: "italic" }}>chi ha salito le scale.</span>
            </h2>
            <OrnDivider />
            <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
              {[["★ 5,0", "Rating"], ["13", "Recensioni"], ["100%", "5 stelle"]].map(([v, l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", color: C.primary, fontWeight: 700 }}>{v}</div>
                  <div style={{ fontFamily: "'Lora',serif", fontSize: "0.65rem", color: C.textSoft, textTransform: "uppercase", letterSpacing: "0.12em" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.5px", background: C.border }} className="rev-grid">
          {reviews.map(({ q, name, origin }) => (
            <Reveal key={name}>
              <div style={{ background: C.cardBg, padding: "2.5rem", transition: "background 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.background = C.bg2}
                onMouseLeave={e => e.currentTarget.style.background = C.cardBg}>
                <div style={{ color: C.secondary, fontSize: "0.9rem", letterSpacing: "0.1em", marginBottom: "1rem" }}>{"★★★★★"}</div>
                <p style={{ fontFamily: "'Lora',serif", fontSize: "1rem", color: C.text, lineHeight: 1.85, fontStyle: "italic", marginBottom: "1.75rem" }}>
                  "{q}"
                </p>
                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "1rem" }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.9rem", color: C.primary, fontWeight: 700 }}>{name}</div>
                  <div style={{ fontFamily: "'Lora',serif", fontSize: "0.72rem", color: C.textSoft, fontStyle: "italic" }}>{origin}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.rev-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

// ── Location ──────────────────────────────────────────────────────────────────
function Location() {
  const places = [
    { icon: "🏛️", name: "Biblioteca Malatestiana UNESCO", dist: "300 m" },
    { icon: "🏰", name: "Rocca Malatestiana",             dist: "400 m" },
    { icon: "🎭", name: "Teatro Verdi & Teatro Bonci",    dist: "200 m" },
    { icon: "🍽️", name: "Ristoranti e osterie locali",    dist: "50 m" },
    { icon: "🚂", name: "Stazione ferroviaria",           dist: "600 m" },
    { icon: "🅿️", name: "Parcheggi (a pagamento e free)", dist: "100 m" },
    { icon: "🛒", name: "Supermercati e negozi",          dist: "200 m" },
    { icon: "🌊", name: "Riviera Adriatica — Cesenatico", dist: "30 min" },
  ];

  return (
    <section id="posizione" style={{ background: C.bg2, padding: "8rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <SectionLabel>Posizione</SectionLabel>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3.5rem)", color: C.primary, fontWeight: 700, letterSpacing: "-0.02em" }}>
              Nel cuore di Cesena,<br /><span style={{ color: C.secondary, fontStyle: "italic" }}>a portata di tutto.</span>
            </h2>
            <OrnDivider />
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }} className="loc-grid">
          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5px", background: C.border }}>
              {places.map(({ icon, name, dist }) => (
                <div key={name} style={{ background: C.cardBg, padding: "0.9rem 1.1rem", display: "flex", alignItems: "center", gap: "0.85rem", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = C.bg3}
                  onMouseLeave={e => e.currentTarget.style.background = C.cardBg}>
                  <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{icon}</span>
                  <span style={{ fontFamily: "'Lora',serif", fontSize: "0.87rem", color: C.text, flex: 1 }}>{name}</span>
                  <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.88rem", color: C.primary, fontWeight: 700, whiteSpace: "nowrap" }}>{dist}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div>
              <div style={{ background: C.cardBg, border: `1px solid ${C.border}`, padding: "2rem", marginBottom: "1.5rem" }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.secondary, marginBottom: "0.75rem" }}>Il Quartiere</div>
                <p style={{ fontFamily: "'Lora',serif", fontSize: "0.92rem", color: C.textMid, lineHeight: 1.9, fontStyle: "italic", margin: 0 }}>
                  Il centro storico di Cesena e un intreccio affascinante di storia, cultura e vitalita.
                  Piazza del Popolo con la Fontana Masini, la Biblioteca Malatestiana UNESCO,
                  teatri, bar e ristoranti — tutto a portata di passeggiate.
                </p>
              </div>
              <div style={{ background: C.cardBg, border: `1px solid ${C.border}`, padding: "2rem" }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.secondary, marginBottom: "0.75rem" }}>Indirizzo</div>
                <div style={{ fontFamily: "'Lora',serif", fontSize: "0.9rem", color: C.text, lineHeight: 1.7 }}>
                  {contactInfo.address}
                </div>
                <div style={{ marginTop: "0.75rem", fontFamily: "'Lora',serif", fontSize: "0.82rem", color: C.textSoft, fontStyle: "italic" }}>
                  La posizione esatta viene comunicata dopo la prenotazione su Airbnb.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`@media(max-width:768px){.loc-grid{grid-template-columns:1fr!important;gap:2rem!important}}`}</style>
    </section>
  );
}

// ── About Host ────────────────────────────────────────────────────────────────
function AboutHost() {
  return (
    <section style={{ background: C.bg, padding: "8rem 2rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <SectionLabel>L'Host</SectionLabel>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3.2rem)", color: C.primary, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
            Anna e il team
          </h2>
          <div style={{ fontFamily: "'Lora',serif", fontSize: "1rem", color: C.secondary, fontStyle: "italic", marginBottom: "1.5rem" }}>
            Property manager · Cesena
          </div>
          <OrnDivider />
          <p style={{ fontFamily: "'Lora',serif", fontSize: "1rem", color: C.textMid, lineHeight: 1.9, fontStyle: "italic", maxWidth: 620, margin: "1.5rem auto 2.5rem" }}>
            "Ciao, sono Anna e sono appassionata di digital marketing e di ospitalita.
            Gestisco diversi Airbnb e sono sempre disponibile per i miei ospiti.
            Scalino 66 e uno dei nostri appartamenti preferiti — ristrutturato con cura
            per offrire il meglio del centro storico cesenate."
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            {[["3 anni", "di esperienza"], ["100%", "risposta"], ["★ 5,0", "valutazione media"]].map(([v, l]) => (
              <div key={l} style={{ background: C.cardBg, border: `1px solid ${C.border}`, padding: "1rem 1.75rem", textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", color: C.primary, fontWeight: 700 }}>{v}</div>
                <div style={{ fontFamily: "'Lora',serif", fontSize: "0.65rem", color: C.textSoft, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Final CTA ─────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section style={{ background: C.primary, padding: "8rem 2rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%) rotate(8deg)", width: "60vw", height: "60vw", border: "1px solid rgba(253,246,227,0.08)", maxWidth: 700, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%) rotate(8deg)", width: "42vw", height: "42vw", border: "1px solid rgba(217,160,102,0.12)", maxWidth: 500, pointerEvents: "none" }} />

      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ fontFamily: "'Lora',serif", fontSize: "0.65rem", letterSpacing: "0.28em", color: C.secondary, textTransform: "uppercase", marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
            <div style={{ width: 24, height: 1, background: C.secondary }} />
            Prenota ora
            <div style={{ width: 24, height: 1, background: C.secondary }} />
          </div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.2rem,5vw,4.2rem)", color: C.bg, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "1.25rem" }}>
            Sessantasei scalini<br /><span style={{ color: C.secondary, fontStyle: "italic" }}>verso casa tua.</span>
          </h2>
          <OrnDivider color={C.secondary} />
          <p style={{ fontFamily: "'Lora',serif", fontSize: "1.05rem", color: "rgba(253,246,227,0.8)", lineHeight: 1.85, fontStyle: "italic", marginBottom: "2.75rem", maxWidth: 560, margin: "1.5rem auto 2.75rem" }}>
            Le date si esauriscono rapidamente. Controlla ora la disponibilita su Airbnb
            e assicurati la tua esperienza nel centro storico di Cesena.
          </p>
          <a href={config.airbnbUrl} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", background: C.secondary, color: C.primary, padding: "1.15rem 3rem", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'Lora',serif", boxShadow: `0 8px 32px rgba(0,0,0,0.2)`, transition: "all 0.3s", border: `1px solid ${C.secondary}` }}
            onMouseEnter={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.secondary; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.secondary; e.currentTarget.style.color = C.primary; e.currentTarget.style.transform = "translateY(0)"; }}>
            Controlla disponibilita su Airbnb ↗
          </a>
          <div style={{ marginTop: "1.5rem", fontFamily: "'Lora',serif", fontSize: "0.75rem", color: "rgba(253,246,227,0.5)", letterSpacing: "0.1em", fontStyle: "italic" }}>
            Prenotazione sicura · Conferma immediata · Rating 5,0 stelle
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: C.bg3, borderTop: `1px solid ${C.border}`, padding: "4rem 2rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }} className="footer-grid">
          <div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", color: C.primary, fontWeight: 700, letterSpacing: "0.04em", marginBottom: "0.25rem" }}>SCALINO 66</div>
            <div style={{ fontFamily: "'Lora',serif", fontSize: "0.72rem", color: C.textSoft, letterSpacing: "0.12em", textTransform: "uppercase", fontStyle: "italic", marginBottom: "1rem" }}>Bilocale · Centro Storico · Cesena</div>
            <div style={{ fontFamily: "'Lora',serif", fontSize: "0.83rem", color: C.textMid, lineHeight: 1.75, fontStyle: "italic" }}>
              {contactInfo.address}
            </div>
            <div style={{ marginTop: "0.75rem" }}>
              <a href={`tel:${contactInfo.phone}`} style={{ fontFamily: "'Lora',serif", fontSize: "0.83rem", color: C.textMid, textDecoration: "none", display: "block", marginBottom: "0.3rem" }}
                onMouseEnter={e => e.target.style.color = C.primary} onMouseLeave={e => e.target.style.color = C.textMid}>
                {contactInfo.phone}
              </a>
              <a href={`mailto:${contactInfo.email}`} style={{ fontFamily: "'Lora',serif", fontSize: "0.83rem", color: C.textMid, textDecoration: "none" }}
                onMouseEnter={e => e.target.style.color = C.primary} onMouseLeave={e => e.target.style.color = C.textMid}>
                {contactInfo.email}
              </a>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: "'Lora',serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.textSoft, marginBottom: "1rem" }}>Naviga</div>
            {[["L'Appartamento","#appartamento"],["L'Esperienza","#esperienza"],["Posizione","#posizione"],["Recensioni","#recensioni"]].map(([l,h]) => (
              <a key={l} href={h} style={{ display: "block", fontFamily: "'Lora',serif", fontStyle: "italic", fontSize: "0.88rem", color: C.textMid, textDecoration: "none", marginBottom: "0.5rem", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = C.primary} onMouseLeave={e => e.target.style.color = C.textMid}>
                {l}
              </a>
            ))}
          </div>

          <div>
            <div style={{ fontFamily: "'Lora',serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.textSoft, marginBottom: "1rem" }}>Prenota</div>
            <a href={config.airbnbUrl} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-block", background: C.primary, color: C.bg, padding: "0.6rem 1.25rem", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'Lora',serif", transition: "background 0.2s", marginBottom: "1.25rem" }}
              onMouseEnter={e => e.currentTarget.style.background = C.accent}
              onMouseLeave={e => e.currentTarget.style.background = C.primary}>
              Airbnb ↗
            </a>
            <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer"
              style={{ display: "block", fontFamily: "'Lora',serif", fontStyle: "italic", fontSize: "0.83rem", color: C.textMid, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = C.primary} onMouseLeave={e => e.target.style.color = C.textMid}>
              @luceacollection_ ↗
            </a>
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
          <div style={{ fontFamily: "'Lora',serif", fontSize: "0.72rem", color: C.textSoft, fontStyle: "italic" }}>
            © {new Date().getFullYear()} Scalino 66 · Cesena · Tutti i diritti riservati
          </div>
          <div style={{ fontFamily: "'Lora',serif", fontSize: "0.7rem", color: C.textSoft, letterSpacing: "0.1em", fontStyle: "italic" }}>
            IT040007AT00061
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.footer-grid{grid-template-columns:1fr!important;gap:2rem!important}}`}</style>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Lora:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #FDF6E3; color: #2C1810; -webkit-font-smoothing: antialiased; }
        ::selection { background: rgba(107,45,45,0.18); color: #2C1810; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #FDF6E3; }
        ::-webkit-scrollbar-thumb { background: rgba(107,45,45,0.3); border-radius: 2px; }
      `}</style>
      <Nav />
      <Hero />
      <Apartment />
      <Experience />
      <HowItWorks />
      <Testimonials />
      <Location />
      <AboutHost />
      <FinalCTA />
      <Footer />
    </>
  );
}
