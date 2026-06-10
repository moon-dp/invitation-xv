/** @type {import('next').NextConfig} */

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control",   value: "on" },
  { key: "X-Frame-Options",          value: "DENY" },
  { key: "X-Content-Type-Options",   value: "nosniff" },
  { key: "Referrer-Policy",          value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy",       value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js inline scripts + framer-motion
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      // estilos inline + Google Fonts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // fuentes de Google
      "font-src 'self' https://fonts.gstatic.com",
      // imágenes propias + data URIs
      "img-src 'self' data: blob:",
      // audio propio
      "media-src 'self'",
      // fetch/XHR (sólo propio)
      "connect-src 'self'",
      // destino de links externos (WhatsApp, Spotify, etc.)
      "frame-src https://open.spotify.com",
    ].join("; "),
  },
];

const nextConfig = {
  reactCompiler: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
