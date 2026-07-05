// Script de setup único para obtener el refresh token de Spotify.
//
// Paso 1: Agregá SPOTIFY_CLIENT_ID y SPOTIFY_CLIENT_SECRET a .env.local,
//         luego corré:
//
//   node -e "require('dotenv').config({path:'.env.local'})" scripts/get-spotify-token.js
//
//   (o exportá las vars manualmente antes de correr el script)
//
// Paso 2: Abrí la URL que imprime, autorizá con la cuenta dueña de la playlist,
//         copiá el valor de ?code= de la URL de redirect y corré:
//
//   SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy \
//     node scripts/get-spotify-token.js EL_CODIGO
//
// Paso 3: Copiá el refresh_token que imprime y agregalo a .env.local

const CLIENT_ID     = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI  = "http://localhost:3000/callback";
const SCOPE         = "playlist-modify-public";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Error: falta SPOTIFY_CLIENT_ID o SPOTIFY_CLIENT_SECRET en el entorno");
  process.exit(1);
}

const code = process.argv[2];

if (!code) {
  const params = new URLSearchParams({
    client_id:     CLIENT_ID,
    response_type: "code",
    redirect_uri:  REDIRECT_URI,
    scope:         SCOPE,
  });
  console.log("\nPaso 1 — Abrí esta URL en el browser y autorizá con la cuenta de Spotify dueña de la playlist:\n");
  console.log(`https://accounts.spotify.com/authorize?${params}\n`);
  console.log("Paso 2 — Después del redirect, copiá el valor de ?code= y corré:");
  console.log("  node scripts/get-spotify-token.js EL_CODIGO\n");
} else {
  const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  fetch("https://accounts.spotify.com/api/token", {
    method:  "POST",
    headers: {
      Authorization:  `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type:   "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }),
  })
    .then((r) => r.json())
    .then((data) => {
      if (data.error) {
        console.error("Error:", data.error_description || data.error);
        process.exit(1);
      }
      console.log("\nAgregá esto a .env.local y a las variables de entorno de Vercel:\n");
      console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`);
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
