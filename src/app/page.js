"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── CONFIGURACIÓN ──────────────────────────────────────────────
const NOMBRE       = "Milena";
const FECHA_EVENTO = new Date("2026-08-22T20:00:00");
const DIA_NUM      = "22";
const MES          = "agosto";
const DIA_SEM      = "SÁBADO";
const ANIO         = "2026";
const MENSAJE      = "Porque esta noche es muy importante para mí, quiero compartirla con las personas que llevo en el corazón. Porque sos una de ellas, quisiera que estés presente en una de las noches más inolvidables de mi vida.";
const ALIAS        = "MILUFEST"; // Cambiá esto
const PLAYLIST_URL = "#";          // Reemplazá con Spotify / Google Form
const AUDIO_SRC    = "/Ariana Grande - One Last Time.mp3";
const FOTOS        = [
  "/fotos/foto1.jpg",
  "/fotos/foto2.jpg",
  "/fotos/foto3.jpg",
  "/fotos/foto4.jpg",
  "/fotos/foto5.jpg",
];

function ButterflyIcon({ size = 24 }) {
  return (
    <svg
      viewBox="0 0 60 40"
      width={size}
      height={size * 0.67}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M30 20 C27 11 14 4 6 8 C0 11 1 20 10 21 C17 22 25 21 30 20Z" />
      <path d="M30 20 C33 11 46 4 54 8 C60 11 59 20 50 21 C43 22 35 21 30 20Z" />
      <path d="M30 20 C26 26 16 30 11 27 C6 23 10 17 18 20 C23 22 27 22 30 20Z" opacity="0.75" />
      <path d="M30 20 C34 26 44 30 49 27 C54 23 50 17 42 20 C37 22 33 22 30 20Z" opacity="0.75" />
      <ellipse cx="30" cy="20" rx="1.8" ry="8" />
      <path d="M29 13 C26 8 22 5 20 3" stroke="currentColor" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <path d="M31 13 C34 8 38 5 40 3" stroke="currentColor" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <circle cx="20" cy="3" r="1.3" />
      <circle cx="40" cy="3" r="1.3" />
    </svg>
  );
}

// ─── Mariposas flotantes globales (overlay fijo) ───────────────
function MariposaFlotante({ left, duration, delay, size, color }) {
  return (
    <motion.div
      style={{ position: "fixed", left: `${left}%`, top: -50, color, pointerEvents: "none", zIndex: 5 }}
      animate={{
        y: ["0vh", "115vh"],
        x: [0, 18, -12, 14, -8, 0],
        rotate: [0, 12, -10, 8, 0],
      }}
      transition={{
        y:      { duration, repeat: Infinity, delay, ease: "linear" },
        x:      { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay },
        rotate: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      <ButterflyIcon size={size} />
    </motion.div>
  );
}

// ─── Mariposas de fondo por sección (estáticas, tintilan) ──────
function FondoMariposas() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        top:   5 + Math.random() * 88,
        left:  2 + Math.random() * 94,
        size:  8 + Math.random() * 10,
        delay: Math.random() * 4,
        dur:   2.5 + Math.random() * 2,
        pink:  Math.random() > 0.65,
      }))
    );
  }, []);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {items.map((b) => (
        <motion.div
          key={b.id}
          className="absolute"
          style={{
            top:  `${b.top}%`,
            left: `${b.left}%`,
            color: b.pink ? "oklch(0.73 0.10 350 / 0.45)" : "rgba(255,255,255,0.22)",
          }}
          animate={{ opacity: [0.15, 0.75, 0.15], scale: [0.85, 1.1, 0.85], rotate: [0, 6, -6, 0] }}
          transition={{ duration: b.dur, repeat: Infinity, delay: b.delay }}
        >
          <ButterflyIcon size={b.size} />
        </motion.div>
      ))}
    </div>
  );
}

