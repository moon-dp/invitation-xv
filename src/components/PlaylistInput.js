"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PlaylistInput() {
  const [value,   setValue]  = useState("");
  const [status,  setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    const trimmed = value.trim();
    if (!trimmed) {
      setStatus("error");
      setMessage("Escribí el nombre de la canción o pegá el link");
      return;
    }

    setStatus("loading");
    try {
      const res  = await fetch("/api/playlist", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ url: trimmed }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus("success");
        setMessage("¡Canción agregada a la playlist!");
        setValue("");
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setMessage(data.error || "Algo salió mal");
      }
    } catch {
      setStatus("error");
      setMessage("No se pudo conectar");
    }
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", gap: 8, width: "100%" }}>
        <input
          type="text"
          placeholder="Nombre de la canción o link de Spotify"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          disabled={status === "loading" || status === "success"}
          style={{
            flex:        1,
            padding:     "10px 16px",
            borderRadius: 99,
            border:      `1px solid ${status === "error" ? "oklch(0.65 0.18 25 / 0.60)" : "oklch(0.97 0 0 / 0.20)"}`,
            background:  "oklch(0.12 0.025 280)",
            color:       "oklch(0.97 0 0)",
            fontFamily:  "Raleway, sans-serif",
            fontSize:    "clamp(0.70rem, 2.6vw, 0.80rem)",
            outline:     "none",
            transition:  "border-color 0.2s",
            minWidth:    0,
          }}
        />
        <motion.button
          onClick={handleSubmit}
          disabled={status === "loading" || status === "success"}
          whileTap={status === "idle" ? { scale: 0.95 } : {}}
          style={{
            padding:      "10px 18px",
            borderRadius: 99,
            border:       "none",
            background:   status === "success"
              ? "oklch(0.65 0.14 155)"
              : "linear-gradient(135deg, oklch(0.68 0.13 245), oklch(0.72 0.13 215))",
            color:         "white",
            fontFamily:    "Raleway, sans-serif",
            fontWeight:    700,
            fontSize:      "0.76rem",
            letterSpacing: "0.06em",
            cursor:        status === "idle" ? "pointer" : "default",
            whiteSpace:    "nowrap",
            flexShrink:    0,
            transition:    "background 0.3s",
          }}
        >
          {status === "loading" ? "..." : status === "success" ? "✓" : "Agregar"}
        </motion.button>
      </div>

      <AnimatePresence>
        {(status === "success" || status === "error") && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              textAlign:     "center",
              fontFamily:    "Raleway, sans-serif",
              fontSize:      "0.73rem",
              letterSpacing: "0.06em",
              color: status === "success"
                ? "oklch(0.75 0.14 155)"
                : "oklch(0.70 0.18 25)",
            }}
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
