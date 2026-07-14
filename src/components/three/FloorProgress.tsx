const floors = [
  { label: "GROUND", value: 0.1 },
  { label: "20", value: 0.6 },
  { label: "26 — THE CLUB", value: 0.75 },
  { label: "30 — SKY LOBBY", value: 0.9 },
];

export function FloorProgress({ progress }: { progress: number }) {
  const normalized = Math.max(0, Math.min(1, (progress - 0.48) / 0.38));
  return (
    <aside className="floor-progress" aria-label="Current tower floor">
      <div className="floor-progress__line"><span style={{ transform: `scaleY(${normalized})` }} /></div>
      {floors.map((floor) => (
        <div className={normalized >= floor.value - 0.12 ? "is-active" : ""} key={floor.label}>
          <i /> <span>{floor.label}</span>
        </div>
      ))}
    </aside>
  );
}
