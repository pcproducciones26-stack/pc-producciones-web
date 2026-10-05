import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

export const alt = "PC Producciones — Producciones Clandestinas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoData = await readFile(
  join(process.cwd(), "public/logos/pc-blanco.png"),
  "base64"
);
const logoSrc = `data:image/png;base64,${logoData}`;

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "white",
        }}
      >
        <img src={logoSrc} height={420} alt="" />
        <div style={{ marginTop: 0, fontSize: 40, color: "#a3a3a3" }}>
          Producciones Clandestinas · Experiencias en vivo
        </div>
      </div>
    ),
    size
  );
}
