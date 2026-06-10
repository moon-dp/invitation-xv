"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── CONFIGURACIÓN ──────────────────────────────────────────────
const NOMBRE       = "Tiziana";
const FECHA_EVENTO = new Date("2025-05-03T20:00:00");
const DIA_NUM      = "3";
const MES          = "mayo";
const DIA_SEM      = "SÁBADO";
const ANIO         = "2025";
const MENSAJE      = "Porque esta noche es muy importante para mí, quiero compartirla con las personas que llevo en el corazón. Porque sos una de ellas, quisiera que estés presente en una de las noches más inolvidables de mi vida.";
const ALIAS        = "Tizi.simone";
const PLAYLIST_URL = "#"; // Reemplazá con link de Spotify o formulario
const AUDIO_SRC    = "/cancion.mp3"; // Poné tu canción en /public/cancion.mp3
const FOTOS        = [
  "/fotos/foto1.jpg",
  "/fotos/foto2.jpg",
  "/fotos/foto3.jpg",
  "/fotos/foto4.jpg",
  "/fotos/foto5.jpg",
];
// ──────────────────────────────────────────────────────────────

// ─── Iconos ───────────────────────────────────────────────────
const StarIcon = ({ size = 10 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1 14.4 8.3 22 9.3l-5.5 5.4 1.3 7.6L12 18.8l-5.8 3.5 1.3-7.6L2 9.3l7.6-1z" />
  </svg>
);

const CrossIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="5" y1="5" x2="19" y2="19" strokeWidth="1.2" opacity="0.6" />
    <line x1="19" y1="5" x2="5" y2="19" strokeWidth="1.2" opacity="0.6" />
  </svg>
);

// ─── Estrellas de fondo ────────────────────────────────────────
function FondoEstrellas() {
  const [stars, setStars] = useState([]);
  useEffect(() => {
    setStars(
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        top:      Math.random() * 95,
        left:     Math.random() * 95,
        size:     7 + Math.random() * 9,
        delay:    Math.random() * 4,
        dur:      2.5 + Math.random() * 2,
        cross:    Math.random() > 0.5,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute text-white"
          style={{ top: `${s.top}%`, left: `${s.left}%` }}
          animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: s.dur, repeat: Infinity, delay: s.delay }}
        >
          {s.cross ? <CrossIcon size={s.size} /> : <StarIcon size={s.size} />}
        </motion.div>
      ))}
    </div>
  );
}

