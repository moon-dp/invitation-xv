"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';


const ButterflySVG = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width="30" height="30">
    <path d="M12 20s-1-3-1-5 1-3 1-3 1 1 1 3-1 5-1 5z" fill="currentColor" />
    <path d="M11 14.5s-6-1.5-8-4.5c-2-3 0-6 4-5 2 .5 4 3 5 5 1-2 3-4.5 5-5 4-1 6 2 4 5-2 3-8 4.5-8 4.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M11 15.5s-5 1.5-6 4.5c-1 2 2 2 4 0 1-1 2-3 3-4 1 1 2 3 3 4 2 2 5 2 4 0-1-3-6-4.5-6-4.5" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);


const FallingButterfly = ({ delay }) => {
  const [startX, setStartX] = useState(null);
  const [randomDuration, setRandomDuration] = useState(10);
  useEffect(() => {
    setStartX(Math.random() * 100);
    setRandomDuration(7 + Math.random() * 7);
  }, []);
  if (startX === null) return null;
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: '110vh', opacity: [0, 1, 1, 0], rotate: [0, 90, -90, 0], x: [0, 20, -20, 0] }}
      transition={{ 
        y: { duration: randomDuration, repeat: Infinity, delay: delay, ease: "linear" },
        opacity: { duration: randomDuration, repeat: Infinity, delay: delay },
        x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
      }}
      style={{ left: `${startX}vw`, position: 'absolute', top: -50 }}
      className="text-blue-400/30 z-0 pointer-events-none"
    >
      <ButterflySVG className="w-5 h-5 md:w-7 md:h-7" />
    </motion.div>
  );
};

export default function InvitacionXV() {
  const [butterflies, setButterflies] = useState([]);
  useEffect(() => {
    setButterflies(Array.from({ length: 60 }, (_, i) => i * 0.3));
  }, []);

  const nroTelefono = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5492262622237";
  const whatsappLink = `https://wa.me/${nroTelefono}?text=¡Hola!%20Confirmo%20mi%20asistencia%20a%20los%20XV%20de%20Mile%20🦋`;

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-sky-100 p-4 sm:p-6">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        .cursive-font { font-family: 'Dancing Script', cursive; }
        .font-serif-custom { font-family: 'Playfair Display', serif; }
        body { margin: 0; background: #e0f2fe; overflow-x: hidden; }
      `}} />


      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_#e0f2fe_0%,_#7dd3fc_70%,_#38bdf8_100%)] opacity-80" />
      <div className="absolute inset-0 opacity-15 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-0" />
      {butterflies.map((delay, index) => <FallingButterfly key={index} delay={delay} />)}


      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md p-6 sm:p-10 md:p-12 text-center rounded-[2.5rem] md:rounded-[3.5rem]
                   bg-white/40 backdrop-blur-2xl border border-white/60
                   shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] ring-1 ring-white/40"
      >
        <header className="space-y-2 md:space-y-4 mb-6">
          <p className="text-xl md:text-2xl italic text-blue-700 font-serif-custom tracking-widest">Mis XV</p>
          <h1 className="text-6xl sm:text-7xl md:text-9xl text-blue-900 cursive-font drop-shadow-sm">
            Mile
          </h1>
        </header>

        <div className="flex items-center justify-center gap-3 my-6 opacity-40">
          <div className="h-[1px] w-8 md:w-12 bg-blue-400" />
          <div className="w-1.5 h-1.5 rotate-45 border border-blue-400" />
          <div className="h-[1px] w-8 md:w-12 bg-blue-400" />
        </div>

        <section className="space-y-5 md:space-y-8 text-blue-900 font-serif-custom">
          <div className="space-y-1">
            <div className="text-lg md:text-2xl font-light uppercase tracking-[0.2em] md:tracking-[0.3em]">
              22 <span className="text-blue-400 lowercase">de</span> Agosto
            </div>
            <div className="text-2xl md:text-3xl font-bold text-blue-800 italic">21:00 PM</div>
          </div>
          
          <div className="space-y-1">
            <p className="text-lg md:text-xl font-bold">South Club <span className="text-sm font-normal opacity-70">(Ex Sotavento)</span></p>
            <p className="text-xs md:text-sm tracking-widest uppercase opacity-80">Av. 2 y Pinolandia</p>
          </div>

          <div className="pt-4 border-t border-blue-200/40 w-2/3 mx-auto">
            <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase opacity-90">
              Dress Code: <span className="font-bold">Sport Elegante</span>
            </p>
          </div>
        </section>

        <footer className="mt-8 md:mt-12">
          <motion.a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block w-full bg-blue-600/90 text-white px-8 py-4 md:py-5 rounded-full font-sans font-bold shadow-lg transition-all uppercase tracking-widest text-xs md:text-sm"
          >
            Confirmar Asistencia
          </motion.a>
        </footer>
      </motion.div>
    </main>
  );
}