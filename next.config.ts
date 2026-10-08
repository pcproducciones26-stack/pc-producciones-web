import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/webmail",
        destination: "https://cpanel161.wnpservers.net:2096/",
        permanent: false,
      },
      // El alias de Vercel sirve el mismo contenido que el dominio real y
      // compite como duplicado en Google. /api queda afuera para los crons.
      {
        source: "/:path((?!api/).*)",
        has: [{ type: "host", value: "pc-producciones-web.vercel.app" }],
        destination: "https://www.pcproducciones.com.ar/:path",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      // Previews y cualquier otro dominio *.vercel.app no deben indexarse.
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?<host>.*)\\.vercel\\.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
};

export default nextConfig;