// ─── Mariposas flotantes (generadas en cliente) ────────────────
function MariposasFijo() {
  const [list, setList] = useState([]);
  useEffect(() => {
    setList(
      Array.from({ length: 8 }, (_, i) => ({
        id:       i,
        left:     5 + Math.random() * 88,
        duration: 12 + Math.random() * 10,
        delay:    Math.random() * 15,
        size:     14 + Math.random() * 14,
        color:    i % 3 === 0
          ? "oklch(0.73 0.10 350 / 0.50)"
          : "rgba(255,255,255,0.20)",
      }))
    );
  }, []);
  return (
    <>
      {list.map((b) => (
        <MariposaFlotante key={b.id} {...b} />
      ))}
    </>
  );
}

// ─── Disco Ball ───────────────────────────────────────────────
function DiscoBall({ size = 130 }) {
  return (
    <div className="flex flex-col items-center">
      <div
        style={{ width: 2, height: 32, background: "oklch(0.97 0 0 / 0.35)" }}
      />
      <div
        style={{
          width: size, height: size, borderRadius: "50%",
          background: [
            "radial-gradient(circle at 28% 22%, oklch(0.97 0 0 / 0.92) 0%, transparent 26%)",
            "radial-gradient(circle at 70% 65%, oklch(0.75 0 0 / 0.45) 0%, transparent 32%)",
            "radial-gradient(circle at center, oklch(0.78 0 0) 0%, oklch(0.52 0 0) 52%, oklch(0.27 0 0) 100%)",
          ].join(", "),
          boxShadow: "0 0 50px oklch(0.75 0 0 / 0.20), 0 0 100px oklch(0.75 0.05 280 / 0.10)",
          position: "relative", overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          backgroundImage: [
            "repeating-linear-gradient(0deg,   transparent, transparent 9px, oklch(0 0 0 / 0.18) 9px, oklch(0 0 0 / 0.18) 10px)",
            "repeating-linear-gradient(90deg, transparent, transparent 9px, oklch(0 0 0 / 0.18) 9px, oklch(0 0 0 / 0.18) 10px)",
          ].join(", "),
        }} />
        {[
          { top:"17%", left:"22%", w:"14%", h:"9%",  rot:"-12deg", op:0.88 },
          { top:"31%", left:"54%", w:"11%", h:"7%",  rot:"16deg",  op:0.65 },
          { top:"11%", left:"51%", w:"9%",  h:"12%", rot:"-5deg",  op:0.72 },
          { top:"50%", left:"30%", w:"7%",  h:"6%",  rot:"8deg",   op:0.45 },
          { top:"40%", left:"68%", w:"6%",  h:"8%",  rot:"-14deg", op:0.55 },
        ].map((d, i) => (
          <div key={i} style={{
            position:"absolute", top:d.top, left:d.left,
            width:d.w, height:d.h,
            background:`rgba(255,255,255,${d.op})`,
            borderRadius:"2px", transform:`rotate(${d.rot})`,
          }} />
        ))}
      </div>
    </div>
  );
}

