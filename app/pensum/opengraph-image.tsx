import { OG_SIZE, renderOgImage } from "@/lib/seo/og-image";

export const alt = "Pensum · CIA ALFA 552";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return renderOgImage(
    "CIA ALFA 552 · Pensum",
    "Malla curricular",
    "Asignaturas, ciclos y horas por carrera — mantenimiento, aviónica, cabina, despacho y pilotos",
    "Ver la malla completa →"
  );
}
