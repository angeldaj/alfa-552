import { OG_SIZE, renderOgImage } from "@/lib/seo/og-image";

export const alt = "Calendario académico · CIA ALFA 552";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return renderOgImage(
    "CIA ALFA 552 · Calendario",
    "Calendario académico",
    "Inscripciones, exámenes INAC y prácticas de simulador por programa y modalidad",
    "Ver el calendario →"
  );
}
