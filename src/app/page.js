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
    setRandomDuration(6 + Math.random() * 8);
  }, []);

  if (startX === null) return null;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ 
        y: '110vh', 
        opacity: [0, 1, 1, 0],
        rotate: [0, 90, -90, 0],
        x: [0, 25, -25, 0] 
      }}
      transition={{ 
        y: { duration: randomDuration, repeat: Infinity, delay: delay, ease: "linear" },
        opacity: { duration: randomDuration, repeat: Infinity, delay: delay },
        x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
      }}
      style={{ left: `${startX}vw`, position: 'absolute', top: -50 }}
      className="text-blue-400/40 z-0 pointer-events-none"
    >
      <ButterflySVG className="drop-shadow-md" />
    </motion.div>
  );
};

export default function InvitacionXV() {
  const [butterflies, setButterflies] = useState([]);
  
  useEffect(() => {

    setButterflies(Array.from({ length: 80 }, (_, i) => i * 0.25));
  }, []);


  const nroTelefono = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5492262622237"
  const whatsappLink = `https://wa.me/${nroTelefono}?text=¡Hola!%20Confirmo%20mi%20asistencia%20a%20los%20XV%20de%20Mile%20`;

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-sky-100 p-4">
      

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        .cursive-font { font-family: 'Dancing Script', cursive; }
        .font-serif-custom { font-family: 'Playfair Display', serif; }
        body { margin: 0; background: #e0f2fe; overflow-x: hidden; }
      `}} />


      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_#e0f2fe_0%,_#7dd3fc_70%,_#38bdf8_100%)] opacity-80" />
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-0" />


      {butterflies.map((delay, index) => (
        <FallingButterfly key={index} delay={delay} />
      ))}

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-lg bg-white/40 backdrop-blur-xl border border-white/60 rounded-[3rem] shadow-2xl p-8 md:p-12 text-center"
      >
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-blue-500 bg-white p-2 rounded-full shadow-md">
          <ButterflySVG className="w-8 h-8" />
        </div>

        <header className="space-y-4 mb-8">
          <p className="text-2xl italic text-blue-700 font-serif-custom">Mis XV</p>
          <h1 className="text-8xl md:text-9xl text-blue-900 drop-shadow-md cursive-font">
            Mile
          </h1>
        </header>

        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-[1px] w-12 bg-blue-400" />
          <div className="w-2 h-2 rotate-45 border border-blue-400" />
          <div className="h-[1px] w-12 bg-blue-400" />
        </div>

        <section className="space-y-6 text-blue-900 font-serif-custom">
          <div className="text-xl md:text-2xl font-light uppercase tracking-[0.3em]">
            22 <span className="text-blue-400">de</span> Agosto
            <div className="mt-2 text-2xl font-semibold text-blue-800">21:00 PM</div>
          </div>
          
          <div className="space-y-1">
            <p className="text-xl italic font-bold">South Club (Ex Sotavento)</p>
            <p className="text-md opacity-80 tracking-widest uppercase">Av. 2 y Pinolandia</p>
          </div>

          <div className="pt-4 border-t border-blue-200/50 w-2/3 mx-auto text-sm tracking-[0.2em] uppercase opacity-90">
            Dress Code: <span className="font-bold">Sport Elegante</span>
          </div>
        </section>

        <footer className="mt-12">
          <motion.a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 rounded-full font-sans font-bold shadow-xl transition-all uppercase tracking-widest text-sm"
          >
            Confirmar Asistencia
          </motion.a>
        </footer>

        <div className="absolute bottom-4 right-4 opacity-10 pointer-events-none">
          <ButterflySVG className="w-24 h-24 rotate-12" />
        </div>
      </motion.div>
    </main>
  );
}