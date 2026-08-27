import { renderIcon } from "@/lib/seo/icon";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return renderIcon(size.width);
}
