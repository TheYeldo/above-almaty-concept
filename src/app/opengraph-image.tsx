import { ImageResponse } from "next/og";

export const alt = "Above Almaty — independent cinematic hotel concept";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "62px 72px",
        background: "linear-gradient(145deg, #111514 0%, #293338 58%, #a29078 100%)",
        color: "#f1eee7",
        fontFamily: "serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 20, letterSpacing: 8 }}>INDEPENDENT CONCEPT</div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, lineHeight: 0.88 }}>Above</div>
          <div style={{ fontSize: 92, lineHeight: 0.88 }}>Almaty</div>
        </div>
        <div style={{ display: "flex", width: 120, height: 360, border: "1px solid #b6c4c6", background: "rgba(17,20,19,.45)" }} />
      </div>
    </div>,
    size,
  );
}
