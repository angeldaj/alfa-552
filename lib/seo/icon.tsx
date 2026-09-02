import { ImageResponse } from "next/og";

export function renderIcon(size: number) {
  return new ImageResponse(
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={32} height={32} fill="#0a0b0d" />
      <path
        d={
          "M16 6 L25 26 L20.6 26 L18.6 21.2 L13.4 21.2 L11.4 26 L7 26 Z M16 12.4 L14 17.4 L18 17.4 Z"
        }
        fill="#e8b647"
      />
    </svg>,
    { width: size, height: size },
  );
}
