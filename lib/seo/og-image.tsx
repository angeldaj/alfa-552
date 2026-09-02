import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

export function renderOgImage(
  kicker: string,
  title: string,
  subtitle: string,
  cta: string = "Ver más en alfa552.com →",
) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#0a0b0d",
        color: "#f4f5f6",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 28,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "#e8b647",
          marginBottom: 28,
        }}
      >
        {kicker}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 64,
          fontWeight: 700,
          lineHeight: 1.1,
          maxWidth: 950,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 30,
          color: "#c3c7cd",
          marginTop: 32,
          maxWidth: 900,
        }}
      >
        {subtitle}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          alignSelf: "flex-start",
          marginTop: 48,
          padding: "14px 28px",
          fontSize: 24,
          fontWeight: 600,
          color: "#0a0b0d",
          background: "#e8b647",
        }}
      >
        {cta}
      </div>
    </div>,
    { ...OG_SIZE },
  );
}