// ─── Disco Ball ───────────────────────────────────────────────
function DiscoBall({ size = 120, className = "" }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div style={{ width: 2, height: 28, background: "rgba(255,255,255,0.35)" }} />
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: `
            radial-gradient(circle at 28% 22%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0) 28%),
            radial-gradient(circle at 72% 68%, rgba(160,160,190,0.5) 0%, transparent 35%),
            radial-gradient(circle at center, #d0d0d8 0%, #888 55%, #444 100%)
          `,
          boxShadow: "0 0 40px rgba(200,200,255,0.25), 0 0 80px rgba(180,180,255,0.1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* grid */}
        <div
          style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 9px, rgba(0,0,0,0.18) 9px, rgba(0,0,0,0.18) 10px),
              repeating-linear-gradient(90deg, transparent, transparent 9px, rgba(0,0,0,0.18) 9px, rgba(0,0,0,0.18) 10px)
            `,
          }}
        />
        {/* destellos */}
        {[
          { top:"18%", left:"22%", w:"14%", h:"9%",  rot:"-12deg", op:0.85 },
          { top:"32%", left:"55%", w:"10%", h:"7%",  rot:"18deg",  op:0.65 },
          { top:"12%", left:"52%", w:"8%",  h:"11%", rot:"-5deg",  op:0.70 },
          { top:"50%", left:"30%", w:"7%",  h:"6%",  rot:"8deg",   op:0.45 },
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

// ─── Reproductor de música ─────────────────────────────────────
function MusicPlayer() {
  const audioRef   = useRef(null);
  const [playing,  setPlaying]  = useState(false);
  const [progress, setProgress] = useState(0);
  const [shuffle,  setShuffle]  = useState(false);
  const [repeat,   setRepeat]   = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () =>
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    const onEnd = () => {
      if (repeat) audio.play().catch(() => {});
      else setPlaying(false);
    };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
    };
  }, [repeat]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play().catch(() => {}); setPlaying(true); }
  };

  const seek = (e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct  = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <p className="text-center text-white/45 text-[11px] tracking-widest mb-3">
        Presioná PLAY para reproducir la canción
      </p>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src={AUDIO_SRC} preload="metadata" />

      {/* barra de progreso */}
      <div
        className="w-full h-0.5 bg-white/20 rounded-full mb-4 cursor-pointer relative"
        onClick={seek}
      >
        <div
          className="h-full bg-white/70 rounded-full relative transition-all"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full" />
        </div>
      </div>

      {/* controles */}
      <div className="flex items-center justify-center gap-6">
        <button
          aria-label="Aleatorio"
          onClick={() => setShuffle(!shuffle)}
          className={`text-white transition-opacity ${shuffle ? "opacity-100" : "opacity-35"}`}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
          </svg>
        </button>

        <button aria-label="Anterior" className="text-white/55 hover:text-white transition-colors">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
          </svg>
        </button>

        <motion.button
          aria-label={playing ? "Pausar" : "Reproducir"}
          whileTap={{ scale: 0.9 }}
          onClick={toggle}
          className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-xl"
        >
          {playing ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#18151f">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#18151f">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </motion.button>

        <button aria-label="Siguiente" className="text-white/55 hover:text-white transition-colors">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </button>

        <button
          aria-label="Repetir"
          onClick={() => setRepeat(!repeat)}
          className={`text-white transition-opacity ${repeat ? "opacity-100" : "opacity-35"}`}
        >
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
      if (diff <= 0) { setT({ dias: 0, horas: 0, minutos: 0 }); return; }
      setT({
        dias:    Math.floor(diff / 86400000),
        horas:   Math.floor((diff % 86400000) / 3600000),
        minutos: Math.floor((diff % 3600000)  / 60000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { val: t.dias,    label: "DÍAS",    pink: false },
    { val: t.horas,   label: "HORAS",   pink: true  },
    { val: t.minutos, label: "MINUTOS", pink: true  },
  ];

  return (
    <div className="flex items-start justify-center gap-3">
      {items.map(({ val, label, pink }, i) => (
        <React.Fragment key={label}>
          {i > 0 && <span className="text-5xl font-bold text-gray-700 leading-none mt-1">:</span>}
          <div className="text-center">
            <div className={`text-5xl md:text-6xl font-bold leading-none ${pink ? "text-pink-400" : "text-gray-900"}`}>
              {String(val).padStart(2, "0")}
            </div>
            <div className="text-[10px] tracking-widest text-gray-400 mt-2">{label}</div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Polaroid ──────────────────────────────────────────────────
function Polaroid({ src, active }) {
  return (
    <div
      className="bg-white shadow-2xl flex-shrink-0"
      style={{
        padding: "10px 10px 40px",
        width: active ? 230 : 180,
        opacity: active ? 1 : 0.45,
        transform: active ? "scale(1) rotate(0deg)" : "scale(0.88)",
        transition: "all 0.4s ease",
      }}
    >
      <div className="w-full bg-gray-200 overflow-hidden" style={{ aspectRatio: "1/1" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt="Foto XV"
          className="w-full h-full object-cover"
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
      </div>
    </div>
  );
}

// ─── Carrusel ──────────────────────────────────────────────────
function Carrusel() {
  const [cur, setCur] = useState(0);
  const n = FOTOS.length;
  const prev = () => setCur((c) => (c - 1 + n) % n);
  const next = () => setCur((c) => (c + 1) % n);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full flex items-center justify-center overflow-hidden py-6" style={{ minHeight: 280 }}>
        {/* foto anterior parcial */}
        <div
          className="absolute cursor-pointer select-none"
          style={{ left: 0, transform: "translateX(-35%)" }}
          onClick={prev}
        >
          <Polaroid src={FOTOS[(cur - 1 + n) % n]} active={false} />
        </div>

        {/* foto actual */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cur}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <Polaroid src={FOTOS[cur]} active={true} />
          </motion.div>
        </AnimatePresence>

        {/* foto siguiente parcial */}
        <div
          className="absolute cursor-pointer select-none"
          style={{ right: 0, transform: "translateX(35%)" }}
          onClick={next}
        >
          <Polaroid src={FOTOS[(cur + 1) % n]} active={false} />
        </div>
      </div>

      {/* dots */}
      <div className="flex gap-2 mt-2">
        {FOTOS.map((_, i) => (
          <button
            key={i}
            aria-label={`Foto ${i + 1}`}
            onClick={() => setCur(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width:  i === cur ? 10 : 7,
              height: i === cur ? 10 : 7,
              background: i === cur ? "#f0b8cb" : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Página principal ──────────────────────────────────────────
export default function InvitacionXV() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@300;400;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { background: #18151f; overflow-x: hidden; }
        .script  { font-family: 'Great Vibes', cursive; }
        .serif   { font-family: 'Cormorant Garamond', serif; }
        .sans    { font-family: 'Montserrat', sans-serif; }
      `}} />

      <main style={{ background: "#18151f", color: "#fff", fontFamily: "Montserrat, sans-serif" }}>

        {/* ══════════════════════════════════════════
            SECCIÓN 1 · HERO
        ══════════════════════════════════════════ */}
        <section className="relative min-h-screen flex flex-col items-center justify-between py-12 px-6 overflow-hidden">
          <FondoEstrellas />

          {/* Disco ball + nombre */}
          <motion.div
            className="relative z-10 flex flex-col items-center pt-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* globo decorativo izquierda */}
            <div className="absolute -left-12 top-8 opacity-50" style={{ pointerEvents: "none" }}>
              <DiscoBall size={70} />
            </div>

            <DiscoBall size={130} />

            {/* nombre */}
            <h1 className="script text-8xl md:text-9xl text-white mt-2 relative" style={{ lineHeight: 1.1 }}>
              {NOMBRE}
            </h1>
          </motion.div>

          {/* MIS 15 AÑOS */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 sans tracking-[0.35em] text-white text-lg uppercase">
              <span>MIS</span>
              <span
                className="serif italic"
                style={{ fontSize: "5.5rem", lineHeight: 1, color: "#f0b8cb", fontWeight: 700 }}
              >
                15
              </span>
              <span>AÑOS</span>
            </div>
          </motion.div>

          {/* Reproductor */}
          <div className="relative z-10 w-full pb-4">
            <MusicPlayer />
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECCIÓN 2 · MENSAJE + FECHA
        ══════════════════════════════════════════ */}
        <section className="relative min-h-screen flex flex-col items-center justify-center py-20 px-8 overflow-hidden" style={{ background: "#16131e" }}>
          <FondoEstrellas />

          <div className="relative z-10 max-w-sm w-full flex flex-col items-center gap-16">
            {/* mensaje */}
            <motion.p
              className="serif italic text-center text-white/88 leading-relaxed"
              style={{ fontSize: "1.25rem", fontFamily: "'Cormorant Garamond', serif" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {MENSAJE}
            </motion.p>

            {/* fecha */}
            <motion.div
              className="flex flex-col items-center gap-5 w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="serif tracking-[0.35em] text-white/50 text-sm uppercase">{MES}</p>

              <div className="flex items-center justify-center gap-4 w-full">
                {/* SÁBADO izquierda */}
                <div className="flex items-center gap-2 flex-1 justify-end">
                  <div className="h-px flex-1 max-w-[40px] bg-white/30" />
                  <div className="w-2 h-2 rounded-full border border-white/35" />
                  <span className="sans text-[10px] tracking-[0.25em] text-white/65 uppercase">{DIA_SEM}</span>
                  <div className="w-2 h-2 rounded-full border border-white/35" />
                </div>

                {/* número */}
                <span
                  className="serif"
                  style={{ fontSize: "6rem", lineHeight: 1, color: "#f0b8cb", fontWeight: 300, fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {DIA_NUM}
                </span>

                {/* AÑO derecha */}
                <div className="flex items-center gap-2 flex-1">
                  <div className="w-2 h-2 rounded-full border border-white/35" />
                  <span className="sans text-[10px] tracking-[0.25em] text-white/65">{ANIO}</span>
                  <div className="w-2 h-2 rounded-full border border-white/35" />
                  <div className="h-px flex-1 max-w-[40px] bg-white/30" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECCIÓN 3 · CONTADOR
        ══════════════════════════════════════════ */}
        <section className="relative overflow-hidden">
          {/* ola superior */}
          <div style={{ background: "#16131e", position: "relative", height: 70 }}>
            <svg
              viewBox="0 0 1200 70"
              preserveAspectRatio="none"
              style={{ position: "absolute", bottom: 0, width: "100%", height: "100%" }}
            >
              <path d="M0,70 C200,10 600,60 900,20 C1050,5 1150,40 1200,10 L1200,70 Z" fill="white" />
            </svg>
          </div>

          <div className="bg-white py-14 px-8 flex flex-col items-center gap-8">
            <motion.h2
              className="script text-5xl text-pink-400"
              style={{ fontFamily: "'Great Vibes', cursive" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Faltan
            </motion.h2>
            <Contador />
          </div>

          {/* ola inferior */}
          <div style={{ background: "white", position: "relative", height: 70 }}>
            <svg
              viewBox="0 0 1200 70"
              preserveAspectRatio="none"
              style={{ position: "absolute", top: 0, width: "100%", height: "100%" }}
            >
              <path d="M0,0 C200,60 600,10 900,50 C1050,65 1150,30 1200,60 L1200,0 Z" fill="#18151f" />
            </svg>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECCIÓN 4 · CARRUSEL DE FOTOS
        ══════════════════════════════════════════ */}
        <section className="relative py-16 px-4 overflow-hidden" style={{ background: "#1e1a2a" }}>
          <FondoEstrellas />

          <div className="relative z-10 max-w-lg mx-auto">
            <motion.h2
              className="script text-4xl text-pink-300 text-center mb-10"
              style={{ fontFamily: "'Great Vibes', cursive" }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Un recorrido de estos 15 años
            </motion.h2>
            <Carrusel />
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECCIÓN 5 · CARDS
        ══════════════════════════════════════════ */}
        <section className="relative py-16 px-6 overflow-hidden" style={{ background: "#18151f" }}>
          <FondoEstrellas />

          {/* disco ball decorativo */}
          <div className="absolute top-6 right-4 opacity-50 pointer-events-none">
            <DiscoBall size={75} />
          </div>

          <div className="relative z-10 max-w-sm mx-auto flex flex-col gap-5">

            {/* Card playlist */}
            <motion.div
              className="rounded-2xl p-7 text-center flex flex-col items-center gap-4"
              style={{ background: "rgba(255,255,255,0.065)", border: "1px solid rgba(255,255,255,0.1)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span style={{ fontSize: "2.2rem" }}>🎵</span>
              <p className="sans font-bold text-white uppercase tracking-wider text-sm leading-relaxed">
                ¿Qué canción no puede faltar en la{" "}
                <span style={{ color: "#f0b8cb" }}>PLAYLIST</span>?
              </p>
              <a
                href={PLAYLIST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="sans text-xs text-white/80 hover:text-white transition-colors px-6 py-2 rounded-full"
                style={{ border: "1px solid rgba(255,255,255,0.35)" }}
              >
                Elegí tu tema
              </a>
            </motion.div>

            {/* Card presencia */}
            <motion.div
              className="rounded-2xl p-7 text-center flex flex-col items-center gap-3"
              style={{ background: "rgba(255,255,255,0.065)", border: "1px solid rgba(255,255,255,0.1)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span style={{ fontSize: "2.2rem" }}>🎁</span>
              <p className="sans font-bold text-white uppercase tracking-wider text-sm leading-relaxed">
                ¡El mejor regalo es tu{" "}
                <span style={{ color: "#f0b8cb" }}>PRESENCIA</span>!
              </p>
              <p className="sans text-white/55 text-xs leading-relaxed">
                Pero si deseás hacerme un obsequio, podés hacerlo mediante el siguiente ALIAS:
              </p>
              <p className="sans font-semibold text-white/90 text-sm tracking-wide">{ALIAS}</p>
            </motion.div>

          </div>
        </section>

      </main>
    </>
  );
}
