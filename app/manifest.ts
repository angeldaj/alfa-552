import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CIA ALFA 552 · Centro de Instrucción Aeronáutica",
    short_name: "CIA ALFA 552",
    description:
      "Formamos técnicos de mantenimiento, tripulantes de cabina, despachadores de vuelo y pilotos bajo las Regulaciones Aeronáuticas Venezolanas. INAC · CIAC 552.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0b0d",
    theme_color: "#0a0b0d",
    icons: [
      {
        src: "/icon.svg",
        type: "image/svg+xml",
        sizes: "any",
      },
      {
        src: "/apple-icon",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  };
}