// ─── Reproductor ───────────────────────────────────────────────
function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing,  setPlaying]  = useState(false);
  const [progress, setProgress] = useState(0);
  const [shuffle,  setShuffle]  = useState(false);
  const [repeat,   setRepeat]   = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () =>
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    const onEnd = () => { if (repeat) audio.play().catch(() => {}); else setPlaying(false); };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);
    return () => { audio.removeEventListener("timeupdate", onTime); audio.removeEventListener("ended", onEnd); };
  }, [repeat]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().catch(() => {}); setPlaying(true); }
  };

  const seek = (e) => {
    const a = audioRef.current;
    if (!a?.duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    a.currentTime = ((e.clientX - r.left) / r.width) * a.duration;
  };

  const iconStyle = (active) => ({
    color: "white",
    opacity: active ? 1 : 0.38,
    background: "none",
    border: "none",
    cursor: "pointer",
    transition: "opacity 0.2s",
  });

  return (
    <div style={{ width: "100%", maxWidth: 320, margin: "0 auto" }}>
      <p style={{
        textAlign: "center", color: "oklch(0.97 0 0 / 0.42)",
        fontSize: 11, letterSpacing: "0.18em", marginBottom: 14, fontFamily: "inherit",
      }}>
        Presioná PLAY para reproducir la canción
      </p>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src={AUDIO_SRC} preload="metadata" />

      {/* barra */}
      <div
        role="progressbar"
        aria-label="Progreso de la canción"
        onClick={seek}
        style={{
          width: "100%", height: 3, background: "oklch(0.97 0 0 / 0.18)",
          borderRadius: 99, marginBottom: 18, cursor: "pointer", position: "relative",
        }}
      >
        <div style={{
          width: `${progress}%`, height: "100%",
          background: "oklch(0.97 0 0 / 0.72)", borderRadius: 99,
          position: "relative", transition: "width 0.3s linear",
        }}>
          <div style={{
            position: "absolute", right: -5, top: "50%", transform: "translateY(-50%)",
            width: 10, height: 10, borderRadius: "50%", background: "white",
          }} />
        </div>
      </div>

      {/* controles */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24 }}>
        <button aria-label="Aleatorio" style={iconStyle(shuffle)} onClick={() => setShuffle(!shuffle)}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
          </svg>
        </button>

        <button aria-label="Anterior" style={{ ...iconStyle(false), opacity: 0.55 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
          </svg>
        </button>

        <motion.button
          aria-label={playing ? "Pausar" : "Reproducir"}
          whileTap={{ scale: 0.9 }}
          onClick={toggle}
          style={{
            width: 52, height: 52, borderRadius: "50%", background: "white",
            border: "none", cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 24px oklch(0.73 0.10 350 / 0.30)",
          }}
        >
          {playing
            ? <svg width="18" height="18" viewBox="0 0 24 24" fill="oklch(0.12 0.025 280)"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
            : <svg width="18" height="18" viewBox="0 0 24 24" fill="oklch(0.12 0.025 280)"><path d="M8 5v14l11-7z" /></svg>
          }
        </motion.button>

        <button aria-label="Siguiente" style={{ ...iconStyle(false), opacity: 0.55 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </button>

        <button aria-label="Repetir" style={iconStyle(repeat)} onClick={() => setRepeat(!repeat)}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Contador regresivo ────────────────────────────────────────
function Contador() {
  const [t, setT] = useState({ dias: 0, horas: 0, minutos: 0 });
  useEffect(() => {
    const calc = () => {
      const diff = FECHA_EVENTO - new Date();
      if (diff <= 0) return setT({ dias: 0, horas: 0, minutos: 0 });
      setT({
        dias:    Math.floor(diff / 86400000),
        horas:   Math.floor((diff % 86400000) / 3600000),
        minutos: Math.floor((diff % 3600000) / 60000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 6 }}>
      {[
        { val: t.dias,    label: "DÍAS",    pink: false },
        { val: t.horas,   label: "HORAS",   pink: true  },
        { val: t.minutos, label: "MINUTOS", pink: true  },
      ].map(({ val, label, pink }, i) => (
        <React.Fragment key={label}>
          {i > 0 && (
            <span style={{
              fontSize: "clamp(2rem, 10vw, 3.5rem)", fontWeight: 700,
              color: "oklch(0.30 0 0)", lineHeight: 1, marginTop: 4, fontFamily: "inherit",
            }}>:</span>
          )}
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "clamp(2.2rem, 12vw, 4rem)",
              fontWeight: 700, lineHeight: 1,
              color: pink ? "oklch(0.73 0.10 350)" : "oklch(0.18 0 0)",
              fontFamily: "inherit",
            }}>
              {String(val).padStart(2, "0")}
            </div>
            <div style={{
              fontSize: 9, letterSpacing: "0.22em",
              color: "oklch(0.50 0 0)", marginTop: 8, fontFamily: "inherit",
            }}>{label}</div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Carrusel ──────────────────────────────────────────────────
function Carrusel() {
  const [cur, setCur]   = useState(0);
  const [dir, setDir]   = useState(1);
  const [paused, setPaused] = useState(false);
  const n = FOTOS.length;

  const advance = (d) => {
    setDir(d);
    setCur((c) => (c + d + n) % n);
  };

  // Auto-avance cada 2 segundos
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => advance(1), 2000);
    return () => clearInterval(id);
  }, [paused, cur]);

  const slideVariants = {
    enter: (d) => ({ x: d * 280, opacity: 0, scale: 0.92 }),
    center:      { x: 0, opacity: 1, scale: 1 },
    exit:  (d) => ({ x: d * -280, opacity: 0, scale: 0.92 }),
  };

  return (
    <div
      style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* frame del carrusel */}
      <div style={{
        position: "relative", width: "100%", maxWidth: 300,
        display: "flex", alignItems: "center", justifyContent: "center",
        minHeight: 310, overflow: "hidden",
      }}>
        {/* botón prev */}
        <button
          aria-label="Foto anterior"
          onClick={() => advance(-1)}
          style={{
            position: "absolute", left: 0, zIndex: 10,
            background: "oklch(0.97 0 0 / 0.12)", border: "none",
            color: "white", width: 36, height: 36, borderRadius: "50%",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
        </button>

        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={cur}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            style={{ position: "absolute" }}
          >
            <Polaroid src={FOTOS[cur]} />
          </motion.div>
        </AnimatePresence>

        {/* botón next */}
        <button
          aria-label="Siguiente foto"
          onClick={() => advance(1)}
          style={{
            position: "absolute", right: 0, zIndex: 10,
            background: "oklch(0.97 0 0 / 0.12)", border: "none",
            color: "white", width: 36, height: 36, borderRadius: "50%",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
        </button>
      </div>

      {/* dots */}
      <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
        {FOTOS.map((_, i) => (
          <button
            key={i}
            aria-label={`Ir a foto ${i + 1}`}
            onClick={() => { setDir(i > cur ? 1 : -1); setCur(i); }}
            style={{
              width:  i === cur ? 22 : 8,
              height: 8,
              borderRadius: 99,
              background: i === cur ? "oklch(0.73 0.10 350)" : "oklch(0.97 0 0 / 0.30)",
              border: "none", cursor: "pointer",
              transition: "all 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Polaroid({ src }) {
  return (
    <div style={{
      background: "white",
      padding: "10px 10px 40px",
      width: 230,
      boxShadow: "0 8px 32px oklch(0 0 0 / 0.45)",
    }}>
      <div style={{
        width: "100%", aspectRatio: "1/1",
        background: "oklch(0.88 0 0)",
        overflow: "hidden",
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src} alt="Foto XV"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
      </div>
    </div>
  );
}

// ─── Transición suave entre secciones oscuras ──────────────────
function FadeDown({ from = "oklch(0.12 0.025 280)", to = "oklch(0.12 0.025 280)" }) {
  return (
    <div
      aria-hidden="true"
      style={{
        height: 80, pointerEvents: "none",
        background: `linear-gradient(to bottom, ${from}, ${to})`,
      }}
    />
  );
}

// ─── Página principal ──────────────────────────────────────────
export default function InvitacionXV() {
  const BG = "oklch(0.12 0.025 280)";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Raleway:ital,wght@0,300;0,400;0,600;0,700;0,900;1,700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { background: oklch(0.12 0.025 280); overflow-x: hidden; }

        .gv  { font-family: 'Great Vibes', cursive; }
        .ral { font-family: 'Raleway', sans-serif; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}} />

      {/* Mariposas flotantes en toda la página */}
      <MariposasFijo />

      <main className="ral" style={{ background: BG, color: "oklch(0.97 0 0)", minHeight: "100vh" }}>

        {/* ══════════════════════════════════════
            S1 · HERO
        ══════════════════════════════════════ */}
        <section style={{
          position: "relative", minHeight: "100svh",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "space-between",
          padding: "clamp(40px, 8vw, 72px) 24px clamp(32px, 6vw, 56px)",
          overflow: "hidden",
        }}>
          <FondoMariposas />

          {/* Disco ball + nombre */}
          <motion.div
            style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center" }}
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* disco ball lateral pequeño */}
            <div style={{ position: "absolute", right: "calc(100% + 8px)", top: 40, opacity: 0.45, pointerEvents: "none" }}>
              <DiscoBall size={64} />
            </div>

            <DiscoBall size={clamp(100, 130)} />

            <h1
              className="gv"
              style={{
                fontSize: "clamp(5rem, 22vw, 7.5rem)",
                lineHeight: 1.05, marginTop: 4,
                color: "oklch(0.97 0 0)",
                textShadow: "0 2px 24px oklch(0.73 0.10 350 / 0.30)",
              }}
            >
              {NOMBRE}
            </h1>
          </motion.div>

          {/* MIS 15 AÑOS */}
          <motion.div
            style={{ position: "relative", zIndex: 10, textAlign: "center" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="ral" style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: "clamp(10px, 3vw, 20px)",
              letterSpacing: "0.32em", color: "oklch(0.97 0 0)",
              fontSize: "clamp(0.95rem, 3.5vw, 1.25rem)", fontWeight: 300,
              textTransform: "uppercase",
            }}>
              <span>MIS</span>
              <span className="ral" style={{
                fontSize: "clamp(4rem, 16vw, 6rem)", lineHeight: 1,
                color: "oklch(0.80 0.09 350)",
                fontWeight: 900, fontStyle: "italic",
                letterSpacing: "-0.02em",
                textShadow: "0 3px 0 oklch(0.55 0.08 350), 0 6px 20px oklch(0.73 0.10 350 / 0.35)",
              }}>
                15
              </span>
              <span>AÑOS</span>
            </div>
          </motion.div>

          {/* Reproductor centrado */}
          <motion.div
            style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 340 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <MusicPlayer />
          </motion.div>
        </section>

        {/* ══════════════════════════════════════
            S2 · MENSAJE + FECHA
        ══════════════════════════════════════ */}
        <section style={{
          position: "relative",
          minHeight: "100svh",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "clamp(60px, 12vw, 100px) clamp(28px, 8vw, 64px)",
          gap: "clamp(48px, 10vw, 80px)",
          overflow: "hidden",
        }}>
          <FondoMariposas />

          {/* Mensaje */}
          <motion.p
            className="ral"
            style={{
              position: "relative", zIndex: 10,
              maxWidth: 380, textAlign: "center",
              fontStyle: "italic", fontWeight: 300,
              fontSize: "clamp(1.05rem, 4vw, 1.3rem)",
              lineHeight: 1.85,
              color: "oklch(0.92 0 0)",
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {MENSAJE}
          </motion.p>

          {/* Fecha */}
          <motion.div
            style={{
              position: "relative", zIndex: 10,
              display: "flex", flexDirection: "column",
              alignItems: "center", gap: 20,
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="ral" style={{
              letterSpacing: "0.35em", fontSize: "0.78rem",
              color: "oklch(0.97 0 0 / 0.45)", textTransform: "lowercase",
              fontWeight: 400,
            }}>{MES}</p>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
              {/* SÁBADO */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 28, height: 1, background: "oklch(0.97 0 0 / 0.25)" }} />
                <div style={{ width: 6, height: 6, borderRadius: "50%", border: "1px solid oklch(0.97 0 0 / 0.30)" }} />
                <span className="ral" style={{
                  fontSize: "0.62rem", letterSpacing: "0.28em",
                  color: "oklch(0.97 0 0 / 0.60)", textTransform: "uppercase", fontWeight: 600,
                }}>{DIA_SEM}</span>
                <div style={{ width: 6, height: 6, borderRadius: "50%", border: "1px solid oklch(0.97 0 0 / 0.30)" }} />
              </div>

              {/* Número */}
              <span className="ral" style={{
                fontSize: "clamp(5.5rem, 22vw, 7.5rem)", lineHeight: 1,
                color: "oklch(0.80 0.09 350)", fontWeight: 300,
              }}>{DIA_NUM}</span>

              {/* AÑO */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", border: "1px solid oklch(0.97 0 0 / 0.30)" }} />
                <span className="ral" style={{
                  fontSize: "0.62rem", letterSpacing: "0.28em",
                  color: "oklch(0.97 0 0 / 0.60)", textTransform: "uppercase", fontWeight: 600,
                }}>{ANIO}</span>
                <div style={{ width: 6, height: 6, borderRadius: "50%", border: "1px solid oklch(0.97 0 0 / 0.30)" }} />
                <div style={{ width: 28, height: 1, background: "oklch(0.97 0 0 / 0.25)" }} />
              </div>
            </div>
          </motion.div>

          {/* Dress Code */}
          <motion.div
            style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", gap: 14 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div style={{ height: 1, width: 32, background: "oklch(0.97 0 0 / 0.20)" }} />
            <p className="ral" style={{
              fontSize: "0.68rem", letterSpacing: "0.30em",
              color: "oklch(0.97 0 0 / 0.48)", textTransform: "uppercase", fontWeight: 500,
            }}>
              Dress Code &nbsp;·&nbsp; <span style={{ color: "oklch(0.80 0.09 350 / 0.80)", fontWeight: 600 }}>Elegant Sport</span>
            </p>
            <div style={{ height: 1, width: 32, background: "oklch(0.97 0 0 / 0.20)" }} />
          </motion.div>

        </section>

        {/* ══════════════════════════════════════
            S3 · CONTADOR (sección blanca)
        ══════════════════════════════════════ */}
        <section style={{ position: "relative" }}>
          {/* ola superior */}
          <div style={{ background: BG, position: "relative", height: 80 }}>
            <svg
              viewBox="0 0 1200 80" preserveAspectRatio="none"
              style={{ position: "absolute", bottom: 0, width: "100%", height: "100%" }}
            >
              <path d="M0,80 C150,20 350,70 600,30 C850,-10 1050,60 1200,20 L1200,80 Z" fill="white" />
            </svg>
          </div>

          <div style={{
            background: "white",
            padding: "clamp(40px, 8vw, 72px) 24px clamp(48px, 10vw, 80px)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 32,
          }}>
            <motion.h2
              className="gv"
              style={{ fontSize: "clamp(3rem, 12vw, 4.5rem)", color: "oklch(0.73 0.10 350)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              Faltan
            </motion.h2>
            <Contador />
          </div>

          {/* ola inferior */}
          <div style={{ background: "white", position: "relative", height: 80 }}>
            <svg
              viewBox="0 0 1200 80" preserveAspectRatio="none"
              style={{ position: "absolute", top: 0, width: "100%", height: "100%" }}
            >
              <path d="M0,0 C150,60 350,10 600,50 C850,90 1050,20 1200,60 L1200,0 Z" fill={BG} />
            </svg>
          </div>
        </section>

        {/* ══════════════════════════════════════
            S4 · CARRUSEL DE FOTOS
        ══════════════════════════════════════ */}
        <section style={{
          position: "relative",
          padding: "clamp(48px, 10vw, 80px) 16px clamp(56px, 12vw, 96px)",
          display: "flex", flexDirection: "column", alignItems: "center",
          overflow: "hidden",
        }}>
          <FondoMariposas />

          <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 440, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <motion.h2
              className="gv"
              style={{
                fontSize: "clamp(2.2rem, 9vw, 3.2rem)",
                color: "oklch(0.80 0.09 350)",
                textAlign: "center", marginBottom: "clamp(32px, 7vw, 56px)",
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Un recorrido de estos 15 años
            </motion.h2>
            <Carrusel />
          </div>
        </section>

        {/* transición suave */}
        <FadeDown from={BG} to={BG} />

        {/* ══════════════════════════════════════
            S5 · CARDS
        ══════════════════════════════════════ */}
        <section style={{
          position: "relative",
          padding: "clamp(24px, 5vw, 48px) 24px clamp(64px, 14vw, 112px)",
          display: "flex", flexDirection: "column", alignItems: "center",
          overflow: "hidden",
        }}>
          <FondoMariposas />

          {/* disco ball decorativo */}
          <div style={{ position: "absolute", top: 16, right: 12, opacity: 0.45, pointerEvents: "none", zIndex: 1 }}>
            <DiscoBall size={72} />
          </div>

          <div style={{
            position: "relative", zIndex: 10,
            width: "100%", maxWidth: 400,
            display: "flex", flexDirection: "column", gap: 20,
          }}>

            {/* Card playlist */}
            <motion.div
              style={{
                borderRadius: 20, padding: "clamp(28px, 7vw, 40px) 28px",
                background: "oklch(0.17 0.020 280)",
                border: "1px solid oklch(0.97 0 0 / 0.10)",
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: 16, textAlign: "center",
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span aria-hidden="true" style={{ fontSize: "2.4rem", lineHeight: 1 }}>🎵</span>
              <p className="ral" style={{
                fontWeight: 700, color: "oklch(0.97 0 0)", letterSpacing: "0.08em",
                fontSize: "clamp(0.78rem, 3vw, 0.9rem)", lineHeight: 1.6,
                textTransform: "uppercase",
              }}>
                ¿Qué canción no puede faltar en la{" "}
                <span style={{ color: "oklch(0.73 0.10 350)" }}>PLAYLIST</span>?
              </p>
              <a
                href={PLAYLIST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ral"
                style={{
                  fontSize: "0.8rem", color: "oklch(0.97 0 0 / 0.82)",
                  border: "1px solid oklch(0.97 0 0 / 0.30)",
                  borderRadius: 99, padding: "10px 28px",
                  textDecoration: "none", fontWeight: 500,
                  transition: "background 0.2s",
                  display: "inline-block",
                }}
              >
                Elegí tu tema
              </a>
            </motion.div>

            {/* Card presencia */}
            <motion.div
              style={{
                borderRadius: 20, padding: "clamp(28px, 7vw, 40px) 28px",
                background: "oklch(0.17 0.020 280)",
                border: "1px solid oklch(0.97 0 0 / 0.10)",
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: 12, textAlign: "center",
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span aria-hidden="true" style={{ fontSize: "2.4rem", lineHeight: 1 }}>🎁</span>
              <p className="ral" style={{
                fontWeight: 700, color: "oklch(0.97 0 0)", letterSpacing: "0.08em",
                fontSize: "clamp(0.78rem, 3vw, 0.9rem)", lineHeight: 1.6,
                textTransform: "uppercase",
              }}>
                ¡El mejor regalo es tu{" "}
                <span style={{ color: "oklch(0.73 0.10 350)" }}>PRESENCIA</span>!
              </p>
              <p className="ral" style={{
                fontSize: "clamp(0.74rem, 2.8vw, 0.82rem)",
                color: "oklch(0.97 0 0 / 0.50)", lineHeight: 1.7,
              }}>
                Pero si deseás hacerme un obsequio, podés hacerlo mediante el siguiente ALIAS:
              </p>
              <p className="ral" style={{
                fontWeight: 600, fontSize: "0.95rem",
                color: "oklch(0.97 0 0 / 0.88)", letterSpacing: "0.05em",
              }}>{ALIAS}</p>
            </motion.div>

          </div>
        </section>

      </main>
    </>
  );
}

// helper: retorna el valor nominal sin CSS clamp real (sólo para JS inline)
function clamp(min, preferred) { return preferred; }
