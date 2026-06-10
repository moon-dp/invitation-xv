import "./globals.css";

export const metadata = {
  title: "XV Años · Milena",
  description: "Te invito a celebrar mis quince años",
  robots: { index: false, follow: false },
  openGraph: {
    title: "XV Años · Milena",
    description: "Te invito a celebrar mis quince años",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#18151f",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
